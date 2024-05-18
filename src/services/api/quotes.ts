import { instance } from '@/plugins/axios'
import type { Quote } from '@/types'

export async function getQuotes() {
  return await instance.get('api/get-quotes')
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
