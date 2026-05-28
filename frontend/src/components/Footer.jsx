import { Footer } from "flowbite-react"
import { Link } from "react-router-dom"
import { BsFacebook, BsInstagram, BsTwitterX, BsGithub, BsDribbble } from 'react-icons/bs'
export default function FooterComponent() {
    return (
        // <Footer container className="border !bg-slate-300 text-red-200 border-t-8 border-teal-500">
        //     <div className="w-full max-w-7xl mx-auto">
        //         <div className=" grid w-full justify-between sm:flex md:grid-cols-1">
        //             <div>
        <Footer container className='border border-t-8 border-teal-500'>
            <div className='w-full max-w-7xl mx-auto'>
                <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
                    <div className='mt-5'>
                        <Link to={'/'} className="self-center whitespace-nowrap
                    text-sm sm:text-xl font-semibold dark:text-white">
                            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500
                        to-pink-500 rounded-lg text-white">personname</span>
                            blog
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
                        <div>

                            <Footer.Title title="about"></Footer.Title>
                            <Footer.LinkGroup col>
                                <Footer.Link href="http://www.blank.com" target="_blank" rel="noopener noreferrer">
                                    project mern 10
                                </Footer.Link>
                                <Footer.Link href="/about" target="_blank" rel="noopener noreferrer">
                                    blog
                                </Footer.Link>
                            </Footer.LinkGroup>

                        </div>
                        <div>
                            <Footer.Title title="follow us"></Footer.Title>
                            <Footer.LinkGroup col>
                                <Footer.Link href="http://www.gighub.com" target="_blank" rel="noopener noreferrer">
                                    github
                                </Footer.Link>
                                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                                    discord
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title="legal"></Footer.Title>
                            <Footer.LinkGroup col>
                                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                                    privacy
                                </Footer.Link>
                                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                                    terms
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                    </div>
                </div>
                <Footer.Divider></Footer.Divider>
                <div className="w-full sm:flex sm:items-center sm:justify-between">
                    <Footer.Copyright href="#" by='mernblog' year={new Date().getFullYear()}></Footer.Copyright>
                    <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
                        <Footer.Icon href="#" icon={BsFacebook}></Footer.Icon>
                        <Footer.Icon href="#" icon={BsInstagram}></Footer.Icon>
                        <Footer.Icon href="#" icon={BsTwitterX}></Footer.Icon>
                        <Footer.Icon href="#" icon={BsGithub}></Footer.Icon>
                        <Footer.Icon href="#" icon={BsDribbble}></Footer.Icon>
                    </div>
                </div>
            </div>
        </Footer>
    )
}


