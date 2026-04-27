import React, { useState } from 'react';
import { Mail, MapPin, Send, Check, Loader2, Instagram } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { COMPANY_INFO, SERVICES } from '../constants';

const Contact: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const MotionDiv = motion.div as any;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    const form = e.currentTarget;
    const formData = new FormData(form);
    const json = JSON.stringify(Object.fromEntries(formData));
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${COMPANY_INFO.email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: json,
      });
      if (response.ok) { setFormStatus('success'); form.reset(); }
      else { alert('Something went wrong. Please email us directly.'); setFormStatus('idle'); }
    } catch { alert('Network error. Please try again.'); setFormStatus('idle'); }
  };

  return (
    <section id="contact" className="py-20 flex flex-col justify-center bg-transparent relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute inset-0 dot-grid opacity-20" />

      {/* Decorative */}
      <div className="absolute top-0 right-0 w-1/3 h-full pointer-events-none">
        <div className="w-full h-full border-l border-gold/5" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-gold/60" />
            <span className="text-xs font-sans font-semibold tracking-[0.3em] uppercase text-gold/70">Get In Touch</span>
          </div>
          <h2 className="font-sans text-4xl md:text-6xl font-bold text-white leading-tight">
            Let's Create Something{' '}
            <span className="text-shimmer">Extraordinary</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Contact Info */}
          <MotionDiv
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-sans text-white/40 mb-12 text-base leading-relaxed">
              Ready to elevate your brand? We are available for freelance projects and long-term partnerships.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-5">
                <div className="w-10 h-10 bg-gold/10 border border-gold/15 rounded-sm flex items-center justify-center flex-shrink-0">
                  <Mail className="text-gold" size={16} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-sans font-semibold text-white mb-1 text-sm tracking-wide">Email Us</h3>
                  <a href={`mailto:${COMPANY_INFO.email}`} className="font-sans text-white/40 hover:text-gold transition-colors text-sm">
                    {COMPANY_INFO.email}
                  </a>
                  <p className="text-xs text-white/20 mt-1 font-sans">Reply within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-10 h-10 bg-gold/10 border border-gold/15 rounded-sm flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-gold" size={16} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-sans font-semibold text-white mb-1 text-sm tracking-wide">Location</h3>
                  <p className="font-sans text-white/40 text-sm">{COMPANY_INFO.location}</p>
                  <p className="font-sans text-white/25 text-xs mt-0.5">{COMPANY_INFO.locationSecondary}</p>
                </div>
              </div>
              <a 
                href="https://www.instagram.com/editing__desk/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-start gap-5 group cursor-pointer"
              >
                <div className="w-10 h-10 bg-gold/10 border border-gold/15 rounded-sm flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-all">
                  <Instagram className="text-gold group-hover:scale-110 transition-transform duration-300" size={16} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-sans font-semibold text-white mb-1 text-sm tracking-wide group-hover:text-gold transition-colors">Instagram</h3>
                  <p className="font-sans text-white/40 text-sm group-hover:text-white/60 transition-colors">Follow us on instagram</p>
                </div>
              </a>
            </div>


          </MotionDiv>

          {/* Form */}
          <MotionDiv
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative bg-ink-2 border border-gold/10 rounded-sm p-8 min-h-[520px]"
          >
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-gold/30" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-gold/30" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-gold/30" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-gold/30" />

            <AnimatePresence mode="wait">
              {formStatus === 'success' ? (
                <MotionDiv
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    className="w-16 h-16 bg-gold rounded-sm flex items-center justify-center mb-6 glow-gold"
                  >
                    <Check className="text-ink w-8 h-8" strokeWidth={3} />
                  </motion.div>
                  <h3 className="font-sans text-2xl font-bold text-white mb-2">Message Sent</h3>
                  <p className="font-sans text-white/40 text-sm mb-8 max-w-xs leading-relaxed">
                    Thank you for reaching out. We'll get back to you shortly.
                  </p>
                  <button
                    onClick={() => setFormStatus('idle')}
                    className="px-6 py-2.5 border border-gold/30 text-gold text-sm font-sans font-medium hover:bg-gold/5 transition-colors rounded-sm"
                  >
                    Send Another
                  </button>
                </MotionDiv>
              ) : (
                <MotionDiv
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h3 className="font-sans text-2xl font-semibold text-white mb-6">Send a Message</h3>
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <input type="hidden" name="_subject" value={`New Inquiry from ${COMPANY_INFO.name} Website`} />
                    <input type="hidden" name="_template" value="table" />

                    {[
                      { label: 'Full Name', name: 'name', type: 'text', placeholder: 'John Doe' },
                      { label: 'Email Address', name: 'email', type: 'email', placeholder: 'john@example.com' },
                    ].map((field) => (
                      <div key={field.name}>
                        <label className="block font-sans text-xs font-medium text-white/40 mb-2 tracking-wider uppercase">
                          {field.label}
                        </label>
                        <input
                          required
                          type={field.type}
                          name={field.name}
                          placeholder={field.placeholder}
                          className="input-gold w-full px-4 py-3 rounded-sm font-sans text-sm transition-all"
                        />
                      </div>
                    ))}

                    <div>
                      <label className="block font-sans text-xs font-medium text-white/40 mb-2 tracking-wider uppercase">
                        Service
                      </label>
                      <select
                        required
                        name="service"
                        defaultValue=""
                        className="input-gold w-full px-4 py-3 rounded-sm font-sans text-sm transition-all"
                      >
                        <option value="" disabled>Select a Service...</option>
                        {SERVICES.map((s, i) => <option key={i} value={s.title}>{s.title}</option>)}
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-sans text-xs font-medium text-white/40 mb-2 tracking-wider uppercase">
                        Message
                      </label>
                      <textarea
                        required
                        name="message"
                        rows={4}
                        placeholder="Tell us about your project..."
                        className="input-gold w-full px-4 py-3 rounded-sm font-sans text-sm transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="w-full bg-gold text-ink font-sans font-semibold py-4 rounded-sm text-sm tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-gold-light transition-colors disabled:opacity-60 glow-gold"
                    >
                      {formStatus === 'submitting' ? (
                        <><Loader2 className="animate-spin" size={16} />Sending...</>
                      ) : (
                        <>Send Message <Send size={14} /></>
                      )}
                    </button>
                  </form>
                </MotionDiv>
              )}
            </AnimatePresence>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
};

export default Contact;
