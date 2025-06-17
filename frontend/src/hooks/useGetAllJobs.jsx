import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { JOB_API_END_POINT } from '../utils/constant';
import { setAllJobs } from '@/redux/jobSlice';

const useGetAllJobs = (query) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/?keyword=${query}`, {
                    withCredentials: true
                });
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.log("Error fetching jobs:", error);
            }
        };

        if (query !== undefined && query !== null) {
            fetchAllJobs();
        }
    }, [query]);
};

export default useGetAllJobs;
