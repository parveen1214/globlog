import mongoose from "mongoose";
import sanitizeHtml from "sanitize-html";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    blogImage: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    category: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    adminName: {
      type: String,
    },
    adminPhoto: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
      minlength: [200, "Should contain at least 200 characters"],
      validate: {
        validator: function (value) {
          return /<\/?[a-z][\s\S]*>/i.test(value); // Ensures HTML format
        },
        message: "Content must be in HTML format",
      },
    },
    likes: [{ type: mongoose.Schema.ObjectId, ref: "User" }], 
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Sanitize HTML before saving
blogSchema.pre("save", function (next) {
  this.content = sanitizeHtml(this.content, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "iframe"]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ["src", "alt"],
      iframe: ["src", "allow", "frameborder", "allowfullscreen"],
    },
  });
  next();
});

export const Blog = mongoose.model("Blog", blogSchema);

