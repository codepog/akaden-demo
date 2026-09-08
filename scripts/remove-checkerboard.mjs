import { deflateSync, inflateSync } from 'node:zlib';
import { readFileSync, writeFileSync } from 'node:fs';

const [inputPath, outputPath] = process.argv.slice(2);
if (!inputPath || !outputPath) throw new Error('Usage: node remove-checkerboard.mjs input.png output.png');

const source = readFileSync(inputPath);
const signature = source.subarray(0, 8);
const chunks = [];
let cursor = 8;

while (cursor < source.length) {
  const length = source.readUInt32BE(cursor);
  const type = source.subarray(cursor + 4, cursor + 8).toString('ascii');
  const data = source.subarray(cursor + 8, cursor + 8 + length);
  chunks.push({ type, data });
  cursor += length + 12;
}

const header = chunks.find((chunk) => chunk.type === 'IHDR')?.data;
if (!header) throw new Error('PNG header missing');
const width = header.readUInt32BE(0);
const height = header.readUInt32BE(4);
const bitDepth = header[8];
const colorType = header[9];
if (bitDepth !== 8 || ![2, 6].includes(colorType)) throw new Error('Expected an 8-bit RGB or RGBA PNG');

const sourceBytesPerPixel = colorType === 6 ? 4 : 3;
const sourceRowBytes = width * sourceBytesPerPixel;
const outputBytesPerPixel = 4;
const compressed = Buffer.concat(chunks.filter((chunk) => chunk.type === 'IDAT').map((chunk) => chunk.data));
const filtered = inflateSync(compressed);
const sourcePixels = Buffer.alloc(sourceRowBytes * height);

for (let y = 0; y < height; y += 1) {
  const filter = filtered[y * (sourceRowBytes + 1)];
  const sourceRow = y * (sourceRowBytes + 1) + 1;
  const targetRow = y * sourceRowBytes;
  for (let x = 0; x < sourceRowBytes; x += 1) {
    const raw = filtered[sourceRow + x];
    const left = x >= sourceBytesPerPixel ? sourcePixels[targetRow + x - sourceBytesPerPixel] : 0;
    const up = y > 0 ? sourcePixels[targetRow - sourceRowBytes + x] : 0;
    const upLeft = y > 0 && x >= sourceBytesPerPixel ? sourcePixels[targetRow - sourceRowBytes + x - sourceBytesPerPixel] : 0;
    let value = raw;
    if (filter === 1) value = (raw + left) & 255;
    if (filter === 2) value = (raw + up) & 255;
    if (filter === 3) value = (raw + Math.floor((left + up) / 2)) & 255;
    if (filter === 4) {
      const prediction = left + up - upLeft;
      const pa = Math.abs(prediction - left);
      const pb = Math.abs(prediction - up);
      const pc = Math.abs(prediction - upLeft);
      value = (raw + (pa <= pb && pa <= pc ? left : pb <= pc ? up : upLeft)) & 255;
    }
    sourcePixels[targetRow + x] = value;
  }
}

const pixels = Buffer.alloc(width * height * outputBytesPerPixel);
for (let point = 0; point < width * height; point += 1) {
  const sourceIndex = point * sourceBytesPerPixel;
  const outputIndex = point * outputBytesPerPixel;
  pixels[outputIndex] = sourcePixels[sourceIndex];
  pixels[outputIndex + 1] = sourcePixels[sourceIndex + 1];
  pixels[outputIndex + 2] = sourcePixels[sourceIndex + 2];
  pixels[outputIndex + 3] = colorType === 6 ? sourcePixels[sourceIndex + 3] : 255;
}

const isCheckerPixel = (index) => {
  const red = pixels[index];
  const green = pixels[index + 1];
  const blue = pixels[index + 2];
  return red > 180 && green > 180 && blue > 180 && Math.max(red, green, blue) - Math.min(red, green, blue) < 10;
};

const checked = new Uint8Array(width * height);
const queue = new Int32Array(width * height);
let start = 0;
let end = 0;
const visit = (x, y) => {
  const point = y * width + x;
  const pixel = point * outputBytesPerPixel;
  if (checked[point] || !isCheckerPixel(pixel)) return;
  checked[point] = 1;
  queue[end] = point;
  end += 1;
};

for (let x = 0; x < width; x += 1) {
  visit(x, 0);
  visit(x, height - 1);
}
for (let y = 1; y < height - 1; y += 1) {
  visit(0, y);
  visit(width - 1, y);
}

while (start < end) {
  const point = queue[start];
  start += 1;
  const x = point % width;
  const y = Math.floor(point / width);
  pixels[point * outputBytesPerPixel + 3] = 0;
  if (x > 0) visit(x - 1, y);
  if (x < width - 1) visit(x + 1, y);
  if (y > 0) visit(x, y - 1);
  if (y < height - 1) visit(x, y + 1);
}

const outputRowBytes = width * outputBytesPerPixel;
const outputRows = Buffer.alloc(height * (outputRowBytes + 1));
for (let y = 0; y < height; y += 1) {
  outputRows[y * (outputRowBytes + 1)] = 0;
  pixels.copy(outputRows, y * (outputRowBytes + 1) + 1, y * outputRowBytes, (y + 1) * outputRowBytes);
}

const crcTable = Uint32Array.from({ length: 256 }, (_, index) => {
  let value = index;
  for (let bit = 0; bit < 8; bit += 1) value = (value & 1) ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
  return value >>> 0;
});
const crc32 = (data) => {
  let value = 0xffffffff;
  for (const byte of data) value = crcTable[(value ^ byte) & 255] ^ (value >>> 8);
  return (value ^ 0xffffffff) >>> 0;
};
const makeChunk = (type, data) => {
  const name = Buffer.from(type);
  const chunk = Buffer.alloc(data.length + 12);
  chunk.writeUInt32BE(data.length, 0);
  name.copy(chunk, 4);
  data.copy(chunk, 8);
  chunk.writeUInt32BE(crc32(Buffer.concat([name, data])), data.length + 8);
  return chunk;
};

const outputHeader = Buffer.from(header);
outputHeader[9] = 6;
writeFileSync(outputPath, Buffer.concat([signature, makeChunk('IHDR', outputHeader), makeChunk('IDAT', deflateSync(outputRows)), makeChunk('IEND', Buffer.alloc(0))]));
