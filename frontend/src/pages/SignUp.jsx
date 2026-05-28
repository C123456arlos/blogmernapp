import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth'

export default function SignUp() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({})
    const [errorMessage, setErrorMessage] = useState(null)
    const [loading, setLoading] = useState(false)
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!formData.username || !formData.email || !formData.password) {
            return setErrorMessage('please fill all fields')
        }
        try {
            setLoading(true)
            setErrorMessage(null)
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            const data = await res.json()
            if (data.success === false) {
                return setErrorMessage(data.message)
            }
            setLoading(false)
            if (res.ok) {
                navigate('/sign-in')
            }
        } catch (error) {
            setErrorMessage(error.message)
            setLoading(false)
        }
    }
    return (
        <div className='min-h-screen mt-20'>
            <div className='p-3 max-w-3xl mx-auto flex flex-col md:flex-row
            md:items-center gap-5'>
                <div className='flex-1'>
                    <Link to='/' className='self-center whitespace-nowrap text-4xl font-semibold dark:text-white'>
                        blog <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>mern</span>
                    </Link>
                    <p className='text-sm mt-5'>
                        this is a blog project
                    </p>
                </div>
                <div className='flex-1'>
                    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                        <div>
                            <Label value='username'></Label>
                            <TextInput type='text' placeholder='usename' id='username' onChange={handleChange}></TextInput>
                        </div>
                        <div>
                            <Label value='email'></Label>
                            <TextInput type='email' placeholder='email' id='email' onChange={handleChange}></TextInput>
                        </div>
                        <div>
                            <Label value='password'></Label>
                            <TextInput type='password' placeholder='password' id='password' onChange={handleChange}></TextInput>
                        </div>
                        <Button disabled={loading} className="bg-gradient-to-br from-purple-600 to-blue-500 
                        text-white hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300
                        dark:focus:ring-blue-800" type='submit'>{
                                loading ? (<>
                                    <Spinner size={'sm'}>
                                    </Spinner>
                                    <span className='pl-3'>loading...</span>
                                </>
                                ) : 'signup'}</Button>
                        <OAuth></OAuth>
                    </form>
                    <div className='flex gap-2 text-sm mt-5'>
                        <span>have an account</span>
                        <Link to={'/sign-in'} className='text-blue-500'>signin</Link>
                    </div>
                    {errorMessage && (
                        <Alert className='mt-5 ' color={'failure'}>{errorMessage}</Alert>
                    )}
                </div>
            </div>
        </div>
    )
}
