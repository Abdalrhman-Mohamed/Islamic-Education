// import React, { useState, useEffect } from 'react'
// import { motion } from 'framer-motion'
// import { Plus, BookOpen, Users, LogOut, Eye, EyeOff } from 'lucide-react'
// import toast from 'react-hot-toast'
// import { lumi } from '../lib/lumi'

// const AdminPage: React.FC = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false)
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [showPassword, setShowPassword] = useState(false)
//   const [activeTab, setActiveTab] = useState<'courses' | 'teachers'>('courses')
//   const [loading, setLoading] = useState(false)

//   // Course form state
//   const [courseForm, setCourseForm] = useState({
//     courseId: '',
//     title: '',
//     description: '',
//     price: '',
//     duration: '',
//     category: 'quran',
//     level: 'beginner',
//     teacherId: '',
//     imageUrl: '',
//     syllabus: '',
//     objectives: '',
//     schedule: '',
//     isActive: true
//   })

//   // Teacher form state
//   const [teacherForm, setTeacherForm] = useState({
//     teacherId: '',
//     name: '',
//     specialization: '',
//     biography: '',
//     qualifications: '',
//     experience: '',
//     photoUrl: '',
//     certifications: '',
//     languages: '',
//     rating: '5',
//     isActive: true
//   })

//   // Check if already logged in
//   useEffect(() => {
//     const adminSession = localStorage.getItem('adminSession')
//     if (adminSession === 'true') {
//       setIsLoggedIn(true)
//     }
//   }, [])

//   const handleLogin = (e: React.FormEvent) => {
//     e.preventDefault()

//     if (email === 'admin@admin.com' && password === 'admin123') {
//       setIsLoggedIn(true)
//       localStorage.setItem('adminSession', 'true')
//       toast.success('Welcome to Admin Dashboard!')
//     } else {
//       toast.error('Invalid credentials. Please try again.')
//     }
//   }

//   const handleLogout = () => {
//     setIsLoggedIn(false)
//     localStorage.removeItem('adminSession')
//     setEmail('')
//     setPassword('')
//     toast.success('Logged out successfully')
//   }

//   const handleAddCourse = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)

//     try {
//       const courseData = {
//         ...courseForm,
//         price: parseFloat(courseForm.price),
//         syllabus: courseForm.syllabus.split(',').map(item => item.trim()).filter(item => item),
//         objectives: courseForm.objectives.split(',').map(item => item.trim()).filter(item => item),
//         creator: 'admin',
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString()
//       }

//       await lumi.entities.courses.create(courseData)

//       // Reset form
//       setCourseForm({
//         courseId: '',
//         title: '',
//         description: '',
//         price: '',
//         duration: '',
//         category: 'quran',
//         level: 'beginner',
//         teacherId: '',
//         imageUrl: '',
//         syllabus: '',
//         objectives: '',
//         schedule: '',
//         isActive: true
//       })

//       toast.success('Course added successfully!')
//     } catch (error) {
//       console.error('Failed to add course:', error)
//       toast.error('Failed to add course. Please try again.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleAddTeacher = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)

//     try {
//       const teacherData = {
//         ...teacherForm,
//         experience: parseInt(teacherForm.experience),
//         rating: parseFloat(teacherForm.rating),
//         qualifications: teacherForm.qualifications.split(',').map(item => item.trim()).filter(item => item),
//         certifications: teacherForm.certifications.split(',').map(item => item.trim()).filter(item => item),
//         languages: teacherForm.languages.split(',').map(item => item.trim()).filter(item => item),
//         creator: 'admin',
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString()
//       }

//       await lumi.entities.teachers.create(teacherData)

//       // Reset form
//       setTeacherForm({
//         teacherId: '',
//         name: '',
//         specialization: '',
//         biography: '',
//         qualifications: '',
//         experience: '',
//         photoUrl: '',
//         certifications: '',
//         languages: '',
//         rating: '5',
//         isActive: true
//       })

//       toast.success('Teacher added successfully!')
//     } catch (error) {
//       console.error('Failed to add teacher:', error)
//       toast.error('Failed to add teacher. Please try again.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   if (!isLoggedIn) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center pt-16">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"
//         >
//           <div className="text-center mb-8">
//             <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4">
//               <span className="text-white font-bold text-2xl">إ</span>
//             </div>
//             <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
//             <p className="text-gray-600 mt-2">Access the administration panel</p>
//           </div>

