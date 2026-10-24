import { useId, useState } from 'react';
import { portfolioData } from '../../data/portfolio';
import { CloudHorizonBank } from '../atmosphere/TwilightBackdrop';
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
      <CloudHorizonBank variant="zenith" />

      <div
        className="relative"
        style={{
          background:
            'linear-gradient(180deg, rgba(5, 7, 20, 0.92) 0%, #050714 38%, #050714 100%)',
        }}
      >
        <Section id="contact" verticalLabel="星夜の通信">
          <div className="container-site">
            <SectionHeading
              index="05"
              label="Nightfall Contact Terminal"
              kanji="星夜の通信"
              note="WIB · UTC+7"
            />

            <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-12">
              {/* Left Column: Authentic Contact Copy & Glowing Social Coordinates */}
              <div className="lg:col-span-5">
                <h2 className="mincho-editorial text-2xl text-white sm:text-3xl">
                  {contact.heading}
                </h2>

                <p className="mt-4 text-sm leading-[1.82] text-slate-300">
                  {contact.subheading}
                </p>

                <div className="rim-horizon-panel mt-8 p-5">
                  <span className="astro-coord">Direct Email</span>
                  <a
                    href={`mailto:${contact.recipientEmail}?subject=Portfolio%20Inquiry`}
                    aria-label={`Send an email directly to ${contact.recipientEmail}`}
                    className="mt-2 block break-all font-mono text-base text-white transition-opacity hover:text-amber-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 sm:text-lg"
                  >
                    {contact.recipientEmail} ↗
                  </a>

                  <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.24em] text-slate-400">
                    {personal.location} · WIB (UTC+7)
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-2.5 border-t border-white/10 pt-4">
                    {social.github && (
                      <a
                        href={social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="twilight-chip px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-slate-100 hover:text-sky-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                      >
                        GitHub ↗
                      </a>
                    )}

                    {social.linkedin && (
                      <a
                        href={social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="twilight-chip px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-slate-100 hover:text-pink-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                      >
                        LinkedIn ↗
                      </a>
                    )}

                    <a
                      href={social.email}
                      className="twilight-chip px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-slate-100 hover:text-amber-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                    >
                      Email ↗
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column: Preserved FormSubmit AJAX Handler */}
              <div className="lg:col-span-7">
                <form
                  onSubmit={handleFormSubmit}
                  noValidate
                  className="rim-horizon-panel p-6 sm:p-8"
                >
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

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor={nameInputId} className="terminal-label">
                        Name <span className="text-rose-400" aria-hidden="true">*</span>
                      </label>
                      <input
                        id={nameInputId}
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="Jane Doe"
                        className="terminal-input"
                        value={formData.name}
                        onChange={(event) =>
                          setFormData({ ...formData, name: event.target.value })
                        }
                      />
                    </div>

                    <div>
                      <label htmlFor={emailInputId} className="terminal-label">
                        Email <span className="text-rose-400" aria-hidden="true">*</span>
                      </label>
                      <input
                        id={emailInputId}
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="jane@example.com"
                        className="terminal-input"
                        value={formData.email}
                        onChange={(event) =>
                          setFormData({ ...formData, email: event.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="mt-5">
                    <label htmlFor={subjectInputId} className="terminal-label">
                      Subject <span className="text-rose-400" aria-hidden="true">*</span>
                    </label>
                    <input
                      id={subjectInputId}
                      name="subject"
                      type="text"
                      required
                      placeholder="Project inquiry / Internship"
                      className="terminal-input"
                      value={formData.subject}
                      onChange={(event) =>
                        setFormData({ ...formData, subject: event.target.value })
                      }
                    />
                  </div>

                  <div className="mt-5">
                    <div className="flex items-baseline justify-between gap-4">
                      <label htmlFor={messageInputId} className="terminal-label">
                        Message <span className="text-rose-400" aria-hidden="true">*</span>
                      </label>
                      <span id={messageHelpId} className="astro-telemetry">
                        {formData.message.length} / 10+
                      </span>
                    </div>
                    <textarea
                      id={messageInputId}
                      name="message"
                      required
                      rows={5}
                      aria-describedby={messageHelpId}
                      placeholder="Your message..."
                      className="terminal-input resize-y"
                      value={formData.message}
                      onChange={(event) =>
                        setFormData({ ...formData, message: event.target.value })
                      }
                    />
                  </div>

                  {formErrorMsg && (
                    <div
                      role="alert"
                      className="mt-5 border-l-2 border-rose-400 bg-rose-500/10 px-4 py-3 text-xs text-slate-200"
                    >
                      {formErrorMsg}
                    </div>
                  )}

                  {formStatus === 'success' && (
                    <div
                      role="status"
                      className="mt-5 border-l-2 border-emerald-400 bg-emerald-500/10 px-4 py-3 text-xs text-slate-200"
                    >
                      Message transmitted successfully to Hanan&apos;s inbox.
                    </div>
                  )}

                  {formStatus === 'activation_required' && (
                    <div
                      role="status"
                      className="mt-5 border-l-2 border-sky-400 bg-sky-500/10 px-4 py-3 text-xs text-slate-200"
                    >
                      <p>FormSubmit activation pending.</p>
                      <a
                        href={mailtoFallbackUrl}
                        className="mt-2 inline-block font-mono text-amber-200 underline"
                      >
                        Send via mail client ↗
                      </a>
                    </div>
                  )}

                  {formStatus === 'error' && (
                    <div
                      role="alert"
                      className="mt-5 border-l-2 border-rose-400 bg-rose-500/10 px-4 py-3 text-xs text-slate-200"
                    >
                      <p>Unable to transmit via FormSubmit.</p>
                      <a
                        href={mailtoFallbackUrl}
                        className="mt-2 inline-block font-mono text-amber-200 underline"
                      >
                        Open default mail client ↗
                      </a>
                    </div>
                  )}

                  <div className="mt-7 flex flex-wrap items-center gap-4">
                    <button
                      type="submit"
                      disabled={formStatus === 'sending'}
                      className="btn-tiamat disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <span>{formStatus === 'sending' ? 'Transmitting…' : 'Send Message'}</span>
                      <span className="link-arrow" aria-hidden="true">
                        ↗
                      </span>
                    </button>

                    <a
                      href={mailtoFallbackUrl}
                      className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-400 transition-opacity hover:text-amber-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                    >
                      Mailto Fallback ↗
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}

export default Contact;
