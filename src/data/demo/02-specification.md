# Student Contact Export Specification

## Pipeline Name and Description

**Pipeline Name:** Student Contact Export

**Pipeline Type:** Outbound

**Description:** Outbound extraction pipeline that prepares a clean student contact file and uploads it to Amazon S3 for the campus outreach platform.

**Business Purpose:** Give the campus communications team a clean, reliable contact list with preferred names and primary contact information.

**Data Source:** Ellucian Banner SaaS via supported Ethos APIs (not direct database access).

**Output Destination:** Amazon S3 in CSV format.

---

## Pipeline Input Parameters

| Parameter Name | Type | Required | Default Value | Description | Validation Rules |
|---|---|---|---|---|---|
| `dateOfBirthCutoff` | date | No | `2000-01-01` | Records with dateOfBirth earlier than this value are included. | Must be a valid date in YYYY-MM-DD format. |
| `s3Bucket` | string | Yes | (none) | Target Amazon S3 bucket name. | Non-empty string; must be a valid AWS S3 bucket name accessible by the pipeline runtime. |
| `s3KeyPath` | string | No | `student_contacts/output.csv` | Full S3 object key/path where output.csv will be stored. | Non-empty string ending with `output.csv`; can include directory prefix. |
| `executionMode` | string | No | `export` | Execution mode: `validateOnly` (test configuration without exporting) or `export` (perform full export). | Must be `validateOnly` or `export`. |
| `batchIdentifier` | string | No | (auto-generated) | Optional batch identifier for traceability and logging. | Any string; auto-generated as timestamp or UUID if not supplied. |

---

## Pipeline Data Sources

### Banner Person Records via Ethos API

The pipeline retrieves person records from Ellucian Banner through the Ethos API catalog. The following Banner contact data must be retrieved:

- Person ID (Banner ID)
- Date of birth
- Person names (preferred name, legal/official name, and any other available names)
- Email addresses (with primary indicator and priority sequence)
- Phone numbers (with primary indicator and priority sequence)
- Addresses (with address type, active/current status, and priority sequence)
- Emergency contacts (with primary indicator, phone number, and priority sequence)

**Note:** The specific Ethos API endpoints for persons, contact information, and emergency contacts must be verified during implementation. The specification assumes coverage of Banner person/student records, names, emails, phones, addresses, and emergency contacts through baseline Ethos APIs or required SPEC APIs (marked as `x-xxx-PersonContacts`, `x-xxx-PersonEmergencyContacts`, etc., if baseline coverage does not exist).

---

## Processing Logic with API Field Mapping

### Step 1: Retrieve Person Records

Call the Ethos API endpoint for persons to retrieve all person records with:
- Banner ID
- Date of birth

**Filter Applied:** At retrieval or post-retrieval JavaScript logic, filter to include only records where:
- `dateOfBirth` is not null/missing
- `dateOfBirth < dateOfBirthCutoff` parameter value

**Output:** Filtered set of person records that meet age criteria.

### Step 2: Retrieve Person Names for Each Person

For each person record passing the filter, retrieve associated name records from the Banner names API (or equivalent SPEC API).

**Name Selection Logic (applied as JavaScript filtering):**

For each person, apply the following sequence to select one best name:

1. **Check for Preferred Name:** Look for a name record where `nameType == "preferred"` or similar indicator. If found, use the `firstName` and `lastName` fields from this record.
2. **Check for Legal/Official Name:** If no preferred name exists, look for a name record where `nameType == "legal"` or `nameType == "official"`. If found, use `firstName` and `lastName`.
3. **Fallback to Any Available Name:** If neither preferred nor legal name exists, use the first available name record's `firstName` and `lastName`.
4. **No Name Case:** If no name records are returned, set both `firstName` and `lastName` to empty string.

**Output:** Selected `firstName` and `lastName` for each person.

### Step 3: Retrieve Email Addresses for Each Person

For each person record passing the filter, retrieve associated email address records from the Banner email API (or equivalent SPEC API).

**Email Selection Logic (applied as JavaScript filtering):**

For each person, apply the following sequence to select one best email:

