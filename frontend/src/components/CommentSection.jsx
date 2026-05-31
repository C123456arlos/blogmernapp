// import { Button, Textarea, TextInput } from "flowbite-react"
// import { useState } from "react"
// import { useSelector } from "react-redux"
// import { Link } from "react-router-dom"
// export default function CommentSection({ postId }) {
//     const { currentUser } = useSelector(state => state.user)
//     const [comment, setComment] = useState('')
//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         if (!currentUser || !currentUser._id) {
//             return
//         }
//         if (!currentUser?._id) return
//         if (comment.length > 200) {
//             return
//         }
//         const res = await fetch('http://localhost:3000/api/comment/create', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ content: comment, postId, userId: currentUser._id })
//         })
//         const data = await res.json()
//         if (res.ok) {
//             setComment('')
//         }
//     }

//     return (
//         <div className="max-w-2xl mx-auto w-full p-3">
//             {currentUser ?
//                 (
//                     <div className="flex items-center gap-1 my-5 text-gray-500 text-xs">
//                         <p>signed in </p>
//                         <img className="h-5 w-5 object-cover rounded-full" src={currentUser.profilePicture} alt=""></img>
//                         <Link to={'/dashboard?tab=profile'} className="text-xs text-cyan-500 hover:underline">
//                             @{currentUser.username}
//                         </Link>
//                     </div>
//                 ) :
//                 (<div className="text-sm text-teal-500 my-5">
//                     you must be logged in to comment
//                     <Link to={'/sign-in'} className="text-blue-500 hover:underline flex gap-1"> sign in</Link>
//                 </div>)}
//             {currentUser && (
//                 <form onSubmit={handleSubmit} className="border border-teal-500 rounded-md p-3">
//                     <Textarea placeholder="add comment" rows={3} maxLength={'200'}
//                         onChange={(e) => setComment(e.target.value)} value={comment}></Textarea>
//                     <div className="flex justify-between items-center mt-5">
//                         <p className="text-gray-500 text-xs">{200 - comment.length} chars left</p>
//                         <Button outline gradientDuoTone={'purpleToBlue'} type="submit">submit</Button>
//                     </div>
//                 </form>
//             )}
//         </div>
//     )
// }






import { Alert, Button, Modal, Textarea } from "flowbite-react"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import Comment from "./Comment"
import { HiOutlineExclamationCircle } from "react-icons/hi"

