"use client";

import Image from 'next/image';
import React from 'react'

const page = () => {

    const webTeam = [
        {
            name: "Aaditya Raj",
            role: "Team Lead, Backend, Database, System Design",
            picture: "/team/web/aaditya.png",
        },
        {
            name: "Samkit Samsukha",
            role: "Frontend Development, UI/UX",
            picture: "/team/web/samkit.png",
        },
        {
            name: "Vijesh",
            role: "Backend, System Design, Authentication",
            picture: "/team/web/vijesh.png",
        }
    ]

    return (
        <div className='flex flex-col items-center w-full min-h-screen py-32'>
            <div className="hidden fixed top-0 md:flex flex-col justify-center items-center w-full -z-10 md:h-full">
                <Image src={'/backdrop.png'} alt='bg' width={1920} height={1020} className='w-screen h-screen' />
            </div>
            {/* <div className='flex flex-col justify-center items-center mt-48 gap-6'>
                <p className='text-4xl delagothic text-[#f9dd9c]'>Announcing Soon</p>
                <p className='text-3xl font-semibold text-white'>STAY TUNED</p>
            </div> */}
            <p className='text-center font-semibold text-[#f9dd9c] delagothic text-2xl'>Web Team</p>
            <div className='webteam max-w-3xl flex flex-wrap flex-row p-3'>
                {
                    webTeam.map((member, index) => (
                        <div key={index} className='flex flex-col md:w-1/3 text-center justify-center items-center'>
                            <Image src={member.picture} alt={member.name} width={120} height={120} className='rounded-full' />
                            <p className='text-xl font-semibold text-[#f9dd9c]'>{member.name}</p>
                            <p className='text-sm font-semibold text-white'>{member.role}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default page
