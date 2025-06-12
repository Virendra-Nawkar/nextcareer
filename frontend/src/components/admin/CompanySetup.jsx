import React, { useState } from 'react';

import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Description } from '@radix-ui/react-dialog';

const CompanySetup = () => {
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  })

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({...input, file})
  }
  

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto my-10">
        <form action="">
          <div className="flex items-center gap-5 p-8">
            <Button variant="outline" className="flex items-center gap-2 text-gray-500 font-semibold">
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
                  accept = "image/*"
                  onChange={changeFileHandler}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
