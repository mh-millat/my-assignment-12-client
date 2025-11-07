import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ✅ FAQ Data
const faqs = [
  {
    id: 1,
    question: "How can I book a court?",
    answer:
      "You can book a court directly from our website by selecting your preferred date and time, then proceeding with the payment.",
  },
  {
    id: 2,
    question: "Do you offer coaching sessions?",
    answer:
      "Yes! We provide coaching for Tennis, Badminton, and Squash for all levels, from beginners to advanced players.",
  },
  {
    id: 3,
    question: "Can I cancel or reschedule my booking?",
    answer:
      "Yes, you can cancel or reschedule your booking up to 24 hours before the scheduled time.",
  },
  {
    id: 4,
    question: "Are there membership plans available?",
    answer:
      "We offer monthly and annual membership plans that include discounted court bookings and priority access to events.",
  },
  {
    id: 5,
    question: "What safety measures are in place?",
    answer:
      "We maintain strict hygiene protocols, regular sanitization of courts, and require all players to follow club safety guidelines.",
  },
  {
    id: 6,
    question: "How does the club ensure player safety?",
    answer:
      "At our Sports Club, player safety is our top priority. We enforce strict hygiene measures, sanitize courts and equipment regularly, maintain social distancing where needed, provide first-aid facilities, and ensure that all players and staff follow the club's safety guidelines at all times.",
  },
];

const Contact = () => {
  const [openId, setOpenId] = useState(null);
  const toggle = (id) => setOpenId(openId === id ? null : id);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you ${formData.name}, your message has been sent!`);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="w-full py-16 px-6 md:px-20 bg-gradient-to-b from-blue-50 to-blue-100 mt-10 rounded-3xl shadow-md overflow-hidden">
      {/* Heading */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-800 mb-2">
          📞 Contact & FAQ
        </h2>
        <p className="text-gray-600 text-base md:text-lg">
          Have questions or want to reach out? We’re here to help you!
        </p>
      </motion.div>

      {/* Combined Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
        {/* Left - FAQ Section */}
        <motion.div
          className="bg-white p-8 rounded-2xl shadow-lg"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-blue-700 mb-6 flex items-center gap-2">
            💬 Frequently Asked Questions
          </h3>

          <div className="flex flex-col gap-5">
            {faqs.map(({ id, question, answer }) => (
              <motion.div
                key={id}
                layout
                onClick={() => toggle(id)}
                className="bg-blue-50 rounded-2xl shadow-md hover:shadow-xl p-5 cursor-pointer transition-all duration-300 border border-blue-100"
              >
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-semibold text-blue-700">
                    {question}
                  </h4>
                  <span className="text-2xl text-blue-500 font-bold">
                    {openId === id ? "−" : "+"}
                  </span>
                </div>

                <AnimatePresence>
                  {openId === id && (
                    <motion.p
                      key="content"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4 }}
                      className="mt-3 text-gray-700 leading-7"
                    >
                      {answer}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right - Contact Form */}
        <motion.div
          className="bg-white p-8 rounded-2xl shadow-lg"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-blue-700 mb-6 flex items-center gap-2">
            ✉️ Send Us a Message
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Your Name"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Your Email"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Write your message..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all shadow-md"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
