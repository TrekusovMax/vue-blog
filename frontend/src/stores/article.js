import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'

export const useArticleStore = defineStore('article', () => {
  const article = ref({})
  const isInEditMode = ref(false)

  const fetchArticle = async (id) => {
    try {
      const response = await fetch(`/api/posts/${id}`)
      if (!response.ok) {
        throw new Error('Ошибка запроса получения статьи')
      }
      const data = await response.json()
      if (data.error) {
        throw new Error(data.error)
      } else {
        article.value = data.data
      }
      return data
    } catch (error) {
      console.error('Ошибка получения статьи', error)
    }
  }
  const toggleEditMode = () => {
    isInEditMode.value = !isInEditMode.value
  }

  const updateArticle = async ({ title, content, imageUrl }) => {
    try {
      const response = await fetch(`/api/posts/${article.value.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title || article.value.title,
          content: content || article.value.content,
          imageUrl: imageUrl || article.value.imageUrl,
        }),
      })
      if (!response.ok) {
        throw new Error('Ошибка запроса обновления статьи')
      }
      const data = await response.json()
      if (data.error) {
        throw new Error(data.error)
      } else {
        article.value = data.data
      }
      return 'success'
    } catch (error) {
      console.error('Ошибка обновления статьи', error)
    }
  }
  const deleteArticle = async () => {
    try {
      const response = await fetch(`/api/posts/${article.value.id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Ошибка запроса удаления статьи')
      }
      const data = await response.json()

      return data
    } catch (error) {
      console.error('Ошибка удаления статьи', error)
    }
  }

  const addArticle = async (newArticle) => {
    try {
      const response = await fetch(`/api/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newArticle),
      })
      if (!response.ok) {
        throw new Error('Ошибка запроса добавления статьи')
      }
      const data = await response.json()

      return data
    } catch (error) {
      console.error('Ошибка добавления статьи', error)
    }
  }

  const addComment = async (newComment) => {
    try {
      const response = await fetch(`/api/posts/${article.value.id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newComment }),
      })
      if (!response.ok) {
        throw new Error('Ошибка запроса добавления коментария')
      }
      const data = await response.json()
      if (!data.error) {
        article.value.comments.push(data.data)
      }
      return data
    } catch (error) {
      console.error('Ошибка добавления коментария', error)
    }
  }
  const deleteComment = async (commentId) => {
    try {
      const response = await fetch(`/api/posts/${article.value.id}/comments/${commentId}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Ошибка запроса удаления коментария')
      }
      const data = await response.json()
      if (!data.error) {
        article.value.comments = article.value.comments.filter(
          (comment) => comment.id !== commentId,
        )
      }

      return data
    } catch (error) {
      console.error('Ошибка удаления коментария', error)
    }
  }

  return {
    article,
    fetchArticle,
    isInEditMode,
    toggleEditMode,
    updateArticle,
    deleteArticle,
    addComment,
    deleteComment,
    addArticle,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useArticleStore, import.meta.hot))
}
