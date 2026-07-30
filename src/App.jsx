import { useState, useCallback } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import LoadingScreen from './components/LoadingScreen'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import ProjectsPage from './pages/ProjectsPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'

export default function App() {
  const [loading, setLoading] = useState(true)

  const handleLoadingComplete = useCallback(() => {
    setLoading(false)
  }, [])

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence mode="wait">
        {loading && (
          <LoadingScreen onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      {/* Main App - only visible after loading */}
      <div className={`w-full h-full transition-opacity duration-1000 ${loading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>
        </Routes>
      </div>
    </>
  )
}
