import React from 'react'

export default function About() {
    return (
        <div className='min-h-screen flex items-center justify-center'>
            <div className='max-w-2xl mx-auto p-3 text-center'>
                <div>
                    <h1 className='text-3xl font-semibold text-center my-7'>person one name</h1>
                    <div className='text-md text-gray-500 flex flex-col gap-6'>
                        <p>person blog</p>
                        <p>welcome</p>
                        <p>grow</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
