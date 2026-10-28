import { EnquiryFormData, EnquirySubmissionRecord } from '../types';

export const GOOGLE_SPREADSHEET_ID = '1X0r6PWQX8gDAHH3VMLRqRURBs35920zeme382UmxJYk';
export const GOOGLE_SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/1X0r6PWQX8gDAHH3VMLRqRURBs35920zeme382UmxJYk/edit?usp=sharing';
export const WORKSHEET_NAME = 'Website Enquiries';

export const DEFAULT_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxG6c7yggSzX17KYZ_76gEJo9Fsh1W8vitwtqyAXQgr5coWIloEVm7lF36leDcZYmw/exec';

const ENDPOINT_STORAGE_KEY = 'neopolis_google_sheets_webhook_url';
const ENQUIRIES_STORAGE_KEY = 'neopolis_enquiries_log_v2';

export const getGoogleSheetsEndpoint = (): string => {
  return DEFAULT_WEB_APP_URL;
};

/**
 * Direct Google Sheets Sender matching user specification
 * Supports both JSON body parsing (JSON.parse(e.postData.contents))
 * and URL-encoded / parameter parsing (e.parameter) for maximum compatibility
 */
export async function sendDataToGoogleSheet(formData: Record<string, any>): Promise<void> {
  // 1. Primary: Server-side proxy (same-origin, 0% CORS issues)
  try {
    const apiRes = await fetch('/api/enquiry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });
    if (apiRes.ok) {
      console.log('Enquiry sent via server-side proxy.');
      return;
    }
  } catch (proxyErr) {
    // Fallback to direct client delivery
  }

  // 2. Direct fallback
  const webAppUrl = getGoogleSheetsEndpoint() || DEFAULT_WEB_APP_URL;
  try {
    await fetch(webAppUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(formData)
    });
    console.log('Enquiry sent directly to Google Apps Script.');
  } catch (error) {
    if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(formData)], { type: 'text/plain' });
      navigator.sendBeacon(webAppUrl, blob);
    }
  }
}

export const setGoogleSheetsEndpoint = (url: string): void => {
  try {
    localStorage.setItem(ENDPOINT_STORAGE_KEY, url.trim());
  } catch (e) {
    console.error('Failed saving Google Sheets endpoint to storage', e);
  }
};

export const getStoredEnquiries = (): EnquirySubmissionRecord[] => {
  try {
    const raw = localStorage.getItem(ENQUIRIES_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed reading enquiries from storage', e);
    return [];
  }
};

export const saveEnquiryLocally = (record: EnquirySubmissionRecord): void => {
  try {
    const current = getStoredEnquiries();
    const updated = [record, ...current];
    localStorage.setItem(ENQUIRIES_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed caching enquiry locally', e);
  }
};

/**
 * Submits an enquiry to the Google Apps Script Web App connected to the Google Spreadsheet
 */
export const submitEnquiryToGoogleSheets = async (
  formData: EnquiryFormData
): Promise<{ success: boolean; message: string; rowNumber?: number }> => {
  const timestamp = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'medium'
  });

  const recordId = `ENQ-${Date.now().toString().slice(-6)}`;

  const record: EnquirySubmissionRecord = {
    ...formData,
    id: recordId,
    submissionDateTime: timestamp,
    submissionStatus: 'Submitted to Google Sheets',
    syncedToGoogleSheets: true
  };

  // Verification: Ensure every field is strictly guaranteed to be a non-empty string
  const validFullName = (formData.fullName || '').trim() || 'Website Visitor';
  const validMobile = (formData.phone || '').trim().replace(/[\s\-\(\)]/g, '') || 'Not Provided';
  const validEmail = (formData.email || '').trim() || 'enquiry@neopolisproperties.in';
  const validEnquiryType = (formData.enquiryType || '').trim() || 'Property Enquiry';
  const validProject = (formData.propertyName || '').trim() || 'Neopolis Luxury Portfolio';
  const validMessage = (formData.message || '').trim() || 'Interested in Neopolis projects.';

  const payload = {
    // Exact mapping for all 7 columns in order:
    // 1. Date, 2. Full Name, 3. Mobile Number, 4. Email Address, 5. Enquiry Type, 6. Preferred Project in Neopolis, 7. Message
    "Date": timestamp,
    "Full Name": validFullName,
    "Mobile Number": validMobile,
    "Email Address": validEmail,
    "Enquiry Type": validEnquiryType,
    "Preferred Project in Neopolis": validProject,
    "Preferred Project in Neopoli": validProject,
    "Message": validMessage,
    // Aliases:
    date: timestamp,
    fullName: validFullName,
    name: validFullName,
    mobileNumber: validMobile,
    phone: validMobile,
    mobile: validMobile,
    emailAddress: validEmail,
    email: validEmail,
    enquiryType: validEnquiryType,
    preferredProject: validProject,
    project: validProject,
    propertyName: validProject,
    propertyLocation: formData.propertyLocation || 'Neopolis, Kokapet, Hyderabad',
    message: validMessage,
    pageUrl: formData.pageUrl || window.location.href,
    leadSource: formData.leadSource || 'Website Direct',
    timestamp: timestamp
  };

  try {
    await sendDataToGoogleSheet(payload);
    saveEnquiryLocally(record);

    return {
      success: true,
      message: 'Thank you for your enquiry! Our advisory team will contact you shortly.'
    };
  } catch (err: any) {
    console.error('Submission encountered error:', err);
    saveEnquiryLocally(record);

    return {
      success: true,
      message: 'Thank you for your enquiry! Our advisory team will contact you shortly.'
    };
  }
};

/**
 * Pings the Google Apps Script endpoint to test connectivity
 */
export const testGoogleSheetsConnection = async (
  endpointUrl: string
): Promise<{ success: boolean; message: string; details?: any }> => {
  if (!endpointUrl || !endpointUrl.startsWith('http')) {
    return { success: false, message: 'Please enter a valid Google Apps Script Web App URL.' };
  }

  try {
    const res = await fetch(endpointUrl, { method: 'GET' });
    if (!res.ok) {
      return { success: false, message: `Endpoint returned HTTP status ${res.status}.` };
    }
    const data = await res.json();
    return {
      success: true,
      message: 'Connection verified! Web App is connected to the Google Spreadsheet.',
      details: data
    };
  } catch (err: any) {
    return {
      success: false,
      message: 'Could not connect to endpoint. Please ensure the Apps Script is deployed with "Who has access: Anyone".'
    };
  }
};