1. **Check for Primary Email:** Look for an email record where `isPrimary == true`. 
   - If exactly one primary email exists, use it.
   - If multiple primary emails exist, select the one with the lowest `priority` numeric value (treating lowest number as highest priority).
2. **No Primary Email Case:** If no primary email exists, select the email record with the lowest `priority` numeric value among all available emails.
3. **No Email Case:** If no email records are returned, set `email` to empty string.

**Output:** Selected email address for each person, or empty string if none qualify.

### Step 4: Retrieve Phone Numbers for Each Person

For each person record passing the filter, retrieve associated phone number records from the Banner phone API (or equivalent SPEC API).

**Phone Selection Logic (applied as JavaScript filtering):**

For each person, apply the following sequence to select one best phone number:

1. **Check for Primary Phone:** Look for a phone record where `isPrimary == true`.
   - If exactly one primary phone exists, use it.
   - If multiple primary phones exist, select the one with the lowest `priority` numeric value (treating lowest number as highest priority).
2. **No Primary Phone Case:** If no primary phone exists, select the phone record with the lowest `priority` numeric value among all available phone numbers.
3. **No Phone Case:** If no phone records are returned, set `phone` to empty string.

**Output:** Selected phone number for each person, or empty string if none qualify.

### Step 5: Retrieve Addresses for Each Person

For each person record passing the filter, retrieve associated address records from the Banner address API (or equivalent SPEC API), including:
- Street address lines (may include line1, line2, line3, etc.)
- City
- Address type (e.g., "mailing", "permanent")
- Active/current status
- Priority sequence

**Address Selection Logic (applied as JavaScript filtering):**

For each person, apply the following sequence to select one best address:

1. **Check for Active/Current Mailing Address:** Look for an address record where `addressType == "mailing"` (or similar) AND `isActive == true` (or `isCurrent == true`). If found, use this record's `city` and street address lines.
2. **Check for Active/Current Permanent Address:** If no active mailing address exists, look for an address record where `addressType == "permanent"` (or similar) AND `isActive == true`. If found, use this record's `city` and street address lines.
3. **Check for Highest-Priority Active/Current Address:** If neither mailing nor permanent active address exists, select the address record with the lowest `priority` numeric value among all active/current addresses.
4. **Fallback to Any Available Address:** If no active addresses exist, select the first available address record and use its `city` and street address lines.
5. **No Address Case:** If no address records are returned, set both `city` and `address` to empty string.

**Address Formatting:** Join all available street address lines (if multiple exist) with a single space. Place the result in the `address` column.

**Output:** Selected `city` and `address` (formatted street lines joined by space) for each person, or empty strings if none qualify.

### Step 6: Retrieve Emergency Contacts for Each Person

For each person record passing the filter, retrieve associated emergency contact records from the Banner emergency contacts API (or equivalent SPEC API), including:
- Emergency contact name
- Emergency contact phone number
- Primary indicator
- Priority sequence

**Emergency Contact Selection Logic (applied as JavaScript filtering):**

For each person, apply the following sequence to select one best emergency contact:

1. **Check for Primary Emergency Contact:** Look for an emergency contact record where `isPrimary == true`.
   - If exactly one primary emergency contact exists, use it.
   - If multiple primary emergency contacts exist, select the one with the lowest `priority` numeric value (treating lowest number as highest priority).
2. **No Primary Emergency Contact Case:** If no primary emergency contact exists, select the emergency contact record with the lowest `priority` numeric value among all available emergency contacts.
3. **No Emergency Contact Case:** If no emergency contact records are returned, set `emergencyContact` to empty string.

**Emergency Contact Formatting:** Format the selected emergency contact value as follows:
- If both name and phone exist: `"Name - Phone"`
- If only name exists: `"Name"`
- If only phone exists: `"Phone"`
- If neither exists: empty string

**Output:** Formatted emergency contact string for each person, or empty string if none qualify.

### Step 7: Build Output CSV File

For each person record passing all filters and selection logic, construct one CSV output row with columns in the following exact order:

