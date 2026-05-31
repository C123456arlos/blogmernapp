// import { Button, Navbar, TextInput } from 'flowbite-react'
// import { Link } from 'react-router-dom'
// import { AiOutlineSearch } from 'react-icons/ai'
// import { FaMoon } from 'react-icons/fa'
import { Avatar, Button, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { toggleTheme } from '../redux/theme/themeSlice'
import { signoutSuccess } from '../redux/user/userSlice';

export default function Header() {
    const path = useLocation().pathname
    const location = useLocation()
    const navigate = useNavigate()
    const { currentUser } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [searchTerm, setSearchTerm] = useState('')
    const { theme } = useSelector((state) => state.theme)

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const searchTermFromUrl = urlParams.get('searchTerm')
        if (searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl)
        }
    },
        [location.search])
    const handleSignOut = async () => {
        try {
            const res = await fetch('/api/user/signout', {
                method: 'POST'
            })
            const data = await res.json()
            if (!res.ok) {
                console.log(data.message)
            } else {
                dispatch(signoutSuccess())
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const urlParams = new URLSearchParams(location.search)
        urlParams.set('searchTerm', searchTerm)
        const searchQuery = urlParams.toString()
        navigate(`/search?${searchQuery}`)

    }
    return (
        <Navbar className='border-b-2'>
            <Link to='/' className='self-center whitespace-nowrap sm:text-xl font-semibold dark:text-white'>blog <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple to-pink-500 rounded-lg text-white'>mern</span></Link>
            <form onSubmit={handleSubmit}>
                <TextInput type='text' placeholder='search'
                    rightIcon={AiOutlineSearch} className='hidden lg:inline' value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}></TextInput>
            </form>
            <Button className='w-12 h-10 lg:hidden' pill color={'gray'}>
                <AiOutlineSearch></AiOutlineSearch>
            </Button>
            <div className='flex gap-2 md:order-2'>
                <Button className='w-12 h-10 hidden sm:inline' color={'gray'} pill onClick={() => dispatch(toggleTheme())}>

                    {theme === 'light' ? <FaSun></FaSun> : <FaMoon></FaMoon>}
                </Button>
                {currentUser ? (
                    <Dropdown arroIcon={false} inline label={
                        <Avatar alt='user' img={currentUser.profilePicture} rounded></Avatar>
                    }>
                        <Dropdown.Header>
                            <span className='block text-sm'>@{currentUser.username}</span>
                            <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
                        </Dropdown.Header>
                        <Link to={'/dashboard?tab=profile'}>
                            <DropdownItem>profile</DropdownItem>
                        </Link>
                        <DropdownDivider></DropdownDivider>
                        <DropdownItem onClick={handleSignOut}>sign out</DropdownItem>
                    </Dropdown>
                ) : (

                    <Link to='/sign-in'>
                        <Button className="bg-gradient-to-br from-purple-600 to-blue-500 
                    text-white hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300
                    dark:focus:ring-blue-800" outline >sign in</Button>
                    </Link>
                )}
                <Navbar.Toggle></Navbar.Toggle>
            </div>
            <Navbar.Collapse>
                <Navbar.Link active={path === '/'} as={'div'}>
                    <Link to='/'>home</Link>
                </Navbar.Link>
                <Navbar.Link active={path === '/about'} as={'div'}>
                    <Link to='/about'>about</Link>
                </Navbar.Link>
                <Navbar.Link active={path === '/projects'} as={'div'}>
                    <Link to='/projects'>projects</Link>
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    )
}
