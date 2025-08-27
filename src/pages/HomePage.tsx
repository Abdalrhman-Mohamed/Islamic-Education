import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Users, BookOpen, Clock } from 'lucide-react'
import { lumi } from '../lib/lumi'
import CourseCard from '../components/CourseCard'
import TeacherCard from '../components/TeacherCard'
import WhatsAppButton from '../components/WhatsAppButton'
import { supabase } from "../lib/supabase";


const HomePage: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([])
  const [teachers, setTeachers] = useState<any[]>([])
  const [testimonials, setTestimonials] = useState<any[]>([])


  const getCourses = async () => {
    const { data, error } = await supabase.from("courses").select("*");
    if (error) console.error(error);
    else {
      setCourses(data?.slice(0, 6) || [])
    };
  }

  const fetchTeachers = async () => {
    const { data, error } = await supabase.from('teachers').select('*')
    if (error) console.error(error)
    else {
      setTeachers(data)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        getCourses();
        fetchTeachers()
        // const [testimonialsResult] = await Promise.all([
        //   lumi.entities.testimonials.list()
        // ])
        // setTeachers(teachersResult.list?.slice(0, 4) || [])
        // setTestimonials(testimonialsResult.list?.slice(0, 3) || [])
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  const stats = [
    { icon: Users, label: 'Students Enrolled', value: '5,000+' },
    { icon: BookOpen, label: 'Courses Available', value: '50+' },
    { icon: Star, label: 'Expert Teachers', value: '25+' },
    { icon: Clock, label: 'Hours of Content', value: '1,000+' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-emerald-50 pt-16">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/4207707/pexels-photo-4207707.jpeg')] bg-cover bg-center opacity-5"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Learn Quran and Islamic Studies
              <span className="block text-emerald-600">Online with Qualified Teachers</span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Join thousands of students worldwide in their journey to deepen their Islamic knowledge with personalized online classes
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <WhatsAppButton
                message="Hello! I'm interested in starting my Islamic education journey. Could you please provide more information about your courses and how to get started?"
                className="text-lg px-8 py-4"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center text-white"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-4" />
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-emerald-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Courses</h2>
            <p className="text-xl text-gray-600">Discover our most popular Islamic education programs</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <motion.div
                key={course._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <CourseCard course={course} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Teachers */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Teachers</h2>
            <p className="text-xl text-gray-600">Learn from qualified Islamic scholars and educators</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teachers.map((teacher, index) => (
              <motion.div
                key={teacher._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <TeacherCard teacher={teacher} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Our Platform?</h2>
            <p className="text-xl text-gray-600">Experience the best in online Islamic education</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Qualified Teachers',
                description: 'Learn from certified Islamic scholars with years of teaching experience',
                icon: '👨‍🏫'
              },
              {
                title: 'Flexible Schedule',
                description: 'Choose class times that work best for your schedule and timezone',
                icon: '⏰'
              },
              {
                title: 'Interactive Learning',
                description: 'Engage in live sessions with personalized attention and feedback',
                icon: '💬'
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-lg text-center"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Students Say</h2>
            <p className="text-xl text-gray-600">Hear from our community of learners</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-lg"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.photoUrl || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'}
                    alt={testimonial.studentName}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.studentName}</div>
                    <div className="text-sm text-gray-500">{testimonial.course}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Begin Your Islamic Learning Journey?
            </h2>
            <p className="text-xl text-emerald-100 mb-8">
              Contact us today to learn more about our courses and get started
            </p>
            <WhatsAppButton
              message="Hello! I'm ready to start my Islamic education journey. Could you please help me choose the right course and provide enrollment details?"
              className="hover:bg-gray-100 text-lg px-8 py-4"
            />
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
