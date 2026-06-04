import { useState } from 'react'
import NoteList from '../NoteList/NoteList'
import SearchBox from '../SearchBox/SearchBox'
import { fetchNotes, createNote, deleteNote } from '../services/noteService'
import css from './App.module.css'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Pagination from '../Pagination/Pagination'
import Modal from '../Modal/Modal'
import NoteForm from '../NoteForm/NoteForm'
import { useDebouncedCallback } from 'use-debounce'

export default function App() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSearchChange = useDebouncedCallback((value: string) => {
    setSearch(value)
    setPage(1)
  }, 3000)

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', page, search],
    queryFn: () => fetchNotes(page, 12, search),
  })
  const notes = data?.notes ?? []
  const total = data?.totalPages ?? 0

  const queryClient = useQueryClient()

  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
      setIsModalOpen(false)
    },
  })
  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
  })
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={handleSearchChange} />
        {total > 1 && <Pagination pageCount={total} onPageChange={setPage} />}
        <button
          type="button"
          className={css.button}
          onClick={() => setIsModalOpen(true)}
        >
          Create note +
        </button>
      </header>
      <main>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error...</p>}
        {!isLoading && !isError && notes.length > 0 && (
          <NoteList items={notes} onDelete={id => deleteMutation.mutate(id)} />
        )}
      </main>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm
            onClose={() => setIsModalOpen(false)}
            onSubmit={data => {
              createMutation.mutate(data)
            }}
          />
        </Modal>
      )}
    </div>
  )
}
