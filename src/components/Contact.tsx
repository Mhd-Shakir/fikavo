import React, { useState } from "react";
import { CheckCircle } from "lucide-react";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionStatus("idle");

    try {
      const res = await fetch("http://localhost:5001/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && (data.success || data.message === "Success")) {
        setSubmissionStatus("success");
        setFormData({ name: "", email: "", company: "", message: "" });
      } else {
        setSubmissionStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmissionStatus("error");
    }
  };

  return (
    <section id="contact" className="bg-gradient-to-br from-[#1e0468] to-[#3b00c5] text-white py-16 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Form Column */}
        <div className="bg-[#2b0c83] p-8 rounded-xl shadow-xl">
          {submissionStatus === "success" ? (
            <div className="flex flex-col items-center text-center">
              <CheckCircle size={64} className="text-yellow-400 mb-4" />
              <h3 className="text-2xl font-bold">Message Sent!</h3>
              <p className="text-gray-300 mt-2">Thanks for reaching out. We'll get back to you soon.</p>
              <button
                onClick={() => setSubmissionStatus("idle")}
                className="mt-6 bg-white text-purple-700 px-6 py-2 rounded-full font-semibold hover:bg-purple-100 transition"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold mb-4">🚀 Start Your Project</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-md bg-white text-black placeholder-gray-500"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-md bg-white text-black placeholder-gray-500"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="company"
                    placeholder="Company Name"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-md bg-white text-black placeholder-gray-500"
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    placeholder="Project Details"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-md bg-white text-black placeholder-gray-500 h-32 resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-yellow-400 hover:bg-yellow-300 text-purple-800 font-semibold py-3 rounded-md transition"
                >
                  ✉️ Send Message
                </button>
                {submissionStatus === "error" && (
                  <p className="text-red-300 text-sm text-center">Something went wrong. Please try again later.</p>
                )}
              </form>
            </>
          )}
        </div>

        {/* Direct Contact Column */}
        <div className="text-white space-y-6">
          <h3 className="text-3xl font-bold">Or, Reach Us Directly</h3>
          <p className="text-gray-300">Have a quick question? We'd love to hear from you. We typically respond within 24 hours.</p>
          <div className="bg-[#360ea5] p-6 rounded-xl space-y-4 shadow-lg">
            <div>
              <p className="font-semibold text-yellow-300">📧 Email Us</p>
              <p className="text-gray-200">hello@fikavo.com</p>
            </div>
            <div>
              <p className="font-semibold text-yellow-300">📞 Call Us</p>
              <p className="text-gray-200">+1 (555) 123-4567</p>
            </div>
            <div>
              <p className="font-semibold text-yellow-300">📍 Visit Us</p>
              <p className="text-gray-200">San Francisco, CA</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