| Column Name | Source/Calculation | Format | Required |
|---|---|---|---|
| `bannerid` | Person ID from Step 1 | String (Banner ID value) | Yes (person record required) |
| `firstName` | Selected from Step 2 | String | No (empty if no name) |
| `lastName` | Selected from Step 2 | String | No (empty if no name) |
| `dateofbirth` | Date of birth from Step 1 | `YYYY-MM-DD` format | Yes (applied as filter) |
| `email` | Selected from Step 3 | String (email address) | No (empty if no email) |
| `phone` | Selected from Step 4 | String (phone number) | No (empty if no phone) |
| `city` | Selected from Step 5 | String | No (empty if no address) |
| `address` | Selected from Step 5 (street lines joined) | String (lines joined by single space) | No (empty if no address) |
| `emergencyContact` | Selected and formatted from Step 6 | String (`Name - Phone` or `Name` or `Phone`) | No (empty if none) |

**CSV Format Requirements:**
- Include one header row with column names as listed above.
- Use comma (`,`) as field separator.
- Quote fields containing commas, quotes, or newlines as per RFC 4180.
- Use CRLF (`\r\n`) as line terminator.
- Missing/empty values must be represented as empty fields (no placeholder text).
- One row per selected person record; no duplicate rows.

**Logging During Build:** Track and log:
- Total number of person records evaluated from initial retrieval.
- Number of records included in output (i.e., passed age filter and have at least bannerid and dateofbirth).
- Number of records excluded because `dateOfBirth` is missing.
- Number of records excluded because `dateOfBirth >= dateOfBirthCutoff`.

### Step 8: Upload to Amazon S3

Upload the generated `output.csv` file to the S3 bucket and key/path specified in the pipeline parameters:
- **S3 Bucket:** Use the `s3Bucket` parameter.
- **S3 Key/Path:** Use the `s3KeyPath` parameter (default: `student_contacts/output.csv`).

**Upload Validation:**
- Verify the S3 bucket exists and is accessible.
- Verify the S3 key/path is a valid object key (typically includes directory prefix and filename).
- Confirm successful upload with AWS S3 API response.

**Logging:** Log S3 bucket name, S3 key/path, upload timestamp, and final upload status.

---

## Pipeline Control Flow

The pipeline executes in the following sequence:

1. **Validate Parameters:** Verify that all required parameters (`s3Bucket`) are supplied and in valid format. Verify that optional parameters (if supplied) conform to their validation rules. If validation fails, log error and stop execution.

2. **Retrieve Person Records:** Call the Banner persons Ethos API to retrieve all person records (or all persons with dateOfBirth populated). Apply JavaScript filter to include only records where `dateOfBirth` is not null AND `dateOfBirth < dateOfBirthCutoff`. Track the count of all records evaluated and the count of records excluded by each filter condition.

3. **For Each Filtered Person Record:**
   - **Retrieve and Select Name:** Call names API, apply name selection logic (preferred > legal > any), output selected firstName and lastName (or empty if no name).
   - **Retrieve and Select Email:** Call email API, apply email selection logic, output selected email (or empty if none).
   - **Retrieve and Select Phone:** Call phone API, apply phone selection logic, output selected phone (or empty if none).
   - **Retrieve and Select Address:** Call address API, apply address selection logic, format street lines with space separator, output city and address (or empty if none).
   - **Retrieve and Select Emergency Contact:** Call emergency contacts API, apply selection logic, format as name-phone pair or name-only or phone-only, output formatted value (or empty if none).

4. **Build CSV Output File:** Assemble all selected person records into CSV format with header row, exact column order, date formatting as YYYY-MM-DD, and empty fields for missing values. Track count of rows written.

5. **Conditional Execution Based on Mode:**
   - **If `executionMode == "validateOnly"`:** Write CSV to local temp storage or skip S3 upload. Log validation summary (record counts, sample CSV) and exit successfully.
   - **If `executionMode == "export"` (default):** Proceed to S3 upload.

6. **Upload to S3:** Upload `output.csv` to the S3 bucket and key/path specified. Verify bucket accessibility and key/path validity. Log S3 upload status.

7. **Write Final Log Summary:** Log total evaluation count, total included count, breakdown of exclusions by reason, S3 bucket and key/path used, batch identifier (if supplied), execution timestamp, and final execution status (success or failure).