//           <form onSubmit={handleLogin} className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
//                 placeholder="admin@admin.com"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors pr-12"
//                   placeholder="admin123"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                 >
//                   {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                 </button>
//               </div>
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-3 rounded-lg font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 transform hover:scale-105"
//             >
//               Sign In
//             </button>
//           </form>

//           <div className="mt-6 text-center text-sm text-gray-500">
//             <p>Demo Credentials:</p>
//             <p>Email: admin@admin.com</p>
//             <p>Password: admin123</p>
//           </div>
//         </motion.div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 pt-16">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Header */}
//         <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
//           <div className="flex justify-between items-center">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
//               <p className="text-gray-600 mt-2">Manage courses and teachers</p>
//             </div>
//             <button
//               onClick={handleLogout}
//               className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
//             >
//               <LogOut size={20} />
//               <span>Logout</span>
//             </button>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="bg-white rounded-2xl shadow-sm mb-8">
//           <div className="border-b border-gray-200">
//             <nav className="flex space-x-8 px-6">
//               <button
//                 onClick={() => setActiveTab('courses')}
//                 className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
//                   activeTab === 'courses'
//                     ? 'border-emerald-500 text-emerald-600'
//                     : 'border-transparent text-gray-500 hover:text-gray-700'
//                 }`}
//               >
//                 <div className="flex items-center space-x-2">
//                   <BookOpen size={20} />
//                   <span>Add Course</span>
//                 </div>
//               </button>
//               <button
//                 onClick={() => setActiveTab('teachers')}
//                 className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
//                   activeTab === 'teachers'
//                     ? 'border-emerald-500 text-emerald-600'
//                     : 'border-transparent text-gray-500 hover:text-gray-700'
//                 }`}
//               >
//                 <div className="flex items-center space-x-2">
//                   <Users size={20} />
//                   <span>Add Teacher</span>
//                 </div>
//               </button>
//             </nav>
//           </div>

//           <div className="p-6">
//             {activeTab === 'courses' && (
//               <motion.div
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 className="space-y-6"
//               >
//                 <div className="flex items-center space-x-2 mb-6">
//                   <Plus size={24} className="text-emerald-600" />
//                   <h2 className="text-2xl font-bold text-gray-900">Add New Course</h2>
//                 </div>

//                 <form onSubmit={handleAddCourse} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Course ID *
//                     </label>
//                     <input
//                       type="text"
//                       value={courseForm.courseId}
//                       onChange={(e) => setCourseForm({...courseForm, courseId: e.target.value})}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//                       placeholder="COURSE-001"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Course Title *
//                     </label>
//                     <input
//                       type="text"
//                       value={courseForm.title}
//                       onChange={(e) => setCourseForm({...courseForm, title: e.target.value})}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//                       placeholder="Quran Recitation Basics"
//                       required
//                     />
//                   </div>

//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Description *
//                     </label>
//                     <textarea
//                       value={courseForm.description}
//                       onChange={(e) => setCourseForm({...courseForm, description: e.target.value})}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//                       rows={4}
//                       placeholder="Course description..."
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Price (USD) *
//                     </label>
//                     <input
//                       type="number"
//                       step="0.01"
//                       value={courseForm.price}
//                       onChange={(e) => setCourseForm({...courseForm, price: e.target.value})}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//                       placeholder="99.00"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Duration *
//                     </label>
//                     <input
//                       type="text"
//                       value={courseForm.duration}
//                       onChange={(e) => setCourseForm({...courseForm, duration: e.target.value})}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//                       placeholder="8 weeks"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Category *
//                     </label>
//                     <select
//                       value={courseForm.category}
//                       onChange={(e) => setCourseForm({...courseForm, category: e.target.value})}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//                       required
//                     >
//                       <option value="quran">Quran</option>
//                       <option value="hadith">Hadith</option>
//                       <option value="fiqh">Fiqh</option>
//                       <option value="arabic">Arabic</option>
//                       <option value="islamic-studies">Islamic Studies</option>
//                       <option value="tajweed">Tajweed</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Level *
//                     </label>
//                     <select
//                       value={courseForm.level}
//                       onChange={(e) => setCourseForm({...courseForm, level: e.target.value})}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//                       required
//                     >
//                       <option value="beginner">Beginner</option>
//                       <option value="intermediate">Intermediate</option>
//                       <option value="advanced">Advanced</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Teacher ID *
//                     </label>
//                     <input
//                       type="text"
//                       value={courseForm.teacherId}
//                       onChange={(e) => setCourseForm({...courseForm, teacherId: e.target.value})}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//                       placeholder="TEACHER-001"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Image URL
//                     </label>
//                     <input
//                       type="url"
//                       value={courseForm.imageUrl}
//                       onChange={(e) => setCourseForm({...courseForm, imageUrl: e.target.value})}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//                       placeholder="https://images.pexels.com/..."
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Schedule
//                     </label>
//                     <input
//                       type="text"
//                       value={courseForm.schedule}
//                       onChange={(e) => setCourseForm({...courseForm, schedule: e.target.value})}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//                       placeholder="Mon, Wed, Fri - 7:00 PM UTC"
//                     />
//                   </div>

