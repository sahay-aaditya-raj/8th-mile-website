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
            name: "Vijesh Shetty",
            role: "Backend, System Design, Authentication",
            picture: "/team/web/vijesh.png",
        }
    ];

    return (
        <div className='flex flex-col gap-12 thick-waves-bg items-center w-full min-h-screen py-24 px-4 sm:px-6 lg:px-8'>
            <p className='text-center font-semibold text-black seasons text-5xl md:text-7xl'>CORE TEAM</p>
            <div className="convenors flex flex-col gap-6">
                <p className='sora font-extrabold text-3xl text-black text-center'>CONVENORS</p>
                <div className="flex flex-row gap-4">
                    <div>
                        <img src="/team/convenor-1.png" alt="" className='rounded-md border-2 border-black w-[400px] hover:scale-105 transition-all duration-200' />
                    </div>
                    <div>
                        <img src="/team/convenor-2.png" alt="" className='rounded-md border-2 border-black w-[400px] hover:scale-105 transition-all duration-200' />
                    </div>
                </div>
            </div>
            <div className="co-convenors flex flex-col gap-6">
                <p className='sora font-extrabold text-3xl text-black text-center'>CO-CONVENORS</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                        <img src="/team/co-convenor-1.png" alt="" className='rounded-md border-2 border-black w-[300px] hover:scale-105 transition-all duration-200' />
                    </div>
                    <div>
                        <img src="/team/co-convenor-2.png" alt="" className='rounded-md border-2 border-black w-[300px] hover:scale-105 transition-all duration-200' />
                    </div>
                    <div>
                        <img src="/team/co-convenor-3.png" alt="" className='rounded-md border-2 border-black w-[300px] hover:scale-105 transition-all duration-200' />
                    </div>
                    <div>
                        <img src="/team/co-convenor-4.png" alt="" className='rounded-md border-2 border-black w-[300px] hover:scale-105 transition-all duration-200' />
                    </div>
                </div>
            </div>
            <div className="finance-sponsorship-hospitality flex flex-col md:flex-row gap-6 items-center justify-center">
                <div className="finance flex flex-col gap-6">
                    <p className='sora font-extrabold text-3xl text-black text-center'>FINANCE</p>
                    <div className="flex flex-row gap-4">
                        <div>
                            <img src="/team/finance-1.png" alt="" className='rounded-md border-2 border-black w-[300px] hover:scale-105 transition-all duration-200' />
                        </div>
                        <div>
                            <img src="/team/finance-2.png" alt="" className='rounded-md border-2 border-black w-[300px] hover:scale-105 transition-all duration-200' />
                        </div>
                    </div>
                </div>
                <div className="sponsorship flex flex-col justify-center items-center gap-6">
                    <p className='sora font-extrabold text-3xl text-black text-center'>SPONSORSHIP</p>
                    <div className="flex flex-row gap-4">
                        <div>
                            <img src="/team/sponsorship-1.png" alt="" className='rounded-md border-2 border-black w-[200px] md:w-[300px] hover:scale-105 transition-all duration-200' />
                        </div>
                    </div>
                </div>
                <div className="hospitality flex flex-col gap-6">
                    <p className='sora font-extrabold text-3xl text-black text-center'>HOSPITALITY</p>
                    <div className="flex flex-row gap-4">
                        <div>
                            <img src="/team/hospitality-1.png" alt="" className='rounded-md border-2 border-black w-[300px] hover:scale-105 transition-all duration-200' />
                        </div>
                        <div>
                            <img src="/team/hospitality-2.png" alt="" className='rounded-md border-2 border-black w-[300px] hover:scale-105 transition-all duration-200' />
                        </div>
                    </div>
                </div>
            </div>
            <div className="media flex flex-col gap-6">
                <p className='sora font-extrabold text-3xl text-black text-center'>MEDIA</p>
                <div className="flex flex-row gap-2 md:gap-4">
                    <div>
                        <img src="/team/media-1.png" alt="" className='rounded-md border-2 border-black w-[300px] hover:scale-105 transition-all duration-200' />
                    </div>
                    <div>
                        <img src="/team/media-2.png" alt="" className='rounded-md border-2 border-black w-[300px] hover:scale-105 transition-all duration-200' />
                    </div>
                    <div>
                        <img src="/team/media-3.png" alt="" className='rounded-md border-2 border-black w-[300px] hover:scale-105 transition-all duration-200' />
                    </div>        
                </div>
            </div>
            <div className="design flex flex-col gap-6">
                <p className='sora font-extrabold text-3xl text-black text-center'>DESIGN</p>
                <div className="flex flex-row gap-2 md:gap-4">
                    <div>
                        <img src="/team/design-1.png" alt="" className='rounded-md border-2 border-black w-[300px] hover:scale-105 transition-all duration-200' />
                    </div>
                    <div>
                        <img src="/team/design-2.png" alt="" className='rounded-md border-2 border-black w-[300px] hover:scale-105 transition-all duration-200' />
                    </div>
                    <div>
                        <img src="/team/design-3.png" alt="" className='rounded-md border-2 border-black w-[300px] hover:scale-105 transition-all duration-200' />
                    </div>        
                </div>
            </div>
            <div className="publicity-stage-management flex flex-col md:flex-row gap-6">
                <div className="publicity flex flex-col gap-6">
                    <p className='sora font-extrabold text-3xl text-black text-center'>PUBLICITY</p>
                    <div className="flex flex-row gap-4 justify-center items-center">
                        <div>
                            <img src="/team/publicity-1.png" alt="" className='rounded-md border-2 border-black w-[150px] md:w-[300px] hover:scale-105 transition-all duration-200' />
                        </div>
                        <div>
                            <img src="/team/publicity-2.png" alt="" className='rounded-md border-2 border-black w-[150px] md:w-[300px] hover:scale-105 transition-all duration-200' />
                        </div>
                    </div>
                </div>
                <div className="stage-management flex flex-col gap-6">
                    <p className='sora font-extrabold text-3xl text-black text-center'>STAGE MANAGEMENT</p>
                    <div className="flex flex-row gap-2 md:gap-4">
                        <div>
                            <img src="/team/stage-management-1.png" alt="" className='rounded-md border-2 border-black w-[300px] hover:scale-105 transition-all duration-200' />
                        </div>
                        <div>
                            <img src="/team/stage-management-2.png" alt="" className='rounded-md border-2 border-black w-[300px] hover:scale-105 transition-all duration-200' />
                        </div>
                        <div>
                            <img src="/team/stage-management-3.png" alt="" className='rounded-md border-2 border-black w-[300px] hover:scale-105 transition-all duration-200' />
                        </div>
                    </div>
                </div>
            </div>
            <div className="events flex flex-col gap-6">
                <p className='sora font-extrabold text-3xl text-black text-center'>EVENTS</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                        <img src="/team/events-1.png" alt="" className='rounded-md border-2 border-black w-[300px] hover:scale-105 transition-all duration-200' />
                    </div>
                    <div>
                        <img src="/team/events-2.png" alt="" className='rounded-md border-2 border-black w-[300px] hover:scale-105 transition-all duration-200' />
                    </div>
                    <div>
                        <img src="/team/events-3.png" alt="" className='rounded-md border-2 border-black w-[300px] hover:scale-105 transition-all duration-200' />
                    </div>        
                    <div>
                        <img src="/team/events-4.png" alt="" className='rounded-md border-2 border-black w-[300px] hover:scale-105 transition-all duration-200' />
                    </div>        
                </div>
            </div>
            <div className="pd flex flex-col gap-6">
                <p className='sora font-extrabold text-3xl text-black text-center'>PRODUCTION DESIGN</p>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-2 md:gap-4">
                    <div>
                        <img src="/team/pd-1.png" alt="" className='rounded-md border-2 border-black w-[300px] hover:scale-105 transition-all duration-200' />
                    </div>
                    <div>
                        <img src="/team/pd-2.png" alt="" className='rounded-md border-2 border-black w-[300px] hover:scale-105 transition-all duration-200' />
                    </div>
                    <div>
                        <img src="/team/pd-3.png" alt="" className='rounded-md border-2 border-black w-[300px] hover:scale-105 transition-all duration-200' />
                    </div>        
                    <div>
                        <img src="/team/pd-4.png" alt="" className='rounded-md border-2 border-black w-[300px] hover:scale-105 transition-all duration-200' />
                    </div>        
                    <div>
                        <img src="/team/pd-5.png" alt="" className='rounded-md border-2 border-black w-[300px] hover:scale-105 transition-all duration-200' />
                    </div>        
                </div>
            </div>
            <div className="logistics flex flex-col gap-6">
                <p className='sora font-extrabold text-3xl text-black text-center'>LOGISTICS</p>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-2 md:gap-4">
                    <div>
                        <img src="/team/logistics-1.png" alt="" className='rounded-md border-2 border-black w-[300px] hover:scale-105 transition-all duration-200' />
                    </div>
                    <div>
                        <img src="/team/logistics-2.png" alt="" className='rounded-md border-2 border-black w-[300px] hover:scale-105 transition-all duration-200' />
                    </div>
                    <div>
                        <img src="/team/logistics-3.png" alt="" className='rounded-md border-2 border-black w-[300px] hover:scale-105 transition-all duration-200' />
                    </div>        
                    <div>
                        <img src="/team/logistics-4.png" alt="" className='rounded-md border-2 border-black w-[300px] hover:scale-105 transition-all duration-200' />
                    </div>        
                    <div>
                        <img src="/team/logistics-5.png" alt="" className='rounded-md border-2 border-black w-[300px] hover:scale-105 transition-all duration-200' />
                    </div>        
                </div>
            </div>
            <div className="discom flex flex-col gap-6">
                <p className='sora font-extrabold text-3xl text-black text-center'>DISCOM</p>
                <div className="grid grid-cols-3 md:grid-cols-8 gap-2 md:gap-4">
                    <div>
                        <img src="/team/discom-1.png" alt="" className='rounded-md border-2 border-black w-[200px] hover:scale-105 transition-all duration-200' />
                    </div>
                    <div>
                        <img src="/team/discom-2.png" alt="" className='rounded-md border-2 border-black w-[200px] hover:scale-105 transition-all duration-200' />
                    </div>
                    <div>
                        <img src="/team/discom-3.png" alt="" className='rounded-md border-2 border-black w-[200px] hover:scale-105 transition-all duration-200' />
                    </div>        
                    <div>
                        <img src="/team/discom-4.png" alt="" className='rounded-md border-2 border-black w-[200px] hover:scale-105 transition-all duration-200' />
                    </div>        
                    <div>
                        <img src="/team/discom-5.png" alt="" className='rounded-md border-2 border-black w-[200px] hover:scale-105 transition-all duration-200' />
                    </div>
                    <div>
                        <img src="/team/discom-6.png" alt="" className='rounded-md border-2 border-black w-[200px] hover:scale-105 transition-all duration-200' />
                    </div>        
                    <div>
                        <img src="/team/discom-7.png" alt="" className='rounded-md border-2 border-black w-[200px] hover:scale-105 transition-all duration-200' />
                    </div>
                    <div>
                        <img src="/team/discom-8.png" alt="" className='rounded-md border-2 border-black w-[200px] hover:scale-105 transition-all duration-200' />
                    </div>
                </div>
            </div>
            <div className="website flex flex-col gap-6">
                <p className='sora font-extrabold text-3xl text-black text-center'>WEBSITE</p>
                <div className="flex flex-row gap-2 md:gap-4">
                    <div>
                        <img src="/team/website-1.png" alt="" className='rounded-md border-2 border-black w-[300px] hover:scale-105 transition-all duration-200' />
                    </div>
                    <div>
                        <img src="/team/website-2.png" alt="" className='rounded-md border-2 border-black w-[300px] hover:scale-105 transition-all duration-200' />
                    </div>
                    <div>
                        <img src="/team/website-3.png" alt="" className='rounded-md border-2 border-black w-[300px] hover:scale-105 transition-all duration-200' />
                    </div>        
                </div>
            </div>
        </div>
    );
}

export default page;
