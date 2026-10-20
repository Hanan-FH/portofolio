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
    <Section id="contact">
      <div className="container-site">
        <SectionHeading index="05" label="Direct Transmission" note="WIB · UTC+7" />

        <div className="mt-12 grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Direct Coordinates */}
          <div className="lg:col-span-5">
            <h2 className="text-statement font-medium text-paper">{contact.heading}</h2>
            <p className="mt-6 max-w-[26rem] text-[1.02rem] leading-[1.8] text-mist">
              {contact.subheading}
            </p>

            <div className="mt-10">
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-signal">
                Primary Transmission Line
              </span>
              <a
                href={`mailto:${contact.recipientEmail}?subject=Portfolio%20Inquiry`}
                className="mt-2 block break-all font-mono text-xl font-medium text-paper transition-colors duration-200 hover:text-signal sm:text-2xl"
                aria-label={`Send an email directly to ${contact.recipientEmail}`}
              >
                {contact.recipientEmail}
                <span className="ml-2 text-signal" aria-hidden="true">
                  ↗
                </span>
              </a>
            </div>

            <dl className="mt-12 border-t border-line divide-y divide-line/70">
              <div className="grid grid-cols-[7.5rem_1fr] gap-4 py-4">
                <dt className="meta-label">Location</dt>
                <dd className="font-mono text-xs text-mist">{personal.location}</dd>
              </div>
              <div className="grid grid-cols-[7.5rem_1fr] gap-4 py-4">
                <dt className="meta-label">Timezone</dt>
                <dd className="font-mono text-xs text-mist">WIB (UTC+7 · Western Indonesia)</dd>
              </div>
              <div className="grid grid-cols-[7.5rem_1fr] gap-4 py-4">
                <dt className="meta-label">Response Time</dt>
                <dd className="font-mono text-xs text-signal">Within 24 Hours</dd>
              </div>
            </dl>
          </div>

          {/* Right Column: Transmission Form */}
          <div className="lg:col-span-7">
            <div className="rounded-xs border border-line bg-panel/80 p-6 shadow-2xl backdrop-blur-md sm:p-9">
              <div className="flex items-center justify-between border-b border-line pb-4 font-mono text-[0.65rem] tracking-[0.12em] text-dim">
                <span>COMMUNICATION TERMINAL</span>
                <span className="text-signal">ENCRYPTED // AJAX</span>
              </div>

              <form className="mt-7" onSubmit={handleFormSubmit} noValidate>
                {/* Anti-bot honeypot */}
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

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor={nameInputId} className="field-label">
                      Your Name <span className="text-signal" aria-hidden="true">*</span>
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
                      Email Address <span className="text-signal" aria-hidden="true">*</span>
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

                <div className="mt-6">
                  <label htmlFor={subjectInputId} className="field-label">
                    Subject Line <span className="text-signal" aria-hidden="true">*</span>
                  </label>
                  <input
                    id={subjectInputId}
                    name="subject"
                    type="text"
                    required
                    placeholder="Project inquiry / Software engineering internship"
                    className="field"
                    value={formData.subject}
                    onChange={(event) => setFormData({ ...formData, subject: event.target.value })}
                  />
                </div>

                <div className="mt-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <label htmlFor={messageInputId} className="field-label">
                      Message Body <span className="text-signal" aria-hidden="true">*</span>
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
                    placeholder="Detail your requirements, project scope, or opportunity..."
                    className="field resize-y"
                    value={formData.message}
                    onChange={(event) => setFormData({ ...formData, message: event.target.value })}
                  />
                </div>

                {/* Status Messages */}
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
                      Transmission Confirmed
                    </p>
                    <p className="mt-1 text-xs text-mist">
                      Thank you. Your message was successfully dispatched directly to Hanan&apos;s inbox.
                    </p>
                  </div>
                )}

                {formStatus === 'activation_required' && (
                  <div
                    role="status"
                    className="mt-6 border-l-2 border-signal bg-signal/10 px-4 py-3 text-sm text-paper"
                  >
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-signal">
                      Endpoint Activation Pending
                    </p>
                    <p className="mt-1 text-xs text-mist">
                      FormSubmit requires a one-time activation. Please connect directly via email in the meantime.
                    </p>
                    <a
                      href={mailtoFallbackUrl}
                      className="mt-3 inline-block font-mono text-xs text-signal underline"
                    >
                      Dispatch via default email client ↗
                    </a>
                  </div>
                )}

                {formStatus === 'error' && (
                  <div
                    role="alert"
                    className="mt-6 border-l-2 border-danger bg-danger/10 px-4 py-3 text-sm text-paper"
                  >
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-danger">
                      Transmission Fault
                    </p>
                    <p className="mt-1 text-xs text-mist">
                      Unable to transmit via FormSubmit. Please use the direct email fallback link below.
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
                    {formStatus === 'sending' ? 'Transmitting Data…' : 'Transmit Message'}
                    <span className="link-arrow text-black" aria-hidden="true">
                      ↗
                    </span>
                  </button>

                  <a
                    href={mailtoFallbackUrl}
                    className="font-mono text-xs text-dim transition-colors hover:text-signal"
                  >
                    Fallback to local mail client ↗
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default Contact;