export default function CommentSection({ postId }) {
    const { currentUser } = useSelector(state => state.user || {})
    const [comment, setComment] = useState('')
    const navigate = useNavigate()
    const [commentError, setCommentError] = useState(null)
    const [comments, setComments] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [commentToDelete, setCommentToDelete] = useState(null)
    const handleSubmit = async (e) => {
        console.log('COMMENT COMPONENT LOADED');
        e.preventDefault()


        if (!currentUser?._id) {
            return
        }
        if (comment.length > 200) {
            return
        }
        // try {
        //     console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
        //     console.log('Submitting to /api/comment/create');
        //     const res = await fetch('/api/comment/create', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         credentials: "include",
        //         body: JSON.stringify({ content: comment, postId, userId: currentUser._id })
        //     })
        //     const data = await res.json()
        //     if (res.ok) {
        //         setComments('')
        //         setCommentError(null)
        //         setComments([data, ...comments])
        //     }
        // } catch (error) {
        //     setCommentError(error.message)
        // }
        try {
            const url = '/api/comment/create';

            console.log('=== COMMENT SUBMIT ===');
            console.log('Current page:', window.location.href);
            console.log('Fetch URL:', url);
            console.log('Current user:', currentUser?._id);
            console.log('Post ID:', postId);

            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    content: comment,
                    postId,
                    userId: currentUser._id,
                }),
            });

            console.log('Response status:', res.status);

            const data = await res.json();
            console.log('Response data:', data);

        } catch (error) {
            console.error('COMMENT ERROR:', error);
        }


    }
    useEffect(() => {
        const getComments = async () => {
            try {
                console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/comment/getPostComments/${postId}`)
                if (res.ok) {
                    const data = await res.json()
                    setComments(data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getComments()
    }, [postId])
    // const handleLike = async (commentId) => {
    //     try {
    //         if (!currentUser) {
    //             navigate('/sign-in')
    //             return
    //         }
    //         const res = await fetch(`/api/comment/likeComment/${commentId}`,
    //             {
    //                 method: 'PUT',
    //             }
    //         )
    //         if (res.ok) {
    //             const data = await res.json()
    //             setComments(comment.map((comment) => {
    //                 comment._id === commentId ? {
    //                     ...comment,
    //                     likes: data.likes,
    //                     numberOfLikes: data.likes.length
    //                 } : comment
    //             }))
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }




    const handleLike = async (commentId) => {
        try {
            if (!currentUser) {
                navigate('/sign-in');
                return;
            }
            console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
            const res = await fetch(
                `
                ${import.meta.env.VITE_API_URL}/api/comment/likeComment/${commentId}`,
                {
                    method: 'PUT',
                    credentials: 'include',
                }
            );
            if (res.ok) {
                const data = await res.json();
                setComments(
                    comments.map((comment) =>
                        comment._id === commentId
                            ? {
                                ...comment,
                                likes: data.likes,
                                numberOfLikes: data.likes.length,
                            }
                            : comment
                    )
                );
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    const handleEdit = async (comment, editedContent) => {
        setComments(
            comments.map((c) =>
                c._id === comment._id ? { ...c, content: editedContent } : c
            )
        );
    };
    const handleDelete = async (commentId) => {
        setShowModal(false)
        try {
            if (!currentUser) {
                navigate('/sign-in')
                return
            }
            console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/comment/deleteComment/${commentId}`, {
                method: "DELETE"
            })
            if (res.ok) {
                const data = await res.json()
                setComments(comments.filter((comment) => comment._id !== commentId))
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <div className="max-w-2xl mx-auto w-full p-3">
            {currentUser ?
                (
                    <div className="flex items-center gap-1 my-5 text-gray-500 text-xs">
                        <p>signed in </p>
                        {currentUser.profilePicture && (
                            <img className="h-5 w-5 object-cover rounded-full" src={currentUser.profilePicture} alt="" />
                        )}
                        <Link to={'/dashboard?tab=profile'} className="text-xs text-cyan-500 hover:underline">
                            @{currentUser?.username || 'user'}
                        </Link>
                    </div>
                ) :
                (<div className="text-sm text-teal-500 my-5">
                    you must be logged in to comment
                    <Link to={'/sign-in'} className="text-blue-500 hover:underline flex gap-1"> sign in</Link>
                </div>)}

            {currentUser && (
                <form onSubmit={handleSubmit} className="border border-teal-500 rounded-md p-3">
                    <Textarea placeholder="add comment" rows={3} maxLength={'200'}
                        onChange={(e) => setComment(e.target.value)} value={comment}></Textarea>
                    <div className="flex justify-between items-center mt-5">
                        <p className="text-gray-500 text-xs">{200 - comment.length} chars left</p>
                        <Button outline gradientDuoTone={'purpleToBlue'} type="submit">submit</Button>
                    </div>
                    {commentError &&
                        (
                            <Alert color={'failure'} className="mt-5">
                                {commentError}
                            </Alert>
                        )}
                </form>
            )}
            {comments.length === 0 ? (
                <p className="text-sm my-5">no comments yet</p>
            ) : (
                <>

                    <div className="text-sm my-5 flex items-center gap-1">
                        <p>comments</p>
                        <div className="border border-gray-400 py-1 px-2 rounded-sm">
                            <p>{comments.length}</p>
                        </div>
                    </div>
                    {comments.map(comment => (
                        <Comment key={comment._id} comment={comment} onLike={handleLike}
                            onEdit={handleEdit} onDelete={(commentId) => {
                                setShowModal(true)
                                setCommentToDelete(commentId)
                            }}></Comment>
                    ))}
                </>
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
                            Are you sure you want to delete this comment
                        </h3>
                        <div className='flex justify-center gap-4'>
                            <Button color='failure' onClick={() => handleDelete(commentToDelete)}>
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
    )
}








// 9:19





