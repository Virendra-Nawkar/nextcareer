import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Home from './components/Home';
import Jobs from './components/Jobs';
import Browse from './components/Browse';
import Profile from './components/Profile';
import JobDescription from './components/JobDescription';
import { ThemeProvider } from './components/theme-provider';
import Companies from './components/admin/Companies';
import CompanyCreate from './components/admin/CompanyCreate';
import CompanySetup from './components/admin/CompanySetup';
import AdminJobs from './components/admin/AdminJobs';
import PostJob from './components/admin/PostJob';
import Applicants from './components/admin/Applicants';
import { Toaster } from 'sonner';
import ProtectedRoute from './components/admin/ProtectedRoute';
import ResumeTips from './components/ResumeTips';
import InterviewPrep from './components/InterviewPrep';
import HelpCenter from './components/HelpCenter';
import CareerAdvice from './components/CareerAdvice';


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/jobs",
    element: <Jobs />
  },
  {
    path: "/description/:id",
    element: <JobDescription />
  },
  {
    path: "/browse",
    element: <Browse />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/resume-tips",
    element: <ResumeTips />
  },
  {
    path: "/interview-prep",
    element: <InterviewPrep />
  },
  {
    path: "/career-advice",
    element: <CareerAdvice />
  },
  {
    path: "/help",
    element: <HelpCenter />
  },

  // Routes for Admin
  {
    path: "/admin/companies",
    element:
      <ProtectedRoute>
        <Companies />
      </ProtectedRoute>
  },
  {
    path: "/admin/jobs",
    element:
      <ProtectedRoute>
        <AdminJobs />
      </ProtectedRoute>
  },
  {
    path: '/admin/companies/create',
    element:
      <ProtectedRoute>
        <CompanyCreate />
      </ProtectedRoute>
  },
  {
    path: '/admin/companies/:id',
    element:
      <ProtectedRoute>
        <CompanySetup />
      </ProtectedRoute>
  },
  {
    path: '/admin/jobs/create',
    element:
      <ProtectedRoute>
        <PostJob />
      </ProtectedRoute>
  },
  {
    path: '/admin/jobs/:id/applicants',
    element:
      <ProtectedRoute>
        <Applicants />
      </ProtectedRoute>
  }
]);

function App() {

  return (
    <>
      <ThemeProvider>
        <div className="min-h-screen bg-white text-black dark:bg-gray-950 dark:text-white transition-colors duration-300">
          <RouterProvider router={appRouter} />
          <Toaster richColors />
        </div>
      </ThemeProvider>
    </>
  )
}

export default App
