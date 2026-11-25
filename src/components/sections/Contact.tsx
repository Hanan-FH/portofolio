import { useId, useState } from 'react';
import { portfolioData } from '../../data/portfolio';
import { Footer } from '../layout/Footer';
import { MangaThunder } from '../manga/MangaThunder';

export function Contact() {
  const { contact, personal } = portfolioData;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honey: '',
  });

  const [formStatus, setFormStatus] = useState<
    'idle' | 'sending' | 'success' | 'error' | 'activation_required'
  >('idle');
  const [formErrorMsg, setFormErrorMsg] = useState('');

  const nameInputId = useId();
  const emailInputId = useId();
  const subjectInputId = useId();
  const messageInputId = useId();
  const messageHelpId = useId();

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (formData.honey.trim() !== '') {
      return;
    }

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.subject.trim() ||
      formData.message.trim().length < 10
    ) {
      setFormErrorMsg(
        'Please complete all required fields. The message requires at least 10 characters.'
      );
      return;
    }

    setFormErrorMsg('');
    setFormStatus('sending');

    try {
      const response = await fetch(contact.formSubmitEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          _replyto: formData.email.trim(),
          subject: formData.subject.trim(),
          _subject: `Portfolio Inquiry — ${formData.subject.trim()}`,
          message: formData.message.trim(),
          _captcha: 'false',
        }),
      });

      const data = await response.json().catch(() => null);

      if (
        (data && (data.success === 'true' || data.success === true)) ||
        (response.ok && response.status === 200)
      ) {
        setFormStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '', honey: '' });
      } else if (data && data.message && data.message.toLowerCase().includes('activation')) {
        setFormStatus('activation_required');
      } else {
        const errorDetail =
          data?.message ||
          (response.status ? `Error status ${response.status}` : 'Submission failed');
        throw new Error(errorDetail);
      }
    } catch (error: unknown) {
      setFormStatus('error');
      setFormErrorMsg(
        error instanceof Error
          ? error.message
          : 'A network error occurred while transmitting your message.'
      );
    }
  };

  const mailtoFallbackUrl = `mailto:${contact.recipientEmail}?subject=${encodeURIComponent(
    formData.subject || 'Portfolio Inquiry'
  )}&body=${encodeURIComponent(
    `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
  )}`;

  return (
    <section
      id="contact"
      className="manga-chapter chapter-cut-final relative z-[16] scroll-mt-12 bg-[#060608] text-[#ECECF0]"
    >
      {/* One-shot 220ms hairline lightning flash along the diagonal pitch-ink cut */}
      <div data-cut aria-hidden="true" className="chapter-cut-arc pointer-events-none">
        <MangaThunder tone="paper" variant="slash" mode="cut" className="chapter-cut-thunder" />
      </div>

      {/* Back Layer: Subtle Radial Speedlines & Masthead-Scoped Closing Watermark */}
      <div aria-hidden="true" className="parallax-back pointer-events-none absolute inset-0 overflow-hidden">
        <div className="manga-speedlines absolute inset-0 text-[#ECECF0]" />
        <div className="absolute right-4 top-16 flex items-baseline gap-3 select-none sm:right-12 lg:right-16">
          <span className="font-kanji text-[clamp(5.5rem,13vw,11.5rem)] font-black leading-none text-[#ECECF0]/[0.065]">
            終
          </span>
          <span className="font-display text-[clamp(7.5rem,18vw,16rem)] leading-none text-[#ECECF0]/[0.035]">
            05
          </span>
        </div>
      </div>

      <div className="container-site relative z-10">
        {/* Final Spread Masthead */}
        <div className="mb-14 sm:mb-20">
          <div className="parallax-front mb-4 inline-block">
            <span className="inline-flex items-center gap-2">
              <span className="inline-block -rotate-2 bg-[#584CE6] px-3 py-1 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-white">
                FINAL SPREAD // CONTACT
              </span>
              <span aria-hidden="true" className="kanji-stamp font-kanji">
                終
              </span>
            </span>
          </div>

          <h2
            data-cut
            className="parallax-mid text-[clamp(2.5rem,6.5vw,5.6rem)] uppercase tracking-[-0.035em] text-[#ECECF0]"
          >
            <span className="line-mask">
              <span className="line-rise">{contact.heading}</span>
            </span>
          </h2>
        </div>

        <div className="grid gap-14 lg:grid-cols-12 lg:items-start lg:gap-16">
          {/* Left Column: Editorial Dispatch Copy */}
          <div data-cut className="lg:col-span-5">
            <div className="reveal-slice">
              <p className="text-base leading-[1.65] text-[#A6A6B2]">
                {contact.subheading}
              </p>

              <div className="mt-8 border-l-2 border-[#584CE6] pl-5">
                <span className="mono-stamp text-[#584CE6]">ORIGIN // TIMEZONE</span>
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.08em] text-[#ECECF0]">
                  {personal.location} · WIB (UTC+7)
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Preserved FormSubmit AJAX Form */}
          <div data-cut className="lg:col-span-7">
            <form onSubmit={handleFormSubmit} noValidate className="reveal-slice">
              <div
                className="honeypot absolute h-0 w-0 overflow-hidden opacity-0"
                aria-hidden="true"
              >
                <label htmlFor="honey">Leave blank</label>
                <input
                  id="honey"
                  name="_honey"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.honey}
                  onChange={(event) => setFormData({ ...formData, honey: event.target.value })}
                />
              </div>

              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <label htmlFor={nameInputId} className="mono-stamp block text-[#A6A6B2]">
                    01 // Name <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id={nameInputId}
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Jane Doe"
                    className="ink-input"
                    value={formData.name}
                    onChange={(event) =>
                      setFormData({ ...formData, name: event.target.value })
                    }
                  />
                </div>

                <div>
                  <label htmlFor={emailInputId} className="mono-stamp block text-[#A6A6B2]">
                    02 // Email <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id={emailInputId}
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="jane@example.com"
                    className="ink-input"
                    value={formData.email}
                    onChange={(event) =>
                      setFormData({ ...formData, email: event.target.value })
                    }
                  />
                </div>
              </div>

              <div className="mt-8">
                <label htmlFor={subjectInputId} className="mono-stamp block text-[#A6A6B2]">
                  03 // Subject <span aria-hidden="true">*</span>
                </label>
                <input
                  id={subjectInputId}
                  name="subject"
                  type="text"
                  required
                  placeholder="Project inquiry / Internship"
                  className="ink-input"
                  value={formData.subject}
                  onChange={(event) =>
                    setFormData({ ...formData, subject: event.target.value })
                  }
                />
              </div>

              <div className="mt-8">
                <div className="flex items-baseline justify-between gap-4">
                  <label htmlFor={messageInputId} className="mono-stamp text-[#A6A6B2]">
                    04 // Message <span aria-hidden="true">*</span>
                  </label>
                  <span id={messageHelpId} className="mono-stamp text-[#A6A6B2]">
                    {formData.message.length} / 10+
                  </span>
                </div>
                <textarea
                  id={messageInputId}
                  name="message"
                  required
                  rows={4}
                  aria-describedby={messageHelpId}
                  placeholder="Write your message..."
                  className="ink-input resize-y"
                  value={formData.message}
                  onChange={(event) =>
                    setFormData({ ...formData, message: event.target.value })
                  }
                />
              </div>

              {formErrorMsg && (
                <div
                  role="alert"
                  className="mt-6 border-l-2 border-[#584CE6] bg-[#101015] px-4 py-3 font-mono text-xs text-[#ECECF0]"
                >
                  {formErrorMsg}
                </div>
              )}

              {formStatus === 'success' && (
                <div
                  role="status"
                  className="mt-6 border-l-2 border-[#584CE6] bg-[#101015] px-4 py-3 font-mono text-xs text-[#ECECF0]"
                >
                  Message transmitted successfully to Hanan&apos;s inbox.
                </div>
              )}

              {formStatus === 'activation_required' && (
                <div
                  role="status"
                  className="mt-6 border-l-2 border-[#584CE6] bg-[#101015] px-4 py-3 text-xs text-[#ECECF0]"
                >
                  <p className="font-mono">FormSubmit activation pending.</p>
                  <a
                    href={mailtoFallbackUrl}
                    className="mt-2 inline-block font-mono font-semibold text-[#584CE6] underline"
                  >
                    Send via mail client ↗
                  </a>
                </div>
              )}

              {formStatus === 'error' && (
                <div
                  role="alert"
                  className="mt-6 border-l-2 border-[#584CE6] bg-[#101015] px-4 py-3 text-xs text-[#ECECF0]"
                >
                  <p className="font-mono">Unable to transmit via FormSubmit.</p>
                  <a
                    href={mailtoFallbackUrl}
                    className="mt-2 inline-block font-mono font-semibold text-[#584CE6] underline"
                  >
                    Open default mail client ↗
                  </a>
                </div>
              )}

              <div className="mt-9 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className="btn-beat-light disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span>{formStatus === 'sending' ? 'Transmitting...' : 'Send Message'}</span>
                  <span className="beat-arrow" aria-hidden="true">→</span>
                </button>

                <a
                  href={mailtoFallbackUrl}
                  className="mono-stamp text-[#A6A6B2] hover:text-[#584CE6]"
                >
                  Mailto Fallback ↗
                </a>
              </div>
            </form>
          </div>
        </div>

        {/* Seamless Closing Footer Inside the #060608 Final Spread */}
        <Footer />
      </div>
    </section>
  );
}

export default Contact;
