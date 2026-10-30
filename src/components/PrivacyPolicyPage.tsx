import React, { useEffect } from 'react';
import { Shield, Lock, FileText, ArrowLeft, Mail, Phone, MapPin, Building2, ExternalLink } from 'lucide-react';

interface PrivacyPolicyPageProps {
  onNavigateHome: () => void;
  onNavigateProperties: () => void;
  onNavigateContact: () => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({
  onNavigateHome,
  onNavigateProperties,
  onNavigateContact
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 w-full pb-20">
      {/* 1. Hero Header Banner */}
      <div className="bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Shield className="w-3.5 h-3.5" />
            <span>Legal &amp; Data Protection</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Privacy Policy – Neopolis Properties
          </h1>

          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-400 font-medium">
            <span>Oct 30, 2026</span>
            <span>•</span>
            <span className="text-blue-400 font-semibold">@Aqrevia</span>
          </div>

          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2 text-xs text-slate-400 mt-6 font-medium">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigateHome();
              }}
              className="hover:text-blue-400 transition-colors cursor-pointer"
            >
              Home
            </a>
            <span>/</span>
            <span className="text-blue-400 font-semibold">Privacy Policy</span>
          </nav>
        </div>
      </div>

      {/* 2. Main Policy Document Card */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10 md:p-12 space-y-10">
          
          {/* Quick Notice Banner */}
          <div className="p-4 sm:p-5 rounded-xl bg-blue-50/80 border border-blue-100 flex items-start gap-3.5 text-xs sm:text-sm text-blue-900 leading-relaxed">
            <Lock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-blue-950">Your Privacy is Protected</p>
              <p className="mt-0.5 text-blue-800">
                This Privacy Policy explains how Neopolis Properties collects, uses, protects, and handles your personal information across our website and digital campaigns in full compliance with the Digital Personal Data Protection Act, 2023 and the Information Technology Act, 2000.
              </p>
            </div>
          </div>

          {/* Section 1 */}
          <section className="space-y-3 border-b border-slate-100 pb-8">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 text-xs font-extrabold flex items-center justify-center shrink-0">1</span>
              <span>Who We Are</span>
            </h2>
            <div className="text-sm sm:text-base text-slate-600 leading-relaxed space-y-3 pl-9">
              <p>
                Neopolis Properties (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is a real estate marketing and sales partner operated by <strong className="text-slate-900">NXZ Designing &amp; Engineering Services</strong>, with its office in Secunderabad / Hyderabad, Telangana. We operate the website <span className="font-medium text-slate-900">neopolisproperties.com</span> and run advertising campaigns, including lead generation forms on Google and Meta (Facebook and Instagram).
              </p>
              <p>
                We are not the developer or builder of the projects shown on our website or in our ads. The projects belong to their respective developers (for example, Godrej Properties, Sattva Group, Brigade Group, MSN Group, and others). We act as an authorised channel partner to market these projects and help buyers with information, site visits, and the booking process.
              </p>
              <p>
                This Privacy Policy explains what personal information we collect, how we use it, who we share it with, and the choices you have. It applies to our website, our ad lead forms, and any phone, WhatsApp, SMS, or email conversations with our team. By submitting your details to us, you agree to this Policy.
              </p>
              <p className="text-xs bg-slate-50 p-3 rounded-lg border border-slate-200 text-slate-700 font-medium">
                We follow the <strong className="text-slate-900">Digital Personal Data Protection Act, 2023</strong> and the <strong className="text-slate-900">Information Technology Act, 2000</strong>, along with the rules made under them.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-3 border-b border-slate-100 pb-8">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 text-xs font-extrabold flex items-center justify-center shrink-0">2</span>
              <span>Information We Collect</span>
            </h2>
            <div className="text-sm sm:text-base text-slate-600 leading-relaxed space-y-3 pl-9">
              <p>We collect only the information needed to respond to your property enquiry.</p>
              
              <div className="space-y-2">
                <p className="font-semibold text-slate-900 text-sm">Information you give us, through our website forms, Google lead form ads, Facebook/Instagram lead ads, WhatsApp, calls, or email:</p>
                <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-600">
                  <li>Name, mobile number, email address, and city</li>
                  <li>Property preferences, such as project, configuration (3 BHK, 4 BHK, etc.), budget, preferred location, and purchase timeline</li>
                  <li>Site visit date and time, and any message or question you send us</li>
                </ul>
              </div>

              <div className="space-y-2 pt-2">
                <p className="font-semibold text-slate-900 text-sm">Information from Google and Meta lead forms:</p>
                <p className="text-sm">
                  When you submit a lead form on Google or Facebook/Instagram, the platform may pre-fill your details from your account (such as your name, phone number, and email). You can review and edit these before you submit. Only the details you submit are shared with us. Google and Meta handle your data under their own privacy policies.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <p className="font-semibold text-slate-900 text-sm">Information collected automatically when you visit our website:</p>
                <p className="text-sm">
                  IP address, device and browser type, pages viewed, time spent, and the ad or link that brought you to us.
                </p>
              </div>

              <p className="text-xs bg-amber-50 p-3 rounded-lg border border-amber-200 text-amber-900">
                <strong>Important:</strong> We do not ask for sensitive data such as bank details, card numbers, Aadhaar, or PAN through our ads or website. If a booking moves forward, such documents are collected directly by the developer through its own official verification process.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-3 border-b border-slate-100 pb-8">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 text-xs font-extrabold flex items-center justify-center shrink-0">3</span>
              <span>How We Use Your Information</span>
            </h2>
            <div className="text-sm sm:text-base text-slate-600 leading-relaxed space-y-3 pl-9">
              <p>We use your information, with your consent, to:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-600">
                <li>Contact you about the project you enquired about and share price lists, brochures, and floor plans</li>
                <li>Arrange and confirm site visits with you and the developer</li>
                <li>Suggest other suitable projects that match your budget and needs</li>
                <li>Pass your enquiry to the developer so they can help you with the booking</li>
                <li>Improve our website, ads, and service, and measure how well our campaigns perform</li>
                <li>Meet legal, tax, or regulatory requirements, including RERA rules</li>
              </ul>
              <p className="font-medium text-slate-900 pt-1">
                We will not sell your personal information to anyone. We will not use it for any purpose that is unrelated to your property enquiry.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-3 border-b border-slate-100 pb-8">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 text-xs font-extrabold flex items-center justify-center shrink-0">4</span>
              <span>Who We Share Your Information With</span>
            </h2>
            <div className="text-sm sm:text-base text-slate-600 leading-relaxed space-y-3 pl-9">
              <p>
                Because we market projects on behalf of developers, your details are shared with the people who need them to help you buy a home. We share only what is needed:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600">
                <li>
                  <strong className="text-slate-900">Real estate developers</strong> whose project you enquired about (for example, Godrej Properties, Sattva Group, Brigade, etc.), so they can arrange site visits, share official pricing, and process your booking. Once shared, the developer also handles your data under its own privacy policy.
                </li>
                <li>
                  <strong className="text-slate-900">Our sales team and authorised associates</strong> who call and assist you.
                </li>
                <li>
                  <strong className="text-slate-900">Service providers</strong> who help us run our business, such as CRM software, calling and WhatsApp platforms, email and SMS services, website hosting, and analytics. They act on our instructions and must keep your data secure.
                </li>
                <li>
                  <strong className="text-slate-900">Advertising platforms (Google and Meta)</strong> in limited, protected forms, to measure ad results and show relevant ads.
                </li>
                <li>
                  <strong className="text-slate-900">Government or legal authorities</strong>, when required by law, court order, or to protect our legal rights.
                </li>
              </ul>
              <p className="text-xs font-semibold text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200">
                We do not sell or rent your personal data to unrelated third parties.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="space-y-3 border-b border-slate-100 pb-8">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 text-xs font-extrabold flex items-center justify-center shrink-0">5</span>
              <span>Calls, WhatsApp, SMS and Email</span>
            </h2>
            <div className="text-sm sm:text-base text-slate-600 leading-relaxed space-y-3 pl-9">
              <p>
                When you submit your details, you agree that we, the developer, and our authorised partners may contact you by phone call, WhatsApp, SMS, or email about your enquiry and related projects. Calls may include automated or AI-assisted calls and may be recorded for quality and training.
              </p>
              <p>
                This consent applies even if your number is registered on the National Do Not Call (DND / NCPR) registry, as you have explicitly asked us to contact you regarding your property enquiry.
              </p>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-sm">
                <p className="font-semibold text-slate-900">You can stop these messages at any time by:</p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li>Replying &quot;STOP&quot; on WhatsApp or SMS</li>
                  <li>Telling our team on the call</li>
                  <li>Emailing us at <a href="mailto:service@nxzdigital.com" className="text-blue-600 font-semibold hover:underline">service@nxzdigital.com</a></li>
                </ul>
                <p className="text-xs text-slate-500 pt-1">
                  We will stop marketing messages within a reasonable time after your request.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section className="space-y-3 border-b border-slate-100 pb-8">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 text-xs font-extrabold flex items-center justify-center shrink-0">6</span>
              <span>Cookies and Ad Tracking</span>
            </h2>
            <div className="text-sm sm:text-base text-slate-600 leading-relaxed space-y-3 pl-9">
              <p>
                Our website uses cookies and similar tools to work properly, understand how visitors use the site, and measure our ads. These include:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-600">
                <li><strong className="text-slate-900">Google Analytics and Google Ads tags</strong> to count visits and form submissions from our ads</li>
                <li><strong className="text-slate-900">Meta Pixel and Conversions API</strong> to measure results from Facebook and Instagram ads and show relevant ads to people who visited our site</li>
              </ul>
              <p className="text-sm">
                These tools may collect your IP address, device details, and browsing activity on our site. You can block or delete cookies in your browser settings. You can also control ad personalisation in your Google Ad Settings and Meta Ad Preferences.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section className="space-y-3 border-b border-slate-100 pb-8">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 text-xs font-extrabold flex items-center justify-center shrink-0">7</span>
              <span>Data Retention</span>
            </h2>
            <div className="text-sm sm:text-base text-slate-600 leading-relaxed pl-9">
              <p>
                We keep your information only as long as needed to handle your enquiry and any purchase that follows, or as required by law. Leads that do not progress are deleted or anonymised within 24 months of our last contact, unless you ask us to delete them sooner.
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section className="space-y-3 border-b border-slate-100 pb-8">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 text-xs font-extrabold flex items-center justify-center shrink-0">8</span>
              <span>Data Security</span>
            </h2>
            <div className="text-sm sm:text-base text-slate-600 leading-relaxed pl-9">
              <p>
                We use reasonable safeguards to protect your data, including access controls, password-protected systems, and limited staff access. No method of storage or transmission is 100% secure, but we work diligently to protect your information from misuse, loss, or unauthorised access.
              </p>
            </div>
          </section>

          {/* Section 9 */}
          <section className="space-y-3 border-b border-slate-100 pb-8">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 text-xs font-extrabold flex items-center justify-center shrink-0">9</span>
              <span>Your Rights</span>
            </h2>
            <div className="text-sm sm:text-base text-slate-600 leading-relaxed space-y-3 pl-9">
              <p>Under Indian data protection law, you have the right to:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-600">
                <li>Access a summary of the personal data we hold about you</li>
                <li>Correct or update inaccurate details</li>
                <li>Withdraw your consent at any time</li>
                <li>Ask us to delete your data</li>
                <li>Raise a complaint with us, and then with the Data Protection Board of India if unresolved</li>
              </ul>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm">
                <p className="text-slate-800">
                  To use these rights, email us at{' '}
                  <a href="mailto:service@nxzdigital.com" className="text-blue-600 font-bold hover:underline">
                    service@nxzdigital.com
                  </a>{' '}
                  or call{' '}
                  <a href="tel:+919603155571" className="text-blue-600 font-bold hover:underline">
                    +91 96031 55571
                  </a>. We will respond within 30 days.
                </p>
              </div>
            </div>
          </section>

          {/* Section 10 */}
          <section className="space-y-3 border-b border-slate-100 pb-8">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 text-xs font-extrabold flex items-center justify-center shrink-0">10</span>
              <span>Children</span>
            </h2>
            <div className="text-sm sm:text-base text-slate-600 leading-relaxed pl-9">
              <p>
                Our services are meant for adults aged 18 and above. We do not knowingly collect data from anyone under 18. If we learn that we have, we will delete it promptly.
              </p>
            </div>
          </section>

          {/* Section 11 */}
          <section className="space-y-3 border-b border-slate-100 pb-8">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 text-xs font-extrabold flex items-center justify-center shrink-0">11</span>
              <span>Third-Party Links</span>
            </h2>
            <div className="text-sm sm:text-base text-slate-600 leading-relaxed pl-9">
              <p>
                Our website and ads may link to developer websites, Google, Meta, or other sites. We are not responsible for their privacy practices. Please read their respective privacy policies.
              </p>
            </div>
          </section>

          {/* Section 12 */}
          <section className="space-y-3 border-b border-slate-100 pb-8">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 text-xs font-extrabold flex items-center justify-center shrink-0">12</span>
              <span>Disclaimer on Project Information</span>
            </h2>
            <div className="text-sm sm:text-base text-slate-600 leading-relaxed pl-9">
              <p>
                Project details, prices, images, floor plans, and possession dates are provided by the developers and are for information only. They may change without notice. Please verify all details with the developer and the official RERA website (<a href="https://rera.telangana.gov.in" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold hover:underline inline-flex items-center gap-1">rera.telangana.gov.in <ExternalLink className="w-3 h-3" /></a>) before making any purchase decision.
              </p>
            </div>
          </section>

          {/* Section 13 */}
          <section className="space-y-3 border-b border-slate-100 pb-8">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 text-xs font-extrabold flex items-center justify-center shrink-0">13</span>
              <span>Changes to This Policy</span>
            </h2>
            <div className="text-sm sm:text-base text-slate-600 leading-relaxed pl-9">
              <p>
                We may update this Policy from time to time. The latest version will always be on this page, with the updated date at the top.
              </p>
            </div>
          </section>

          {/* Section 14 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 text-xs font-extrabold flex items-center justify-center shrink-0">14</span>
              <span>Contact Us</span>
            </h2>
            <div className="text-sm sm:text-base text-slate-600 leading-relaxed space-y-4 pl-9">
              <p>For any questions about this Privacy Policy, contact us at:</p>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-3 text-sm">
                <div className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  <span>NXZ Designing &amp; Engineering Services</span>
                </div>

                <div className="flex items-start gap-2.5 text-slate-600">
                  <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Sandhu Apartments, Mahatma Gandhi Rd, General Bazaar, Secunderabad, Hyderabad, Telangana 500003</span>
                </div>

                <div className="flex items-center gap-2.5 text-slate-600">
                  <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Email: </span>
                  <a href="mailto:service@nxzdigital.com" className="text-blue-600 font-semibold hover:underline">
                    service@nxzdigital.com
                  </a>
                </div>

                <div className="flex items-center gap-2.5 text-slate-600">
                  <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Phone: </span>
                  <a href="tel:+919603155571" className="text-blue-600 font-semibold hover:underline">
                    +91 96031 55571
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Action Bar */}
          <div className="pt-8 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-bold transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={onNavigateProperties}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs sm:text-sm font-bold transition-colors cursor-pointer"
              >
                <span>View Properties</span>
              </button>
              <button
                onClick={onNavigateContact}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-xs transition-colors cursor-pointer"
              >
                <span>Contact Us</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
