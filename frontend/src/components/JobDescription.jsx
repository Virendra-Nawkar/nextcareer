import React, { useEffect } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import Navbar from './shared/Navbar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleJob } from '@/redux/jobSlice';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';



const JobDescription = () => {
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  const { singleJob } = useSelector(store => store.job);
  const { user } = useSelector(store => store.auth);

  const isApplied = singleJob?.applications?.some(application => application.applicant == user?.id) || false; // Replace with actual logic
  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
        if (res.data.success && res.data.job) {
          dispatch(setSingleJob(res.data.job));
        }
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };

    if (jobId) fetchSingleJob();
  }, [jobId, dispatch]);

  const formattedPostedDate = singleJob?.createdAt
    ? formatDistanceToNow(new Date(singleJob.createdAt), { addSuffix: true })
    : null;

  const capitalizedPostedDate = formattedPostedDate
    ? formattedPostedDate[0].toUpperCase() + formattedPostedDate.slice(1)
    : "N/A";

  const applyJobHandler = async () => {
    alert('Button Clicked');
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {withCredentials:true})
      console.log(res.data);
      
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log("Error in Applying job by ID");
      toast.error(error.res.data.message);

    }
  }


  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 px-4 text-gray-900 dark:text-gray-100">
        <h1 className="font-bold text-2xl">{singleJob?.title || "No Title"}</h1>

        <div className="flex flex-wrap items-center gap-3 mt-4">
          <Badge className="text-blue-600 dark:text-blue-300 font-bold" variant="outline">
            {singleJob?.position ? `${singleJob.position} Positions` : "N/A"}
          </Badge>
          <Badge className="text-purple-600 dark:text-purple-300 font-bold" variant="outline">
            {singleJob?.jobType || "N/A"}
          </Badge>
          <Badge className="text-green-600 dark:text-green-300 font-bold" variant="outline">
            {singleJob?.salary ? `${singleJob.salary} LPA` : "Not Defined"}
          </Badge>
        </div>

        <div className="flex items-center justify-between mt-6">
          <Badge variant="default">New</Badge>
          <Button
            onClick={isApplied ? null : applyJobHandler}
            disabled={isApplied}
            className={`rounded-lg ${isApplied
              ? 'bg-gray-600 cursor-not-allowed'  // always 'not-allowed' cursor when disabled
              : 'bg-[#7209b7] hover:bg-[#5e0897] cursor-pointer'  // normal pointer cursor & hover bg when enabled
              }`}
          >

            {isApplied ? 'Already Applied' : 'Apply Now'}
          </Button>
        </div>

        <h2 className="border-b-2 border-gray-300 dark:border-gray-700 font-semibold py-4 mt-8">
          Job Description
        </h2>

        <div className="mt-4 space-y-2">
          <p><span className="font-semibold">Role:</span> {singleJob?.title || "N/A"}</p>
          <p><span className="font-semibold">Location:</span> {singleJob?.location || "N/A"}</p>
          <p><span className="font-semibold">Description:</span> {singleJob?.description || "N/A"}</p>
          <p><span className="font-semibold">Experience:</span> {singleJob?.experienceLevel || "N/A"}</p>
          <p><span className="font-semibold">Salary:</span> {singleJob?.salary ? `${singleJob.salary} LPA` : "Not Defined"}</p>
          <p><span className="font-semibold">Total Applicants:</span> {singleJob?.applications?.length ?? "N/A"}</p>
          <p><span className="font-semibold">Posted Date:</span> {capitalizedPostedDate}</p>
        </div>
      </div>
    </>
  );
};

export default JobDescription;
