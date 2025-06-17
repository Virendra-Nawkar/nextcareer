import axios from 'axios'
import { useEffect } from 'react'
import { COMPANY_API_END_POINT } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/redux/companySlice'; // ✅ Correct import

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchSingleCompany = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, {
                    withCredentials: true
                });
                if (res.data.success) {
                    dispatch(setSingleCompany(res.data.company)); // ✅ Now this will work
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchSingleCompany();
    }, [companyId, dispatch]);
};

export default useGetCompanyById;


