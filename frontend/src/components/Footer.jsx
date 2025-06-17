import React from 'react';
import { Briefcase, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src="/logo1.png" alt="NextCareer Logo" width={30} height={30} className="object-contain" />
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">NextCareer</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Connecting talent with opportunity. Find your dream job or the perfect candidate with our platform.
            </p>
            {/* <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.676 0H1.324C.593 0 0 .592 0 1.324v21.352C0 23.408.593 24 1.324 24H12.82V14.706H9.692v-3.578h3.128V8.408c0-3.1 1.893-4.787 4.657-4.787 1.325 0 2.463.1 2.794.144v3.238l-1.918.001c-1.503 0-1.794.715-1.794 1.762v2.31h3.587l-.468 3.578h-3.119V24h6.116C23.407 24 24 23.408 24 22.676V1.324C24 .592 23.407 0 22.676 0z" /></svg>
              </a>
              <a href="https://twitter.com" className="text-gray-500 hover:text-blue-400 dark:hover:text-blue-300 transition-colors" aria-label="Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.835 9.835 0 01-2.828.775 4.934 4.934 0 002.165-2.724 9.867 9.867 0 01-3.127 1.195 4.924 4.924 0 00-8.38 4.49A13.978 13.978 0 011.67 3.149 4.93 4.93 0 003.16 9.724a4.903 4.903 0 01-2.229-.616v.062a4.93 4.93 0 003.946 4.827 4.902 4.902 0 01-2.224.084 4.93 4.93 0 004.6 3.417A9.869 9.869 0 010 21.543a13.978 13.978 0 007.548 2.212c9.057 0 14.01-7.507 14.01-14.01 0-.213-.004-.425-.015-.636A10.012 10.012 0 0024 4.557z" /></svg>
              </a>
              <a href="https://linkedin.com" className="text-gray-500 hover:text-blue-700 dark:hover:text-blue-400 transition-colors" aria-label="LinkedIn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452H16.85v-5.569c0-1.327-.027-3.037-1.852-3.037-1.854 0-2.137 1.446-2.137 2.94v5.666H9.147V9.756h3.448v1.464h.05c.48-.91 1.653-1.871 3.401-1.871 3.634 0 4.307 2.39 4.307 5.498v5.605zM5.337 8.29c-1.105 0-2-.896-2-2 0-1.106.895-2 2-2 1.104 0 2 .895 2 2 0 1.104-.896 2-2 2zM7.119 20.452H3.553V9.756h3.566v10.696zM22.225 0H1.771C.791 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451c.979 0 1.771-.774 1.771-1.729V1.729C24 .774 23.205 0 22.225 0z" /></svg>
              </a>
            </div> */}
            <div className="social flex flex-row gap-2">
              <a
                href="https://www.linkedin.com/in/virendra-nawkar-7ab464246/"
                target="_blank"
                rel="noopener noreferrer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-6 text-black dark:text-white hover:text-blue-600 transition-colors"
                  viewBox="0 0 24 24"
                  fill="currentColor">
                  <path d="M19,3H5C3.895,3,3,3.895,3,5v14c0,1.105,0.895,2,2,2h14c1.105,0,2-0.895,2-2V5C21,3.895,20.105,3,19,3z M9,17H6.477v-7H9 V17z M7.694,8.717c-0.771,0-1.286-0.514-1.286-1.2s0.514-1.2,1.371-1.2c0.771,0,1.286,0.514,1.286,1.2S8.551,8.717,7.694,8.717z M18,17h-2.442v-3.826c0-1.058-0.651-1.302-0.895-1.302s-1.058,0.163-1.058,1.302c0,0.163,0,3.826,0,3.826h-2.523v-7h2.523v0.977 C13.93,10.407,14.581,10,15.802,10C17.023,10,18,10.977,18,13.174V17z" />
                </svg>
              </a>


              <a
                href="https://github.com/Virendra-Nawkar"
                target="_blank"
                rel="noopener noreferrer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-6 text-black dark:text-white hover:text-gray-600 transition-colors"
                  viewBox="0 0 24 24"
                  fill="currentColor">
                  <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.29 3.438 9.77 8.205 11.365.6.11.82-.26.82-.577v-2.234c-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.204.085 1.838 1.236 1.838 1.236 1.07 1.832 2.809 1.302 3.495.996.108-.775.418-1.302.762-1.602-2.665-.3-5.467-1.332-5.467-5.933 0-1.31.47-2.38 1.236-3.22-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.51 11.51 0 0 1 3-.404c1.02.004 2.047.138 3.003.404 2.29-1.552 3.296-1.23 3.296-1.23.655 1.653.243 2.873.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.63-5.48 5.923.43.372.823 1.102.823 2.222v3.293c0 .32.216.694.825.576C20.565 22.266 24 17.79 24 12.5 24 5.87 18.63.5 12 .5z" />
                </svg>
              </a>

              <a
                href={"https://www.instagram.com/virendra_nawkar/"}
                target="_blank"
                rel="noopener noreferrer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
                  className="w-8 h-6 text-black dark:text-white"
                  fill="currentColor">
                  <path d="M 16 3 C 8.83 3 3 8.83 3 16 L 3 34 C 3 41.17 8.83 47 16 47 L 34 47 C 41.17 47 47 41.17 47 34 L 47 16 C 47 8.83 41.17 3 34 3 L 16 3 z M 37 11 C 38.1 11 39 11.9 39 13 C 39 14.1 38.1 15 37 15 C 35.9 15 35 14.1 35 13 C 35 11.9 35.9 11 37 11 z M 25 14 C 31.07 14 36 18.93 36 25 C 36 31.07 31.07 36 25 36 C 18.93 36 14 31.07 14 25 C 14 18.93 18.93 14 25 14 z M 25 16 C 20.04 16 16 20.04 16 25 C 16 29.96 20.04 34 25 34 C 29.96 34 34 29.96 34 25 C 34 20.04 29.96 16 25 16 z" />
                </svg>
              </a>

            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/jobs" className="text-gray-600 hover:text-blue-600 dark:hover:text-blue-400 dark:text-gray-400 transition-colors">Browse Jobs</a></li>
              <li><a href="/browse" className="text-gray-600 hover:text-blue-600 dark:hover:text-blue-400 dark:text-gray-400 transition-colors">Companies</a></li>
              <li><a href="/career-advice" className="text-gray-600 hover:text-blue-600 dark:hover:text-blue-400 dark:text-gray-400 transition-colors">Career Resources</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 dark:hover:text-blue-400 dark:text-gray-400 transition-colors">Post a Job</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Resources</h3>
            <ul className="space-y-2">
              <li><a href="/resume-tips" className="text-gray-600 hover:text-blue-600 dark:hover:text-blue-400 dark:text-gray-400 transition-colors">Resume Tips</a></li>
              <li><a href="/interview-prep" className="text-gray-600 hover:text-blue-600 dark:hover:text-blue-400 dark:text-gray-400 transition-colors">Interview Prep</a></li>
              <li><a href="/career-advice" className="text-gray-600 hover:text-blue-600 dark:hover:text-blue-400 dark:text-gray-400 transition-colors">Career Advice</a></li>
              <li><a href="/help" className="text-gray-600 hover:text-blue-600 dark:hover:text-blue-400 dark:text-gray-400 transition-colors">Help Center</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400">virendranawkar1@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400">+91 7249504669</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-gray-600 dark:text-gray-400 mt-0.5" />
                <span className="text-gray-600 dark:text-gray-400">Nagpur - 440022</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} NextCareer. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-blue-600 dark:hover:text-blue-400 dark:text-gray-400 text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 dark:hover:text-blue-400 dark:text-gray-400 text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 dark:hover:text-blue-400 dark:text-gray-400 text-sm transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;