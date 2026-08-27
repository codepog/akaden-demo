# Student Contact Export Requirements

## Business context

The campus communications team needs a nightly contact file for its outreach platform.

The team needs a clean, reliable contact list with each person's preferred name and primary contact information when available.

The outreach platform receives the export file from Amazon S3, used here as a secure handoff location.

## Source system

Ellucian Banner SaaS is the source system for this integration.

The integration must extract person/student contact data from Banner through supported Ellucian APIs. It must not rely on direct database access or direct Banner table reads.

This is an outbound data extract integration. The integration must not update Banner data.

## Technical objective

Build an outbound integration that:

1. Selects Banner person/student records where `dateOfBirth` exists and is earlier than `2000-01-01`.
2. Applies best-record rules for name, email, phone, address, and emergency contact.
3. Generates `output.csv` with the required columns and formatting.
4. Uploads `output.csv` to the configured Amazon S3 location.

## Required source data

The integration needs access to the following Banner data:

- Banner ID.
- Date of birth.
- Person names, including preferred and legal/official names.
- Email addresses, including primary indicator and priority when available.
- Phone numbers, including primary indicator and priority when available.
- Addresses, including address type, active/current status, and priority when available.
- Emergency contacts, including primary indicator and phone number when available.

## Student/person filter

Include only records where:

- `dateOfBirth` exists;
- `dateOfBirth < 2000-01-01`.

Records without `dateOfBirth` must be excluded from the output file.

## Output file requirements

File name:

```text
output.csv
```

The file must include a header row.

Columns must appear in this exact order:

1. `bannerid`
2. `firstName`
3. `lastName`
4. `dateofbirth`
5. `email`
6. `phone`
7. `city`
8. `address`
9. `emergencyContact`

## Output formatting

Formatting requirements:

- `dateofbirth` must use `YYYY-MM-DD` format.
- Missing values must be empty.
- Missing values must not remove, reorder, or shift columns.
- Each selected Banner person/student record should produce one output row.
- The output file must be CSV-compatible for downstream vendor processing.

## Best-record rules

Banner may contain multiple names, email addresses, phone numbers, addresses, and emergency contacts for the same person.

The output must contain only one `firstName`, one `lastName`, one `email`, one `phone`, one `city`, one `address`, and one `emergencyContact` per selected person.

The integration must apply the following best-record rules.

## Name selection

Pick the name in this order:

1. Preferred name.
2. Legal/official name.
3. Any available name as fallback.

Use the selected name record for:

- `firstName`;
- `lastName`.

If no name is available, leave `firstName` and `lastName` blank.

## Email selection

Pick email in this order:

1. Primary email.
2. If multiple primary emails exist, choose the highest-priority email.
3. If no primary email exists, choose the highest-priority available email.
4. If no email is available, leave `email` blank.

When priority is numeric, the lowest priority number should be treated as the highest priority.

## Phone selection

Pick phone in this order:

1. Primary phone.
2. If multiple primary phones exist, choose the highest-priority phone.
3. If no primary phone exists, choose the highest-priority available phone.
4. If no phone is available, leave `phone` blank.

When priority is numeric, the lowest priority number should be treated as the highest priority.

## Address selection

Pick address in this order:

1. Active/current mailing address.
2. Active/current permanent address.
3. Highest-priority active/current address.
4. Any available address as fallback.

Use the selected address record for:

- `city`;
- `address`.

The `address` column should contain the selected street address lines formatted as a single value. If multiple street lines exist, join them with a single space.

If no address is available, leave `city` and `address` blank.

## Emergency contact selection

Pick emergency contact in this order:

1. Primary emergency contact.
2. If multiple primary emergency contacts exist, choose the highest-priority emergency contact.
3. If no primary emergency contact exists, choose the highest-priority available emergency contact.
4. If no emergency contact is available, leave `emergencyContact` blank.

The `emergencyContact` column should be formatted as:

```text
Name - Phone
```

If the emergency contact has a name but no phone, output only the name.

If the emergency contact has a phone but no name, output only the phone.

## S3 delivery

Upload `output.csv` to Amazon S3.

Default delivery location:

- Bucket: `bucket-name`
- Key/path: `student_contacts/output.csv`

The S3 bucket and key/path should be runtime-configurable.

## Runtime parameters

The integration should support the following runtime parameters:

- S3 bucket.
- S3 key/path.
- Date-of-birth cutoff date, defaulting to `2000-01-01`.
- Optional execution mode, such as `validateOnly` or `export`.
- Optional batch identifier for traceability.

## Error handling and logging

The integration should not fail the full run because an optional contact value is missing.

Missing optional values should be written as empty fields in `output.csv`.

The integration should fail or report a run-level error when:

- Banner data cannot be queried;
- output CSV generation fails;
- S3 upload fails;
- required runtime parameters are missing;
- the S3 bucket or key/path is invalid.

The integration should produce enough operational logging to confirm:

- number of Banner records evaluated;
- number of records included in `output.csv`;
- number of records excluded because `dateOfBirth` is missing;
- number of records excluded because `dateOfBirth` is not earlier than the cutoff date;
- S3 bucket and key/path used for delivery;
- final export status.

## Acceptance criteria

The integration is considered complete when:

- it selects only records where `dateOfBirth` exists and is earlier than the configured cutoff date;
- it applies best-record rules for name, email, phone, address, and emergency contact;
- it generates `output.csv` with the exact required columns in the exact required order;
- missing optional values are represented as empty CSV fields;
- `dateofbirth` values are formatted as `YYYY-MM-DD`;
- the file is uploaded to the configured S3 bucket and key/path;
- operational logs clearly show record counts and delivery status;
- the integration does not update Banner data.
