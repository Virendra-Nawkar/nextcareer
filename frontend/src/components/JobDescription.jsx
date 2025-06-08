import React, { useEffect } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import Navbar from './shared/Navbar';
import { useParams } from 'react-router-dom';
import useGetSingleJob from '@/hooks/useGetSingleJob';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleJob } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';

const isApplied = false; // You can make this dynamic based on your app's logic

const JobDescription = () => {
  const params = useParams();
  const jobId = params.id;
  const {singleJob} = useSelector(store => store.job);
  useGetSingleJob(jobId)         //custom hook to get a single job
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchSingleJob();
  }, [jobId, dispatch]);


  return (

    <>

      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl">{singleJob?.title || "No Title"}</h1>

        <div className="flex items-center gap-2 mt-4">
          <Badge className="text-blue-700 font-bold" variant="ghost">{singleJob?.positon}</Badge>
          <Badge className="text-[#F83002] font-bold" variant="ghost">{singleJob?.jobType}</Badge>
          <Badge className="text-[#7209b7] font-bold" variant="ghost">{singleJob?.salary + " LPA"}</Badge>
        </div>

        <div className="flex items-center justify-between mt-6">
          <div>
            <Badge>New</Badge>
          </div>
          <Button
            disabled={isApplied}
            className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5e0897]'}`}
          >
            {isApplied ? 'Already Applied' : 'Apply Now'}
          </Button>
        </div>

        <h1 className="border-b-2 border-b-gray-300 font-medium py-4 mt-8">Job Description</h1>

        <div className="my-4">
          <h1 className="font-bold my-1">
            Role: <span className="pl-4 font-normal text-gray-800">Frontend Developer</span>
          </h1>
          <h1 className="font-bold my-1">
            Location: <span className="pl-4 font-normal text-gray-800">Hyderabad</span>
          </h1>
          <h1 className="font-bold my-1">
            Description: <span className="pl-4 font-normal text-gray-800">Lorem ipsum dolor sit amet.</span>
          </h1>
          <h1 className="font-bold my-1">
            Experience: <span className="pl-4 font-normal text-gray-800">2 yrs</span>
          </h1>
          <h1 className="font-bold my-1">
            Salary: <span className="pl-4 font-normal text-gray-800">12LPA</span>
          </h1>
          <h1 className="font-bold my-1">
            Total Applicants: <span className="pl-4 font-normal text-gray-800">4</span>
          </h1>
          <h1 className="font-bold my-1">
            Posted Date: <span className="pl-4 font-normal text-gray-800">17-07-2024</span>
          </h1>
        </div>
      </div>
    </>
  );
};

export default JobDescription;
