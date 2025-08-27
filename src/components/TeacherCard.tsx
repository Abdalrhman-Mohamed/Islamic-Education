
import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, Award, Clock } from 'lucide-react'

interface Teacher {
  id: string
  name: string
  specialization: string
  experience: number
  photoUrl?: string
  rating?: number
  qualifications?: string[]
}

interface TeacherCardProps {
  teacher: Teacher
}

const TeacherCard: React.FC<TeacherCardProps> = ({ teacher }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden group"
    >
      <div className="relative">
        <img
          src={teacher.photoUrl || 'https://images.pexels.com/photos/5384445/pexels-photo-5384445.jpeg'}
          alt={teacher.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white mb-1">{teacher.name}</h3>
          <p className="text-emerald-200 text-sm">{teacher.specialization}</p>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Award size={16} className="text-emerald-600" />
            <span className="text-sm text-gray-600">{teacher.experience} years exp.</span>
          </div>
          {teacher.rating && (
            <div className="flex items-center space-x-1">
              <Star size={16} className="text-yellow-400 fill-current" />
              <span className="text-sm font-medium">{teacher.rating}</span>
            </div>
          )}
        </div>

        {teacher.qualifications && teacher.qualifications.length > 0 && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Top Qualification:</p>
            <p className="text-sm font-medium text-gray-900">
              {teacher.qualifications[0]}
            </p>
          </div>
        )}

        <Link
          to={`/teacher/${teacher.id}`}
          className="block w-full bg-emerald-600 hover:bg-emerald-700 text-white text-center py-3 px-4 rounded-lg font-medium transition-colors"
        >
          View Profile
        </Link>
      </div>
    </motion.div>
  )
}

export default TeacherCard
