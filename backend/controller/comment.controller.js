// import Comment from "../models/comment.model.js";
// import {Blog} from "../models/blog.model.js";

// export const addComment = async (req, res) => {
//   try {
//     const { blogId, content } = req.body;
//     const userId = req.user.id;

//     const comment = new Comment({ user: userId, blog: blogId, content });
//     await comment.save();

//     await Blog.findByIdAndUpdate(blogId, { $push: { comments: comment._id } });

//     res.status(201).json(comment);
//   } catch (error) {
//     res.status(500).json({ message: "Error adding comment", error });
//   }
// };

// export const getComments = async (req, res) => {
//   try {
//     const { blogId } = req.params;
//     const comments = await Comment.find({ blog: blogId }).populate("user", "name profilePic");
//     res.json(comments);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching comments", error });
//   }
// };

// export const deleteComment = async (req, res) => {
//   try {
//     const { commentId } = req.params;
//     const userId = req.user.id;

//     const comment = await Comment.findById(commentId);
//     if (!comment) return res.status(404).json({ message: "Comment not found" });

//     if (comment.user.toString() !== userId)
//       return res.status(403).json({ message: "Unauthorized" });

//     await comment.deleteOne();
//     res.json({ message: "Comment deleted" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting comment", error });
//   }
// };

import Comment from "../models/comment.model.js";
import { Blog } from "../models/blog.model.js";

export const addComment = async (req, res) => {
  try {
    const { blogId, content } = req.body;
    const userId = req.user.id;

    const comment = new Comment({ user: userId, blog: blogId, content });
    await comment.save();

    await Blog.findByIdAndUpdate(blogId, { $push: { comments: comment._id } });

    // Populate user to return complete comment data with user info
    const populatedComment = await comment.populate("user", "name photo");

    res.status(201).json(populatedComment);
  } catch (error) {
    res.status(500).json({ message: "Error adding comment", error });
  }
};

export const getComments = async (req, res) => {
  try {
    const { blogId } = req.params;
    const comments = await Comment.find({ blog: blogId }).populate("user", "name photo");
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments", error });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.id;

    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.user.toString() !== userId)
      return res.status(403).json({ message: "Unauthorized" });

    await comment.deleteOne();
    res.json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting comment", error });
  }
};
