import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    
    const searchJobHandler = () => {
        dispatch((setSearchedQuery(query)));
        navigate('/browse')
    }

    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
                <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>Your next career move starts here.</span>
                <h1 className='text-5xl font-bold'>Search, Apply & <br /> Get Your <span className='text-[#6A38C2]'>Dream Job</span></h1>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam, dolor. Autem debitis veniam molestiae cum?</p>
                <div className='flex w-[40%] shadow-lg border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
                    <input type="text"
                        placeholder='Find your Dream Job'
                        className='outline-none border-none w-full'
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <Button className="rounded-r-full bg-[#6A38C2]"
                        onClick={searchJobHandler}
                    ><Search />
                    </Button>
                </div>
            </div>

        </div>
    )
}

export default HeroSection