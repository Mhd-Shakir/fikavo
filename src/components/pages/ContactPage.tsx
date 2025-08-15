import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { CheckCircle, Mail, Phone, MapPin, Sparkles } from "lucide-react";

type SubmissionStatus = "idle" | "loading" | "success" | "error";

type FormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type FieldErrors = Partial<Record<keyof FormData, string>>;

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<FieldErrors>({});
  const [submissionStatus, setSubmissionStatus] =
    useState<SubmissionStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  const validateField = (name: keyof FormData, value: string): string => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Name is required.";
        if (value.trim().length < 2)
          return "Name must be at least 2 characters.";
        return "";
      case "email":
        if (!value.trim()) return "Email is required.";
        // Simple email validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Enter a valid email address.";
        return "";
      case "phone":
        if (!value.trim()) return ""; // Phone optional; make it required if you prefer
        if (!/^[0-9+()\-.\s]{7,20}$/.test(value))
          return "Enter a valid phone number.";
        return "";
      default:
        return "";
    }
  };

  const validateAll = (data: FormData): FieldErrors => {
    const nextErrors: FieldErrors = {};
    (Object.keys(data) as (keyof FormData)[]).forEach((key) => {
      const msg = validateField(key, data[key]);
      if (msg) nextErrors[key] = msg;
    });
    return nextErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target as { name: keyof FormData; value: string };
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Live-validate the field if it already had an error
    if (errors[name]) {
      const msg = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: msg || undefined }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    const { name, value } = e.target as { name: keyof FormData; value: string };
    const msg = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: msg || undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionStatus("loading");
    setErrorMessage("");

    const fieldErrors = validateAll(formData);
    if (Object.values(fieldErrors).some(Boolean)) {
      setErrors(fieldErrors);
      setSubmissionStatus("idle");
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || ""}/api/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json().catch(() => ({}));
      if (res.ok && (data.success || data.message === "Success")) {
        setSubmissionStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
        setErrors({});
      } else {
        setErrorMessage(
          data.message || "Something went wrong. Please try again."
        );
        setSubmissionStatus("error");
      }
    } catch {
      setErrorMessage("Network error. Please try again later.");
      setSubmissionStatus("error");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 },
    },
  };
  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 80, damping: 15 },
    },
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-16 sm:py-20 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(180deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Floating Shapes */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-xl opacity-50"
          style={{
            background:
              i % 2 === 0
                ? "radial-gradient(circle, rgba(139,92,246,0.15), transparent)"
                : "radial-gradient(circle, rgba(59,130,246,0.15), transparent)",
            width: Math.random() * 120 + 60,
            height: Math.random() * 120 + 60,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * 30 - 15, 0],
            x: [0, Math.random() * 30 - 15, 0],
          }}
          transition={{
            duration: Math.random() * 8 + 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full mb-4 sm:mb-6"
          >
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
            <span className="text-xs sm:text-sm font-semibold text-purple-700 uppercase tracking-wider">
              Get in Touch
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6"
          >
            Let’s Build Something{" "}
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
              Amazing Together
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2"
          >
            Have an idea or project in mind? Fill out the form and we’ll get
            back to you within 24 hours.
          </motion.p>
        </motion.div>

        {/* Form + Contact Info */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Form */}
          <motion.div
            variants={itemVariants}
            className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-200"
          >
            {submissionStatus === "success" ? (
              <div className="flex flex-col items-center text-center">
                <CheckCircle size={64} className="text-green-500 mb-4" />
                <h3 className="text-xl sm:text-2xl font-bold">Message Sent!</h3>
                <p className="text-gray-500 mt-2">
                  Thanks for reaching out. We’ll get back to you soon.
                </p>
                <button
                  onClick={() => setSubmissionStatus("idle")}
                  className="mt-6 bg-purple-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-purple-700 transition"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-4 sm:space-y-5"
                noValidate
              >
                {/* Name */}
                <div>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    required
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-label="Full Name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={`mt-1 w-full px-4 py-3 rounded-md bg-white text-black border ${
                      errors.name
                        ? "border-red-400 focus:border-red-500 focus:ring-red-300"
                        : "border-gray-300 focus:border-purple-500 focus:ring-purple-300"
                    } focus:ring-2 outline-none`}
                  />
                  {errors.name && (
                    <p
                      id="name-error"
                      className="mt-1 text-sm text-red-600"
                      aria-live="polite"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    required
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-label="Email Address"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={`mt-1 w-full px-4 py-3 rounded-md bg-white text-black border ${
                      errors.email
                        ? "border-red-400 focus:border-red-500 focus:ring-red-300"
                        : "border-gray-300 focus:border-purple-500 focus:ring-purple-300"
                    } focus:ring-2 outline-none`}
                  />
                  {errors.email && (
                    <p
                      id="email-error"
                      className="mt-1 text-sm text-red-600"
                      aria-live="polite"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    inputMode="tel"
                    autoComplete="tel"
                    pattern="[0-9+()\-.\s]{7,20}"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-label="Phone Number"
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                    className={`mt-1 w-full px-4 py-3 rounded-md bg-white text-black border ${
                      errors.phone
                        ? "border-red-400 focus:border-red-500 focus:ring-red-300"
                        : "border-gray-300 focus:border-purple-500 focus:ring-purple-300"
                    } focus:ring-2 outline-none`}
                  />
                  {errors.phone && (
                    <p
                      id="phone-error"
                      className="mt-1 text-sm text-red-600"
                      aria-live="polite"
                    >
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Project Details"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-label="Project Details"
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={
                      errors.message ? "message-error" : "message-help"
                    }
                    maxLength={1000}
                    className={`mt-1 w-full px-4 py-3 rounded-md bg-white text-black border ${
                      errors.message
                        ? "border-red-400 focus:border-red-500 focus:ring-red-300"
                        : "border-gray-300 focus:border-purple-500 focus:ring-purple-300"
                    } focus:ring-2 outline-none h-28 sm:h-32 resize-none`}
                  />

                  {errors.message && (
                    <p
                      id="message-error"
                      className="mt-1 text-sm text-red-600"
                      aria-live="polite"
                    >
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submissionStatus === "loading"}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-md transition"
                >
                  {submissionStatus === "loading"
                    ? "Sending..."
                    : "Send Message"}
                </button>

                {/* Top-level error */}
                {submissionStatus === "error" && (
                  <p
                    className="text-red-600 text-sm text-center"
                    aria-live="assertive"
                  >
                    {errorMessage}
                  </p>
                )}
              </form>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            variants={itemVariants}
            className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-200 space-y-6"
          >
            <div className="flex items-center gap-4">
              <Mail className="w-6 h-6 text-purple-600" />
              <div>
                <p className="font-semibold text-gray-800">Email Us</p>
                <a
                  href="mailto:fikavocollective@gmail.com"
                  className="text-gray-600 break-all"
                >
                  fikavocollective@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="w-6 h-6 text-purple-600" />
              <div>
                <p className="font-semibold text-gray-800">Call Us</p>
                <div className="flex flex-col gap-2">
                  <a href="tel:+918157000282" className="text-gray-600">
                    +91 81570 00282
                  </a>
                  <a href="tel:+919745614587" className="text-gray-600">
                    +91 9745614587
                  </a>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="w-6 h-6 text-purple-600" />
              <div>
                <p className="font-semibold text-gray-800">Visit Us</p>
                <p className="text-gray-600">Calicut, Kerala</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
