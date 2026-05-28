import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInFailure, signInSuccess, signInStart } from '../redux/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import OAuth from '../components/OAuth'


export default function SignIn() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({})
    const dispatch = useDispatch()
    const { loading, error: errorMessage } = useSelector(state => state.user)
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!formData.email || !formData.password) {
            return dispatch(signInFailure('please fill all the fields'))
        }
        try {
            // setLoading(true)
            // setErrorMessage(null)
            dispatch(signInStart())
            const res = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            const data = await res.json()
            if (data.success === false) {
                dispatch(signInFailure(data.message))
                // return setErrorMessage(data.message)
            }
            if (res.ok) {
                dispatch(signInSuccess(data))
                navigate('/')
            }
        } catch (error) {
            // setErrorMessage(error.message)
            // setLoading(false)
            dispatch(signInFailure(error.message))
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
                        sign in
                    </p>
                </div>
                <div className='flex-1'>
                    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                        <div>
                            <Label value='email'></Label>
                            <TextInput type='email' placeholder='email@mail.com' id='email' onChange={handleChange}></TextInput>
                        </div>
                        <div>
                            <Label value='password'></Label>
                            <TextInput type='password' placeholder='**********' id='password' onChange={handleChange}></TextInput>
                        </div>
                        <Button disabled={loading} className="bg-gradient-to-br from-purple-600 to-blue-500
                        text-white hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300
                        dark:focus:ring-blue-800" type='submit'>{
                                loading ? (<>
                                    <Spinner size={'sm'}>
                                    </Spinner>
                                    <span className='pl-3'>loading...</span>
                                </>
                                ) : 'signin'}
                        </Button>
                        <OAuth></OAuth>
                    </form>
                    <div className='flex gap-2 text-sm mt-5'>
                        <span>dont have an account</span>
                        <Link to={'/sign-up'} className='text-blue-500'>signup</Link>
                    </div>
                    {errorMessage && (
                        <Alert className='mt-5 ' color={'failure'}>{errorMessage}</Alert>
                    )}
                </div>
            </div>
        </div>
    )
}





// import React from 'react'

// export default function SignIn() {
//     return (
//         <div>SignIn123</div>
//     )
// }
