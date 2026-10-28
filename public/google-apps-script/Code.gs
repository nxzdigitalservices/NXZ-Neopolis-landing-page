/**
 * =========================================================================
 * Neopolis Luxury Residences - Google Sheets Form Submissions Web App
 * Target Google Spreadsheet:
 * https://docs.google.com/spreadsheets/d/1X0r6PWQX8gDAHH3VMLRqRURBs35920zeme382UmxJYk/edit?usp=sharing
 * Target Spreadsheet ID: 1X0r6PWQX8gDAHH3VMLRqRURBs35920zeme382UmxJYk
 * =========================================================================
 * 
 * SETUP & DEPLOYMENT INSTRUCTIONS (Quick 2-minute setup):
 * 1. Open the Google Spreadsheet:
 *    https://docs.google.com/spreadsheets/d/1X0r6PWQX8gDAHH3VMLRqRURBs35920zeme382UmxJYk/edit
 * 2. In the top navigation menu, click 'Extensions' > 'Apps Script'.
 * 3. Delete any default code in Code.gs, and paste this entire code.
 * 4. Click the disk icon ('Save project').
 * 5. In the top right, click 'Deploy' > 'New deployment'.
 * 6. Click the gear icon ('Select type') and choose 'Web app'.
 * 7. Configure:
 *    - Description: "Neopolis Website Enquiry Webhook"
 *    - Execute as: "Me (your account)"
 *    - Who has access: "Anyone" (CRITICAL: this allows prospective buyers on your website to submit enquiries without needing Google login)
 * 8. Click 'Deploy' and authorize permissions when prompted.
 * 9. Copy the generated Web App URL (format: https://script.google.com/macros/s/AKfycb.../exec)
 * 10. Paste this URL into the website's Google Sheets Integration panel or set VITE_GOOGLE_APPS_SCRIPT_URL in your environment.
 */

var SPREADSHEET_ID = "1X0r6PWQX8gDAHH3VMLRqRURBs35920zeme382UmxJYk";
var WORKSHEET_NAME = "Website Enquiries";

// 11 Required Columns as specified:
var COLUMN_HEADERS = [
  "Submission Date and Time", // Column A
  "Full Name",                // Column B
  "Mobile Number",            // Column C
  "Email Address",            // Column D
  "Enquiry Type",             // Column E
  "Property or Project Name", // Column F
  "Property Location",        // Column G
  "Message",                  // Column H
  "Page URL",                 // Column I
  "Lead Source",              // Column J
  "Submission Status"         // Column K
];

/**
 * Handles HTTP POST requests from the website contact and property enquiry forms
 */
