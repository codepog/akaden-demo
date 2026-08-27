# Student Contact Export Pipeline

**Pipeline File:** `student-contact-export.pipeline`
**Template:** v3.1Outbound  
**Status:** Ready for Testing  

---

## Overview

The **Student Contact Export** pipeline is an Akaden-generated outbound extraction service that:

1. **Retrieves and filters** Banner person/student records by age criteria (dateOfBirth < configurable cutoff)
2. **Enriches** each filtered person with contact information using best-record selection rules
3. **Generates** a CSV export file with normalized contact data
4. **Uploads** the CSV to Amazon S3 for the campus outreach platform

---

## Pipeline Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `dateOfBirthCutoff` | string | No | `2000-01-01` | Records with dateOfBirth earlier than this value (YYYY-MM-DD) are included. |
| `s3BucketName` | string | **Yes** | — | Target Amazon S3 bucket name. |
| `s3KeyPath` | string | No | `student_contacts/output.csv` | Full S3 object key/path for the output CSV file. |
| `executionMode` | enum | No | `export` | `validateOnly` (test config) or `export` (full export). |
| `batchIdentifier` | string | No | Auto-generated | Optional batch identifier for traceability. |

---

## Business Logic

### Data Extraction (Phase 1)

1. **GET - persons (Baseline)**  
   Retrieves all person records from Banner with dateOfBirth populated.

2. **JS - Filter and enrich persons by age (Baseline)**  
   - Filters records where dateOfBirth is not null AND dateOfBirth < dateOfBirthCutoff
   - Tracks evaluation counts (evaluated, excluded_missing_dob, excluded_dob_after_cutoff)
   - Preserves filtered persons for enrichment loop

3. **For Each - filtered persons (Baseline)**  
   Iterates over each filtered person record.

4. **Contact API Calls (Inside Loop)**  
   For each person, retrieves:
   - Names → applies best-record rule (preferred > legal > any)
   - Emails → applies best-record rule (primary > lowest priority > any)
   - Phones → applies best-record rule (primary > lowest priority > any)
   - Addresses → applies best-record rule (active mailing > active permanent > highest-priority active > any)
   - Emergency Contacts → applies best-record rule (primary > lowest priority > any)

5. **JS - Apply best-record selection rules (Baseline)**  
   Constructs CSV row object with selected contact values for each person.

6. **Reducer - accumulate CSV rows (Baseline)**  
   Accumulates individual row messages back into a single array.

### Data Processing (Phase 2)

7. **JS - Format data series (Baseline)**  
   - Builds CSV with header row: `bannerid,firstName,lastName,dateofbirth,email,phone,city,address,emergencyContact`
   - Applies RFC 4180 CSV escaping (quotes, field delimiters, newlines)
   - Uses CRLF line terminators
   - Stores final CSV content in context for S3 upload

8. **JS - Create data for file (Baseline)**  
   Places CSV content at root of message.payload for S3 writer.

### Output (Phase 3)

9. **Sub-pipeline - Send Report file (Baseline)**  
   Handles S3 upload based on execution mode:
   - `validateOnly`: Skips S3 upload, logs validation summary
   - `export`: Uploads CSV to configured S3 bucket and key/path

---

## Output CSV Format

### Example CSV

```csv
bannerid,firstName,lastName,dateofbirth,email,phone,city,address,emergencyContact
BAN001,John,Smith,1985-06-15,john.smith@campus.edu,555-123-4567,Boston,123 Main Street Apt 4B,Jane Smith - 555-987-6543
BAN002,Mary,Johnson,1990-03-22,mary.j@email.com,,Portland,456 Oak Avenue Apt 201,
BAN003,Robert,Williams,1978-11-08,,555-234-5678,Seattle,789 Pine Road,Robert Williams
```

### Format Rules

- **Header Row:** One row with column names
- **Data Rows:** One row per selected person
- **Columns (exact order):** bannerid, firstName, lastName, dateofbirth, email, phone, city, address, emergencyContact
- **Date Format:** `YYYY-MM-DD`
- **Empty Fields:** Represented as empty (no placeholder text, no null)
- **CSV Escaping:** RFC 4180 compliant (comma, quote, newline handling)
- **Line Terminator:** CRLF (`\r\n`)

---

## Operational Logs

The pipeline generates execution logs with:

- **Evaluation Counts:**
  - Total person records evaluated
  - Records excluded (missing DOB)
  - Records excluded (DOB >= cutoff)
  - Records included in output

- **S3 Details (export mode):**
  - Bucket name
  - Object key/path
  - Upload status
  - Timestamp

- **Execution Metadata:**
  - Batch identifier
  - Execution mode (validateOnly/export)
  - Start/end timestamps
  - Final status (success/failure)

