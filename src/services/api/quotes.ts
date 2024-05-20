import { instance } from '@/plugins/axios'
import type { Quote } from '@/types'

export async function getQuote(quoteId: number | null) {
  return await instance.get(`api/get-quote/${quoteId}`)
}

export async function getQuotes(page: number) {
  return await instance.get('api/get-quotes', {
    params: {
      page
    }
  })
}

export async function addQuote(data: Quote) {
  const formData = new FormData()
  formData.append('image', data.image)
  await instance.post(
    '/api/add-quote',
    { ...data, image: formData.get('image') },
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )
}

export async function editQuote(data: Quote, quoteId: number) {
  const formData = new FormData()
  if (data.image) formData.append('image', data.image)
  await instance.post(
    `api/edit-quote/${quoteId}`,
    { ...data, image: formData.get('image') ?? null },
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      params: {
        _method: 'PATCH'
      }
    }
  )
}

export async function deleteQuote(quoteId: number) {
  await instance.delete(`api/delete-quote/${quoteId}`)
}

export async function updateLike(quoteId: number) {
  await instance.post(`api/update-like/${quoteId}`)
}

export async function addComment(quoteId: number, comment: string) {
  await instance.post(`api/add-comment/${quoteId}`, { comment })
}