function doPost(e) {
  try {
    var payload = {};

    // Support both application/json and form-encoded data
    if (e && e.postData && e.postData.contents) {
      try {
        payload = JSON.parse(e.postData.contents);
      } catch (parseErr) {
        payload = e.parameter || {};
      }
    } else if (e && e.parameter) {
      payload = e.parameter;
    }

    // 1. Anti-spam honeypot detection
    if (payload._gotcha || payload.honeypot || payload.hp_field) {
      return createJsonResponse({
        status: "success",
        message: "Enquiry processed successfully."
      });
    }

    // 2. Extract and sanitize input fields
    var fullName = (payload.fullName || payload.name || "").toString().trim();
    var phone = (payload.phone || payload.mobileNumber || payload.mobile || "").toString().trim();
    var email = (payload.email || payload.emailAddress || "").toString().trim();
    var enquiryType = (payload.enquiryType || "Property Enquiry").toString().trim();
    var propertyName = (payload.propertyName || payload.property || "").toString().trim();
    var propertyLocation = (payload.propertyLocation || payload.location || "Neopolis, Kokapet, Hyderabad").toString().trim();
    var message = (payload.message || payload.comments || "").toString().trim();
    var pageUrl = (payload.pageUrl || payload.url || "").toString().trim();
    var leadSource = (payload.leadSource || "Website Direct").toString().trim();

    // 3. Mandatory Field Validations
    if (!fullName) {
      return createJsonResponse({
        status: "error",
        message: "Full Name is required."
      }, 400);
    }

    if (!phone) {
      return createJsonResponse({
        status: "error",
        message: "Mobile Number is required."
      }, 400);
    }

    if (!message) {
      return createJsonResponse({
        status: "error",
        message: "Message is required."
      }, 400);
    }

    // 4. Anti-Formula Injection Sanitizer
    // If a string starts with =, +, -, @, prefix it with a single quote (') so Google Sheets never executes it as a formula
    function sanitizeForSheet(val) {
      if (val === null || val === undefined) return "";
      var str = val.toString().trim();
      if (/^[=+\-@\t\r]/.test(str)) {
        return "'" + str;
      }
      return str;
    }

    // 5. Connect to Google Spreadsheet
    var spreadsheet;
    try {
      spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    } catch (openErr) {
      spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    }

    if (!spreadsheet) {
      throw new Error("Unable to connect to Google Spreadsheet with ID: " + SPREADSHEET_ID);
    }

    // 6. Get or create worksheet 'Website Enquiries'
    var sheet = spreadsheet.getSheetByName(WORKSHEET_NAME);
    if (!sheet) {
      // Create new sheet without deleting any existing data in other sheets
      sheet = spreadsheet.insertSheet(WORKSHEET_NAME);
      sheet.appendRow(COLUMN_HEADERS);
      var headerRange = sheet.getRange(1, 1, 1, COLUMN_HEADERS.length);
      headerRange.setBackground("#1e3a8a"); // Luxury Navy Blue
      headerRange.setFontColor("#ffffff");
      headerRange.setFontWeight("bold");
      sheet.setFrozenRows(1);
    } else {
      // If sheet exists but is empty, add headers
      if (sheet.getLastRow() === 0) {
        sheet.appendRow(COLUMN_HEADERS);
        var headerRange = sheet.getRange(1, 1, 1, COLUMN_HEADERS.length);
        headerRange.setBackground("#1e3a8a");
        headerRange.setFontColor("#ffffff");
        headerRange.setFontWeight("bold");
        sheet.setFrozenRows(1);
      }
    }

    // 7. Format Date and Time in IST (Indian Standard Time)
    var timeZone = spreadsheet.getSpreadsheetTimeZone() || "Asia/Kolkata";
    var formattedDateTime = Utilities.formatDate(new Date(), timeZone, "dd/MM/yyyy, hh:mm:ss a");

    // 8. Construct Row Data Array matching Columns A through K
    var newRow = [
      formattedDateTime,              // A: Submission Date and Time
      sanitizeForSheet(fullName),     // B: Full Name
      sanitizeForSheet(phone),        // C: Mobile Number
      sanitizeForSheet(email),        // D: Email Address
      sanitizeForSheet(enquiryType),  // E: Enquiry Type
      sanitizeForSheet(propertyName), // F: Property or Project Name
      sanitizeForSheet(propertyLocation), // G: Property Location
      sanitizeForSheet(message),      // H: Message
      sanitizeForSheet(pageUrl),      // I: Page URL
      sanitizeForSheet(leadSource),   // J: Lead Source
      "New Lead Received"             // K: Submission Status
    ];

    // 9. Append new row (never overwriting existing data)
    sheet.appendRow(newRow);
    var appendedRowIndex = sheet.getLastRow();

    // Auto-fit column widths if newly created
    if (appendedRowIndex <= 2) {
      for (var col = 1; col <= COLUMN_HEADERS.length; col++) {
        sheet.autoResizeColumn(col);
      }
    }

    // 10. Return Success Response
    return createJsonResponse({
      status: "success",
      message: "Thank you for your enquiry! Our team will contact you shortly.",
      rowNumber: appendedRowIndex,
      timestamp: formattedDateTime,
      spreadsheetId: SPREADSHEET_ID,
      worksheet: WORKSHEET_NAME
    });

  } catch (error) {
    return createJsonResponse({
      status: "error",
      message: "We couldn't submit your enquiry. Please try again.",
      errorDetails: error.toString()
    }, 500);
  }
}

/**
 * Handles HTTP GET requests (useful for verifying endpoint status and testing connectivity)
 */
function doGet(e) {
  try {
    var ss;
    try {
      ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    } catch (e1) {
      ss = SpreadsheetApp.getActiveSpreadsheet();
    }

    var sheet = ss ? ss.getSheetByName(WORKSHEET_NAME) : null;
    var rowCount = sheet ? sheet.getLastRow() : 0;

    return createJsonResponse({
      status: "online",
      service: "Neopolis Google Sheets Web App",
      spreadsheetId: SPREADSHEET_ID,
      worksheet: WORKSHEET_NAME,
      sheetExists: !!sheet,
      totalEntries: Math.max(0, rowCount - 1),
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    return createJsonResponse({
      status: "online",
      service: "Neopolis Google Sheets Web App",
      message: "Web App is active. Spreadsheet connection notice: " + err.message,
      spreadsheetId: SPREADSHEET_ID
    });
  }
}

/**
 * Creates a JSON response with proper MIME type
 */
function createJsonResponse(dataObject, statusCode) {
  var output = ContentService.createTextOutput(JSON.stringify(dataObject));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
