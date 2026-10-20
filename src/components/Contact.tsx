import { useId, useState } from 'react';
import { portfolioData } from '../data/portfolio';
import { Section, SectionHeading } from './ui/Section';

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
      return; // Anti-bot honeypot caught silently
    }

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.subject.trim() ||
      formData.message.trim().length < 10
    ) {
      setFormErrorMsg(
        'Please fill in all required fields. The message needs at least 10 characters.'
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
          _subject: `New Portfolio Contact — ${formData.subject.trim()}`,
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
          : 'A network error occurred while submitting your message.'
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
        <SectionHeading index="05" label="Contact" note="WIB · UTC+7" />

        <div className="mt-10 grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <h2 className="text-statement font-medium text-paper">{contact.heading}</h2>
            <p className="mt-6 max-w-[24rem] text-[0.98rem] leading-[1.75] text-mist">
              {contact.subheading}
            </p>

            <a
              href={`mailto:${contact.recipientEmail}?subject=Portfolio%20Inquiry`}
              className="mt-10 inline-block break-all border-b border-line-strong pb-1 text-lg font-medium text-paper transition-colors duration-200 hover:border-signal hover:text-signal sm:text-xl"
              aria-label={`Send an email to ${contact.recipientEmail}`}
            >
              {contact.recipientEmail}
              <span className="ml-2 text-signal" aria-hidden="true">
                ↗
              </span>
            </a>

            <dl className="mt-12 border-t border-line">
              <div className="grid grid-cols-[7rem_1fr] gap-4 border-b border-line/70 py-4">
                <dt className="meta-label">Location</dt>
                <dd className="text-sm text-mist">{personal.location}</dd>
              </div>
              <div className="grid grid-cols-[7rem_1fr] gap-4 py-4">
                <dt className="meta-label">Timezone</dt>
                <dd className="text-sm text-mist">WIB (UTC+7)</dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <form
              className="border-t border-line pt-6"
              onSubmit={handleFormSubmit}
              noValidate
            >
              <h3 className="meta-label mb-7">Send a message</h3>

              <div className="honeypot absolute h-0 w-0 overflow-hidden opacity-0" aria-hidden="true">
                <label htmlFor="honey">Leave blank</label>
                <input
                  id="honey"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.honey}
                  onChange={(event) => setFormData({ ...formData, honey: event.target.value })}
                />
              </div>

              <div className="grid gap-7 sm:grid-cols-2">
                <div>
                  <label htmlFor={nameInputId} className="field-label">
                    Your name <span className="text-signal" aria-hidden="true">*</span>
                  </label>
                  <input
                    id={nameInputId}
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Jane Doe"
                    className="field"
                    value={formData.name}
                    onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor={emailInputId} className="field-label">
                    Email address <span className="text-signal" aria-hidden="true">*</span>
                  </label>
                  <input
                    id={emailInputId}
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="jane@example.com"
                    className="field"
                    value={formData.email}
                    onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                  />
                </div>
              </div>

              <div className="mt-7">
                <label htmlFor={subjectInputId} className="field-label">
                  Subject <span className="text-signal" aria-hidden="true">*</span>
                </label>
                <input
                  id={subjectInputId}
                  name="subject"
                  type="text"
                  required
                  placeholder="Project inquiry / Internship opportunity"
                  className="field"
                  value={formData.subject}
                  onChange={(event) => setFormData({ ...formData, subject: event.target.value })}
                />
              </div>

              <div className="mt-7">
                <div className="flex items-baseline justify-between gap-4">
                  <label htmlFor={messageInputId} className="field-label">
                    Message <span className="text-signal" aria-hidden="true">*</span>
                  </label>
                  <span id={messageHelpId} className="font-mono text-[0.62rem] text-dim">
                    {formData.message.length} chars (min 10)
                  </span>
                </div>
                <textarea
                  id={messageInputId}
                  name="message"
                  required
                  rows={5}
                  aria-describedby={messageHelpId}
                  placeholder="Tell me about your project, timeline, or inquiry..."
                  className="field resize-y"
                  value={formData.message}
                  onChange={(event) => setFormData({ ...formData, message: event.target.value })}
                />
              </div>

              {formErrorMsg && (
                <div
                  role="alert"
                  className="mt-6 border-l-2 border-danger bg-danger/10 px-4 py-3 text-sm text-paper"
                >
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-danger">
                    Validation Notice
                  </p>
                  <p className="mt-1 text-xs text-mist">{formErrorMsg}</p>
                </div>
              )}

              {formStatus === 'success' && (
                <div
                  role="status"
                  className="mt-6 border-l-2 border-success bg-success/10 px-4 py-3 text-sm text-paper"
                >
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-success">
                    Message transmitted
                  </p>
                  <p className="mt-1 text-xs text-mist">
                    Thank you. Your message has been sent directly to Hanan&apos;s inbox.
                  </p>
                </div>
              )}

              {formStatus === 'activation_required' && (
                <div
                  role="status"
                  className="mt-6 border-l-2 border-signal bg-signal/10 px-4 py-3 text-sm text-paper"
                >
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-signal">
                    Activation link needed
                  </p>
                  <p className="mt-1 text-xs text-mist">
                    FormSubmit requires a one-time activation. Please contact directly via email in
                    the meantime.
                  </p>
                  <a
                    href={mailtoFallbackUrl}
                    className="mt-3 inline-block font-mono text-xs text-signal underline"
                  >
                    Send message via email client ↗
                  </a>
                </div>
              )}

              {formStatus === 'error' && (
                <div
                  role="alert"
                  className="mt-6 border-l-2 border-danger bg-danger/10 px-4 py-3 text-sm text-paper"
                >
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-danger">
                    Submission error
                  </p>
                  <p className="mt-1 text-xs text-mist">
                    Unable to submit through FormSubmit. Please use the direct mailto fallback below.
                  </p>
                  <a
                    href={mailtoFallbackUrl}
                    className="mt-3 inline-block font-mono text-xs text-signal underline"
                  >
                    Open in default mail client ↗
                  </a>
                </div>
              )}

              <div className="mt-9 flex flex-wrap items-center gap-5">
                <button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className="btn-solid disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {formStatus === 'sending' ? 'Transmitting…' : 'Send message'}
                  <span className="link-arrow" aria-hidden="true">
                    ↗
                  </span>
                </button>

                <a
                  href={mailtoFallbackUrl}
                  className="font-mono text-xs text-dim transition-colors hover:text-signal"
                >
                  Send via mail client instead ↗
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