8. **Exit:** If all steps succeed, exit with success status. If any critical step fails (Banner API error, S3 error, parameter validation error), exit with failure status and logged error details.

---

## Examples of Output Files and Format

### Sample Output CSV

```csv
bannerid,firstName,lastName,dateofbirth,email,phone,city,address,emergencyContact
BAN001,John,Smith,1985-06-15,john.smith@campus.edu,555-123-4567,Boston,123 Main Street Apt 4B,Jane Smith - 555-987-6543
BAN002,Mary,Johnson,1990-03-22,mary.j@email.com,,Portland,456 Oak Avenue Apt 201,
BAN003,Robert,Williams,1978-11-08,,555-234-5678,Seattle,789 Pine Road,Robert Williams
BAN004,Sarah,Brown,1995-01-14,sarah.brown@example.com,555-345-6789,Denver,321 Elm Street,Margaret Chen - 555-456-7890
BAN005,Michael,Davis,1982-09-30,michael@contact.org,,Chicago,,
```

### CSV Format Details

- **Header Row:** Column names separated by commas: `bannerid,firstName,lastName,dateofbirth,email,phone,city,address,emergencyContact`
- **Data Rows:** One row per person record, with values separated by commas.
- **Date Format:** `YYYY-MM-DD` (example: `1985-06-15`)
- **Empty Fields:** Represented as empty (consecutive commas with no text between them). Missing optional fields do not shift or remove columns.
- **Field Quoting:** Fields containing commas, quotes, or newlines are enclosed in double quotes and internal quotes are escaped.
- **Line Terminator:** CRLF (`\r\n`) line endings.

### Example Log Output

```
[INFO] Execution started at 2026-08-25T23:30:00Z. Batch ID: batch-20260825-export-001
[INFO] Parameters: s3Bucket=student-contact-bucket, s3KeyPath=student_contacts/output.csv, dateOfBirthCutoff=2000-01-01, executionMode=export
[INFO] Person records evaluated: 2,543
[INFO] Records excluded (dateOfBirth missing): 87
[INFO] Records excluded (dateOfBirth >= cutoff): 1,256
[INFO] Records passed filter and eligible for output: 1,200
[INFO] CSV file generated with 1,200 data rows (plus 1 header row).
[INFO] CSV file uploaded to S3. Bucket: student-contact-bucket. Key: student_contacts/output.csv. Size: 285 KB.
[INFO] Upload status: SUCCESS.
[INFO] Execution completed successfully at 2026-08-25T23:35:42Z.
```

---

## Internal Test Cases

The following test cases cover material branches in the filtering, selection, and output logic:

