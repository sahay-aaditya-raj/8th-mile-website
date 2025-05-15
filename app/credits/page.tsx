"use client";

import Image from 'next/image';
import React from 'react'

const page = () => {

    return (
        <div className='flex flex-col items-center w-full min-h-screen py-24'>
            <div className="hidden fixed top-0 md:flex flex-col justify-center items-center w-full -z-10 md:h-full">
                <Image src={'/backdrop.png'} alt='bg' width={1920} height={1020} className='w-screen h-screen' />
            </div>
            <div className='flex flex-col justify-center items-center mt-48 gap-6'>
                <p className='text-4xl delagothic text-[#f9dd9c]'>Announcing Soon</p>
                <p className='text-3xl font-semibold text-white'>STAY TUNED</p>
            </div>
        </div>
    )
}

export default page
