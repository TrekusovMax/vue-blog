import { Post } from '../models/Post.js'

export async function addPost(post) {
  const newPost = await Post.create(post)

  newPost.populate({
    path: 'comments',
    populate: 'author',
  })

  return newPost
}

export async function editPost(id, post) {
  const newPost = await Post.findByIdAndUpdate(id, post, {
    returnDocument: 'after',
  })

  await newPost.populate({
    path: 'comments',
    populate: 'author',
  })

  return newPost
}
export function deletePost(id) {
  return Post.deleteOne({ _id: id })
}

export async function getPosts(search = '', limit = 10, page = 1) {
  const [posts, count] = await Promise.all([
    Post.find({ title: { $regex: search, $options: 'i' } })
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 }),
    Post.countDocuments({ title: { $regex: search, $options: 'i' } }),
  ])

  return { posts, lastPage: Math.ceil(count / limit) }
}

export function getPost(id) {
  console.log(id)

  return Post.findById(id).populate({
    path: 'comments',
    populate: 'author',
  })
}