| Test Case ID | Setup | Action | Expected Result |
|---|---|---|---|
| TC-001 | Person with complete contact data (name, email, phone, address, emergency contact). dateOfBirth = 1985-06-15. | Process person record. | CSV row contains bannerid, firstName=John, lastName=Smith, dateofbirth=1985-06-15, email=john@example.com, phone=555-1234, city=Boston, address=123 Main St, emergencyContact=Jane Smith - 555-9999. |
| TC-002 | Person with dateOfBirth = 2010-06-15 (after cutoff default 2000-01-01). | Attempt to process. | Person excluded from output. Log: "Records excluded (dateOfBirth >= cutoff): 1". |
| TC-003 | Person with dateOfBirth = NULL. | Attempt to process. | Person excluded from output. Log: "Records excluded (dateOfBirth missing): 1". |
| TC-004 | Person with no names in name API response. | Process person record. | CSV row contains firstName=empty, lastName=empty. |
| TC-005 | Person with preferred name available. Also has legal and another name. | Process names. | firstName and lastName selected from preferred name record (legal and other names ignored). |
| TC-006 | Person with no preferred name. Legal name available. | Process names. | firstName and lastName selected from legal name record. |
| TC-007 | Person with no preferred or legal name. Two other names exist. | Process names. | firstName and lastName selected from first available name record. |
| TC-008 | Person with one primary email (isPrimary=true). Two non-primary emails exist. | Process emails. | email set to primary email address. |
| TC-009 | Person with two primary emails (both isPrimary=true). priority values: 1 and 3. | Process emails. | email set to the email record with priority=1 (lowest numeric priority = highest priority). |
| TC-010 | Person with no primary emails. Three available emails with priority: 5, 2, 8. | Process emails. | email set to email with priority=2 (lowest numeric value). |
| TC-011 | Person with no email records. | Process emails. | email set to empty string. |
| TC-012 | Person with one primary phone. Two non-primary phones exist. | Process phones. | phone set to primary phone number. |
| TC-013 | Person with two primary phones (isPrimary=true). priority values: 2 and 4. | Process phones. | phone set to phone record with priority=2 (lowest numeric priority). |
| TC-014 | Person with no primary phones. Two available phones with priority: 1 and 3. | Process phones. | phone set to phone with priority=1. |
| TC-015 | Person with no phone records. | Process phones. | phone set to empty string. |
| TC-016 | Person with active mailing address (addressType=mailing, isActive=true). Also has active permanent and inactive addresses. | Process addresses. | city and address selected from mailing address record. |
| TC-017 | Person with no active mailing address. Active permanent address exists (addressType=permanent, isActive=true). | Process addresses. | city and address selected from permanent address record. |
| TC-018 | Person with no active mailing or permanent address. Three active addresses with priority: 10, 5, 15. All non-specific types. | Process addresses. | city and address selected from address with priority=5. |
| TC-019 | Person with no active addresses. One inactive address exists. | Process addresses. | city and address selected from available (inactive) address. |
| TC-020 | Person address record has multiple street lines: line1="123 Main St", line2="Apt 4B", line3="Suite 100". | Process addresses. | address set to "123 Main St Apt 4B Suite 100" (lines joined by single space). |
| TC-021 | Person with no address records. | Process addresses. | city and address both set to empty string. |
| TC-022 | Person with one primary emergency contact (isPrimary=true). Contact has name="Jane Smith" and phone="555-9999". | Process emergency contacts. | emergencyContact set to "Jane Smith - 555-9999". |
| TC-023 | Person with primary emergency contact having name="John Doe" but no phone number. | Process emergency contacts. | emergencyContact set to "John Doe". |
| TC-024 | Person with primary emergency contact having phone="555-5555" but no name. | Process emergency contacts. | emergencyContact set to "555-5555". |
| TC-025 | Person with no primary emergency contact. Two non-primary contacts with priority: 3 and 1. Priority=1 contact: name="Alice", phone="555-1111". | Process emergency contacts. | emergencyContact set to "Alice - 555-1111" (contact with priority=1 selected). |
| TC-026 | Person with no emergency contact records. | Process emergency contacts. | emergencyContact set to empty string. |
| TC-027 | CSV file generation with 500 eligible person records. | Generate output file. | CSV contains 1 header row + 500 data rows. All rows have correct column order and format. dateofbirth values formatted as YYYY-MM-DD. Empty fields represented correctly. |
| TC-028 | S3 upload with valid bucket and key/path parameters. | Execute upload to S3. | File uploaded successfully. Log shows S3 bucket name, key, upload timestamp, and success status. |
| TC-029 | S3 upload with invalid bucket name. | Execute upload to S3. | Upload fails. Logged error: "S3 bucket not accessible" or similar. Pipeline exits with failure status. |
| TC-030 | executionMode=validateOnly, valid parameters. | Execute pipeline. | CSV file generated to local temp. S3 upload skipped. Validation summary logged. Exit status: success. |
| TC-031 | executionMode=export (default), all data and parameters valid. | Execute pipeline. | CSV generated and uploaded to S3. Log shows record counts, S3 bucket/key, and success. |
| TC-032 | Banner persons API call fails (API error, timeout, or authentication failure). | Execute pipeline step 1. | Logged error: "Banner API error" or similar. Pipeline exits with failure status. Records processed: 0. |
| TC-033 | Custom dateOfBirthCutoff parameter supplied: 1990-01-01. | Execute with parameter. | Only records with dateOfBirth < 1990-01-01 are included. Other records logged as "excluded (dateOfBirth >= cutoff)". |
| TC-034 | batchIdentifier parameter supplied: "manual-batch-123". | Execute pipeline. | Log entries include "Batch ID: manual-batch-123" for traceability. |

