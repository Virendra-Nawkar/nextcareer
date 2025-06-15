import { setAllAppliedJobs } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();
    useEffect(() => {
     const fetchAllAppliedJobs = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/get` ,{withCredentials : true});
            if(res.data.success){
                dispatch(setAllAppliedJobs(res.data.application))
                console.log(res.data); 
            }
        } catch (error) {
                console.log(error.response.data.error);
        }
     }
     fetchAllAppliedJobs();
    }, [])  
}
export default  useGetAppliedJobs;