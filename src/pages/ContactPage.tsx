
import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import WhatsAppButton from '../components/WhatsAppButton'

const ContactPage: React.FC = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'info@islamiceducation.com',
      description: 'Send us an email anytime'
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+1 (555) 123-4567',
      description: 'Call us during business hours'
    },
    {
      icon: MapPin,
      title: 'Location',
      content: 'Online Learning Platform',
      description: 'Serving students worldwide'
    },
    {
      icon: Clock,
      title: 'Hours',
      content: '24/7 Support',
      description: 'We\'re here to help anytime'
    }
  ]

  const faqs = [
    {
      question: 'How do I enroll in a course?',
      answer: 'Contact us via WhatsApp and our team will guide you through the enrollment process and help you choose the right course for your level.'
    },
    {
      question: 'What are the class schedules?',
      answer: 'We offer flexible scheduling to accommodate students from different time zones. Contact us to discuss available time slots.'
    },
    {
      question: 'Do you offer trial classes?',
      answer: 'Yes, we offer trial classes for new students. Contact us via WhatsApp to schedule your free trial session.'
    },
    {
      question: 'What are the payment options?',
      answer: 'We accept various payment methods. Our team will provide detailed payment information when you inquire about enrollment.'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <section className="bg-emerald-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-emerald-100">
              Get in touch with us for any questions or inquiries
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-600">
              We're here to help you start your Islamic learning journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-lg text-center"
              >
                <info.icon className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{info.title}</h3>
                <p className="text-lg font-medium text-gray-700 mb-2">{info.content}</p>
                <p className="text-sm text-gray-500">{info.description}</p>
              </motion.div>
            ))}
          </div>

          {/* WhatsApp CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-green-50 rounded-2xl p-8 text-center"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Prefer to chat? Contact us on WhatsApp!
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Get instant responses to your questions and start your enrollment process immediately.
            </p>
            <WhatsAppButton 
              message="Hello! I have some questions about your Islamic education courses. Could you please help me?"
              className="text-lg px-8 py-4"
            />
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">
              Find answers to common questions about our courses
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 rounded-lg p-6"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mt-12"
          >
            <p className="text-lg text-gray-600 mb-6">
              Still have questions? We're here to help!
            </p>
            <WhatsAppButton 
              message="Hello! I have some questions that aren't covered in your FAQ. Could you please help me?"
            />
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage
