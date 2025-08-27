
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { LanguageProvider } from './contexts/LanguageContext'
import Header from './components/Header'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import HomePage from './pages/HomePage'
import CoursesPage from './pages/CoursesPage'
import CourseDetailPage from './pages/CourseDetailPage'
import TeachersPage from './pages/TeachersPage'
import TeacherDetailPage from './pages/TeacherDetailPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import AdminPage from './pages/AdminPage'

function App() {
  const defaultWhatsAppMessage = "Hello! I'm interested in learning more about your Islamic education courses. Could you please provide more information?"

  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 5000,
              style: { background: '#363636', color: '#fff' },
              success: { style: { background: '#10b981' } },
              error: { style: { background: '#ef4444' } }
            }}
          />
          
          <Header />
          
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/course/:courseId" element={<CourseDetailPage />} />
              <Route path="/teachers" element={<TeachersPage />} />
              <Route path="/teacher/:teacherId" element={<TeacherDetailPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </main>
          
          <Footer />
          
          {/* Floating WhatsApp Button */}
          <WhatsAppButton 
            message={defaultWhatsAppMessage}
            className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50"
          />
        </div>
      </Router>
    </LanguageProvider>
  )
}

export default App
