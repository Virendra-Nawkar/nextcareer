import useGetAllJobs from '@/hooks/useGetAllJobs'
import CategoryCarousel from './CategoryCarousel'
import Footer from './Footer'
import HeroSection from './HeroSection'
import LatestJobs from './LatestJobs'
import Navbar from './shared/Navbar'

const Home = () => {
  useGetAllJobs();
  return (
    <div className="bg-white dark:bg-zinc-900 text-gray-900 dark:text-zinc-100 transition-colors duration-300">
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
      <Footer />
    </div>
  )
}

export default Home 