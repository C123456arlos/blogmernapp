// import { useSelector } from 'react-redux'
// import { useEffect, useEffectEvent, useState } from 'react'
// import { Button, Modal, Table, TableCell } from 'flowbite-react'
// import { Link } from 'react-router-dom'
// import { HiOutlineExclamationCircle } from 'react-icons/hi'


// export default function DashPosts() {
//     const { currentUser } = useSelector((state) => state.user)
//     const [userPosts, setUserPosts] = useState([])
//     const [showMore, setShowMore] = useState(true)
//     const [showModal, setShowModal] = useState(false)
//     const [postIdToDelete, setPostIdToDelete] = useState('')

//     useEffect(() => {
//         const fetchPosts = async () => {
//             try {
//                 const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`)
//                 const data = await res.json()
//                 if (res.ok) {
//                     setUserPosts(data.posts)
//                     if (data.posts.length < 9) {
//                         setShowMore(false)
//                     }
//                 }
//             } catch (error) {
//                 console.log(error.message)
//             }
//         }
//         if (currentUser.isAdmin) {
//             fetchPosts()
//         }
//     }, [currentUser._id])
//     const handleShowMore = async () => {
//         const startIndex = userPosts.length
//         try {
//             const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`)
//             const data = await res.json()
//             if (res.ok) {
//                 setUserPosts((prev) => [...prev, ...data.posts])
//                 if (data.posts.length < 5) {
//                     setShowMore(false)
//                 }
//             }
//         } catch (error) {
//             console.log(error.message)
//         }
//     }
//     // const handleDeletePost = async () => {
//     //     setShowModal(false)
//     //     try {
//     //         const res = await fetch(`/api/post/deletepost/${postIdToDelete}/${currentUser._id}`, {
//     //             method: 'DELETE'
//     //         })
//     //         const data = await res.json()
//     //         if (!res.ok) {
//     //             console.log(data.message)
//     //         } else {
//     //             setUserPosts((prev) =>
//     //                 prev.filter((post) => post._id !== postIdToDelete))
//     //         }
//     //     } catch (error) {
//     //         console.log(error.message)
//     //     }
//     // }

//     const handleDeletePost = async () => {
//         setShowModal(false);
//         try {
//             const res = await fetch(
//                 '/api/post/deletepost/${postIdToDelete}/${currentUser._id}',
//                 {
//                     method: 'DELETE',
//                     credentials: 'include',
//                 }
//             );
//             const data = await res.json();
//             if (!res.ok) {
//                 console.log(data.message);
//             } else {
//                 setUserPosts((prev) =>
//                     prev.filter((post) => post._id !== postIdToDelete)
//                 );
//             }
//         } catch (error) {
//             console.log(error.message);
//         }
//     };
//     return (
//         <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track scrollbar-track-slate-100
//         scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
//             {currentUser.isAdmin && userPosts.length > 0 ? (
//                 <><Table hoverable className='shadow-md'>
//                     <Table.Head>
//                         <Table.HeadCell>date updated</Table.HeadCell>
//                         <Table.HeadCell>post image</Table.HeadCell>
//                         <Table.HeadCell>post title</Table.HeadCell>
//                         <Table.HeadCell>category</Table.HeadCell>
//                         <Table.HeadCell>delete</Table.HeadCell>
//                         <Table.HeadCell>
//                             <span className='hidden md:block'>edit</span>
//                         </Table.HeadCell>
//                     </Table.Head>
//                     {userPosts.map((post) => (
//                         <Table.Body className='divide-y'>
//                             <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
//                                 <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
//                                 <Table.Cell>
//                                     <Link to={`/post/${post.slug}`}>
//                                         <img src={post.image} alt={post.title} className='w-20 h-10 object-cover bg-gray-500'></img>
//                                     </Link>
//                                 </Table.Cell>
//                                 <Table.Cell>
//                                     <Link className='font-medium text-gray-900 dark:text-white' to={`/post/${post.slug}`}>{post.title}</Link>
//                                 </Table.Cell>
//                                 <TableCell>{post.category}</TableCell>
//                                 <TableCell>
//                                     <span onClick={() => {
//                                         setShowModal(true)
//                                         setPostIdToDelete(post._id)
//                                     }}
//                                         className='font-medium text-red-500 hover:underline cursor-pointer'>
//                                         delete
//                                     </span>

