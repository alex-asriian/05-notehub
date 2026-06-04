import axios, { type AxiosResponse } from 'axios'
import type { Note, NoteTag } from '../types/note'

const api = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
  },
})

export interface FetchNotesResponse {
  notes: Note[]
  totalPages: number
  currentPage: number
  perPage: number
}

export interface CreateNoteInput {
  title: string
  content: string
  tag: NoteTag
}

export const fetchNotes = async (
  page: number = 1,
  perPage: number = 12,
  search: string = ''
): Promise<FetchNotesResponse> => {
  const response: AxiosResponse<FetchNotesResponse> =
    await api.get<FetchNotesResponse>('/notes', {
      params: {
        page,
        perPage,
        search,
      },
    })
  return response.data
}
export const createNote = async (noteData: {
  title: string
  content: string
  tag: string
}) => {
  const response = await axios.post(
    'https://notehub-public.goit.study/api/notes',
    noteData,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
      },
    }
  )
  return response.data
}
export const deleteNote = async (id: string): Promise<void> => {
  await axios.delete(`https://notehub-public.goit.study/api/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
    },
  })
}
