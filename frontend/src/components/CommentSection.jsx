import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { toast } from "react-hot-toast";

const CommentSection = ({ blogId }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const { data } = await axios.get(`http://localhost:4001/api/comments/${blogId}`);
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      await axios.post(
        "http://localhost:4001/api/comments/add",
        { blogId, content: newComment },
        { withCredentials: true }
      );

      setNewComment("");
      toast.success("Comment added!");
      fetchComments(); // ✅ Fetch updated comments from the backend to reflect profile pictures
    } catch (error) {
      toast.error("Failed to add comment");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:4001/api/comments/${commentId}`, { withCredentials: true });
      setComments(comments.filter((comment) => comment._id !== commentId));
      toast.success("Comment deleted!");
    } catch (error) {
      toast.error("Failed to delete comment");
    }
  };

  return (
    <div className="mt-6 p-4 border rounded bg-white dark:bg-gray-800 dark:border-gray-700 transition duration-300">
      <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Comments</h3>

      {user && (
        <form onSubmit={handleAddComment} className="mb-4">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            required
          />
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-green-700 hover:bg-green-900 text-white rounded"
          >
            Add Comment
          </button>
        </form>
      )}

      <div>
        {comments.map((comment) => (
          <div key={comment._id} className="flex items-start gap-2 border-b py-2 dark:border-gray-700">
            {/* ✅ FIX: Use correct profile picture key (profilePic, not photo.url) */}
            <img
              src={comment.user?.photo?.url || "https://via.placeholder.com/50"}
              alt={comment.user?.name || "Anonymous"}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {comment.user?.name || "Anonymous"}
              </p>
              <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>

              {user && user._id === comment.user?._id && (
                <button
                  onClick={() => handleDeleteComment(comment._id)}
                  className="text-red-500 text-xs dark:text-red-400 hover:underline mt-1"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