//                                 </TableCell>
//                                 <TableCell>
//                                     <Link className='text-teal-500 hover:underline' to={`/update-post/${post._id}`}>
//                                         <span>
//                                             edit
//                                         </span>
//                                     </Link>
//                                 </TableCell>
//                             </Table.Row>
//                         </Table.Body>
//                     ))}
//                 </Table>
//                     {
//                         showMore && (<button onClick={handleShowMore}
//                             className='w-full text-teal-500 self-center text-sm py-7'>show more</button>)
//                     }
//                 </>
//             )
//                 : (<p>no posts yet</p>)
//             }
//             <Modal show={showModal} onClose={() => setShowModal(false)} popup size={'md'}>
//                 <Modal.Header></Modal.Header>
//                 <Modal.Body>
//                     <div className="text-center">
//                         <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400
//                                     dark:text-gray-200 mb-4 mx-auto"></HiOutlineExclamationCircle>
//                         <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-500">sure to delete</h3>
//                         <div className="flex justify-center gap-4">
//                             <Button color={'failure'} onClick={handleDeletePost}>yes sure</Button>
//                             <Button color={'gray'} onClick={() => setShowModal(false)}>cancel</Button>
//                         </div>
//                     </div>
//                 </Modal.Body>
//             </Modal>
//         </div>
//     )
// }



















import { Modal, Table, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function DashPosts() {
    const { currentUser } = useSelector((state) => state.user);
    const [userPosts, setUserPosts] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState('');
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch(
                    `http://localhost:3000/api/post/getposts?userId=${currentUser._id
                    }`,
                    {
                        credentials: 'include',
                    }
                );
                const data = await res.json();
                if (res.ok) {
                    setUserPosts(data.posts);
                    if (data.posts.length < 9) {
                        setShowMore(false);
                    }
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        if (currentUser.isAdmin) {
            fetchPosts();
        }
    }, [currentUser._id]);

    const handleShowMore = async () => {
        const startIndex = userPosts.length;
        try {
            const res = await fetch(
                `http://localhost:3000/api/post/getposts?userId=${currentUser._id
                }&startIndex=${startIndex}`,
                {
                    credentials: 'include',
                }
            );
            const data = await res.json();
            if (res.ok) {
                setUserPosts((prev) => [...prev, ...data.posts]);
                if (data.posts.length < 9) {
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleDeletePost = async () => {
        setShowModal(false);
        try {
            const res = await fetch(
                `http://localhost:3000/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
                {
                    method: 'DELETE',
                    credentials: 'include',
                }
            );
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
            } else {
                setUserPosts((prev) =>
                    prev.filter((post) => post._id !== postIdToDelete)
                );
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
            {currentUser.isAdmin && userPosts.length > 0 ? (
                <>
                    <Table hoverable className='shadow-md'>
                        <Table.Head>
                            <Table.HeadCell>Date updated</Table.HeadCell>
                            <Table.HeadCell>Post image</Table.HeadCell>
                            <Table.HeadCell>Post title</Table.HeadCell>
                            <Table.HeadCell>Category</Table.HeadCell>
                            <Table.HeadCell>Delete</Table.HeadCell>
                            <Table.HeadCell>
                                <span>Edit</span>
                            </Table.HeadCell>
                        </Table.Head>
                        {userPosts.map((post) => (
                            <Table.Body className='divide-y'>
                                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                    <Table.Cell>
                                        {new Date(post.updatedAt).toLocaleDateString()}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Link to={`/post/${post.slug}`}>
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className='w-20 h-10 object-cover bg-gray-500'
                                            />
                                        </Link>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Link
                                            className='font-medium text-gray-900 dark:text-white'
                                            to={`/post/${post.slug}`}
                                        >
                                            {post.title}
                                        </Link>
                                    </Table.Cell>
                                    <Table.Cell>{post.category}</Table.Cell>
                                    <Table.Cell>
                                        <span
                                            onClick={() => {
                                                setShowModal(true);
                                                setPostIdToDelete(post._id);
                                            }}
                                            className='font-medium text-red-500 hover:underline cursor-pointer'
                                        >
                                            Delete
                                        </span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Link
                                            className='text-teal-500 hover:underline'
                                            to={`/update-post/${post._id}`}
                                        >
                                            <span>Edit</span>
                                        </Link>
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        ))}
                    </Table>
                    {showMore && (
                        <button
                            onClick={handleShowMore}
                            className='w-full text-teal-500 self-center text-sm py-7'
                        >
                            Show more
                        </button>
                    )}
                </>
            ) : (
                <p>You have no posts yet!</p>
            )}
            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                popup
                size='md'
            >
                <Modal.Header />
                <Modal.Body>
                    <div className='text-center'>
                        <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
                        <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                            Are you sure you want to delete this post?
                        </h3>
                        <div className='flex justify-center gap-4'>
                            <Button color='failure' onClick={handleDeletePost}>
                                Yes, I'm sure
                            </Button>
                            <Button color='gray' onClick={() => setShowModal(false)}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}