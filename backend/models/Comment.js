import mongoose from 'mongoose'

const CommentSchema = mongoose.Schema(
  {
    content: {
      type: String,
      require: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
)

export const Comment = mongoose.model('Comment', CommentSchema)
