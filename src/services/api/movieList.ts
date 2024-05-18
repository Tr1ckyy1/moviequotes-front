import { instance } from '@/plugins/axios'
import type { MovieData } from '@/types'

export async function getCategories() {
  return await instance.get('/api/categories')
}

export async function getMovies() {
  return await instance.get('/api/get-movies')
}

export async function getMovie(movieId: string) {
  return await instance.get(`/api/movies/${movieId}`)
}

export async function addMovie(data: MovieData) {
  const formData = new FormData()
  formData.append('image', data.image)
  await instance.post(
    '/api/add-movie',
    { ...data, image: formData.get('image') },
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )
}

export async function editMovie(data: MovieData, movieId: number | null) {
  const formData = new FormData()
  formData.append('image', data.image)
  await instance.post(
    `/api/edit-movie/${movieId}`,
    { ...data, image: formData.get('image') },
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

export async function deleteMovie(movieId: number | null) {
  await instance.delete(`api/delete-movie/${movieId}`)
}
