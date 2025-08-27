
import React from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Users, Globe, Award } from 'lucide-react'
import WhatsAppButton from '../components/WhatsAppButton'

const AboutPage: React.FC = () => {
  const values = [
    {
      icon: BookOpen,
      title: 'Quality Education',
      description: 'We provide comprehensive Islamic education with authentic sources and qualified instructors.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building a global community of learners united in their pursuit of Islamic knowledge.'
    },
    {
      icon: Globe,
      title: 'Accessibility',
      description: 'Making Islamic education accessible to students worldwide through online learning.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Committed to excellence in teaching methodology and student achievement.'
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
            <h1 className="text-4xl font-bold mb-4">About Us</h1>
            <p className="text-xl text-emerald-100">
              Dedicated to providing quality Islamic education worldwide
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                We are dedicated to making authentic Islamic education accessible to students around the world. 
                Our platform connects learners with qualified Islamic scholars and teachers who provide 
                comprehensive instruction in Quran, Arabic, and Islamic studies.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Through innovative online learning methods and personalized instruction, we strive to 
                create an environment where students can deepen their understanding of Islam and develop 
                a strong foundation in Islamic knowledge.
              </p>
              <WhatsAppButton 
                message="Hello! I'd like to learn more about your mission and how I can get started with Islamic education."
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="https://images.pexels.com/photos/4207707/pexels-photo-4207707.jpeg"
                alt="Islamic Education"
                className="rounded-lg shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">
              The principles that guide our educational approach
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors"
              >
                <value.icon className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-emerald-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-lg text-gray-600 mb-6">
              Founded with the vision of making Islamic education accessible to all, our platform began 
              as a small initiative to connect students with qualified teachers. Over the years, we have 
              grown into a comprehensive online learning platform serving thousands of students worldwide.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Our team consists of experienced educators, Islamic scholars, and technology experts who 
              work together to provide the best possible learning experience. We continuously improve 
              our platform and curriculum to meet the evolving needs of our global student community.
            </p>
            <WhatsAppButton 
              message="Hello! I'm interested in learning more about your platform and how to get started with courses."
              className="text-lg px-8 py-4"
            />
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