//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Syllabus (comma-separated)
//                     </label>
//                     <textarea
//                       value={courseForm.syllabus}
//                       onChange={(e) => setCourseForm({...courseForm, syllabus: e.target.value})}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//                       rows={3}
//                       placeholder="Introduction to Quran, Basic Arabic letters, Pronunciation rules"
//                     />
//                   </div>

//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Learning Objectives (comma-separated)
//                     </label>
//                     <textarea
//                       value={courseForm.objectives}
//                       onChange={(e) => setCourseForm({...courseForm, objectives: e.target.value})}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//                       rows={3}
//                       placeholder="Master basic recitation, Understand Arabic pronunciation, Apply Tajweed rules"
//                     />
//                   </div>

//                   <div className="md:col-span-2">
//                     <button
//                       type="submit"
//                       disabled={loading}
//                       className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-3 rounded-lg font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       {loading ? 'Adding Course...' : 'Add Course'}
//                     </button>
//                   </div>
//                 </form>
//               </motion.div>
//             )}

//             {activeTab === 'teachers' && (
//               <motion.div
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 className="space-y-6"
//               >
//                 <div className="flex items-center space-x-2 mb-6">
//                   <Plus size={24} className="text-emerald-600" />
//                   <h2 className="text-2xl font-bold text-gray-900">Add New Teacher</h2>
//                 </div>

//                 <form onSubmit={handleAddTeacher} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Teacher ID *
//                     </label>
//                     <input
//                       type="text"
//                       value={teacherForm.teacherId}
//                       onChange={(e) => setTeacherForm({...teacherForm, teacherId: e.target.value})}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//                       placeholder="TEACHER-001"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Full Name *
//                     </label>
//                     <input
//                       type="text"
//                       value={teacherForm.name}
//                       onChange={(e) => setTeacherForm({...teacherForm, name: e.target.value})}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//                       placeholder="Dr. Ahmed Hassan"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Specialization *
//                     </label>
//                     <input
//                       type="text"
//                       value={teacherForm.specialization}
//                       onChange={(e) => setTeacherForm({...teacherForm, specialization: e.target.value})}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//                       placeholder="Quran and Tajweed"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Experience (years) *
//                     </label>
//                     <input
//                       type="number"
//                       value={teacherForm.experience}
//                       onChange={(e) => setTeacherForm({...teacherForm, experience: e.target.value})}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//                       placeholder="10"
//                       required
//                     />
//                   </div>

//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Biography *
//                     </label>
//                     <textarea
//                       value={teacherForm.biography}
//                       onChange={(e) => setTeacherForm({...teacherForm, biography: e.target.value})}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//                       rows={4}
//                       placeholder="Teacher biography..."
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Photo URL
//                     </label>
//                     <input
//                       type="url"
//                       value={teacherForm.photoUrl}
//                       onChange={(e) => setTeacherForm({...teacherForm, photoUrl: e.target.value})}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//                       placeholder="https://images.pexels.com/..."
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Rating (1-5)
//                     </label>
//                     <select
//                       value={teacherForm.rating}
//                       onChange={(e) => setTeacherForm({...teacherForm, rating: e.target.value})}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//                     >
//                       <option value="5">5 Stars</option>
//                       <option value="4.5">4.5 Stars</option>
//                       <option value="4">4 Stars</option>
//                       <option value="3.5">3.5 Stars</option>
//                       <option value="3">3 Stars</option>
//                     </select>
//                   </div>

//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Qualifications (comma-separated)
//                     </label>
//                     <textarea
//                       value={teacherForm.qualifications}
//                       onChange={(e) => setTeacherForm({...teacherForm, qualifications: e.target.value})}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//                       rows={3}
//                       placeholder="PhD in Islamic Studies, Certified Quran Teacher, Al-Azhar Graduate"
//                     />
//                   </div>

//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Certifications (comma-separated)
//                     </label>
//                     <textarea
//                       value={teacherForm.certifications}
//                       onChange={(e) => setTeacherForm({...teacherForm, certifications: e.target.value})}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//                       rows={3}
//                       placeholder="Ijazah in Quran, Tajweed Certification, Arabic Language Certificate"
//                     />
//                   </div>

//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Languages (comma-separated)
//                     </label>
//                     <input
//                       type="text"
//                       value={teacherForm.languages}
//                       onChange={(e) => setTeacherForm({...teacherForm, languages: e.target.value})}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//                       placeholder="Arabic, English, Urdu"
//                     />
//                   </div>

//                   <div className="md:col-span-2">
//                     <button
//                       type="submit"
//                       disabled={loading}
//                       className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-3 rounded-lg font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       {loading ? 'Adding Teacher...' : 'Add Teacher'}
//                     </button>
//                   </div>
//                 </form>
//               </motion.div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AdminPage

// import React, { useState, useEffect } from 'react'
// import { motion } from 'framer-motion'
// import { Plus, BookOpen, Users, LogOut, Eye, EyeOff, Trash } from 'lucide-react'
// import toast from 'react-hot-toast'
// import { supabase } from '../lib/supabase'

// const AdminPage: React.FC = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false)
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [showPassword, setShowPassword] = useState(false)
//   const [activeTab, setActiveTab] = useState<'courses' | 'teachers'>('courses')
//   const [loading, setLoading] = useState(false)

//   const [courses, setCourses] = useState<any[]>([])
//   const [teachers, setTeachers] = useState<any[]>([])

//   // Course form state
//   const [courseForm, setCourseForm] = useState({
//     // courseId: '',
//     title: '',
//     description: '',
//     teacher: '',
//     duration: '',
//     category: 'quran',
//     imageFile: null,
//   })

//   // Teacher form state
//   const [teacherForm, setTeacherForm] = useState({
//     teacherId: '',
//     name: '',
//     description: '',
//     experience: '',
//     photoUrl: '',
//     qualifications: '',
//     languages: '',
//     rating: '5',
//   })

//   // Load data
//   const fetchCourses = async () => {
//     const { data, error } = await supabase.from('courses').select('*')
//     console.log(data);
//     if (error) console.error(error)
//     else setCourses(data)
//   }

//   const fetchTeachers = async () => {
//     const { data, error } = await supabase.from('teachers').select('*')
//     if (error) console.error(error)
//     else setTeachers(data)
//   }

//   useEffect(() => {
//     if (isLoggedIn) {
//       fetchCourses()
//       fetchTeachers()
//     }
//   }, [isLoggedIn])

//   // Check if already logged in
//   useEffect(() => {
//     const adminSession = localStorage.getItem('adminSession')
//     if (adminSession === 'true') {
//       setIsLoggedIn(true)
//     }
//   }, [])

//   const handleLogin = (e: React.FormEvent) => {
//     e.preventDefault()
//     if (email === 'admin@admin.com' && password === 'admin123') {
//       setIsLoggedIn(true)
//       localStorage.setItem('adminSession', 'true')
//       toast.success('Welcome to Admin Dashboard!')
//     } else {
//       toast.error('Invalid credentials. Please try again.')
//     }
//   }

//   const handleLogout = () => {
//     setIsLoggedIn(false)
//     localStorage.removeItem('adminSession')
//     setEmail('')
//     setPassword('')
//     toast.success('Logged out successfully')
//   }

//   // ADD COURSE
//   // const handleAddCourse = async (e: React.FormEvent) => {
//   //   e.preventDefault()
//   //   setLoading(true)

//   //   try {
//   //     const { error } = await supabase.from('courses').insert([{
//   //       ...courseForm,
//   //       created_at: new Date().toISOString(),
//   //     }])

//   //     if (error) throw error
//   //     toast.success('Course added successfully!')
//   //     setCourseForm({
//   //       // courseId: '',
//   //       title: 'asd',
//   //       description: 'asd',
//   //       teacher: 'abdo',
//   //       duration: 'asd',
//   //       category: 'quran',
//   //       imageUrl: 'asd',
//   //     })
//   //     fetchCourses()
//   //   } catch (err) {
//   //     console.error(err)
//   //     toast.error('Failed to add course.')
//   //   } finally {
//   //     setLoading(false)
//   //   }
//   // }

//   const handleAddCourse = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)

//     try {
//       let imageUrl: any = courseForm.imageFile // 👈 في حالة المستخدم كتب لينك مباشر للصورة

//       // ✅ لو المستخدم رفع فايل (مثلاً من input type="file")
//       if (courseForm.imageFile) {
//         // رفع الصورة إلى storage
//         const { data, error: uploadError } = await supabase.storage
//           .from("images") // 👈 اسم الـ bucket
//           .upload(`courses/${Date.now()}-${courseForm.imageFile.name}`, courseForm.imageFile, {
//             cacheControl: "3600",
//             upsert: false,
//           })

//         if (uploadError) throw uploadError

//         // جلب الرابط العام
//         const { data: publicUrlData } = supabase.storage
//           .from("images")
//           .getPublicUrl(data.path)

//         imageUrl = publicUrlData.publicUrl
//       }

//       // ✅ إدخال الكورس مع الصورة
//       const { error } = await supabase.from("courses").insert([
//         {
//           ...courseForm,
//           teacher: "abdo",
//           duration: "15m",
//           category: "ozo",
//           imageFile: imageUrl, // 👈 الرابط النهائي
//           created_at: new Date().toISOString(),
//         },
//       ])

//       if (error) throw error

//       toast.success("Course added successfully!")
//       setCourseForm({
//         title: "",
//         description: "",
//         teacher: "",
//         duration: "",
//         category: "",
//         imageFile: null, // 👈 reset للفايل
//       })
//       fetchCourses()
//     } catch (err) {
//       console.error(err)
//       toast.error("Failed to add course.")
//     } finally {
//       setLoading(false)
//     }
//   }


//   // ADD TEACHER
//   const handleAddTeacher = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)

//     try {
//       const { error } = await supabase.from('teachers').insert([{
//         ...teacherForm,
//         experience: parseInt(teacherForm.experience),
//         rating: parseFloat(teacherForm.rating),
//         created_at: new Date().toISOString(),
//       }])

//       if (error) throw error
//       toast.success('Teacher added successfully!')
//       setTeacherForm({
//         teacherId: '',
//         name: '',
//         qualifications: '',
//         experience: '',
//         photoUrl: '',
//         languages: '',
//         rating: '5',
//         description: ''
//       })
//       fetchTeachers()
//     } catch (err) {
//       console.error(err)
//       toast.error('Failed to add teacher.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   // DELETE COURSE
//   const handleDeleteCourse = async (id: string) => {
//     const { error } = await supabase.from('courses').delete().eq('id', id)
//     if (error) toast.error('Failed to delete course.')
//     else {
//       toast.success('Course deleted.')
//       fetchCourses()
//     }
//   }

//   // DELETE TEACHER
//   const handleDeleteTeacher = async (id: string) => {
//     const { error } = await supabase.from('teachers').delete().eq('id', id)
//     if (error) toast.error('Failed to delete teacher.')
//     else {
//       toast.success('Teacher deleted.')
//       fetchTeachers()
//     }
//   }

//   // ===== LOGIN UI =====
//   if (!isLoggedIn) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-emerald-100">
//         <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
//           <h2 className="text-xl font-bold mb-4">Admin Login</h2>
//           <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"
//             className="w-full border p-2 rounded mb-3" required />
//           <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"
//             className="w-full border p-2 rounded mb-3" required />
//           <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-sm mb-3">{showPassword ? 'Hide' : 'Show'} Password</button>
//           <button type="submit" className="w-full bg-emerald-600 text-white p-2 rounded">Login</button>
//         </form>
//       </div>
//     )
//   }

//   // ===== DASHBOARD UI =====
//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Admin Dashboard</h1>
//         <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
//       </div>

//       {/* Tabs */}
//       <div className="flex space-x-4 mb-6">
//         <button onClick={() => setActiveTab('courses')} className={activeTab === 'courses' ? 'font-bold' : ''}>Courses</button>
//         <button onClick={() => setActiveTab('teachers')} className={activeTab === 'teachers' ? 'font-bold' : ''}>Teachers</button>
//       </div>

//       {/* COURSES */}
//       {activeTab === 'courses' && (
//         <div>
//           <form onSubmit={handleAddCourse} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//             {/* <input placeholder="Course ID" value={courseForm.courseId} onChange={e => setCourseForm({ ...courseForm, courseId: e.target.value })} className="border p-2 rounded" required /> */}
//             <input
//               type="file"
//               onChange={(e) =>
//                 setCourseForm({ ...courseForm, imageFile: e.target.files?.[0] || null })}
//             />
//             <input placeholder="Title" value={courseForm.title} onChange={e => setCourseForm({ ...courseForm, title: e.target.value })} className="border p-2 rounded" required />
//             <textarea placeholder="Description" value={courseForm.description} onChange={e => setCourseForm({ ...courseForm, description: e.target.value })} className="border p-2 rounded md:col-span-2" required />
//             <button type="submit" disabled={loading} className="bg-emerald-600 text-white p-2 rounded col-span-2">{loading ? 'Adding...' : 'Add Course'}</button>
//           </form>

