import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = () => {
  const navigate = useNavigate();
  const jobId = "jfasdljfoajwfasdf"
  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-gray-500'>2 days ago</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className='flex items-center gap-2 my-2'>
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src="/CompnayLogo.png" />
          </Avatar>
        </Button>
        <div>
          <h1 className='font-medium text-lg'>OpenAI</h1>
          <p className='text-sm text-gray-500'>India</p>
        </div>
      </div>

      <div>
        <h1 className='font-bold text-lg my-2'>Frontend Developer</h1>
        <p className='text-sm text-gray-600'>
          We're looking for a frontend developer to join our growing team to build amazing UI experiences.
        </p>
      </div>

      <div className='flex items-center gap-2 mt-4'>
        <Badge className='text-blue-700 font-bold' variant="ghost">2 Positions</Badge>
        <Badge className='text-[#F83002] font-bold' variant="ghost">Full-time</Badge>
        <Badge className='text-[#7209b7] font-bold' variant="ghost">12 LPA</Badge>
      </div>

      <div className='flex items-center gap-4 mt-4'>
        <Button onClick={()=>navigate(`/description/${jobId}`)} variant="outline">Details</Button>
        <Button className="bg-[#7209b7]">Save For Later</Button>
      </div>
    </div>
  )
}

export default Job;


// import React from 'react'
// import { Button } from './ui/button'
// import { Bookmark, MapPin, Briefcase, DollarSign } from 'lucide-react'
// import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
// import { Badge } from './ui/badge'
// import { useNavigate } from 'react-router-dom'

// const Job = () => {
//   const navigate = useNavigate();
//   const jobId = "jfasdljfoajwfasdf"
  
//   return (
//     <div className='p-6 rounded-lg shadow-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-md'>
//       {/* Header with date and bookmark */}
//       <div className='flex items-center justify-between mb-4'>
//         <p className='text-sm text-gray-500 dark:text-gray-400'>2 days ago</p>
//         <Button 
//           variant="ghost" 
//           size="icon" 
//           className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
//           aria-label="Save job"
//         >
//           <Bookmark className="h-5 w-5" />
//         </Button>
//       </div>

//       {/* Company info */}
//       <div className='flex items-center gap-4 mb-6'>
//         <Avatar className="h-12 w-12 border border-gray-200 dark:border-gray-600">
//           <AvatarImage src="/CompnayLogo.png" alt="OpenAI logo" />
//           <AvatarFallback className="bg-gray-100 dark:bg-gray-700">AI</AvatarFallback>
//         </Avatar>
//         <div>
//           <h1 className='font-semibold text-lg text-gray-800 dark:text-white'>OpenAI</h1>
//           <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
//             <MapPin className="h-4 w-4 mr-1" />
//             <span>India (Remote)</span>
//           </div>
//         </div>
//       </div>

//       {/* Job details */}
//       <div className='mb-6'>
//         <h1 className='font-bold text-xl mb-2 text-gray-900 dark:text-white'>Frontend Developer</h1>
//         <p className='text-gray-600 dark:text-gray-300'>
//           We're looking for a frontend developer to join our growing team to build amazing UI experiences.
//         </p>
//       </div>

//       {/* Badges */}
//       <div className='flex flex-wrap gap-2 mb-6'>
//         <Badge variant="secondary" className="flex items-center gap-1">
//           <Briefcase className="h-3 w-3" />
//           <span>Full-time</span>
//         </Badge>
//         <Badge variant="secondary" className="flex items-center gap-1">
//           <DollarSign className="h-3 w-3" />
//           <span>12 LPA</span>
//         </Badge>
//         <Badge variant="secondary">2 Positions</Badge>
//         <Badge variant="secondary">React</Badge>
//         <Badge variant="secondary">TypeScript</Badge>
//       </div>

//       {/* Action buttons */}
//       <div className='flex flex-col sm:flex-row gap-3'>
//         <Button 
//           onClick={() => navigate(`/description/${jobId}`)} 
//           variant="outline" 
//           className="flex-1 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
//         >
//           View Details
//         </Button>
//         <Button 
//           className="flex-1 bg-[#7209b7] hover:bg-[#5e0a9b] dark:bg-[#8a2be2] dark:hover:bg-[#7b1fa2]"
//         >
//           Apply Now
//         </Button>
//       </div>
//     </div>
//   )
// }

// export default Job