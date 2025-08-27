import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
// import { lumi } from '../lib/lumi'
import TeacherCard from '../components/TeacherCard'
import { supabase } from "../lib/supabase";

const TeachersPage: React.FC = () => {
  const [teachers, setTeachers] = useState<any[]>([])
  const [filteredTeachers, setFilteredTeachers] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSpecialization, setSelectedSpecialization] = useState('all')
  const [loading, setLoading] = useState(true)

  const specializations = ['all', 'Quran Recitation', 'Arabic Language', 'Islamic Studies', 'Hadith Studies', 'Fiqh']

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        // const result = await lumi.entities.teachers.list()
        // setTeachers(result.list || [])
        // setFilteredTeachers(result.list || [])
        const fetchTeachers = async () => {
          const { data, error } = await supabase.from('teachers').select('*')
          if (error) console.error(error)
          else {
            setTeachers(data)
            setFilteredTeachers(data)
          }

        }
        fetchTeachers()
      } catch (error) {
        console.error('Error fetching teachers:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTeachers()
  }, [])

  useEffect(() => {
    let filtered = teachers

    if (searchTerm) {
      filtered = filtered.filter(teacher =>
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.specialization.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedSpecialization !== 'all') {
      filtered = filtered.filter(teacher => teacher.specialization === selectedSpecialization)
    }

    setFilteredTeachers(filtered)
  }, [searchTerm, selectedSpecialization, teachers])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    )
  }

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
            <h1 className="text-4xl font-bold mb-4">Our Teachers</h1>
            <p className="text-xl text-emerald-100">
              Meet our qualified Islamic scholars and educators
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search teachers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>

            {/* Specialization Filter */}
            <select
              value={selectedSpecialization}
              onChange={(e) => setSelectedSpecialization(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="all">All Specializations</option>
              {specializations.slice(1).map(specialization => (
                <option key={specialization} value={specialization}>
                  {specialization}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Teachers Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredTeachers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No teachers found matching your criteria.</p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <p className="text-gray-600">
                  Showing {filteredTeachers.length} of {teachers.length} teachers
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredTeachers.map((teacher, index) => (
                  <motion.div
                    key={teacher._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <TeacherCard teacher={teacher} />
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}

export default TeachersPage
