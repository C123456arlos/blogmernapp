import Comment from "../models/comment.model.js"
import { errorHandler } from "../utils/error.js"

// export const createComment = async (req, res, next) => {
//     try {
//         const { content, postId, userId } = req.body
//         if (userId !== req.user.id) {
//             return next(errorHandler(403, 'not allowed to create comment'))
//         }
//         const newComment = new Comment({
//             content, postId, userId
//         })
//         await newComment.save()
//         res.status(200).json(newComment)
//     } catch (error) {
//         next(error)
//     }
// }




export const createComment = async (req, res, next) => {
    console.log('req.user:', req.user);
    console.log('req.body:', req.body);
    try {
        const { content, postId, userId } = req.body;

        if (userId !== req.user.id) {
            return next(
                errorHandler(403, 'You are not allowed to create this comment')
            );
        }

        const newComment = new Comment({
            content,
            postId,
            userId,
        });
        await newComment.save();

        res.status(200).json(newComment);
    } catch (error) {
        console.log(error.message);
        console.log(error);
        next(error);

    }
};



// export const createComment = async (req, res, next) => {
//     try {

//         const { content, postId, userId } = req.body;

//         if (!userId || !postId) {
//             return res.status(400).json({ message: "Missing required fields" });
//         }
//         const newComment = new Comment({
//             content,
//             postId,
//             userId,
//         });

//         await newComment.save();
//         res.status(200).json(newComment);
//     } catch (error) {
//         console.error("Backend Error:", error);
//         next(error);
//     }
// };

// export const getPostComments = async () => {
//     try {
//         const comments = (await Comment.find({ postId: req.params.postId })).toSorted({
//             createdAt: -1
//         })
//         res.status(200).json(comments)
//     } catch (error) {
//         next(error)
//     }
// }


export const getPostComments = async (req, res, next) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId }).sort({
            createdAt: -1,
        });
        res.status(200).json(comments);
    } catch (error) {
        next(error);
    }
};
export const likeComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.commentId)
        if (!comment) {
            return next(errorHandler(404, 'comment not found'))
        }
        const userIndex = comment.likes.indexOf(req.user.id)
        if (userIndex === -1) {
            comment.numberOfLikes += 1
            comment.likes.push(req.user.id)
        } else {
            comment.numberOfLikes -= 1
            comment.likes.splice(userIndex, 1)
        }
        await comment.save()
        res.status(200).json(comment)
    } catch (error) {

    }
}
export const editComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.commentId)
        if (!comment) {
            return next(errorHandler(404, 'comment not found'))
        }
        if (comment.userId !== req.user.id && !req.user.isAdmin) {
            return next(errorHandler(403, 'no allowed to edit'))
        }
        const editedComment = await Comment.findByIdAndUpdate(
            req.params.commentId,
            {
                content: req.body.content
            },
            { new: true }
        )
        res.status(200).json(editedComment)
    } catch (error) {
        next(error)
    }
}
export const deleteComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.commentId)
        if (!comment) {
            return next(errorHandler(404, 'comment not found'))
        }
        if (comment.userId !== req.user.id && !req.user.isAdmin) {
            return next(errorHandler(403, 'not allowed to delete'))
        }
        await Comment.findByIdAndDelete(req.params.commentId)
        res.status(200).json('comment has been deleted')
    } catch (error) {
        next(error)
    }
}