import mongoose from 'mongoose'
import mapComments from './mapComments.js'

export default function mapPost(post) {
  return {
    id: post.id,
    title: post.title,
    imageUrl: post.image,
    content: post.content,
    comments: post.comments.map((comment) =>
      mongoose.isObjectIdOrHexString(comment)
        ? comment
        : mapComments(comment),
    ),
    publishedAt: post.createdAt,
  }
}
