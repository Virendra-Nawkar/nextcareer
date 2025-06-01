
import React from 'react'
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

const Navbar = () => {
    return (
        <div className='bg-white px-5'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div>
                    <h1 className='text-2xl font-bold'>Next<span className='text-[#F83002] '>Carrer</span></h1>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        <li>Home</li>
                        <li>Jobs</li>
                        <li>Browse</li>
                    </ul>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Avatar className="cursor-pointer">
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            </Avatar>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                            <div className='flex gap-4 space-y-2'>
                                <Avatar className="cursor-pointer">
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                </Avatar>
                                <div>
                                    <h4 className='font-medium'>Virendra Nawkar</h4>
                                    <p className='text-sm text-muted-foreground'>Lorem ipsum dolor sit amet.</p>
                                </div>
                            </div>
                            <div>
                                <Button variant="link">Link</Button>
                            </div>
                        </PopoverContent>
                    </Popover>

                </div>
            </div>
        </div>
    )
}

export default Navbar