---

## Implementation Notes and Assumptions

1. **Banner Ethos API Verification:** This specification assumes that Ellucian Banner Ethos APIs provide baseline coverage for persons, names, emails, phones, addresses, and emergency contacts. If baseline Ethos APIs do not cover all required fields, implement SPEC APIs as needed (e.g., `x-xxx-PersonContacts`, `x-xxx-PersonEmergencyContacts`). The exact API endpoint names and response schemas must be verified during implementation.

2. **Priority Numeric Values:** The specification assumes that when priority is numeric, lower values represent higher priority (e.g., priority=1 is higher than priority=5). If Banner API returns priority in reverse order (higher number = higher priority), the selection logic must be inverted.

3. **Boolean Indicators:** The specification uses assumed field names and values for indicators (e.g., `isPrimary`, `isActive`, `isCurrent`). Actual field names and boolean representations must be confirmed from the Banner Ethos API schema during implementation.

4. **Address Type Values:** Address types such as "mailing", "permanent" are examples. Actual address type codes or values in Banner must be identified during implementation and the selection logic updated accordingly.

5. **No Direct Banner Database Access:** This pipeline must not access Banner database tables directly. All Banner data access must flow through supported Ethos APIs.

6. **CSV Output File Name:** The output file is always named `output.csv`. The directory/bucket path is configurable via `s3KeyPath`.

7. **Empty Field Handling:** Missing optional contact values (name, email, phone, address, emergency contact) are represented as empty CSV fields, not null, not "N/A", not "MISSING". This ensures CSV parsers handle missing data correctly.

8. **Execution Mode Behavior:** The `validateOnly` mode is intended for testing parameter configuration, API connectivity, and CSV schema without committing data to S3. In `validateOnly` mode, the CSV file can be written to local temp storage or skipped entirely; the log should indicate no S3 upload occurred.

9. **Error Resilience:** The pipeline does not fail the entire run due to missing optional contact fields for a single person. However, it does fail if Banner API queries cannot complete, CSV generation fails, S3 upload fails, required parameters are missing or invalid, or the S3 bucket/path is not accessible.

10. **Logging and Traceability:** All execution must be logged with sufficient detail to troubleshoot, verify data quality, and trace batch identifiers. Logs must include start/end timestamp, all parameters used, record counts by category, S3 details, and final status.

---

## Acceptance Criteria Checklist

- [ ] Pipeline selects only records where `dateOfBirth` exists AND `dateOfBirth < dateOfBirthCutoff` (default 2000-01-01).
- [ ] Best-record rules applied correctly for name, email, phone, address, and emergency contact (see selection logic in Processing Logic section).
- [ ] Output CSV includes exact columns in exact order: `bannerid`, `firstName`, `lastName`, `dateofbirth`, `email`, `phone`, `city`, `address`, `emergencyContact`.
- [ ] CSV header row present. Data rows follow with one row per selected person.
- [ ] Missing optional values represented as empty CSV fields (no placeholder text or null).
- [ ] `dateofbirth` formatted as `YYYY-MM-DD`.
- [ ] Street address lines joined with single space.
- [ ] Emergency contact formatted as "Name - Phone" or "Name" or "Phone" or empty.
- [ ] File uploaded to configured S3 bucket and key/path.
- [ ] Operational logs show record counts (evaluated, included, excluded-by-reason), S3 details, batch identifier, and final status.
- [ ] Pipeline does not update Banner data.
- [ ] All Banner data access through Ethos APIs (not direct database).
- [ ] Required parameters validated before execution. Invalid parameters cause exit with error log.
- [ ] Optional parameters used if supplied; defaults applied if not supplied.
- [ ] Parameter: `dateOfBirthCutoff` (date, optional, default 2000-01-01).
- [ ] Parameter: `s3Bucket` (string, required).
- [ ] Parameter: `s3KeyPath` (string, optional, default `student_contacts/output.csv`).
- [ ] Parameter: `executionMode` (string, optional, default `export`; valid values: `validateOnly` or `export`).
- [ ] Parameter: `batchIdentifier` (string, optional, auto-generated if not supplied).
- [ ] All test cases pass (TC-001 through TC-034).
