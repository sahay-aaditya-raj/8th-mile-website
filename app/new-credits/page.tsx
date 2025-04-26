"use client";

import Image from 'next/image';
import React from 'react'

const page = () => {

    // const websiteContributors = [
    //     {
    //         id: 1,
    //         name: "Aaditya Raj",
    //         role: "Full-Stack Developer",
    //         photo: "/images/team/aaditya.jpeg",
    //     },
    //     {
    //         id: 2,
    //         name: "Vijesh Shetty",
    //         role: "UI/UX Designer",
    //         photo: "/images/team/vijesh.jpeg",
    //     },
    //     {
    //         id: 3,
    //         name: "Samkit Samsukha",
    //         role: "Frontend Developer",
    //         photo: "/images/team/samkit.jpeg",
    //     }
    // ];

    // const sponsors = [
        // {
        //     id: 1,
        //     name: "RV College of Engineering",
        //     role: "Host Institution",
        //     logo: "/images/logos/rvce-logo.jpeg",
        //     content: "The prestigious RV College of Engineering is the host institution for this event, providing both logistical and academic support.",
        // },
        // {
        //     id: 2,
        //     name: "Sponsor",
        //     role: "Platinum Sponsor",
        //     logo: "/images/logos/sponser.jpeg",
        //     content: "Our Platinum Sponsor has been an instrumental partner in making this event possible, offering significant resources and support.",
        // },
    // ];

    // const clubs = [
    //     {
    //         id: 1,
    //         name: "Coding Club",
    //         role: "Technical Support",
    //         logo: "/images/logos/coding-club-logo.png",
    //         content: "The Coding Club offers technical expertise and assistance for all the tech-related aspects of the event, ensuring a smooth experience.",
    //     },
    //     {
    //         id: 2,
    //         name: "E-Cell",
    //         role: "Host Club",
    //         logo: "/images/logos/e-cell-logo.jpeg",
    //         content: "E-Cell is the host club of the event, responsible for coordinating all the operations, from planning to execution.",
    //     },
    // ];

    const convenors = [
        {
            id: 1,
            name: "S Sai Sadan",
            photo: "/images/team/sai.jpeg",
        },
        {
            id: 2,
            name: "Manali M Ranade",
            photo: "/images/team/manali.jpeg",
        }
    ]

    const coconvenors = [
        {
            id: 1,
            name: "Aadvik Jain",
            photo: "/images/team/aadvik.jpeg",
        },
        {
            id: 2,
            name: "prajwal YS",
            photo: "/images/team/prajwal.jpeg",
        },
        {
            id: 3,
            name: "Kruthi Jayendra",
            photo: "/images/team/kruthi.jpeg",
        },
    ]

    // const productionDesign = [

    // ]

    // const discom = [

    // ]

    // const publicity = [

    // ]

    // const sponsorship = [

    // ]

    return (
        <div className='flex flex-col items-center w-full bg-black py-24'>
            <div className="text-6xl samarkan py-8 text-[#f9dd9c]">Organising Committee</div>
            <div className="convenors flex flex-col items-center">
            {/* from-[#870903] to-[#1a4734] */}
                <div className='fraunces font-bold uppercase text-2xl my-4 border-b-2 w-fit border-[#e90c00]'>Convenors</div>
                <div className="flex flex-row">
                    {convenors.map((person) => (
                        <div key={person.id} className="flex flex-col items-center mx-4 bg-[#] p-4 border-2 border-[#418b24] rounded-md">
                            <Image src={'/images/team/aaditya.jpeg'} alt='photo' width={200} height={200} className='rounded-full'/>
                            <div className="text-center text-white fraunces text-xl pt-4">{person.name}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="co-convenors flex flex-col items-center">
            {/* from-[#870903] to-[#1a4734] */}
                <div className='fraunces font-bold uppercase text-2xl my-4 border-b-2 w-fit border-[#e90c00]'>Co-Convenors</div>
                <div className="flex flex-row">
                    {coconvenors.map((person) => (
                        <div key={person.id} className="flex flex-col items-center mx-4 bg-[#] p-4 border-2 border-[#418b24] rounded-md">
                            <Image src={'/images/team/aaditya.jpeg'} alt='photo' width={200} height={200} className='rounded-full'/>
                            <div className="text-center text-white fraunces text-xl pt-4">{person.name}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default page
