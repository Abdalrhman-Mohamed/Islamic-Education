import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, Award, BookOpen, Users, MessageCircle } from 'lucide-react'
import { lumi } from '../lib/lumi'
import CourseCard from '../components/CourseCard'
import WhatsAppButton from '../components/WhatsAppButton'
import { supabase } from "../lib/supabase";

const TeacherDetailPage: React.FC = () => {
  const { teacherId } = useParams<{ teacherId: string }>()
  const [teacher, setTeacher] = useState<any>(null)
  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!teacherId) return

    try {
      // // Fetch teacher data
      // const teachersResult = await lumi.entities.teachers.list()
      // const foundTeacher = teachersResult.list?.find((t: any) => t.teacherId === teacherId)

      // if (foundTeacher) {
      //   setTeacher(foundTeacher)

      //   // Fetch courses taught by this teacher
      //   const coursesResult = await lumi.entities.courses.list()
      //   const teacherCourses = coursesResult.list?.filter((c: any) => c.teacherId === teacherId) || []
      //   setCourses(teacherCourses)
      // }
      async function getTeacherById() {
        const { data, error } = await supabase
          .from("teachers")       // your table name
          .select("*")           // choose fields or use * for all
          .eq("id", teacherId)          // filter by id
          .single()              // expect only one row
        console.log(data)

        if (error) {
          console.error(error)
          return null
        }
        setTeacher(data)
      }
      getTeacherById()
    } catch (error) {
      console.error('Error fetching teacher data:', error)
    } finally {
      setLoading(false)
    }


  }, [teacherId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    )
  }

  if (!teacher) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Teacher Not Found</h2>
          <p className="text-gray-600">The teacher profile you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  const whatsappMessage = `Hello! I'm interested in learning more about ${teacher.name}'s courses and teaching approach. Could you please provide more information about available classes and scheduling?`

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
              <h1 className="text-4xl font-bold mb-4">{teacher.name}</h1>
              <p className="text-xl text-emerald-100 mb-6">{teacher.specialization}</p>

              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center space-x-2">
                  <Award size={20} />
                  <span>{teacher.experience} Years Experience</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star size={20} className="text-yellow-400" />
                  <span>{teacher.rating || 4.8} Rating</span>
                </div>
                {/* <div className="flex items-center space-x-2">
                  <BookOpen size={20} />
                  <span>{courses.length} Courses</span>
                </div> */}
                <div className="flex items-center space-x-2">
                  <Users size={20} />
                  <span>500+ Students</span>
                </div>
              </div>

              <WhatsAppButton
                message={whatsappMessage}
                className="hover:bg-gray-100 text-lg px-8 py-4"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img
                src={teacher.photoUrl || 'https://images.pexels.com/photos/5384445/pexels-photo-5384445.jpeg'}
                alt={teacher.name}
                className="rounded-lg shadow-2xl w-full max-w-md mx-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Teacher Profile */}
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
                <h2 className="text-2xl font-bold text-gray-900 mb-6">About {teacher.name}</h2>
                <p className="text-gray-600 mb-6">
                  {`${teacher.name} is a dedicated Islamic educator specializing in ${teacher.specialization}. With ${teacher.experience} years of experience, they have helped hundreds of students deepen their understanding of Islamic knowledge through engaging and comprehensive teaching methods.`}
                </p>

                <h3 className="text-xl font-bold text-gray-900 mb-4">Teaching Approach</h3>
                <p className="text-gray-600 mb-6">
                  Our instructor focuses on creating an interactive and supportive learning environment where students can ask questions freely and engage deeply with the material. Classes are structured to accommodate different learning styles and paces.
                </p>

                {teacher.qualifications && teacher.qualifications.length > 0 && (
                  <>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Qualifications</h3>
                    {/* <ul className="space-y-2 text-gray-600 mb-6">
                      {teacher.qualifications.map((qualification: string, index: number) => (
                        <li key={index} className="flex items-start space-x-3">
                          <span className="w-2 h-2 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></span>
                          <span>{qualification}</span>
                        </li>
                      ))}
                    </ul> */}
                  </>
                )}
              </motion.div>

              {/* Courses Section */}
              {courses.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg shadow-lg p-8"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Courses by {teacher.name}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {courses.map((course) => (
                      <CourseCard key={course._id} course={course} teacher={teacher} />
                    ))}
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
                <h3 className="text-xl font-bold text-gray-900 mb-6">Teacher Stats</h3>

                <div className="space-y-6 mb-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-600">{teacher.experience}</div>
                    <div className="text-sm text-gray-600">Years of Experience</div>
                  </div>

                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-600">{teacher.rating || 4.8}</div>
                    <div className="text-sm text-gray-600">Student Rating</div>
                  </div>

                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-600">{courses.length}</div>
                    <div className="text-sm text-gray-600">Courses Teaching</div>
                  </div>

                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-600">500+</div>
                    <div className="text-sm text-gray-600">Students Taught</div>
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

export default TeacherDetailPage
