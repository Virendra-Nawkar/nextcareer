import React, { useEffect, useState } from 'react';

import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import store from '@/redux/store';


const CompanySetup = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { singleCompany } = useSelector(store => store.company)


  const [input, setInput] = useState({
    name: singleCompany.name || "",
    description: singleCompany.description || "",
    website: singleCompany.website || "",
    location: singleCompany.location || "",
    file: singleCompany.file || null,
  },[singleCompany])

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file })
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true
      });
      if (res.data.success) {
        toast.success(res.data.message || "Company Details Updated Succuessfully");
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log("Error in Updating the Company Data ", error);
      toast.error(error.res.data.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setInput({
      name: "",
      description: "",
      website: "",
      location: "",
      file: null,
    })
  })

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto my-10">
        <form onSubmit={submitHandler}>
          <div className="flex items-center gap-5 p-8">
            <Button variant="outline" className="flex items-center gap-2 text-gray-500 font-semibold" onClick={() => navigate("/admin/companies")}
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl">Company Setup</h1>
          </div>
          <div className='flex flex-col gap-3 '>
            <div className='flex gap-10'>
              <Label>Company Name</Label>
              <div className='grid grid-cols-2 gap-4'>
                <Input
                  type="text"
                  name="name"
                  value={input.name}
                  onChange={changeEventHandler}
                />
              </div>
            </div>

            <div className='flex gap-10'>
              <Label>Description</Label>
              <div className='grid grid-cols-2 gap-4'>
                <Input
                  type="text"
                  name="description"
                  value={input.description}
                  onChange={changeEventHandler}
                />
              </div>
            </div>

            <div className='flex gap-10'>
              <Label>Website</Label>
              <div className='grid grid-cols-2 gap-4'>
                <Input
                  type="text"
                  name="website"
                  value={input.website}
                  onChange={changeEventHandler}
                />
              </div>
            </div>

            <div className='flex gap-10'>
              <Label>Location</Label>
              <div className='grid grid-cols-2 gap-4'>
                <Input
                  type="text"
                  name="location"
                  value={input.location}
                  onChange={changeEventHandler}
                />
              </div>
            </div>

            <div className='flex gap-10'>
              <Label>Logo</Label>
              <div className='grid grid-cols-2 gap-4'>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={changeFileHandler}
                />
              </div>
            </div>
          </div>
          {loading ? (
            <Button className="w-full" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating...
            </Button>
          ) : (
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">
              Update
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