//           <ul>
//             {courses.map(c => (
//               <li key={c.id} className="flex justify-between items-center border-b py-2">
//                 <span>{c.title}</span>
//                 <button onClick={() => handleDeleteCourse(c.id)} className="text-red-500"><Trash size={18} /></button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* TEACHERS */}
//       {activeTab === 'teachers' && (
//         <div>
//           <form onSubmit={handleAddTeacher} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//             <input placeholder="Teacher ID" value={teacherForm.teacherId} onChange={e => setTeacherForm({ ...teacherForm, teacherId: e.target.value })} className="border p-2 rounded" required />
//             <input placeholder="Name" value={teacherForm.name} onChange={e => setTeacherForm({ ...teacherForm, name: e.target.value })} className="border p-2 rounded" required />
//             <input type="number" placeholder="Experience" value={teacherForm.experience} onChange={e => setTeacherForm({ ...teacherForm, experience: e.target.value })} className="border p-2 rounded" />
//             <button type="submit" disabled={loading} className="bg-emerald-600 text-white p-2 rounded col-span-2">{loading ? 'Adding...' : 'Add Teacher'}</button>
//           </form>

//           <ul>
//             {teachers.map(t => (
//               <li key={t.id} className="flex justify-between items-center border-b py-2">
//                 <span>{t.name} ({t.specialization})</span>
//                 <button onClick={() => handleDeleteTeacher(t.id)} className="text-red-500"><Trash size={18} /></button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   )
// }

// export default AdminPage


import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Plus, Trash, Edit, Upload } from 'lucide-react'
import toast from 'react-hot-toast'
import { supabase } from '../lib/supabase'

const AdminPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [activeTab, setActiveTab] = useState<'courses' | 'teachers'>('courses')
  const [loading, setLoading] = useState(false)
  const [courses, setCourses] = useState<any[]>([])
  const [teachers, setTeachers] = useState<any[]>([])
  const inputRef = useRef<HTMLInputElement | null>(null)
  console.log(teachers);

  const handleClick = () => {
    inputRef.current?.click()
  }

  // Course form state
  const [courseForm, setCourseForm] = useState<any>({
    title: '',
    description: '',
    teacher: '',
    duration: '',
    category: 'quran',
    imageFile: null,
  })

  // Teacher form state
  const [teacherForm, setTeacherForm] = useState<any>({
    name: '',
    about: '',
    experience: '',
    photoUrl: '',
    teaching: '',
    qualifications: '',
    rating: '5',
  })

  // Load data
  const fetchCourses = async () => {
    const { data, error } = await supabase.from('courses').select('*')
    if (error) console.error(error)
    else setCourses(data)
  }

  const fetchTeachers = async () => {
    const { data, error } = await supabase.from('teachers').select('*')
    if (error) console.error(error)
    else setTeachers(data)
  }

  useEffect(() => {
    if (isLoggedIn) {
      fetchCourses()
      fetchTeachers()
    }
  }, [isLoggedIn])

  // Check if already logged in
  useEffect(() => {
    const adminSession = localStorage.getItem('adminSession')
    if (adminSession === 'true') {
      setIsLoggedIn(true)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (email === 'admin@admin.com' && password === 'admin123') {
      setIsLoggedIn(true)
      localStorage.setItem('adminSession', 'true')
      toast.success('Welcome to Admin Dashboard!')
    } else {
      toast.error('Invalid credentials. Please try again.')
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('adminSession')
    setEmail('')
    setPassword('')
    toast.success('Logged out successfully')
  }

  // ADD / UPDATE COURSE
  const handleAddOrUpdateCourse = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      let imageUrl: any = courseForm.imageFile

      if (courseForm.imageFile instanceof File) {
        const { data, error: uploadError } = await supabase.storage
          .from("images")
          .upload(`courses/${Date.now()}-${courseForm.imageFile.name}`, courseForm.imageFile, {
            cacheControl: "3600",
            upsert: false,
          })

        if (uploadError) throw uploadError

        const { data: publicUrlData } = supabase.storage
          .from("images")
          .getPublicUrl(data.path)

        imageUrl = publicUrlData.publicUrl
      }

      if (courseForm.id) {
        // UPDATE
        const { error } = await supabase
          .from("courses")
          .update({
            ...courseForm,
            imageFile: imageUrl,
          })
          .eq("id", courseForm.id)

        if (error) throw error
        toast.success("Course updated successfully!")
      } else {
        // INSERT
        const { error } = await supabase.from("courses").insert([{
          ...courseForm,
          imageFile: imageUrl,
          created_at: new Date().toISOString(),
        }])

        if (error) throw error
        toast.success("Course added successfully!")
      }

      setCourseForm({
        title: "",
        description: "",
        teacher: "",
        duration: "",
        category: "",
        imageFile: null,
      })
      fetchCourses()
    } catch (err) {
      console.error(err)
      toast.error("Failed to save course.")
    } finally {
      setLoading(false)
    }
  }

  // ADD / UPDATE TEACHER
  const handleAddOrUpdateTeacher = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {

      let imageUrl: any = teacherForm?.photoUrl

      if (teacherForm?.photoUrl instanceof File) {
        const { data, error: uploadError } = await supabase.storage
          .from("images")
          .upload(`teachers/${Date.now()}-${teacherForm?.photoUrl?.name}`, teacherForm?.photoUrl, {
            cacheControl: "3600",
            upsert: false,
          })

        if (uploadError) throw uploadError

        const { data: publicUrlData } = supabase.storage
          .from("images")
          .getPublicUrl(data.path)

        imageUrl = publicUrlData.publicUrl
      }

      if (teacherForm.id) {
        // UPDATE
        const { error } = await supabase
          .from("teachers")
          .update({
            ...teacherForm,
            photoUrl: imageUrl,
          })
          .eq("id", teacherForm.id)

        if (error) throw error
        toast.success("Teacher updated successfully!")
      } else {
        // INSERT
        const { error } = await supabase.from("teachers").insert([{
          ...teacherForm,
          photoUrl: imageUrl,
          created_at: new Date().toISOString(),
        }])

        if (error) throw error
        toast.success("Teacher added successfully!")
      }

      setTeacherForm({
        name: '',
        about: '',
        qualifications: '',
        teaching: '',
        experience: '',
        photoUrl: null,
        rating: '5',
      })
      fetchTeachers()
    } catch (err) {
      console.error(err)
      toast.error('Failed to save teacher.')
    } finally {
      setLoading(false)
    }
  }

  // DELETE COURSE
  const handleDeleteCourse = async (id: string) => {
    const { error } = await supabase.from('courses').delete().eq('id', id)
    if (error) toast.error('Failed to delete course.')
    else {
      toast.success('Course deleted.')
      fetchCourses()
    }
  }

  // DELETE TEACHER
  const handleDeleteTeacher = async (id: string) => {
    const { error } = await supabase.from('teachers').delete().eq('id', id)
    if (error) toast.error('Failed to delete teacher.')
    else {
      toast.success('Teacher deleted.')
      fetchTeachers()
    }
  }

  // ===== LOGIN UI =====
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-emerald-100">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
          <h2 className="text-xl font-bold mb-4">Admin Login</h2>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"
            className="w-full border p-2 rounded mb-3" required />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"
            className="w-full border p-2 rounded mb-3" required />
          <button type="submit" className="w-full bg-emerald-600 text-white p-2 rounded">Login</button>
        </form>
      </div>
    )
  }

  // ===== DASHBOARD UI =====
  return (
    <div className="min-h-screen bg-gray-50 p-8 pt-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button onClick={() => setActiveTab('courses')} className={activeTab === 'courses' ? 'font-bold' : ''}>Courses</button>
        <button onClick={() => setActiveTab('teachers')} className={activeTab === 'teachers' ? 'font-bold' : ''}>Teachers</button>
      </div>

      {/* COURSES */}
      {activeTab === 'courses' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <form onSubmit={handleAddOrUpdateCourse} className="flex flex-col gap-4">
            <div className='flex flex-col lg:flex-row gap-5'>
              <input placeholder="Title" value={courseForm.title} onChange={e => setCourseForm({ ...courseForm, title: e.target.value })} className="border p-2 rounded w-full" required />
              <input placeholder="Teacher" value={courseForm.teacher} onChange={e => setCourseForm({ ...courseForm, teacher: e.target.value })} className="border p-2 rounded w-full" required />
            </div>
            <div className='flex flex-col lg:flex-row gap-5'>
              <input placeholder="Category" value={courseForm.category} onChange={e => setCourseForm({ ...courseForm, category: e.target.value })} className="border p-2 rounded w-full" required />
              <input placeholder="Duration" value={courseForm.duration} onChange={e => setCourseForm({ ...courseForm, duration: e.target.value })} className="border p-2 rounded w-full" required />
            </div>
            <textarea placeholder="Description" value={courseForm.description} onChange={e => setCourseForm({ ...courseForm, description: e.target.value })} className="border p-2 rounded md:col-span-2 w-full" required />
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl p-6 w-full max-w-md text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition"
              onClick={handleClick}>
              <Upload className="w-12 h-12 text-blue-500 mb-3" />
              <p className="text-gray-600">Click to upload or drag & drop</p>
              <p className="text-sm text-gray-400">PNG, JPG up to 5MB</p>
              <input
                type="file"
                ref={inputRef}
                className="hidden"
                onChange={(e) => setCourseForm({ ...courseForm, imageFile: e.target.files?.[0] || null })}
              // accept="image/*"
              />
            </div>
            <button type="submit" disabled={loading} className="bg-emerald-600 text-white p-2 rounded col-span-2">
              {courseForm.id ? (loading ? 'Updating...' : 'Update Course') : (loading ? 'Adding...' : 'Add Course')}
            </button>
          </form>

          <ul>
            {courses.map(c => (
              <motion.li key={c.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex justify-between items-center border-b py-2">
                <div className='flex items-center gap-5'>
                  <img className='w-14 h-14 border-2 rounded-full' src={c.imageFile} alt={c.name} />
                  <span>{c.title}</span>
                </div>
                <span>{c.teacher}</span>
                <div className="flex gap-3">
                  <button onClick={() => setCourseForm(c)} className="text-blue-500"><Edit size={18} /></button>
                  <button onClick={() => handleDeleteCourse(c.id)} className="text-red-500"><Trash size={18} /></button>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* TEACHERS */}
      {activeTab === 'teachers' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <form onSubmit={handleAddOrUpdateTeacher} className="flex flex-col gap-4">
            <div className='flex flex-col lg:flex-row gap-5'>
              <input placeholder="Name" value={teacherForm.name} onChange={e => setTeacherForm({ ...teacherForm, name: e.target.value })} className="border p-2 rounded w-full" required />
              <input placeholder="Experience" value={teacherForm.experience} onChange={e => setTeacherForm({ ...teacherForm, experience: e.target.value })} className="border p-2 rounded w-full" />
            </div>
            <div className='flex flex-col lg:flex-row gap-5'>
              <input placeholder="About" value={teacherForm.about} onChange={e => setTeacherForm({ ...teacherForm, about: e.target.value })} className="border p-2 rounded w-full" required />
              <input placeholder="Rating" value={teacherForm.rating} onChange={e => setTeacherForm({ ...teacherForm, rating: e.target.value })} className="border p-2 rounded w-full" required />
            </div>
            <div className='flex flex-col lg:flex-row gap-5'>
              <input placeholder="Qualifications" value={teacherForm.qualifications} onChange={e => setTeacherForm({ ...teacherForm, qualifications: e.target.value })} className="border p-2 rounded w-full" required />
              <input placeholder="Teaching" value={teacherForm.teaching} onChange={e => setTeacherForm({ ...teacherForm, teaching: e.target.value })} className="border p-2 rounded w-full" required />
            </div>
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl p-6 w-full max-w-md text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition"
              onClick={handleClick}>
              <Upload className="w-12 h-12 text-blue-500 mb-3" />
              <p className="text-gray-600">Click to upload or drag & drop</p>
              <p className="text-sm text-gray-400">PNG, JPG up to 5MB</p>
              <input
                type="file"
                ref={inputRef}
                className="hidden"
                onChange={e => setTeacherForm({ ...teacherForm, photoUrl: e.target.files?.[0] || null })}
              // accept="image/*"
              />
            </div>
            <button type="submit" disabled={loading} className="bg-emerald-600 text-white p-2 rounded col-span-2">
              {teacherForm.id ? (loading ? 'Updating...' : 'Update Teacher') : (loading ? 'Adding...' : 'Add Teacher')}
            </button>
          </form>

          <ul>
            {teachers.map(t => (
              <motion.li key={t.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex justify-between items-center border-b py-2">
                <div className='flex items-center gap-5'>
                  <img className='w-14 h-14 border-2 rounded-full' src={t.photoUrl} alt={t.name} />
                  <span>{t.name}</span>
                </div>
                <span>{t.rating}</span>
                <div className="flex gap-3">
                  <button onClick={() => setTeacherForm(t)} className="text-blue-500"><Edit size={18} /></button>
                  <button onClick={() => handleDeleteTeacher(t.id)} className="text-red-500"><Trash size={18} /></button>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  )
}

export default AdminPage

