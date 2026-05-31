import { Button } from 'flowbite-react'
import React from 'react'

export default function CallToAction() {
    return (
        <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
            <div className='flex-1 justify-center flex flex-col'>
                <h2 className='text-2xl'>want to learn</h2>
                <p className='text-gray-500 my-2'>check this resources</p>
                <Button gradientDuoTone={'purpleToPink'} className='rounded-tl-xl rounded-bl-none'>
                    <a href='http://www.google.com' target='_blank' rel='noopener noreferrer'> learn more </a></Button>
            </div>
            <div className='p-7 flex-1'>
                <img src='https://stride.com.co/wp-content/uploads/2023/01/gabriel-heinzer-g5jpH62pwes-unsplash-768x576.jpg'
                    alt='image'></img>
            </div>
        </div>
    )
}




