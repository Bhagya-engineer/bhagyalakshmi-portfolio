import React, { useState } from "react";
import { motion } from "motion/react";
import { Send, CheckCircle2, Phone, Mail, MapPin, Github, Linkedin, AlertCircle } from "lucide-react";
import { PERSONAL_INFO } from "../data/portfolioData";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Collaboration Request",
    message: ""
  });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus("error");
      return;
    }

    setFormStatus("sending");
    
    // Simulate API delivery
    setTimeout(() => {
      setFormStatus("success");
      setSuccessMsg(`Thank you, ${formData.name}! Your message has been sent successfully.`);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "Collaboration Request",
        message: ""
      });
    }, 1500);
  };

  return (
    <section className="py-20" id="contact">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Section Heading */}
        <div className="mb-14 text-center">
          <h2 className="font-display text-4xl font-extrabold tracking-tight text-slate-950 dark:text-[#FFFFFF] md:text-5xl">
            Get In Touch
          </h2>
          <div className="mx-auto mt-3.5 h-1.5 w-16 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
          <p className="mt-5 text-base font-semibold text-slate-800 dark:text-[#F1F5F9] max-w-lg mx-auto font-sans">
            Have a project in mind, career opportunity, or general technical query? Feel free to reach out.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
          
          {/* Informational Column (Left) */}
          <div className="space-y-6 lg:col-span-5">
            <div className="glass rounded-2xl p-6 md:p-8 space-y-6 shadow-xs border border-slate-350 dark:border-white/10 bg-white/90 dark:bg-[#111111]/90">
              <h3 className="font-display text-xl font-extrabold text-slate-950 dark:text-[#FFFFFF]">
                Contact Information
              </h3>
              
              <p className="text-base text-slate-805 dark:text-[#F1F5F9] font-sans font-semibold leading-relaxed">
                You can reach me directly through my email or LinkedIn. Let's build state-of-the-art intelligent systems together!
              </p>

              <div className="space-y-4">
                {/* Email Info */}
                <div className="flex items-center gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-[#1c1c1c] dark:text-[#60A5FA] border border-blue-105/30 dark:border-white/10">
                    <Mail size={18} />
                  </span>
                  <div>
                    <p className="font-mono text-xs text-slate-750 dark:text-[#CBD5E1] font-extrabold uppercase tracking-wider">Email Address</p>
                    <a href={`mailto:${PERSONAL_INFO.email}`} className="text-base font-extrabold text-slate-950 dark:text-[#F1F5F9] hover:text-blue-600 dark:hover:text-[#60A5FA] hover:underline transition-colors break-all">
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>

                {/* Phone Info */}
                <div className="flex items-center gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-[#1c1c1c] dark:text-[#60A5FA] border border-blue-105/30 dark:border-white/10">
                    <Phone size={18} />
                  </span>
                  <div>
                    <p className="font-mono text-xs text-slate-750 dark:text-[#CBD5E1] font-extrabold uppercase tracking-wider">Mobile Number</p>
                    <a href={`tel:${PERSONAL_INFO.phone}`} className="text-base font-extrabold text-slate-950 dark:text-[#F1F5F9] hover:text-blue-600 dark:hover:text-[#60A5FA] hover:underline transition-colors">
                      {PERSONAL_INFO.phone}
                    </a>
                  </div>
                </div>

                {/* Location Info */}
                <div className="flex items-center gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-[#1c1c1c] dark:text-[#60A5FA] border border-blue-105/30 dark:border-white/10">
                    <MapPin size={18} />
                  </span>
                  <div>
                    <p className="font-mono text-xs text-slate-750 dark:text-[#CBD5E1] font-extrabold uppercase tracking-wider">Academic location</p>
                    <p className="text-base font-bold text-slate-950 dark:text-[#F1F5F9]">
                      Vignan's Institute, Visakhapatnam, India
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Channels Link Row */}
              <div className="border-t border-slate-200/60 dark:border-white/10 pt-5 mt-4">
                <p className="font-mono text-xs text-slate-750 dark:text-[#CBD5E1] font-extrabold uppercase tracking-wider mb-3">Professional links</p>
                <div className="flex items-center gap-4">
                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 font-display text-sm font-extrabold text-slate-950 hover:bg-blue-50 hover:text-blue-700 dark:bg-[#1c1c1c] dark:text-[#F1F5F9] dark:hover:bg-blue-950/40 dark:hover:text-[#60A5FA] transition-all border border-slate-300 dark:border-white/10"
                  >
                    <Linkedin size={15} />
                    <span>LinkedIn</span>
                  </a>
                  
                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 font-display text-sm font-extrabold text-slate-950 hover:bg-blue-50 hover:text-blue-700 dark:bg-[#1c1c1c] dark:text-[#F1F5F9] dark:hover:bg-blue-950/40 dark:hover:text-[#60A5FA] transition-all border border-slate-300 dark:border-white/10"
                  >
                    <Github size={15} />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Contact Input Form Card (Right) */}
          <div className="glass rounded-2xl p-6 md:p-8 lg:col-span-7 shadow-xs border border-slate-350 dark:border-white/10 bg-white/95 dark:bg-[#111111]/95">
            <h3 className="font-display text-xl font-extrabold text-slate-950 dark:text-[#FFFFFF] mb-6">
              Drop Me A Digital Note
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Full name input */}
                <div className="space-y-1.5">
                  <label htmlFor="name-input" className="font-display text-sm font-extrabold text-slate-950 dark:text-[#F1F5F9]">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name-input"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-300 bg-white/70 px-4 py-3 font-sans text-sm font-semibold text-slate-950 focus:border-blue-500 focus:bg-white focus:outline-hidden dark:border-white/20 dark:bg-[#1c1c1c] dark:text-white focus:ring-1 focus:ring-blue-500"
                    placeholder="Jane Doe"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label htmlFor="email-input" className="font-display text-sm font-extrabold text-slate-950 dark:text-[#F1F5F9]">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email-input"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-300 bg-white/70 px-4 py-3 font-sans text-sm font-semibold text-slate-950 focus:border-blue-500 focus:bg-white focus:outline-hidden dark:border-white/20 dark:bg-[#1c1c1c] dark:text-white focus:ring-1 focus:ring-blue-500"
                    placeholder="example@gmail.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Contact phone number */}
                <div className="space-y-1.5">
                  <label htmlFor="phone-input" className="font-display text-sm font-extrabold text-slate-950 dark:text-[#F1F5F9]">
                    Phone / Mobile Number (Optional)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone-input"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 bg-white/70 px-4 py-3 font-sans text-sm font-semibold text-slate-950 focus:border-blue-500 focus:bg-white focus:outline-hidden dark:border-white/20 dark:bg-[#1c1c1c] dark:text-white focus:ring-1 focus:ring-blue-500"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                {/* Subject selection */}
                <div className="space-y-1.5">
                  <label htmlFor="subject-input" className="font-display text-sm font-extrabold text-slate-950 dark:text-[#F1F5F9]">
                    Subject Line
                  </label>
                  <select
                    name="subject"
                    id="subject-input"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 bg-white/70 px-4 py-3 font-sans text-sm font-semibold text-slate-950 focus:border-blue-500 focus:bg-white focus:outline-hidden dark:border-white/20 dark:bg-[#1c1c1c] dark:text-white focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="Collaboration Request">Collaboration Request</option>
                    <option value="Internship Option">Internship / Job Opportunity</option>
                    <option value="Student Project Advice">Academic Mentoring</option>
                    <option value="General Conversation">Saying Hello 👋</option>
                  </select>
                </div>
              </div>

              {/* Message text area */}
              <div className="space-y-1.5">
                <label htmlFor="message-input" className="font-display text-sm font-extrabold text-slate-950 dark:text-[#F1F5F9]">
                  Your Detailed Message *
                </label>
                <textarea
                  name="message"
                  id="message-input"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white/70 px-4 py-3 font-sans text-sm font-semibold text-slate-950 focus:border-blue-500 focus:bg-white focus:outline-hidden dark:border-white/20 dark:bg-[#1c1c1c] dark:text-white resize-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Tell me more about what you want to collaborate on..."
                />
              </div>

              {/* Status responses */}
              {formStatus === "success" && (
                <div className="flex items-center gap-2 rounded-xl bg-green-50 px-4 py-3.5 text-sm text-green-900 dark:bg-green-950/20 dark:text-green-300 border border-green-200 dark:border-green-500/10 font-bold animate-none">
                  <CheckCircle2 size={18} className="text-green-600" />
                  <span>{successMsg}</span>
                </div>
              )}

              {formStatus === "error" && (
                <div className="flex items-center gap-2 rounded-xl bg-orange-50 px-4 py-3.5 text-sm text-orange-950 dark:bg-orange-950/20 dark:text-orange-300 border border-orange-250/20 font-bold animate-none">
                  <AlertCircle size={18} className="text-orange-600" />
                  <span>Please fill out all the mandatory fields correctly.</span>
                </div>
              )}

              {/* Submit trigger */}
              <button
                type="submit"
                disabled={formStatus === "sending"}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 font-display text-base font-bold text-white shadow-md hover:bg-blue-500 focus:outline-hidden disabled:bg-slate-400 cursor-pointer"
                id="contact-btn-submit"
              >
                {formStatus === "sending" ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                    <span>Delivering note...</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Send Message</span>
                  </>
                )}
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
