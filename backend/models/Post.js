import mongoose from 'mongoose'
import validator from 'validator'

const PostSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
      validate: {
        validator: validator.isURL,
        message: 'Image should be a valid URL',
      },
    },
    content: {
      type: String,
      require: true,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  { timestamps: true },
)

export const Post = mongoose.model('Post', PostSchema)
