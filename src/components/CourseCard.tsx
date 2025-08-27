
import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, Star, MessageCircle } from 'lucide-react'

interface Course {
  title: string
  description: string
  duration: string
  category: string
  teacher: string
  imageFile?: string
}

interface CourseCardProps {
  course: Course
  teacher?: {
    name: string
    rating?: number
  }
}

const CourseCard: React.FC<CourseCardProps> = ({ course, teacher }) => {
  console.log(course);
  
  // const whatsappMessage = `Hello! I'm interested in learning more about the "${course.title}" course. Could you please provide more information about the curriculum, schedule, and enrollment process?`

  // const handleWhatsAppClick = () => {
  //   const phoneNumber = '+1234567890' // Replace with actual WhatsApp number
  //   const encodedMessage = encodeURIComponent(whatsappMessage)
  //   const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
  //   window.open(whatsappUrl, '_blank')
  // }

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden group"
    >
      <div className="relative overflow-hidden">
        <img
          src={course.imageFile || 'https://images.pexels.com/photos/4207707/pexels-photo-4207707.jpeg'}
          alt={course.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* <div className="absolute top-4 left-4">
          <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-medium">
            {course.level}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className="bg-white/90 text-emerald-600 px-3 py-1 rounded-full text-sm font-bold">
            ${course.price}
          </span>
        </div> */}
      </div>

      <div className="p-6">
        <div className="mb-3">
          {/* <span className="text-emerald-600 text-sm font-medium uppercase tracking-wide">
            {course.category.replace('-', ' ')}
          </span> */}
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          {course.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {course.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Clock size={16} />
              <span>{course.duration}</span>
            </div>
            {teacher && (
              <div className="flex items-center space-x-1">
                <Star size={16} className="text-yellow-400" />
                <span>{teacher.rating || 4.5}</span>
              </div>
            )}
          </div>
        </div>

        {teacher && (
          <div className="mb-4 pb-4 border-b border-gray-100">
            <p className="text-sm text-gray-600">
              Instructor: <span className="font-medium text-gray-900">{teacher.name}</span>
            </p>
          </div>
        )}

        <div className="space-y-2">
          <Link
            to={`/course/${course.id}`}
            className="block w-full bg-emerald-600 hover:bg-emerald-700 text-white text-center py-3 px-4 rounded-lg font-medium transition-colors"
          >
            View Course
          </Link>
          <button 
            // onClick={handleWhatsAppClick}
            className="w-full border border-emerald-600 text-emerald-600 hover:bg-emerald-50 py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
          >
            <MessageCircle size={16} />
            <span>Inquire via WhatsApp</span>
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default CourseCard
