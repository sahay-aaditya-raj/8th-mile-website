"use client";

import Image from 'next/image';
import React from 'react';

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
    ];

    return (
        <div className='flex flex-col items-center w-full min-h-screen py-32 px-4 sm:px-6 lg:px-8'>
            {/* Background image for md+ screens */}
            <div className="hidden fixed top-0 md:flex justify-center items-center w-full -z-10 h-full">
                <Image src={'/backdrop.png'} alt='bg' width={1920} height={1020} className='w-screen h-screen object-cover' />
            </div>
            <div className="fixed md:hidden top-0 justify-center items-center w-full -z-10 h-full">
                <Image src={'/waves.svg'} alt='bg' width={1920} height={1020} className='w-screen h-screen object-cover' />
            </div>

            <p className='text-center font-semibold text-[#f9dd9c] delagothic text-2xl mb-8'>Web Team</p>

            <div className='grid grid-cols-2 md:grid-cols-3 justify-center gap-4 max-w-5xl w-full items-center'>
                {
                    webTeam.map((member, index) => (
                        <div
                            key={index}
                            className={`flex flex-col items-center p-4 rounded-xl 
        ${webTeam.length % 2 === 1 && index === webTeam.length - 1 ? 'col-span-2 justify-self-center md:col-span-1' : ''}`}
                        >
                            <Image
                                src={member.picture}
                                alt={member.name}
                                width={120}
                                height={120}
                                className='rounded-full object-cover'
                            />
                            <p className='mt-4 text-lg font-semibold text-[#f9dd9c]'>{member.name}</p>
                            <p className='text-sm text-white text-center mt-1'>{member.role}</p>
                        </div>
                    ))
                }
            </div>

        </div>
    );
}

export default page;
