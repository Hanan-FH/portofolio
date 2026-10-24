import { useId, useState } from 'react';
import { portfolioData } from '../../data/portfolio';
import { CloudHorizonSilhouette } from '../atmosphere/KatawareSkyBackdrop';
import { Section, SectionHeading } from '../ui/Section';

export function Contact() {
  const { contact, personal, social } = portfolioData;

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
      return; // Anti-bot honeypot caught silently
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
          data?.message || (response.status ? `Error status ${response.status}` : 'Submission failed');
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
    <div className="relative">
      {/* Crepuscular Cloud Silhouette Transition into Starfield Zenith Night */}
      <CloudHorizonSilhouette variant="nightfall" />

      <div
        className="relative"
        style={{
          background:
            'linear-gradient(180deg, rgba(7, 10, 24, 0.94) 0%, #070a18 35%, #070a18 100%)',
        }}
      >
        <Section id="contact">
          <div className="container-site">
            <SectionHeading
              index="05"
              label="Nightfall Contact Terminal"
              kanji="星夜の通信"
              note="WIB · UTC+7"
            />

            <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-12">
              {/* Left Column: Authentic Contact Copy, Email & Official Social Channels */}
              <div className="lg:col-span-5">
                <h2 className="editorial-heading text-3xl font-semibold text-white sm:text-4xl">
                  {contact.heading}
                </h2>

                <p className="mt-5 text-[1.02rem] leading-[1.82] text-slate-200/90">
                  {contact.subheading}
                </p>

                <div className="crepuscular-card mt-8 rounded-2xl p-6">
                  <span className="astro-label">Primary Dispatch Channel</span>
                  <a
                    href={`mailto:${contact.recipientEmail}?subject=Portfolio%20Inquiry`}
                    aria-label={`Send an email directly to ${contact.recipientEmail}`}
                    className="mt-2.5 block break-all font-mono text-lg font-medium text-white transition-colors hover:text-amber-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 sm:text-xl"
                  >
                    {contact.recipientEmail}
                    <span className="ml-2 text-sky-300" aria-hidden="true">
                      ↗
                    </span>
                  </a>

                  <dl className="mt-6 divide-y divide-white/10 border-t border-white/10 text-xs">
                    <div className="flex items-center justify-between py-3">
                      <dt className="astro-meta">Base</dt>
                      <dd className="font-mono text-slate-200">{personal.location}</dd>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <dt className="astro-meta">Timezone</dt>
                      <dd className="font-mono text-slate-200">WIB · UTC+7</dd>
                    </div>
                  </dl>

                  {/* Official Social Profiles */}
                  <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-white/10 pt-5">
                    {social.github && (
                      <a
                        href={social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="twilight-badge inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] text-slate-100 hover:text-sky-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                      >
                        <span>GitHub</span>
                        <span aria-hidden="true">↗</span>
                      </a>
                    )}

                    {social.linkedin && (
                      <a
                        href={social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="twilight-badge inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] text-slate-100 hover:text-pink-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                      >
                        <span>LinkedIn</span>
                        <span aria-hidden="true">↗</span>
                      </a>
                    )}

                    <a
                      href={social.email}
                      className="twilight-badge inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] text-slate-100 hover:text-amber-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                    >
                      <span>Email</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column: Preserved FormSubmit AJAX Terminal */}
              <div className="lg:col-span-7">
                <div className="crepuscular-card rounded-3xl p-6 sm:p-9">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="astro-label">Celestial Transmission Form</span>
                    <span className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-sky-300">
                      FormSubmit // AJAX
                    </span>
                  </div>

                  <form className="mt-7" onSubmit={handleFormSubmit} noValidate>
                    {/* Anti-bot honeypot preserved */}
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

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor={nameInputId} className="field-label">
                          Your Name <span className="text-rose-400" aria-hidden="true">*</span>
                        </label>
                        <input
                          id={nameInputId}
                          name="name"
                          type="text"
                          required
                          autoComplete="name"
                          placeholder="Jane Doe"
                          className="field-twilight"
                          value={formData.name}
                          onChange={(event) =>
                            setFormData({ ...formData, name: event.target.value })
                          }
                        />
                      </div>

                      <div>
                        <label htmlFor={emailInputId} className="field-label">
                          Email Address <span className="text-rose-400" aria-hidden="true">*</span>
                        </label>
                        <input
                          id={emailInputId}
                          name="email"
                          type="email"
                          required
                          autoComplete="email"
                          placeholder="jane@example.com"
                          className="field-twilight"
                          value={formData.email}
                          onChange={(event) =>
                            setFormData({ ...formData, email: event.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div className="mt-6">
                      <label htmlFor={subjectInputId} className="field-label">
                        Subject Line <span className="text-rose-400" aria-hidden="true">*</span>
                      </label>
                      <input
                        id={subjectInputId}
                        name="subject"
                        type="text"
                        required
                        placeholder="Project inquiry / Software engineering internship"
                        className="field-twilight"
                        value={formData.subject}
                        onChange={(event) =>
                          setFormData({ ...formData, subject: event.target.value })
                        }
                      />
                    </div>

                    <div className="mt-6">
                      <div className="flex items-baseline justify-between gap-4">
                        <label htmlFor={messageInputId} className="field-label">
                          Message Body <span className="text-rose-400" aria-hidden="true">*</span>
                        </label>
                        <span id={messageHelpId} className="font-mono text-[0.65rem] text-slate-400">
                          {formData.message.length} chars (min 10)
                        </span>
                      </div>
                      <textarea
                        id={messageInputId}
                        name="message"
                        required
                        rows={5}
                        aria-describedby={messageHelpId}
                        placeholder="Detail your requirements, project scope, or opportunity..."
                        className="field-twilight resize-y"
                        value={formData.message}
                        onChange={(event) =>
                          setFormData({ ...formData, message: event.target.value })
                        }
                      />
                    </div>

                    {/* Accessible Status Feedback */}
                    {formErrorMsg && (
                      <div
                        role="alert"
                        className="mt-6 rounded-xl border border-rose-400/40 bg-rose-500/10 px-4 py-3 text-sm text-white"
                      >
                        <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-rose-300">
                          Validation Notice
                        </p>
                        <p className="mt-1 text-xs text-slate-200">{formErrorMsg}</p>
                      </div>
                    )}

                    {formStatus === 'success' && (
                      <div
                        role="status"
                        className="mt-6 rounded-xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-3 text-sm text-white"
                      >
                        <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-emerald-300">
                          Transmission Confirmed
                        </p>
                        <p className="mt-1 text-xs text-slate-200">
                          Thank you. Your message was successfully dispatched directly to Hanan&apos;s inbox.
                        </p>
                      </div>
                    )}

                    {formStatus === 'activation_required' && (
                      <div
                        role="status"
                        className="mt-6 rounded-xl border border-sky-400/40 bg-sky-500/10 px-4 py-3 text-sm text-white"
                      >
                        <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-sky-300">
                          Endpoint Activation Pending
                        </p>
                        <p className="mt-1 text-xs text-slate-200">
                          FormSubmit requires a one-time activation. Please connect directly via email in the meantime.
                        </p>
                        <a
                          href={mailtoFallbackUrl}
                          className="mt-2.5 inline-block font-mono text-xs text-amber-200 underline focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                        >
                          Dispatch via default email client ↗
                        </a>
                      </div>
                    )}

                    {formStatus === 'error' && (
                      <div
                        role="alert"
                        className="mt-6 rounded-xl border border-rose-400/40 bg-rose-500/10 px-4 py-3 text-sm text-white"
                      >
                        <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-rose-300">
                          Transmission Fault
                        </p>
                        <p className="mt-1 text-xs text-slate-200">
                          Unable to transmit via FormSubmit. Please use the direct email fallback link below.
                        </p>
                        <a
                          href={mailtoFallbackUrl}
                          className="mt-2.5 inline-block font-mono text-xs text-amber-200 underline focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                        >
                          Open in default mail client ↗
                        </a>
                      </div>
                    )}

                    <div className="mt-8 flex flex-wrap items-center gap-5">
                      <button
                        type="submit"
                        disabled={formStatus === 'sending'}
                        className="btn-comet disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <span>
                          {formStatus === 'sending' ? 'Transmitting Message…' : 'Send Message'}
                        </span>
                        <span className="link-arrow" aria-hidden="true">
                          ↗
                        </span>
                      </button>

                      <a
                        href={mailtoFallbackUrl}
                        className="inline-flex min-h-10 items-center rounded-full px-3 font-mono text-xs uppercase tracking-[0.16em] text-slate-300 transition-colors hover:text-amber-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                      >
                        Fallback to mail client ↗
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}

export default Contact;
