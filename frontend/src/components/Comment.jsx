import React, { useEffect, useState } from 'react'
import { FaThumbsUp } from 'react-icons/fa'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { Button, Textarea } from 'flowbite-react'


export default function Comment({ comment, onLike, onEdit, onDelete }) {
    const [user, setUser] = useState({})
    const { currentUser } = useSelector((state) => state.user)
    const [isEditing, setIsEditing] = useState(false)
    const [editedContent, setEditedContent] = useState(comment.content)
    console.log(user)
    useEffect(() => {
        if (!comment?.userId) return;
        const getUser = async () => {
            try {
                const res = await fetch(`/api/user/${comment.userId}`)
                const data = await res.json()
                if (res.ok) {
                    setUser(data)
                }
            } catch (error) {
                console.log(error.message)
            }
        }
        getUser()
    }, [comment])
    const handleEdit = () => {
        setIsEditing(true)
        setEditedContent(comment.content)
    }

    // const handleSave = async () => {
    //     try {
    //         const res = await fetch(`/api/comment/editComment/${comment._id}`, {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 content: editedContent
    //             })
    //         })
    //         if (res.ok) {
    //             setIsEditing(false)
    //             onEdit(comment, editedContent)
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }


    const handleSave = async () => {
        try {
            const res = await fetch(
                `/api/comment/editComment/${comment._id
                }`,
                {
                    method: 'PUT',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        content: editedContent,
                    }),
                }
            );
            if (res.ok) {
                setIsEditing(false);
                onEdit(comment, editedContent);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
            <div className='flex-shrink-0 mr-3'>
                <img className='w-10 h-10 rounded-full bg-gray-200' src={user.profilePicture} alt={user.username}></img>
            </div>
            <div className='flex-1'>
                <div className='flex items-center mb-1'>
                    <span className='font-bold mr-1 text-xs truncate'>{user ? `@${user.username}` : "anonymous user"}</span>
                    <span className='text-gray-500 text-xs'>{moment(comment.createdAt).fromNow()}</span>
                </div>
                {isEditing ?


                    <>
                        <Textarea className='mb-2' value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}></Textarea>
                        <div className='flex justify-end gap-2 text-xs'>
                            <Button type='button'
                                size={'sm'} gradientDuoTone={'purpleToBlue'}
                                onClick={handleSave}>
                                save
                            </Button>
                            <Button type='button'
                                size={'sm'} gradientDuoTone={'purpleToBlue'} outline onClick={() => setIsEditing(false)}>
                                cancel
                            </Button>
                        </div>
                    </>


                    :






                    <>
                        <p className='text-gray-500 pb-2'>{comment.content}</p>
                        <div className='flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2'>
                            <button type='button' onClick={() => onLike(comment._id)} className={`text-gray-400 hover:text-blue-500
                    ${currentUser && comment.likes.includes(currentUser._id) && '!text-blue-500'}`}><FaThumbsUp className='text-sm'></FaThumbsUp></button>
                            <p className='text-gray-400'>
                                {
                                    comment.numberOfLikes > 0 && comment.numberOfLikes + '' + (
                                        comment.numberOfLikes === 1 ? 'like' : 'likes'
                                    )
                                }
                            </p>
                            {
                                currentUser && (currentUser._id === comment.userId || currentUser.isAdmin) &&
                                (<>

                                    <button type='button' onClick={handleEdit}
                                        className='text-gray-400 hover:text-blue-500'>edit</button>
                                    <button type='button' onClick={handleEdit}
                                        className='text-gray-400 hover:text-red-500'
                                        onClick={() => onDelete(comment._id)}>delete</button>
                                </>
                                )
                            }
                        </div>
                    </>
                }
            </div>
        </div>
    )
}





































// import moment from 'moment';
// import { useEffect, useState } from 'react';
// import { FaThumbsUp } from 'react-icons/fa';
// import { useSelector } from 'react-redux';
// import { Button, Textarea } from 'flowbite-react';

// export default function Comment({ comment, onLike, onEdit, onDelete }) {
//     const [user, setUser] = useState({});
//     const [isEditing, setIsEditing] = useState(false);
//     const [editedContent, setEditedContent] = useState(comment.content);
//     const { currentUser } = useSelector((state) => state.user);
//     useEffect(() => {
//         const getUser = async () => {
//             try {
//                 const res = await fetch(
//                     `/api/user/${comment.userId}`
//                 );
//                 const data = await res.json();
//                 if (res.ok) {
//                     setUser(data);
//                 }
//             } catch (error) {
//                 console.log(error.message);
//             }
//         };
//         getUser();
//     }, [comment]);

