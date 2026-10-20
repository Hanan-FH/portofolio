import { useId, useState } from 'react';
import { portfolioData } from '../data/portfolio';
import { Section, SectionHeading } from './ui/Section';

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

            <div className="mt-8 flex flex-wrap items-center gap-6">
              {social.github && (
                <a
                  href={social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-sm text-mist transition-colors hover:text-signal"
                  aria-label="GitHub profile (opens in a new tab)"
                >
                  GitHub
                  <span className="link-arrow text-dim group-hover:text-signal" aria-hidden="true">
                    ↗
                  </span>
                </a>
              )}
              {social.linkedin && (
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-sm text-mist transition-colors hover:text-signal"
                  aria-label="LinkedIn profile (opens in a new tab)"
                >
                  LinkedIn
                  <span className="link-arrow text-dim group-hover:text-signal" aria-hidden="true">
                    ↗
                  </span>
                </a>
              )}
            </div>

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
                    inputMode="email"
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
                  placeholder="Internship inquiry, collaboration, or project question"
                  className="field"
                  value={formData.subject}
                  onChange={(event) => setFormData({ ...formData, subject: event.target.value })}
                />
              </div>

              <div className="mt-7">
                <label htmlFor={messageInputId} className="field-label">
                  Message <span className="text-signal" aria-hidden="true">*</span>
                </label>
                <textarea
                  id={messageInputId}
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me briefly what you have in mind."
                  className="field min-h-[9rem] resize-y"
                  aria-describedby={messageHelpId}
                  value={formData.message}
                  onChange={(event) => setFormData({ ...formData, message: event.target.value })}
                />
                <p id={messageHelpId} className="mt-2 font-mono text-[0.6rem] text-dim">
                  Minimum 10 characters.
                </p>
              </div>

              {formErrorMsg && formStatus !== 'activation_required' && formStatus !== 'error' && (
                <div
                  className="mt-6 border-l-2 border-danger bg-danger/5 px-4 py-3 text-sm text-danger"
                  role="alert"
                  aria-live="polite"
                >
                  {formErrorMsg}
                </div>
              )}

              {formStatus === 'activation_required' && (
                <div
                  className="mt-6 border-l-2 border-signal bg-signal-soft px-4 py-4 text-sm"
                  role="alert"
                  aria-live="polite"
                >
                  <p className="font-medium text-paper">Form activation required</p>
                  <p className="mt-1 text-mist">
                    FormSubmit has sent a one-time verification link to{' '}
                    <strong className="font-medium text-paper">{contact.recipientEmail}</strong>. Once
                    activated, messages will deliver automatically. You can also send directly:
                  </p>
                  <a href={mailtoFallbackUrl} className="btn-quiet mt-3 text-xs">
                    Send via email client
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              )}

              {formStatus === 'success' && (
                <div
                  className="mt-6 border-l-2 border-success bg-success/5 px-4 py-3 text-sm text-success"
                  role="status"
                  aria-live="polite"
                >
                  Your message has been sent. Thank you for reaching out.
                </div>
              )}

              {formStatus === 'error' && (
                <div
                  className="mt-6 border-l-2 border-danger bg-danger/5 px-4 py-4 text-sm"
                  role="alert"
                  aria-live="polite"
                >
                  <p className="font-medium text-danger">Submission error</p>
                  <p className="mt-1 text-mist">
                    {formErrorMsg || 'A problem occurred while sending your message.'}
                  </p>
                  <a href={mailtoFallbackUrl} className="btn-quiet mt-3 text-xs">
                    Send via email client
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              )}

              <div className="mt-8 flex flex-wrap items-center gap-5">
                <button
                  type="submit"
                  className="btn-solid disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={formStatus === 'sending'}
                >
                  {formStatus === 'sending' ? (
                    'Sending…'
                  ) : formStatus === 'success' ? (
                    'Message sent'
                  ) : (
                    <>
                      Send message
                      <span className="link-arrow" aria-hidden="true">
                        ↗
                      </span>
                    </>
                  )}
                </button>
                <a
                  href={`mailto:${contact.recipientEmail}`}
                  className="text-xs text-dim transition-colors hover:text-signal"
                >
                  Or email directly ↗
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
