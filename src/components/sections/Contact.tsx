import { useId, useState } from 'react';
import { portfolioData } from '../../data/portfolio';
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
    <Section id="contact" defer>
      <div className="container-site">
        <SectionHeading
          index="05"
          label="CONTACT"
          title={contact.heading}
          note="WIB // UTC+7"
        />

        <div data-reveal className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
          {/* Left Column: Direct Dispatch Card & Authentic Social Channels */}
          <div className="lg:col-span-5">
            <p className="text-base leading-[1.65] text-[var(--ink-secondary)]">
              {contact.subheading}
            </p>

            <div className="manga-card mt-8 overflow-hidden">
              <div className="halftone-surface border-b-[1.5px] border-[var(--border-strong)] bg-[var(--bg-primary)] px-5 py-3">
                <span className="mono-label font-semibold text-[var(--ink-primary)]">
                  DIRECT CHANNEL // EMAIL
                </span>
              </div>

              <div className="p-5 sm:p-6">
                <a
                  href={`mailto:${contact.recipientEmail}?subject=Portfolio%20Inquiry`}
                  aria-label={`Send an email directly to ${contact.recipientEmail}`}
                  className="block break-all font-display text-lg uppercase text-[var(--ink-primary)] underline underline-offset-4 hover:bg-[var(--bg-inverted)] hover:text-[var(--bg-primary)] sm:text-xl"
                >
                  {contact.recipientEmail} ↗
                </a>

                <p className="mt-4 font-mono text-xs uppercase tracking-[0.08em] text-[var(--ink-muted)]">
                  {personal.location} · WIB (UTC+7)
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-2.5 border-t border-[var(--border-subtle)] pt-5">
                  {social.github && (
                    <a
                      href={social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-paper min-h-9 px-3 py-1.5"
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
                      className="btn-paper min-h-9 px-3 py-1.5"
                    >
                      <span>LinkedIn</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  )}

                  <a href={social.email} className="btn-paper min-h-9 px-3 py-1.5">
                    <span>Email</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Preserved FormSubmit AJAX Endpoint & Validation */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleFormSubmit}
              noValidate
              className="manga-card p-6 sm:p-8"
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
                  <label
                    htmlFor={nameInputId}
                    className="mono-label mb-2 block text-[var(--ink-primary)]"
                  >
                    Name <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id={nameInputId}
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Jane Doe"
                    className="editorial-input"
                    value={formData.name}
                    onChange={(event) =>
                      setFormData({ ...formData, name: event.target.value })
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor={emailInputId}
                    className="mono-label mb-2 block text-[var(--ink-primary)]"
                  >
                    Email <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id={emailInputId}
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="jane@example.com"
                    className="editorial-input"
                    value={formData.email}
                    onChange={(event) =>
                      setFormData({ ...formData, email: event.target.value })
                    }
                  />
                </div>
              </div>

              <div className="mt-5">
                <label
                  htmlFor={subjectInputId}
                  className="mono-label mb-2 block text-[var(--ink-primary)]"
                >
                  Subject <span aria-hidden="true">*</span>
                </label>
                <input
                  id={subjectInputId}
                  name="subject"
                  type="text"
                  required
                  placeholder="Project inquiry / Internship"
                  className="editorial-input"
                  value={formData.subject}
                  onChange={(event) =>
                    setFormData({ ...formData, subject: event.target.value })
                  }
                />
              </div>

              <div className="mt-5">
                <div className="mb-2 flex items-baseline justify-between gap-4">
                  <label
                    htmlFor={messageInputId}
                    className="mono-label text-[var(--ink-primary)]"
                  >
                    Message <span aria-hidden="true">*</span>
                  </label>
                  <span id={messageHelpId} className="mono-label text-[var(--ink-muted)]">
                    {formData.message.length} / 10+ CHARS
                  </span>
                </div>
                <textarea
                  id={messageInputId}
                  name="message"
                  required
                  rows={5}
                  aria-describedby={messageHelpId}
                  placeholder="Write your message..."
                  className="editorial-input resize-y"
                  value={formData.message}
                  onChange={(event) =>
                    setFormData({ ...formData, message: event.target.value })
                  }
                />
              </div>

              {formErrorMsg && (
                <div
                  role="alert"
                  className="mt-5 border-[1.5px] border-[var(--border-strong)] bg-[var(--bg-primary)] px-4 py-3 font-mono text-xs text-[var(--ink-primary)]"
                >
                  {formErrorMsg}
                </div>
              )}

              {formStatus === 'success' && (
                <div
                  role="status"
                  className="mt-5 border-[1.5px] border-[var(--border-strong)] bg-[var(--bg-inverted)] px-4 py-3 font-mono text-xs text-[var(--bg-primary)]"
                >
                  Message transmitted successfully to Hanan&apos;s inbox.
                </div>
              )}

              {formStatus === 'activation_required' && (
                <div
                  role="status"
                  className="mt-5 border-[1.5px] border-[var(--border-strong)] bg-[var(--bg-primary)] px-4 py-3 text-xs text-[var(--ink-primary)]"
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
                  className="mt-5 border-[1.5px] border-[var(--border-strong)] bg-[var(--bg-primary)] px-4 py-3 text-xs text-[var(--ink-primary)]"
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

              <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border-subtle)] pt-5">
                <button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className="btn-ink disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span>{formStatus === 'sending' ? 'Sending...' : 'Send Message'}</span>
                  <span className="btn-arrow" aria-hidden="true">
                    →
                  </span>
                </button>

                <a
                  href={mailtoFallbackUrl}
                  className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-[var(--ink-secondary)] underline underline-offset-4 hover:text-[var(--ink-primary)]"
                >
                  Direct Mailto Fallback ↗
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
