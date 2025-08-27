
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter } from 'lucide-react'
// import { lumi } from '../lib/lumi'
import CourseCard from '../components/CourseCard'
import { supabase } from "../lib/supabase";


const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([])
  const [filteredCourses, setFilteredCourses] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [loading, setLoading] = useState(true)

  const categories = ['all', 'quran-recitation', 'arabic-language', 'islamic-studies', 'hadith', 'fiqh']
  const levels = ['all', 'beginner', 'intermediate', 'advanced']

  useEffect(() => {
    // const fetchCourses = async () => {
    //   try {
    //     const result = await lumi.entities.courses.list()
    //     setCourses(result.list || [])
        // setFilteredCourses(result.list || [])
    //   } catch (error) {
    //     console.error('Error fetching courses:', error)
    //   } finally {
    //     setLoading(false)
    //   }
    // }

    // fetchCourses()

    async function getCourses() {
      const { data, error } = await supabase.from("courses").select("*");
      if (error) console.error(error);
      else {
        setCourses(data)
        setFilteredCourses(data)
      };
      console.log(data);
      
      setLoading(false);
    }
    getCourses();

  }, [])  

  // useEffect(() => {
  //   let filtered = courses

  //   if (searchTerm) {
  //     filtered = filtered.filter(course =>
  //       course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       course.description.toLowerCase().includes(searchTerm.toLowerCase())
  //     )
  //   }

  //   if (selectedCategory !== 'all') {
  //     filtered = filtered.filter(course => course.category === selectedCategory)
  //   }

  //   if (selectedLevel !== 'all') {
  //     filtered = filtered.filter(course => course.level === selectedLevel)
  //   }

  //   setFilteredCourses(filtered)
  // }, [searchTerm, selectedCategory, selectedLevel, courses])

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
            <h1 className="text-4xl font-bold mb-4">All Courses</h1>
            <p className="text-xl text-emerald-100">
              Explore our comprehensive collection of Islamic education courses
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      {/* <section className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.slice(1).map(category => (
                <option key={category} value={category}>
                  {category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </option>
              ))}
            </select>

            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="all">All Levels</option>
              {levels.slice(1).map(level => (
                <option key={level} value={level}>
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section> */}

      {/* Courses Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredCourses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No courses found matching your criteria.</p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <p className="text-gray-600">
                  Showing {filteredCourses.length} of {courses.length} courses
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <CourseCard course={course} />
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

export default CoursesPage
