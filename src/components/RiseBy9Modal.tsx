import React, { useState, useEffect } from 'react';
import { 
  X, Building2, Sparkles, Shield, Send, CheckCircle2, 
  MapPin, Compass, Layers, Phone, Mail, User, Clock
} from 'lucide-react';
import { sendDataToGoogleSheet, saveEnquiryLocally } from '../services/leadService';
import { EnquirySubmissionRecord } from '../types';

interface RiseBy9ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const RiseBy9Modal: React.FC<RiseBy9ModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [preferredConfig, setPreferredConfig] = useState('4 BHK Sky Villa (3,500 - 4,500 SFT)');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const errors: { [key: string]: string } = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      errors.fullName = 'Please enter your full name (at least 2 characters).';
    }

    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    if (!phone.trim()) {
      errors.phone = 'Mobile number is required.';
    } else if (cleanPhone.length < 8 || !/^[+]?[0-9]{8,15}$/.test(cleanPhone)) {
      errors.phone = 'Please enter a valid mobile number.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!message.trim()) {
      errors.message = 'Please provide a brief message or query.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    const fullMessage = `[Rise By 9 Pre-Registration] Config: ${preferredConfig}. Note: ${message.trim()}`;
    const submissionDate = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short'
    });

    const payload = {
      fullName: fullName.trim(),
      mobileNumber: phone.trim(),
      emailAddress: email.trim(),
      enquiryType: 'Pre-Launch Priority EOI',
      project: 'Rise By 9',
      message: fullMessage
    };

    try {
      await sendDataToGoogleSheet(payload);

      const localRecord: EnquirySubmissionRecord = {
        id: `rise9-${Date.now()}`,
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        enquiryType: 'Pre-Launch Priority EOI',
        propertyName: 'Rise By 9',
        propertyLocation: 'Neopolis, Kokapet, Hyderabad',
        message: fullMessage,
        pageUrl: window.location.href,
        leadSource: 'Rise By 9 Launching Soon Modal',
        submissionDateTime: submissionDate,
        submissionStatus: 'Submitted to Google Sheets',
        syncedToGoogleSheets: true
      };
      saveEnquiryLocally(localRecord);

      onSuccess();
    } catch (err: any) {
      console.error('Rise By 9 submission failed:', err);
      setErrorMessage("Could not submit registration. Please check your details and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="rise-by-9-modal-title"
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto overscroll-contain animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full my-auto shadow-2xl border border-slate-200 flex flex-col max-h-[calc(100dvh-1.5rem)] sm:max-h-[min(92vh,820px)] overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header with Title and Prominent, Easy-to-Tap Close Button */}
        <div className="sticky top-0 z-20 bg-linear-to-r from-slate-900 via-blue-950 to-slate-900 text-white px-5 py-4 sm:px-6 sm:py-5 flex items-center justify-between gap-3 shrink-0">
          <div className="min-w-0 flex-1 pr-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Launching Soon · Exclusive Pre-Registration</span>
            </div>
            <h3 id="rise-by-9-modal-title" className="text-lg sm:text-2xl font-black text-white tracking-tight truncate">
              Rise By 9 · Neopolis
            </h3>
            <p className="text-xs text-slate-300 truncate mt-0.5">
              Bespoke Boutique High-Rise Living in Kokapet, Hyderabad
            </p>
          </div>

          {/* Close Button: prominent tap target (40x40px), high contrast */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Launching Soon popup"
            className="shrink-0 w-10 h-10 text-white hover:text-white bg-white/10 hover:bg-white/20 active:bg-white/30 rounded-full transition-colors cursor-pointer flex items-center justify-center focus:outline-hidden focus:ring-2 focus:ring-amber-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="overflow-y-auto overscroll-contain flex-1 p-5 sm:p-7 space-y-6">
          {/* Project Teaser Card */}
          <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 text-white p-5 sm:p-6">
            <div className="absolute inset-0 opacity-25">
              <img
                src="https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=1200&q=85"
                alt="Rise By 9 Luxury Tower"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative z-10 space-y-3">
              <span className="text-[11px] font-bold text-amber-300 uppercase tracking-widest block">
                The Crown of Neopolis High-Rise District
              </span>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                Rise By 9 is an upcoming ultra-luxury boutique sky villa development designed for connoisseurs of privacy. Featuring a strictly low-density footprint with just two expansive residences per floor, private elevator vestibules, and soaring 12-foot ceiling clearances overlooking the Kokapet and Gandipet horizons.
              </p>

              {/* Quick Spec Tags */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 text-xs">
                <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
                  <span className="text-[10px] text-slate-400 block uppercase font-semibold">Config</span>
                  <span className="font-bold text-white">4 & 5 BHK</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
                  <span className="text-[10px] text-slate-400 block uppercase font-semibold">Size Range</span>
                  <span className="font-bold text-white">3,500 – 6,000 SFT</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
                  <span className="text-[10px] text-slate-400 block uppercase font-semibold">Density</span>
                  <span className="font-bold text-amber-300">2 Units / Floor</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
                  <span className="text-[10px] text-slate-400 block uppercase font-semibold">Status</span>
                  <span className="font-bold text-emerald-400">Pre-Launch EOI</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Header */}
          <div>
            <h4 className="text-base font-bold text-slate-900">
              Register for Priority Launch Invitation &amp; Early Price Allotment
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Be among the first to receive the official architectural release, floor plans, and preferential pre-launch pricing.
            </p>
          </div>

          {errorMessage && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs font-semibold text-rose-700">
              {errorMessage}
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="rise-fullName" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                id="rise-fullName"
                type="text"
                required
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (fieldErrors.fullName) setFieldErrors({ ...fieldErrors, fullName: '' });
                }}
                className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white text-slate-900 ${
                  fieldErrors.fullName ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                }`}
              />
              {fieldErrors.fullName && <p className="mt-1 text-xs text-rose-600">{fieldErrors.fullName}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="rise-phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                  Mobile Number <span className="text-rose-500">*</span>
                </label>
                <input
                  id="rise-phone"
                  type="tel"
                  required
                  placeholder="Enter 10-digit mobile number"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (fieldErrors.phone) setFieldErrors({ ...fieldErrors, phone: '' });
                  }}
                  className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white text-slate-900 ${
                    fieldErrors.phone ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                  }`}
                />
                {fieldErrors.phone && <p className="mt-1 text-xs text-rose-600">{fieldErrors.phone}</p>}
              </div>

              <div>
                <label htmlFor="rise-email" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  id="rise-email"
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: '' });
                  }}
                  className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white text-slate-900 ${
                    fieldErrors.email ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                  }`}
                />
                {fieldErrors.email && <p className="mt-1 text-xs text-rose-600">{fieldErrors.email}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="rise-config" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                Preferred Configuration
              </label>
              <select
                id="rise-config"
                value={preferredConfig}
                onChange={(e) => setPreferredConfig(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white text-slate-900"
              >
                <option value="4 BHK Sky Villa (3,500 - 4,500 SFT)">4 BHK Sky Villa (3,500 – 4,500 SFT)</option>
                <option value="5 BHK Grand Sky Manor (4,800 - 6,000 SFT)">5 BHK Grand Sky Manor (4,800 – 6,000 SFT)</option>
                <option value="Duplex Sky Penthouse with Private Terrace">Duplex Sky Penthouse with Private Terrace</option>
              </select>
            </div>

            <div>
              <label htmlFor="rise-message" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                Message / Specific Requirements <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="rise-message"
                required
                rows={2}
                placeholder="Let us know your preferred floor, orientation, or investment timeline..."
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (fieldErrors.message) setFieldErrors({ ...fieldErrors, message: '' });
                }}
                className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white text-slate-900 ${
                  fieldErrors.message ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                }`}
              />
              {fieldErrors.message && <p className="mt-1 text-xs text-rose-600">{fieldErrors.message}</p>}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-400 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Registering Priority Interest...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Register for Early Allotment &amp; Launch Kit</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-[11px] text-center text-slate-400 pt-1">
              🔒 Your contact information is kept strictly confidential and shared only with certified advisory representatives.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
