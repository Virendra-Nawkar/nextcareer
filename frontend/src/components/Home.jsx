import useGetAllJobs from '@/hooks/useGetAllJobs'
import CategoryCarousel from './CategoryCarousel'
import Footer from './Footer'
import HeroSection from './HeroSection'
import LatestJobs from './LatestJobs'
import Navbar from './shared/Navbar'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate('/admin/companies');
    }
  });
  return (
    <div className="bg-white dark:bg-zinc-900 text-gray-900 dark:text-zinc-100 transition-colors duration-300">
      <Navbar />
      <HeroSection />
      {/* <CategoryCarousel /> */}
      <LatestJobs />
      <Footer />
    </div>
  )
}

export default Home 