//     const handleEdit = () => {
//         setIsEditing(true);
//         setEditedContent(comment.content);
//     };

//     const handleSave = async () => {
//         try {
//             const res = await fetch(
//                 `/api/comment/editComment/${comment._id
//                 }`,
//                 {
//                     method: 'PUT',
//                     credentials: 'include',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({
//                         content: editedContent,
//                     }),
//                 }
//             );
//             if (res.ok) {
//                 setIsEditing(false);
//                 onEdit(comment, editedContent);
//             }
//         } catch (error) {
//             console.log(error.message);
//         }
//     };
//     return (
//         <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
//             <div className='flex-shrink-0 mr-3'>
//                 <img
//                     className='w-10 h-10 rounded-full bg-gray-200'
//                     src={user.profilePicture}
//                     alt={user.username}
//                 />
//             </div>
//             <div className='flex-1'>
//                 <div className='flex items-center mb-1'>
//                     <span className='font-bold mr-1 text-xs truncate'>
//                         {user ? `@${user.username}` : 'anonymous user'}
//                     </span>
//                     <span className='text-gray-500 text-xs'>
//                         {moment(comment.createdAt).fromNow()}
//                     </span>
//                 </div>
//                 {isEditing ? (
//                     <>
//                         <Textarea
//                             className='mb-2'
//                             value={editedContent}
//                             onChange={(e) => setEditedContent(e.target.value)}
//                         />
//                         <div className='flex justify-end gap-2 text-xs'>
//                             <Button
//                                 type='button'
//                                 size='sm'
//                                 gradientDuoTone='purpleToBlue'
//                                 onClick={handleSave}
//                             >
//                                 Save
//                             </Button>
//                             <Button
//                                 type='button'
//                                 size='sm'
//                                 gradientDuoTone='purpleToBlue'
//                                 outline
//                                 onClick={() => setIsEditing(false)}
//                             >
//                                 Cancel
//                             </Button>
//                         </div>
//                     </>
//                 ) : (
//                     <>
//                         <p className='text-gray-500 pb-2'>{comment.content}</p>
//                         <div className='flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2'>
//                             <button
//                                 type='button'
//                                 onClick={() => onLike(comment._id)}
//                                 className={`text-gray-400 hover:text-blue-500 ${currentUser &&
//                                     comment.likes.includes(currentUser._id) &&
//                                     '!text-blue-500'
//                                     }`}
//                             >
//                                 <FaThumbsUp className='text-sm' />
//                             </button>
//                             <p className='text-gray-400'>
//                                 {comment.numberOfLikes > 0 &&
//                                     comment.numberOfLikes +
//                                     ' ' +
//                                     (comment.numberOfLikes === 1 ? 'like' : 'likes')}
//                             </p>
//                             {currentUser &&
//                                 (currentUser._id === comment.userId || currentUser.isAdmin) && (
//                                     <>
//                                         <button
//                                             type='button'
//                                             onClick={handleEdit}
//                                             className='text-gray-400 hover:text-blue-500'
//                                         >
//                                             Edit
//                                         </button>
//                                         <button
//                                             type='button'
//                                             onClick={() => onDelete(comment._id)}
//                                             className='text-gray-400 hover:text-red-500'
//                                         >
//                                             Delete
//                                         </button>
//                                     </>
//                                 )}
//                         </div>
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// }








// import React, { useEffect, useState } from 'react'

// export default function Comment({ comment }) {
//     const [user, setUser] = useState(null) // 1. Changed initial state to null
//     console.log(user)
//     console.log(comment)
//     useEffect(() => {
//         // 2. Added a guard clause to stop execution if comment is missing
//         if (!comment?.userId) return;

//         const getUser = async () => {
//             try {
//                 // 3. Fixed typo: "loaclhost" to "localhost"
//                 const res = await fetch(`http://localhost:3000/api/user/${comment.userId}`)
//                 const data = await res.json()
//                 if (res.ok) {
//                     setUser(data)
//                 }
//             } catch (error) {
//                 console.log(error.message)
//             }
//         }
//         getUser()
//     }, [comment])


//     if (!comment) {
//         return <div>Loading comment...</div>
//     }

//     return (
//         <div>
//             <p>{comment.text}</p>
//             {user ? <small>By: {user.username}</small> : <small>Loading author...</small>}
//         </div>
//     )
// }
