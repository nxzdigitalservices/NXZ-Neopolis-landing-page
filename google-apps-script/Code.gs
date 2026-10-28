/**
 * =========================================================================
 * Neopolis Luxury Residences - Google Apps Script
 * Target: Google Spreadsheet
 *
 * Exact 7-Column Order:
 * [Date, Full Name, Mobile Number, Email Address, Enquiry Type, Preferred Project in Neopolis, Message]
 * =========================================================================
 */

/**
 * Handles HTTP POST requests.
 * Explicitly parses JSON payload from e.postData.contents,
 * validates and logs missing keys, applies empty string fallbacks,
 * and appends row in the exact specified order.
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000); // Wait up to 10 seconds to prevent race conditions

  try {
    // 1. Explicitly parse the JSON payload using JSON.parse(e.postData.contents)
    if (!e || !e.postData || !e.postData.contents) {
      Logger.log("Warning: No postData.contents found in the request.");
      throw new Error("Missing request payload in e.postData.contents");
    }

    var payload = {};
    try {
      payload = JSON.parse(e.postData.contents);
    } catch (parseError) {
      Logger.log("JSON Parse Error: " + parseError.toString());
      throw new Error("Invalid JSON in postData.contents: " + parseError.message);
    }

    // 2. Identify and log any missing expected keys
    var expectedKeys = [
      "Date",
      "Full Name",
      "Mobile Number",
      "Email Address",
      "Enquiry Type",
      "Preferred Project in Neopolis",
      "Message"
    ];

    var missingKeys = [];
    expectedKeys.forEach(function(key) {
      var val = payload[key];
      if (val === undefined || val === null || val === "") {
        missingKeys.push(key);
      }
    });

    if (missingKeys.length > 0) {
      Logger.log("Notice: Missing or undefined expected keys in payload: " + missingKeys.join(", "));
    }

    // 3. Extract each field with explicit fallback to "" (empty string) to prevent column alignment issues
    // Date
    var dateVal = payload["Date"] !== undefined && payload["Date"] !== null ? String(payload["Date"]).trim() : "";
    if (!dateVal) {
      dateVal = payload["date"] !== undefined && payload["date"] !== null ? String(payload["date"]).trim() : "";
    }
    if (!dateVal) {
      dateVal = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    }

    // Full Name
    var fullNameVal = payload["Full Name"] !== undefined && payload["Full Name"] !== null ? String(payload["Full Name"]).trim() : "";
    if (!fullNameVal) {
      fullNameVal = payload["fullName"] !== undefined && payload["fullName"] !== null ? String(payload["fullName"]).trim() : (payload["name"] !== undefined && payload["name"] !== null ? String(payload["name"]).trim() : "");
    }

    // Mobile Number (formats as text with single quote to preserve leading zeros and formatting)
    var rawMobile = payload["Mobile Number"] !== undefined && payload["Mobile Number"] !== null ? String(payload["Mobile Number"]).trim() : "";
    if (!rawMobile) {
      rawMobile = payload["mobileNumber"] !== undefined && payload["mobileNumber"] !== null ? String(payload["mobileNumber"]).trim() : (payload["phone"] !== undefined && payload["phone"] !== null ? String(payload["phone"]).trim() : (payload["mobile"] !== undefined && payload["mobile"] !== null ? String(payload["mobile"]).trim() : ""));
    }
    var mobileVal = rawMobile ? "'" + rawMobile : "";

    // Email Address
    var emailVal = payload["Email Address"] !== undefined && payload["Email Address"] !== null ? String(payload["Email Address"]).trim() : "";
    if (!emailVal) {
      emailVal = payload["emailAddress"] !== undefined && payload["emailAddress"] !== null ? String(payload["emailAddress"]).trim() : (payload["email"] !== undefined && payload["email"] !== null ? String(payload["email"]).trim() : "");
    }

    // Enquiry Type
    var enquiryTypeVal = payload["Enquiry Type"] !== undefined && payload["Enquiry Type"] !== null ? String(payload["Enquiry Type"]).trim() : "";
    if (!enquiryTypeVal) {
      enquiryTypeVal = payload["enquiryType"] !== undefined && payload["enquiryType"] !== null ? String(payload["enquiryType"]).trim() : "";
    }

    // Preferred Project in Neopolis (with fallback for Preferred Project in Neopoli / preferredProject / propertyName)
    var projectVal = payload["Preferred Project in Neopolis"] !== undefined && payload["Preferred Project in Neopolis"] !== null ? String(payload["Preferred Project in Neopolis"]).trim() : "";
    if (!projectVal) {
      projectVal = payload["Preferred Project in Neopoli"] !== undefined && payload["Preferred Project in Neopoli"] !== null ? String(payload["Preferred Project in Neopoli"]).trim() : (payload["preferredProject"] !== undefined && payload["preferredProject"] !== null ? String(payload["preferredProject"]).trim() : (payload["propertyName"] !== undefined && payload["propertyName"] !== null ? String(payload["propertyName"]).trim() : ""));
    }

    // Message
    var messageVal = payload["Message"] !== undefined && payload["Message"] !== null ? String(payload["Message"]).trim() : "";
    if (!messageVal) {
      messageVal = payload["message"] !== undefined && payload["message"] !== null ? String(payload["message"]).trim() : "";
    }

    // 4. Map fields in the exact specified order:
    // [Date, Full Name, Mobile Number, Email Address, Enquiry Type, Preferred Project in Neopolis, Message]
    var rowData = [
      dateVal,
      fullNameVal,
      mobileVal,
      emailVal,
      enquiryTypeVal,
      projectVal,
      messageVal
    ];

    // 5. Connect to Google Sheet and append row
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.appendRow(rowData);

    Logger.log("Successfully recorded row in Google Sheets: " + JSON.stringify(rowData));

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Row appended successfully",
      loggedMissingKeys: missingKeys,
      appendedRow: rowData
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log("Error in doPost: " + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

/**
 * Handles HTTP GET requests (for connectivity verification)
 */
function doGet(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var values = sheet.getDataRange().getValues();
    return ContentService.createTextOutput(JSON.stringify({
      status: "online",
      rowCount: values.length,
      data: values
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "online",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
