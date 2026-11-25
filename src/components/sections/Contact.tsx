import { useId, useState } from 'react';
import { portfolioData } from '../../data/portfolio';
import { RollingText } from '../ui/RollingText';
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
    <Section id="contact">
      <div className="container-site">
        <SectionHeading
          index="05"
          label="CONTACT"
          title={contact.heading}
          note="WIB / UTC+7"
        />

        <div className="grid gap-14 lg:grid-cols-12 lg:items-start lg:gap-16">
          {/* Left Column: Open Editorial Dispatch Copy & Direct Channels */}
          <div data-reveal="up" className="lg:col-span-5">
            <p className="text-base leading-[1.65] text-[var(--ink-secondary)]">
              {contact.subheading}
            </p>

            <div className="mt-10 border-t border-[var(--line-hairline)] pt-7">
              <span className="mono-index text-[var(--ink-muted)]">DIRECT ADDRESS</span>
              <a
                href={`mailto:${contact.recipientEmail}?subject=Portfolio%20Inquiry`}
                aria-label={`Send an email directly to ${contact.recipientEmail}`}
                className="roll-trigger mt-3 inline-flex max-w-full items-center gap-2 overflow-hidden font-display text-[clamp(1rem,2.4vw,1.6rem)] uppercase tracking-[-0.03em] text-[var(--ink-primary)] hover:text-[var(--accent-purple)]"
              >
                <RollingText text={contact.recipientEmail} />
                <span className="kinetic-arrow shrink-0 font-mono text-lg" aria-hidden="true">
                  ↗
                </span>
              </a>

              <p className="mt-4 mono-index text-[var(--ink-muted)]">
                {personal.location} · WIB (UTC+7)
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-[var(--line-hairline)] pt-6">
                {social.github && (
                  <a
                    href={social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-kinetic-outline min-h-10 px-4 py-2"
                  >
                    <RollingText text="GitHub" />
                    <span className="kinetic-arrow" aria-hidden="true">↗</span>
                  </a>
                )}

                {social.linkedin && (
                  <a
                    href={social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-kinetic-outline min-h-10 px-4 py-2"
                  >
                    <RollingText text="LinkedIn" />
                    <span className="kinetic-arrow" aria-hidden="true">↗</span>
                  </a>
                )}

                <a href={social.email} className="btn-kinetic-outline min-h-10 px-4 py-2">
                  <RollingText text="Email" />
                  <span className="kinetic-arrow" aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Hairline Editorial Form (Preserved FormSubmit AJAX Endpoint) */}
          <div data-reveal="wipe" className="lg:col-span-7">
            <form
              onSubmit={handleFormSubmit}
              noValidate
              className="border-t border-[var(--line-hairline)] pt-6"
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

              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor={nameInputId}
                    className="mono-index block text-[var(--ink-muted)]"
                  >
                    01 / Name <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id={nameInputId}
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Jane Doe"
                    className="editorial-field"
                    value={formData.name}
                    onChange={(event) =>
                      setFormData({ ...formData, name: event.target.value })
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor={emailInputId}
                    className="mono-index block text-[var(--ink-muted)]"
                  >
                    02 / Email <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id={emailInputId}
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="jane@example.com"
                    className="editorial-field"
                    value={formData.email}
                    onChange={(event) =>
                      setFormData({ ...formData, email: event.target.value })
                    }
                  />
                </div>
              </div>

              <div className="mt-8">
                <label
                  htmlFor={subjectInputId}
                  className="mono-index block text-[var(--ink-muted)]"
                >
                  03 / Subject <span aria-hidden="true">*</span>
                </label>
                <input
                  id={subjectInputId}
                  name="subject"
                  type="text"
                  required
                  placeholder="Project inquiry / Internship"
                  className="editorial-field"
                  value={formData.subject}
                  onChange={(event) =>
                    setFormData({ ...formData, subject: event.target.value })
                  }
                />
              </div>

              <div className="mt-8">
                <div className="flex items-baseline justify-between gap-4">
                  <label
                    htmlFor={messageInputId}
                    className="mono-index text-[var(--ink-muted)]"
                  >
                    04 / Message <span aria-hidden="true">*</span>
                  </label>
                  <span id={messageHelpId} className="mono-index text-[var(--ink-muted)]">
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
                  className="editorial-field resize-y"
                  value={formData.message}
                  onChange={(event) =>
                    setFormData({ ...formData, message: event.target.value })
                  }
                />
              </div>

              {formErrorMsg && (
                <div
                  role="alert"
                  className="mt-6 border-l-2 border-[var(--accent-purple)] bg-[var(--bg-surface)] px-4 py-3 font-mono text-xs text-[var(--ink-primary)]"
                >
                  {formErrorMsg}
                </div>
              )}

              {formStatus === 'success' && (
                <div
                  role="status"
                  className="mt-6 border-l-2 border-[var(--accent-purple)] bg-[var(--bg-surface)] px-4 py-3 font-mono text-xs text-[var(--ink-primary)]"
                >
                  Message transmitted successfully to Hanan&apos;s inbox.
                </div>
              )}

              {formStatus === 'activation_required' && (
                <div
                  role="status"
                  className="mt-6 border-l-2 border-[var(--accent-purple)] bg-[var(--bg-surface)] px-4 py-3 text-xs text-[var(--ink-primary)]"
                >
                  <p className="font-mono">FormSubmit activation pending.</p>
                  <a
                    href={mailtoFallbackUrl}
                    className="mt-2 inline-block font-mono font-semibold underline"
                  >
                    Send via mail client ↗
                  </a>
                </div>
              )}

              {formStatus === 'error' && (
                <div
                  role="alert"
                  className="mt-6 border-l-2 border-[var(--accent-purple)] bg-[var(--bg-surface)] px-4 py-3 text-xs text-[var(--ink-primary)]"
                >
                  <p className="font-mono">Unable to transmit via FormSubmit.</p>
                  <a
                    href={mailtoFallbackUrl}
                    className="mt-2 inline-block font-mono font-semibold underline"
                  >
                    Open default mail client ↗
                  </a>
                </div>
              )}

              <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className="btn-kinetic-ink disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <RollingText
                    text={formStatus === 'sending' ? 'Transmitting...' : 'Send Message'}
                  />
                  <span className="kinetic-arrow" aria-hidden="true">→</span>
                </button>

                <a
                  href={mailtoFallbackUrl}
                  className="roll-trigger inline-flex items-center gap-1.5 font-mono text-[0.72rem] uppercase tracking-[0.1em] text-[var(--ink-muted)] hover:text-[var(--ink-primary)]"
                >
                  <RollingText text="Mailto Fallback" />
                  <span className="kinetic-arrow" aria-hidden="true">↗</span>
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default Contact;