---

## Key Design Notes

### Best-Record Selection Rules

The pipeline applies deterministic selection logic for each contact field:

- **Names:** Preferred → Legal → Any Available → Empty
- **Emails:** Primary (single) → Primary (lowest priority) → Any (lowest priority) → Empty
- **Phones:** Primary (single) → Primary (lowest priority) → Any (lowest priority) → Empty
- **Addresses:** Active Mailing → Active Permanent → Highest-Priority Active → Any → Empty
  - *Street lines joined with single space*
- **Emergency Contacts:** Primary (single) → Primary (lowest priority) → Any (lowest priority) → Empty
  - *Formatted as "Name - Phone" or "Name" or "Phone" or Empty*

### Loop Architecture

- **Outer Loop:** Iterates over filtered person records
- **Enrichment Calls:** Five sequential Ethos API calls per person (names, emails, phones, addresses, emergency contacts)
- **Best-Record Logic:** Applied in JavaScript transform after all APIs return
- **Reduction:** Accumulates individual rows back into array before CSV assembly

### S3 Integration

- Uses v3.1Outbound template's built-in S3 sub-pipelines
- S3 credentials and connection validation handled by template
- Execution mode controls whether upload occurs
- CSV content prepared before writer for proper format

### Error Handling

- Ethos API errors logged but do not block iteration (ignoreErrors: true)
- Missing optional contact fields result in empty CSV fields (not null or placeholder)
- Required parameters validated before execution
- S3 upload failures logged with detail
- Banner API failures cause pipeline exit with error

---

## Validation Checklist

- [x] Pipeline created with v3.1Outbound template
- [x] All required parameters defined
- [x] Age filtering logic implemented with tracking
- [x] Best-record selection rules for all contact fields
- [x] CSV assembly with proper RFC 4180 formatting
- [x] S3 upload integration via template sub-pipeline
- [x] Execution mode (validateOnly/export) branching
- [x] Operational logging for audit trail
- [x] Pipeline structure validated (no errors, 5 warnings on API endpoint names)

**Note:** The 5 validation warnings are expected because some Ethos API endpoints (names, emails, phones) are not yet cataloged in the baseline. These may be SPEC APIs that need to be created during implementation, or the actual endpoint names may differ. During implementation, verify exact API names and versions from the Banner Ethos API catalog and update the resource definitions accordingly.

---

## Next Steps

1. **API Endpoint Verification**
   - Confirm actual Ethos API names for person contacts (names, emails, phones, addresses, emergency-contacts)
   - Verify API versions match the Banner environment
   - Update resource definitions if endpoint names differ

2. **Test Data Preparation**
   - Create test Banner records with various combinations of contact data
   - Verify best-record selection logic with known inputs
   - Validate CSV output format and encoding

3. **S3 Connection Setup**
   - Configure S3 bucket access
   - Test pipeline with validateOnly mode first
   - Verify S3 upload with export mode

4. **Full Test Suite Execution**
   - Run all 34 test cases from specification (TC-001 through TC-034)
   - Verify record counts and filtering logic
   - Validate CSV content and S3 placement
   - Test parameter variations (dateOfBirthCutoff, batchIdentifier)

5. **Performance Baseline**
   - Measure extraction time for various record counts
   - Validate S3 upload performance
   - Document baseline metrics for monitoring

---

## Troubleshooting

### API Endpoint Not Found

**Symptom:** Validation warnings about names, emails, phones endpoints not in Ethos catalog  
**Resolution:** These may be SPEC APIs. Verify the correct endpoint names in your Banner Ethos API documentation and update resource configurations.

### Empty CSV Output

**Symptom:** CSV generated with header row only, no data rows  
**Resolution:**
1. Check that filtered persons array contains records (evaluatedPersonCount > 0)
2. Verify API calls are returning contact data
3. Check dateOfBirthCutoff parameter value—may be filtering all records

### S3 Upload Fails

**Symptom:** executionMode=export but CSV not appearing in S3  
**Resolution:**
1. Verify S3 bucket name and key/path parameters
2. Confirm S3 credentials are valid
3. Check that S3 bucket allows write access
4. Review S3 sub-pipeline logs for specific error

### Wrong Contact Values Selected

**Symptom:** CSV contains non-preferred names, secondary phones, etc.  
**Resolution:**
1. Verify Banner contact data has correct type/priority values
2. Check that API responses include isPrimary and priority fields
3. Review best-record selection logic in JS - Apply best-record selection rules segment
4. Test with known sample data to validate assumptions

---

**Pipeline File Location:** `/pipelines/student-contact-export.pipeline`
**Specification:** `/specifications/student-contact-export-spec.md`
**Last Updated:** 2026-08-25
