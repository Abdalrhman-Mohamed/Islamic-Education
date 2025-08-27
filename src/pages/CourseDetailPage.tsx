
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, Users, Star, BookOpen, Award, MessageCircle } from 'lucide-react'
import { lumi } from '../lib/lumi'
import WhatsAppButton from '../components/WhatsAppButton'
import { supabase } from "../lib/supabase";


const CourseDetailPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>()
  console.log(courseId);

  const [course, setCourse] = useState<any>(null)
  const [teacher, setTeacher] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // const fetchCourseData = async () => {
    //   if (!courseId) return

    //   try {
    //     const coursesResult = await lumi.entities.courses.list()
    //     const foundCourse = coursesResult.list?.find((c: any) => c.courseId === courseId)

    //     if (foundCourse) {
    //       setCourse(foundCourse)

    //       // Fetch teacher data
    //       const teachersResult = await lumi.entities.teachers.list()
    //       const foundTeacher = teachersResult.list?.find((t: any) => t.teacherId === foundCourse.teacherId)
    //       setTeacher(foundTeacher)
    //     }
    //   } catch (error) {
    //     console.error('Error fetching course data:', error)
    //   } finally {
    //     setLoading(false)
    //   }
    // }

    // fetchCourseData()

    try {
      async function getCourseById() {
        const { data, error } = await supabase
          .from("courses")       // your table name
          .select("*")           // choose fields or use * for all
          .eq("id", courseId)          // filter by id
          .single()              // expect only one row

        if (error) {
          console.error(error)
          return null
        }
        setCourse(data)
      }
      getCourseById()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [courseId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h2>
          <p className="text-gray-600">The course you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  const whatsappMessage = `Hello! I'm interested in enrolling in the "${course.title}" course. Could you please provide more information about the curriculum, schedule, pricing, and enrollment process?`

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-emerald-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-4">
                <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {course.category.replace('-', ' ').toUpperCase()}
                </span>
              </div>
              <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-xl text-emerald-100 mb-6">{course.description}</p>

              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center space-x-2">
                  <Clock size={20} />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen size={20} />
                  <span>{course.teacher}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users size={20} />
                  <span>Small Class Sizes</span>
                </div>
                {teacher && (
                  <div className="flex items-center space-x-2">
                    <Star size={20} className="text-yellow-400" />
                    <span>{teacher.rating || 4.8}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <WhatsAppButton
                  message={whatsappMessage}
                  className="hover:bg-gray-100 text-lg px-8 py-4"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img
                src={course.imageFile || 'https://images.pexels.com/photos/4207707/pexels-photo-4207707.jpeg'}
                alt={course.title}
                className="rounded-lg shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-lg p-8 mb-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Overview</h2>
                <p className="text-gray-600 mb-6">{course.description}</p>

                <h3 className="text-xl font-bold text-gray-900 mb-4">What You'll Learn</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Comprehensive understanding of the subject matter</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Practical application of Islamic principles</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Interactive learning with qualified instructors</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Certificate upon successful completion</span>
                  </li>
                </ul>
              </motion.div>

              {/* Teacher Info */}
              {teacher && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg shadow-lg p-8"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Instructor</h2>
                  <div className="flex items-center space-x-6">
                    <img
                      src={teacher.photoUrl || 'https://images.pexels.com/photos/5384445/pexels-photo-5384445.jpeg'}
                      alt={teacher.name}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{teacher.name}</h3>
                      <p className="text-emerald-600 font-medium">{teacher.specialization}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-1">
                          <Award size={16} className="text-emerald-600" />
                          <span className="text-sm text-gray-600">{teacher.experience} years exp.</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star size={16} className="text-yellow-400" />
                          <span className="text-sm text-gray-600">{teacher.rating || 4.8}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-lg p-8 sticky top-24"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6">Course Details</h3>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-medium">{course.duration}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Level</span>
                    <span className="font-medium">{course.level}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Category</span>
                    <span className="font-medium">{course.category.replace('-', ' ')}</span>
                  </div>
                </div>

                <WhatsAppButton
                  message={whatsappMessage}
                  className="w-full justify-center text-lg py-4 mb-4"
                />

                <div className="text-center text-sm text-gray-500">
                  <MessageCircle size={16} className="inline mr-1" />
                  Get instant response via WhatsApp
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CourseDetailPage
