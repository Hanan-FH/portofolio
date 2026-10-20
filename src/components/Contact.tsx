import { useState, useId } from 'react';
import { portfolioData } from '../data/portfolio';

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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.honey.trim() !== '') {
      return; // Anti-bot honeypot caught silently
    }

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.subject.trim() ||
      formData.message.trim().length < 10
    ) {
      setFormErrorMsg('Please fill in all required fields (message must be at least 10 characters).');
      return;
    }

    setFormErrorMsg('');
    setFormStatus('sending');

    try {
      const res = await fetch(contact.formSubmitEndpoint, {
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

      const data = await res.json().catch(() => null);

      if (
        (data && (data.success === 'true' || data.success === true)) ||
        (res.ok && res.status === 200)
      ) {
        setFormStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '', honey: '' });
      } else if (data && data.message && data.message.toLowerCase().includes('activation')) {
        setFormStatus('activation_required');
      } else {
        const errorDetail =
          data?.message || (res.status ? `Error status ${res.status}` : 'Submission failed');
        throw new Error(errorDetail);
      }
    } catch (err: unknown) {
      setFormStatus('error');
      const msg =
        err instanceof Error ? err.message : 'A network error occurred while submitting your message.';
      setFormErrorMsg(msg);
    }
  };

  const mailtoFallbackUrl = `mailto:${contact.recipientEmail}?subject=${encodeURIComponent(
    formData.subject || 'Portfolio Inquiry'
  )}&body=${encodeURIComponent(
    `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
  )}`;

  return (
    <section id="contact" className="section-container">
      <div className="section-header">
        <span className="section-eyebrow">// 05 · CONTACT</span>
        <h2 className="section-heading">{contact.heading}</h2>
      </div>

      <div className="contact-layout">
        <div className="contact-info-panel">
          <p className="contact-subheading">{contact.subheading}</p>

          <div className="contact-methods">
            <div className="contact-method-card">
              <span className="method-label">DIRECT EMAIL</span>
              <a
                href={`mailto:${contact.recipientEmail}?subject=Portfolio%20Inquiry`}
                className="email-link"
                aria-label={`Send direct email to ${contact.recipientEmail}`}
              >
                <span>{contact.recipientEmail}</span>
                <span className="link-arrow" aria-hidden="true">↗</span>
              </a>
            </div>

            <div className="contact-method-card">
              <span className="method-label">LOCATION &amp; TIMEZONE</span>
              <div className="method-value">
                <span>{personal.location}</span>
                <span className="timezone-tag">WIB (UTC+7)</span>
              </div>
            </div>

            <div className="contact-method-card">
              <span className="method-label">PROFILES</span>
              <div className="social-links-row">
                {social.github && (
                  <a
                    href={social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-badge"
                  >
                    <span>GitHub</span>
                    <span className="link-arrow" aria-hidden="true">↗</span>
                  </a>
                )}
                {social.linkedin && (
                  <a
                    href={social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-badge"
                  >
                    <span>LinkedIn</span>
                    <span className="link-arrow" aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form-panel">
          <form className="contact-form" onSubmit={handleFormSubmit} noValidate>
            {/* Anti-spam honeypot */}
            <div className="honeypot" aria-hidden="true">
              <label htmlFor="honey">Leave blank</label>
              <input
                id="honey"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={formData.honey}
                onChange={(e) => setFormData({ ...formData, honey: e.target.value })}
              />
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor={nameInputId} className="field-label">
                  Your Name <span className="required-star">*</span>
                </label>
                <input
                  id={nameInputId}
                  name="name"
                  type="text"
                  required
                  placeholder="e.g. Jane Doe"
                  className="field-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-field">
                <label htmlFor={emailInputId} className="field-label">
                  Your Email Address <span className="required-star">*</span>
                </label>
                <input
                  id={emailInputId}
                  name="email"
                  type="email"
                  required
                  placeholder="e.g. jane@example.com"
                  className="field-input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor={subjectInputId} className="field-label">
                Subject <span className="required-star">*</span>
              </label>
              <input
                id={subjectInputId}
                name="subject"
                type="text"
                required
                placeholder="e.g. Internship Inquiry / Project Collaboration"
                className="field-input"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />
            </div>

            <div className="form-field">
              <label htmlFor={messageInputId} className="field-label">
                Message <span className="required-star">*</span>
              </label>
              <textarea
                id={messageInputId}
                name="message"
                required
                rows={5}
                placeholder="Briefly describe your inquiry, project scope, or opportunity..."
                className="field-textarea"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            {formErrorMsg && formStatus !== 'activation_required' && formStatus !== 'error' && (
              <div className="form-alert alert-error" role="alert" aria-live="polite">
                {formErrorMsg}
              </div>
            )}

            {formStatus === 'activation_required' && (
              <div className="form-alert alert-warning" role="alert" aria-live="polite">
                <div className="alert-header">Form Activation Required</div>
                <p className="alert-text">
                  FormSubmit has sent a one-time verification link to <strong>{contact.recipientEmail}</strong>.
                  Once activated, messages will deliver automatically. You can also send directly:
                </p>
                <a href={mailtoFallbackUrl} className="btn-secondary btn-sm">
                  Send via Email Client ↗
                </a>
              </div>
            )}

            {formStatus === 'success' && (
              <div className="form-alert alert-success" role="status" aria-live="polite">
                ✓ Your message has been dispatched successfully. Thank you for reaching out!
              </div>
            )}

            {formStatus === 'error' && (
              <div className="form-alert alert-error" role="alert" aria-live="polite">
                <div className="alert-header">Submission Error</div>
                <p className="alert-text">
                  {formErrorMsg || 'A problem occurred while transmitting your message.'}
                </p>
                <a href={mailtoFallbackUrl} className="btn-secondary btn-sm">
                  Send via Direct Email App ↗
                </a>
              </div>
            )}

            <button
              type="submit"
              className="btn-submit"
              disabled={formStatus === 'sending'}
            >
              {formStatus === 'sending' ? (
                <span>Transmitting Message...</span>
              ) : formStatus === 'success' ? (
                <span>Message Dispatched ✓</span>
              ) : (
                <>
                  <span>Send Message</span>
                  <span className="btn-arrow" aria-hidden="true">→</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
