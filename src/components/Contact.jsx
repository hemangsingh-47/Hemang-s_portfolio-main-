import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Mail, Github, Linkedin, Twitter, Youtube, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { AnimatedUnderline } from './TextAnimations';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
      }
    });

    tl.fromTo(".contact-left", 
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    ).fromTo(".contact-right",
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    );
  }, []);

  const socialLinks = [
    { icon: <Github size={20} />, href: "https://github.com/hemangsingh-47", label: "GitHub" },
    { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/hemang-singh-solanki-b866b23ab/", label: "LinkedIn" },
    { icon: <Youtube size={20} />, href: "https://www.youtube.com/@DevWithHemang", label: "YouTube" },
    { icon: <Twitter size={20} />, href: "https://x.com/Hemang1541063", label: "X (Twitter)" },
    { icon: <Mail size={20} />, href: "mailto:hemang.solanki.cg@gmail.com", label: "Email" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (status === 'error') {
      setStatus('idle');
      setErrorMessage('');
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "Please enter your name.";
    if (!formData.email.trim()) return "Please enter your email address.";
    
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return "Please enter a valid email address.";
    
    if (!formData.subject.trim()) return "Please enter a subject.";
    if (!formData.message.trim()) return "Please enter your message.";
    
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errorMsg = validateForm();
    if (errorMsg) {
      setStatus('error');
      setErrorMessage(errorMsg);
      return;
    }

    setStatus('loading');
    
    // 1) Read from environment variables only (no hardcoding)
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // 5) Add console debug logs before sending
    console.log("SERVICE ID:", serviceId);
    console.log("TEMPLATE ID:", templateId);
    console.log("PUBLIC KEY:", publicKey);

    // 6) If any environment variable is missing or undefined, show a helpful error and stop
    if (!serviceId || !templateId || !publicKey) {
      console.error("EmailJS Configuration Missing:", { serviceId, templateId, publicKey });
      setStatus('error');
      setErrorMessage("Email configuration is missing. Please ensure your .env file is correctly set up and you have restarted your development server.");
      return;
    }

    try {
      // 3) Update the EmailJS send function to use this exact structure
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        {
          publicKey: publicKey,
        }
      );

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
      
    } catch (error) {
      console.error("EmailJS Error Detail:", error);
      setStatus('error');
      
      const detailedError = error?.text || error?.message || "Unknown error";
      setErrorMessage(
        `Send failed: ${detailedError}. Please verify your Template ID and Service ID.`
      );
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="py-24 md:py-32 relative bg-bg-primary overflow-hidden transition-colors duration-300">
      
      {/* Wavy Divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-0 transform -translate-y-full">
        <svg className="block w-full h-[30px] md:h-[40px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C63.26,30.4,142.17,59.39,221.4,59.39C255.48,59.39,288.58,58.5,321.39,56.44Z" fill="var(--bg-primary)" opacity="0.3"></path>
        </svg>
      </div>

      <div className="max-w-[1100px] mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
          
          {/* LEFT COLUMN: Info & Socials */}
          <div className="contact-left flex flex-col h-full">
            <h2 className="font-serif text-5xl md:text-6xl font-bold text-slate-800 mb-6">
              Let's <span className="text-accent italic font-light"><AnimatedUnderline delay={0.2}>Connect</AnimatedUnderline></span>
            </h2>
            <p className="text-slate-600 font-light text-lg mb-8 leading-relaxed max-w-md">
              Have an idea, collaboration, or opportunity? Let's connect. I am actively seeking internships and full-stack development roles where I can contribute and grow.
            </p>

            <div className="mb-12 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center text-gold shadow-inner border border-gold/20 flex-shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-1">Email</p>
                <a 
                  href="mailto:hemang.solanki.cg@gmail.com" 
                  className="text-lg font-bold text-text-primary hover:text-gold transition-colors block border-b border-transparent hover:border-gold pb-0.5 inline-block"
                  data-magnetic
                >
                  hemang.solanki.cg@gmail.com
                </a>
              </div>
            </div>

            <div className="mt-auto">
              <p className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-4">Find me on</p>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social, index) => (
                  <a 
                    key={index}
                    href={social.href}
                    target={social.href.startsWith('http') ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl border border-border-color/30 flex items-center justify-center text-text-secondary hover:bg-gold hover:text-white hover:border-gold hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    aria-label={social.label}
                    data-magnetic
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Contact Form Card */}
          <div className="contact-right">
            <div className="bg-bg-secondary/40 backdrop-blur-sm border border-border-color/30 rounded-2xl p-8 md:p-10 shadow-[0_20px_40px_rgba(212,163,115,0.06)]">
              <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
                
                {status === 'success' && (
                  <div className="bg-green-500/10 border border-green-500/30 text-green-600 px-4 py-3 rounded-xl flex items-start gap-3 w-full">
                    <CheckCircle2 size={20} className="mt-0.5 shrink-0" />
                    <p className="text-sm font-medium">Message sent successfully! I'll get back to you soon.</p>
                  </div>
                )}
                
                {status === 'error' && (
                  <div className="bg-red-500/10 border border-red-500/30 text-red-500 px-4 py-3 rounded-xl flex items-start gap-3 w-full">
                    <AlertCircle size={20} className="mt-0.5 shrink-0" />
                    <p className="text-sm font-medium">{errorMessage}</p>
                  </div>
                )}

                <div className="flex flex-col md:flex-row gap-6">
                  {/* Name field */}
                  <div className="flex flex-col w-full">
                    <label htmlFor="name" className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-2 ml-1">Your Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Hemang Singh" 
                      required
                      className="w-full bg-bg-primary border border-border-color/30 rounded-xl px-4 py-3 text-text-primary font-light placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all shadow-inner"
                    />
                  </div>
                  {/* Email field */}
                  <div className="flex flex-col w-full">
                    <label htmlFor="email" className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-2 ml-1">Your Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com" 
                      required
                      className="w-full bg-bg-primary border border-border-color/30 rounded-xl px-4 py-3 text-text-primary font-light placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all shadow-inner"
                    />
                  </div>
                </div>

                {/* Subject field */}
                <div className="flex flex-col w-full">
                  <label htmlFor="subject" className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-2 ml-1">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Let's collaborate on..." 
                    required
                    className="w-full bg-bg-primary border border-border-color/30 rounded-xl px-4 py-3 text-text-primary font-light placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all shadow-inner"
                  />
                </div>

                {/* Message field */}
                <div className="flex flex-col w-full mb-2">
                  <label htmlFor="message" className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-2 ml-1">Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message..." 
                    required
                    className="w-full min-h-[140px] resize-y bg-bg-primary border border-border-color/30 rounded-xl px-4 py-3 text-text-primary font-light placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all shadow-inner"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-sage to-gold hover:from-gold hover:to-sage text-white font-bold tracking-widest uppercase text-sm px-8 py-4 rounded-xl transition-all duration-500 shadow-md hover:shadow-xl hover:-translate-y-1 overflow-hidden disabled:opacity-75 disabled:cursor-not-allowed disabled:hover:shadow-md disabled:hover:translate-y-0 disabled:hover:from-sage disabled:hover:to-gold"
                  data-magnetic={status !== 'loading' ? true : undefined}
                >
                  <span className="relative z-10">
                    {status === 'loading' ? 'Sending...' : 'Send Message'}
                  </span>
                  
                  {status === 'loading' ? (
                    <Loader2 size={18} className="relative z-10 animate-spin" />
                  ) : (
                    <Send size={18} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  )}
                  
                  <div className={`absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full transition-transform duration-700 ease-in-out ${status !== 'loading' ? 'group-hover:translate-x-full' : ''}`}></div>
                </button>
                
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;

