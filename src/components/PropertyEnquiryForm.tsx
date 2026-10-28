import React, { useState, useEffect } from 'react';
import { 
  Send, CheckCircle2, AlertCircle, Shield, 
  Building2, Sparkles 
} from 'lucide-react';
import { PROJECTS_DATA } from '../data/projectsData';
import { 
  DEFAULT_WEB_APP_URL, 
  getGoogleSheetsEndpoint, 
  saveEnquiryLocally 
} from '../services/leadService';
import { EnquirySubmissionRecord } from '../types';

interface PropertyEnquiryFormProps {
  propertyName?: string;
  propertyLocation?: string;
  isCompact?: boolean;
  inModal?: boolean;
  layout?: 'vertical' | 'horizontal';
  onClose?: () => void;
  onSuccess?: () => void;
}

export const PropertyEnquiryForm: React.FC<PropertyEnquiryFormProps> = ({
  propertyName,
  propertyLocation,
  isCompact = false,
  inModal = false,
  layout = 'vertical',
  onClose,
  onSuccess
}) => {
  // Form fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [enquiryType, setEnquiryType] = useState('Property Enquiry');
  const [selectedProject, setSelectedProject] = useState<string>(propertyName || 'all');
  const [message, setMessage] = useState('');
  
  // Anti-spam honeypot
  const [honeypot, setHoneypot] = useState('');

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string; rowNumber?: number } | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (propertyName) {
      setSelectedProject(propertyName);
    }
  }, [propertyName]);

  // Validation
  const validateForm = (): boolean => {
    const errors: { [key: string]: string } = {};

    // 1. Full Name: strictly required
    if (!fullName.trim()) {
      errors.fullName = 'Full Name is required.';
    } else if (fullName.trim().length < 2) {
      errors.fullName = 'Please enter a valid name (at least 2 characters).';
    }

    // 2. Mobile Number: strictly required
    const cleanedPhone = phone.replace(/[\s\-\(\)]/g, '');
    if (!phone.trim()) {
      errors.phone = 'Mobile Number is required.';
    } else if (cleanedPhone.length < 8 || !/^[+]?[0-9]{8,15}$/.test(cleanedPhone)) {
      errors.phone = 'Please enter a valid mobile number.';
    }

    // 3. Email Address: strictly required
    if (!email.trim()) {
      errors.email = 'Email Address is required.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        errors.email = 'Please enter a valid email address.';
      }
    }

    // 4. Enquiry Type: strictly required
    if (!enquiryType || !enquiryType.trim()) {
      errors.enquiryType = 'Please select an enquiry type.';
    }

    // 5. Preferred Project: strictly required
    if (!propertyName && (!selectedProject || selectedProject === 'all')) {
      errors.selectedProject = 'Please select your preferred project.';
    }

    // 6. Message: strictly required
    if (!message.trim()) {
      errors.message = 'Message is required.';
    } else if (message.trim().length < 5) {
      errors.message = 'Please provide a little more detail (at least 5 characters).';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check: bots fill this field
    if (honeypot) {
      console.warn('Bot submission blocked via honeypot');
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(null);

    const submissionDate = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short'
    });

    const sanitizedFullName = fullName.trim();
    const sanitizedMobile = phone.trim();
    const sanitizedEmail = email.trim();
    const sanitizedEnquiryType = enquiryType.trim();
    const sanitizedProject = propertyName || (selectedProject !== 'all' ? selectedProject : 'Neopolis Kokapet General Enquiry');
    const sanitizedMessage = message.trim();

    const resolvedLocation = propertyLocation || (
      selectedProject !== 'all' 
        ? PROJECTS_DATA.find(p => p.name.toLowerCase() === selectedProject.toLowerCase())?.location 
        : 'Neopolis, Kokapet, Hyderabad'
    );

    // EXACT structure expected by the Google Apps Script endpoint
    const orderedPayload = {
      fullName: sanitizedFullName,
      mobileNumber: sanitizedMobile,
      emailAddress: sanitizedEmail,
      enquiryType: sanitizedEnquiryType,
      project: sanitizedProject,
      message: sanitizedMessage,
      timestamp: submissionDate,
      pageSource: window.location.href,
      location: resolvedLocation || 'Neopolis, Kokapet, Hyderabad'
    };

    try {
      let sentSuccessfully = false;

      if (typeof window !== 'undefined') {
        const webAppUrl = getGoogleSheetsEndpoint() || DEFAULT_WEB_APP_URL;

        try {
          await fetch(webAppUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'text/plain;charset=utf-8',
            },
            body: JSON.stringify(orderedPayload)
          });
          sentSuccessfully = true;
        } catch (directErr) {
          if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
            const blob = new Blob([JSON.stringify(orderedPayload)], { type: 'text/plain' });
            navigator.sendBeacon(webAppUrl, blob);
            sentSuccessfully = true;
          }
        }
      }

      // Save record in local storage cache
      const recordId = `ENQ-${Date.now().toString().slice(-6)}`;
      const localRecord: EnquirySubmissionRecord = {
        id: recordId,
        fullName: sanitizedFullName,
        phone: sanitizedMobile,
        email: sanitizedEmail,
        enquiryType: sanitizedEnquiryType,
        propertyName: sanitizedProject,
        propertyLocation: resolvedLocation || 'Neopolis, Kokapet, Hyderabad',
        message: sanitizedMessage,
        pageUrl: window.location.href,
        leadSource: propertyName ? `Property Page: ${propertyName}` : 'Website Direct Contact',
        submissionDateTime: submissionDate,
        submissionStatus: 'Submitted to Google Sheets',
        syncedToGoogleSheets: true
      };

      saveEnquiryLocally(localRecord);

      setStatusMessage({
        type: 'success',
        text: 'Thank you for your enquiry! Our advisory team will contact you shortly.'
      });

      // Clear input fields on successful submission
      setFullName('');
      setPhone('');
      setEmail('');
      setMessage('');
      setFieldErrors({});

      if (onSuccess) {
        onSuccess();
      } else if (typeof window !== 'undefined') {
        window.history.pushState({}, '', '/thank-you');
        window.dispatchEvent(new PopStateEvent('popstate'));
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (err: any) {
      console.error('Submission encountered error:', err);
      setStatusMessage({
        type: 'error',
        text: "We couldn't submit your enquiry. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isHorizontal = layout === 'horizontal';

  return (
    <div className={
      inModal 
        ? "bg-white p-1 sm:p-2 relative" 
        : isHorizontal
          ? "bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl shadow-sm p-6 sm:p-8 lg:p-10 relative"
          : isCompact 
            ? "bg-white border border-slate-200 rounded-2xl shadow-xs p-4 sm:p-5 relative" 
            : "bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8 relative"
    }>
      {/* Header for Horizontal Layout */}
      {isHorizontal ? (
        <div className="mb-6 sm:mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5 sm:pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct Developer Advisory Desk</span>
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
              Enquire for {propertyName || 'This Property'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Connect directly with verified developer sales managers for official floor plans, tower-wise cost sheets, and private site visits.
            </p>
          </div>

          {propertyName && (
            <div className="hidden sm:flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 shrink-0">
              <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-[10px] uppercase font-bold text-slate-400">Selected Property</div>
                <div className="text-xs sm:text-sm font-bold text-slate-900">{propertyName}</div>
              </div>
            </div>
          )}
        </div>
      ) : propertyName && (
        <div className={`${isCompact ? 'mb-3 p-2.5' : 'mb-5 p-3.5'} bg-blue-50/80 border border-blue-200 rounded-xl flex items-center gap-3`}>
          <div className={`${isCompact ? 'w-7 h-7' : 'w-8 h-8'} rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0`}>
            <Building2 className={`${isCompact ? 'w-3.5 h-3.5' : 'w-4 h-4'}`} />
          </div>
          <div className="text-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 block">
              Auto-Populated Project Details
            </span>
            <span className="font-bold text-slate-900">{propertyName}</span>
            <span className="text-slate-500 ml-1">· {propertyLocation || 'Neopolis, Kokapet'}</span>
          </div>
        </div>
      )}

      {/* Success Notification */}
      {statusMessage?.type === 'success' && (
        <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3 mb-6 animate-fadeIn">
          <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
          <h4 className="text-lg font-bold text-slate-900">Enquiry Submitted Successfully!</h4>
          <p className="text-sm text-slate-700 max-w-md mx-auto leading-relaxed">
            {statusMessage.text}
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setStatusMessage(null)}
              className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
            >
              Submit Another Enquiry
            </button>
            {onClose && (
              <>
                <span className="text-slate-300">·</span>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Close Window
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Error Notification */}
      {statusMessage?.type === 'error' && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-3 mb-5 text-xs text-rose-800 animate-fadeIn">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-bold">{statusMessage.text}</div>
            <div className="text-[11px] text-rose-700">
              Your entered information has been preserved. Please verify your connection or try again.
            </div>
          </div>
        </div>
      )}

      {/* The Enquiry Form: HORIZONTAL LAYOUT vs VERTICAL LAYOUT */}
      {isHorizontal ? (
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {/* Hidden Honeypot */}
          <input
            type="text"
            name="_gotcha"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          {/* Row 1: 4 Horizontal Columns on Desktop, 2 on Tablet, 1 on Mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 1. Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                placeholder="e.g. Vikramaditya Reddy"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (fieldErrors.fullName) setFieldErrors({ ...fieldErrors, fullName: '' });
                }}
                className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-slate-900 ${
                  fieldErrors.fullName ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                }`}
              />
              {fieldErrors.fullName && <p className="mt-1 text-xs text-rose-600">{fieldErrors.fullName}</p>}
            </div>

            {/* 2. Mobile Number */}
            <div>
              <label htmlFor="mobileNumber" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                Mobile Number <span className="text-rose-500">*</span>
              </label>
              <input
                id="mobileNumber"
                name="mobileNumber"
                type="tel"
                required
                placeholder="10-digit mobile number"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (fieldErrors.phone) setFieldErrors({ ...fieldErrors, phone: '' });
                }}
                className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-slate-900 ${
                  fieldErrors.phone ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                }`}
              />
              {fieldErrors.phone && <p className="mt-1 text-xs text-rose-600">{fieldErrors.phone}</p>}
            </div>

            {/* 3. Email Address */}
            <div>
              <label htmlFor="emailAddress" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <input
                id="emailAddress"
                name="emailAddress"
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: '' });
                }}
                className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-slate-900 ${
                  fieldErrors.email ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                }`}
              />
              {fieldErrors.email && <p className="mt-1 text-xs text-rose-600">{fieldErrors.email}</p>}
            </div>

            {/* 4. Enquiry Type */}
            <div>
              <label htmlFor="enquiryType" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                Enquiry Type <span className="text-rose-500">*</span>
              </label>
              <select
                id="enquiryType"
                name="enquiryType"
                required
                value={enquiryType}
                onChange={(e) => {
                  setEnquiryType(e.target.value);
                  if (fieldErrors.enquiryType) setFieldErrors({ ...fieldErrors, enquiryType: '' });
                }}
                className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-slate-900 ${
                  fieldErrors.enquiryType ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                }`}
              >
                <option value="Property Enquiry">Property Enquiry &amp; Availability</option>
                <option value="Brochure & Price Sheet">Cost Sheets &amp; Floor Plans</option>
                <option value="Site Visit Request">Schedule VIP Site Visit</option>
                <option value="Investment Advisory">High-Yield Investment Advisory</option>
                <option value="General Consultation">General Query</option>
              </select>
              {fieldErrors.enquiryType && <p className="mt-1 text-xs text-rose-600">{fieldErrors.enquiryType}</p>}
            </div>
          </div>

          {/* Row 2: Message & Submit Button Side-by-Side on Desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
            <div className="lg:col-span-9">
              <label htmlFor="message" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                Message / Requirement <span className="text-rose-500">*</span>
              </label>
              <input
                id="message"
                name="message"
                type="text"
                required
                placeholder="Tell us what you're looking for (e.g. 3 or 4 BHK floor plans, unit availability, or site visit)..."
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (fieldErrors.message) setFieldErrors({ ...fieldErrors, message: '' });
                }}
                className={`w-full px-3.5 py-2.5 sm:py-3 text-sm bg-slate-50 border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-slate-900 ${
                  fieldErrors.message ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                }`}
              />
              {fieldErrors.message && <p className="mt-1 text-xs text-rose-600">{fieldErrors.message}</p>}
            </div>

            <div className="lg:col-span-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 sm:py-3 px-6 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm rounded-xl shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Enquiry</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Bottom Trust & Verification Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100 gap-2">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span>100% Privacy Guarantee · Direct Developer Official Desk</span>
            </div>
            <div className="text-slate-400 text-[11px]">
              Neopolis Kokapet Advisory · Instant Callback Available
            </div>
          </div>
        </form>
      ) : (
        /* Vertical Form Layout (Default for Modal & General Contact) */
        <form onSubmit={handleSubmit} className={isCompact ? "space-y-3" : "space-y-4"}>
          {/* Anti-spam hidden honeypot */}
          <input
            type="text"
            name="_gotcha"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          {/* 1. Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              placeholder="e.g. Vikramaditya Reddy"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                if (fieldErrors.fullName) {
                  setFieldErrors({ ...fieldErrors, fullName: '' });
                }
              }}
              className={`w-full px-3.5 py-2 text-sm bg-slate-50 border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-slate-900 ${
                fieldErrors.fullName ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
              }`}
            />
            {fieldErrors.fullName && (
              <p className="mt-1 text-xs text-rose-600">{fieldErrors.fullName}</p>
            )}
          </div>

          {/* 2. Mobile & Email Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label htmlFor="mobileNumber" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                Mobile Number <span className="text-rose-500">*</span>
              </label>
              <input
                id="mobileNumber"
                name="mobileNumber"
                type="tel"
                required
                placeholder="10-digit mobile number"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (fieldErrors.phone) {
                    setFieldErrors({ ...fieldErrors, phone: '' });
                  }
                }}
                className={`w-full px-3.5 py-2 text-sm bg-slate-50 border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-slate-900 ${
                  fieldErrors.phone ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                }`}
              />
              {fieldErrors.phone && (
                <p className="mt-1 text-xs text-rose-600">{fieldErrors.phone}</p>
              )}
            </div>

            <div>
              <label htmlFor="emailAddress" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <input
                id="emailAddress"
                name="emailAddress"
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (fieldErrors.email) {
                    setFieldErrors({ ...fieldErrors, email: '' });
                  }
                }}
                className={`w-full px-3.5 py-2 text-sm bg-slate-50 border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-slate-900 ${
                  fieldErrors.email ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                }`}
              />
              {fieldErrors.email && (
                <p className="mt-1 text-xs text-rose-600">{fieldErrors.email}</p>
              )}
            </div>
          </div>

          {/* 3. Enquiry Type & Preferred Project */}
          <div className={`grid grid-cols-1 ${!propertyName ? 'sm:grid-cols-2' : ''} gap-3 sm:gap-4`}>
            <div>
              <label htmlFor="enquiryType" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                Enquiry Type <span className="text-rose-500">*</span>
              </label>
              <select
                id="enquiryType"
                name="enquiryType"
                required
                value={enquiryType}
                onChange={(e) => {
                  setEnquiryType(e.target.value);
                  if (fieldErrors.enquiryType) {
                    setFieldErrors({ ...fieldErrors, enquiryType: '' });
                  }
                }}
                className={`w-full px-3.5 py-2 text-sm bg-slate-50 border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-slate-900 ${
                  fieldErrors.enquiryType ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                }`}
              >
                <option value="Property Enquiry">Property Enquiry &amp; Availability</option>
                <option value="Site Visit Request">Schedule an Escorted Site Visit</option>
                <option value="Brochure & Price Sheet">Request Project Information &amp; Pricing</option>
                <option value="Investment Advisory">High-Yield Investment Consultation</option>
                <option value="General Consultation">General Query</option>
              </select>
              {fieldErrors.enquiryType && (
                <p className="mt-1 text-xs text-rose-600">{fieldErrors.enquiryType}</p>
              )}
            </div>

            {/* Show Project Dropdown if not fixed to a specific property */}
            {!propertyName && (
              <div>
                <label htmlFor="preferredProject" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                  Select Project <span className="text-rose-500">*</span>
                </label>
                <select
                  id="preferredProject"
                  name="preferredProject"
                  required
                  value={selectedProject}
                  onChange={(e) => {
                    setSelectedProject(e.target.value);
                    if (fieldErrors.selectedProject) {
                      setFieldErrors({ ...fieldErrors, selectedProject: '' });
                    }
                  }}
                  className={`w-full px-3.5 py-2 text-sm bg-slate-50 border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-slate-900 ${
                    fieldErrors.selectedProject ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                  }`}
                >
                  <option value="">Select a Project...</option>
                  <option value="Neopolis Portfolio (All Projects)">Neopolis Portfolio (All 7 Projects)</option>
                  {PROJECTS_DATA.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name} ({p.propertyType} - {p.startingPrice})
                    </option>
                  ))}
                </select>
                {fieldErrors.selectedProject && (
                  <p className="mt-1 text-xs text-rose-600">{fieldErrors.selectedProject}</p>
                )}
              </div>
            )}
          </div>

          {/* 4. Message */}
          <div>
            <label htmlFor="message" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
              Message <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={isCompact ? 2 : 3}
              placeholder="Tell us what you're looking for (e.g. 3 or 4 BHK floor plans, current unit availability, or a site visit this weekend)..."
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                if (fieldErrors.message) {
                  setFieldErrors({ ...fieldErrors, message: '' });
                }
              }}
              className={`w-full px-3.5 py-2 text-sm bg-slate-50 border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-slate-900 resize-none ${
                fieldErrors.message ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
              }`}
            />
            {fieldErrors.message && (
              <p className="mt-1 text-xs text-rose-600">{fieldErrors.message}</p>
            )}
          </div>

          {/* Action Buttons: Submit & Optional Cancel */}
          <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-3 pt-1">
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="py-2.5 px-5 border border-slate-300 hover:bg-slate-100 active:bg-slate-200 text-slate-700 font-semibold text-sm rounded-xl transition-all cursor-pointer text-center"
              >
                Close
              </button>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3 px-6 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm rounded-xl shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Submitting to Google Sheets...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Enquiry</span>
                </>
              )}
            </button>
          </div>

          {/* Bottom Trust & Privacy Guarantee */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Privacy &amp; Zero Spam Guarantee</span>
            </span>
            <span className="text-slate-400">Neopolis Advisory Desk</span>
          </div>
        </form>
      )}
    </div>
  );
};
