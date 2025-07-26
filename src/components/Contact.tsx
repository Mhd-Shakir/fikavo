import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';

// --- Placeholders for UI Components ---
// To make this component self-contained, I'm adding simple placeholders here.
// Replace these with your actual components.
const SectionHeader: React.FC<{ title: string; subtitle: string; centered?: boolean; }> = ({ title, subtitle, centered }) => (
  <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-poppins">{title}</h2>
    <p className={`mt-4 text-lg text-gray-300 font-poppins max-w-3xl ${centered ? 'mx-auto' : ''}`}>{subtitle}</p>
  </div>
);
const Button: React.FC<{ variant?: string; size?: string; children: React.ReactNode; onClick?: () => void; className?: string; }> = ({ children, variant, ...props }) => {
    const baseClasses = "flex items-center justify-center gap-2 font-poppins font-semibold rounded-lg transition-all duration-300";
    const variantClasses = variant === "secondary"
        ? "px-6 py-3 bg-white/10 text-white hover:bg-white/20"
        : "text-brand-yellow hover:text-white"; // Arrow variant
    return <button className={`${baseClasses} ${variantClasses}`} {...props}>{children}{variant === 'arrow' && <ArrowRight className="w-4 h-4" />}</button>
};
// --- End of Placeholders ---


type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionStatus('submitting');
    
    // Simulate API call (with a chance of failure for demo)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (Math.random() > 0.1) { // 90% success rate
        setSubmissionStatus('success');
        setFormData({ name: '', email: '', company: '', message: '' });
    } else {
        setSubmissionStatus('error');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleReset = () => {
    setSubmissionStatus('idle');
  }

  const contactInfo = [
    { icon: <Mail className="w-6 h-6" />, title: 'Email Us', details: 'hello@fikavo.com', action: 'mailto:hello@fikavo.com' },
    { icon: <Phone className="w-6 h-6" />, title: 'Call Us', details: '+1 (555) 123-4567', action: 'tel:+15551234567' },
    { icon: <MapPin className="w-6 h-6" />, title: 'Visit Us', details: 'San Francisco, CA', action: '#' }
  ];

  return (
    <section id="contact" className="py-20 sm:py-28 bg-gradient-to-br from-brand-dark to-brand-violet relative overflow-hidden">
      {/* Background Pattern - more subtle and responsive */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-24 h-24 sm:w-32 sm:h-32 border-4 border-white rounded-full hidden sm:block"></div>
        <div className="absolute bottom-10 right-10 w-20 h-20 sm:w-24 sm:h-24 bg-brand-yellow rounded-sm rotate-12"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-96 sm:h-96 border-2 border-white/20 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          title="Let's Build Something Amazing Together"
          subtitle="Ready to transform your digital presence? Get in touch with our team of experts."
          centered
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Contact Form Container */}
          <motion.div
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <AnimatePresence mode="wait">
              {submissionStatus === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center py-10"
                >
                  <CheckCircle className="w-16 h-16 text-brand-yellow mx-auto mb-4" />
                  <h3 className="text-2xl font-bold font-poppins text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-300 mb-6">Thanks for reaching out. We'll get back to you soon.</p>
                  <Button variant="secondary" onClick={handleReset}>Send Another Message</Button>
                </motion.div>
              ) : submissionStatus === 'error' ? (
                 <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center py-10"
                >
                  <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold font-poppins text-white mb-2">Something Went Wrong</h3>
                  <p className="text-gray-300 mb-6">Please try submitting the form again.</p>
                  <Button variant="secondary" onClick={handleReset}>Try Again</Button>
                </motion.div>
              ) : (
                <motion.div key="form" exit={{ opacity: 0, y: -20 }}>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-3 h-3 bg-brand-yellow rounded-sm"></div>
                    <h3 className="text-2xl font-bold font-poppins text-white">Start Your Project</h3>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                       {/* Form Fields... */}
                       {/* Use a consistent input style */}
                        <div>
                          <label htmlFor="name" className="block text-sm font-semibold font-poppins text-gray-300 mb-2">Full Name *</label>
                          <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-dark focus:ring-brand-yellow transition-all duration-300 font-poppins" placeholder="Your name" />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-semibold font-poppins text-gray-300 mb-2">Email Address *</label>
                          <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-dark focus:ring-brand-yellow transition-all duration-300 font-poppins" placeholder="your@email.com" />
                        </div>
                    </div>
                     <div>
                        <label htmlFor="company" className="block text-sm font-semibold font-poppins text-gray-300 mb-2">Company Name</label>
                        <input type="text" id="company" name="company" value={formData.company} onChange={handleInputChange} className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-dark focus:ring-brand-yellow transition-all duration-300 font-poppins" placeholder="Your company" />
                      </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold font-poppins text-gray-300 mb-2">Project Details *</label>
                      <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required rows={5} className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-dark focus:ring-brand-yellow transition-all duration-300 font-poppins resize-y" placeholder="Tell us about your project..."></textarea>
                    </div>
                    <motion.button type="submit" disabled={submissionStatus === 'submitting'} className="w-full px-8 py-4 bg-brand-violet text-white font-bold font-poppins rounded-lg hover:bg-opacity-90 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed" whileHover={{ scale: submissionStatus === 'submitting' ? 1 : 1.02 }} whileTap={{ scale: submissionStatus === 'submitting' ? 1 : 0.98 }}>
                      {submissionStatus === 'submitting' ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : <><Send className="w-5 h-5" /> Send Message</>}
                    </motion.button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Contact Information */}
          <motion.div className="space-y-8" initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <div>
              <h3 className="text-3xl font-bold font-poppins text-white mb-4">Or, Reach Us Directly</h3>
              <p className="text-lg text-gray-300 font-poppins leading-relaxed">Have a quick question? We'd love to hear from you. We typically respond within 24 hours.</p>
            </div>
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.a key={index} href={info.action} className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/20 hover:border-white/30 transition-all duration-300 group" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <div className="p-3 bg-brand-yellow rounded-lg text-brand-dark group-hover:scale-110 transition-transform duration-300">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold font-poppins text-white">{info.title}</h4>
                    <p className="text-gray-300 font-poppins">{info.details}</p>
                  </div>
                </motion.a>
              ))}
            </div>
             {/* <div className="pt-6 border-t border-white/10">
                <h4 className="font-bold font-poppins text-white mb-4">Quick Actions</h4>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="secondary" className="w-full sm:w-auto">Schedule a Call</Button>
                  <Button variant="arrow" className="justify-start sm:justify-center">Download Portfolio</Button>
                </div>
            </div> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;