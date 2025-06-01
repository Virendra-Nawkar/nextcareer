import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem, } from "@/components/ui/radio-group"
import { Link } from 'react-router-dom'

const Signup = () => {
    const [input, setinput] = useState({
        fullname: "",
        email: "",
        phoneNumer: "",
        password: "",
        role: "",
        file: "",
    });

    const changeEventHandler = (e) => {
        setinput({ ...input, [e.target.name]: e.target.value });
    }
    const changeFileHandler = (e) => {
        setinput({ ...input, file: e.target.files?.[0] });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(input);
    }

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} action="" className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
                    <div className='flex  flex-col gap-1 my-4'>
                        <Label>Full Name</Label>
                        <input className='pl-3' type="text"
                            placeholder="Enter your full name"
                            name="fullname" value={input.fullname} onChange={changeEventHandler}
                        />
                    </div>

                    <div className='flex  flex-col gap-1 my-4'>
                        <Label>Email</Label>
                        <input className='pl-3' type="email"
                            placeholder="Enter your email"
                            name="email" value={input.email} onChange={changeEventHandler}
                        />
                    </div>

                    <div className='flex  flex-col gap-1 my-4'>
                        <Label>Phone Number</Label>
                        <input className='pl-3'
                            placeholder="Enter your Phone Number" type='text'
                            name="phoneNumber" value={input.phoneNumber} onChange={changeEventHandler}

                        />
                    </div>

                    <div className='flex  flex-col gap-1 my-4'>
                        <Label>Password</Label>
                        <input className='pl-3'
                            type='password'
                            placeholder="Enter your Password"
                            name="password" value={input.password} onChange={changeEventHandler}
                        />
                    </div>
                    <div className='flex items-center justify-between'>
                        <RadioGroup className="flex items-center gap-4 my-5" defaultValue="student">
                            <div className="flex items-center gap-3">
                                <Input type="radio" name="role" value="student" className="cursor-pointer"
                                    checked={input.role === 'student'} onChange={changeEventHandler}
                                />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center gap-3">
                                <Input type="radio" name="role" value="recruiter" className="cursor-pointer"
                                    checked={input.role === 'recruiter'} onChange={changeEventHandler}
                                />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                        <div className='flex items-center gap-2'>
                            <Label>Profile</Label>
                            <Input accept="image/*" type="file" className="cursor-pointer"
                                onChange={changeFileHandler}
                            />
                        </div>

                    </div>
                    <Button type="submit" className="w-full my-4">Signup</Button>
                    <span className='text-sm'>Already have an Account ? <Link className='text-blue-600' to="/login">Login</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Signup
