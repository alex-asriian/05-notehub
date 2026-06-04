import type { Note } from '../types/note'
import css from './NoteList.module.css'

interface NoteListProps {
  items: Note[]
  onDelete: (id: string) => void
}

export default function NoteList({ items, onDelete }: NoteListProps) {
  return (
    <ul className={css.list}>
      {items.map(({ id, title, content, tag }) => (
        <li key={id} className={css.listItem}>
          {id}
          <h2 className={css.title}>{title}</h2>
          <p className={css.content}>{content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{tag}</span>
            <button className={css.button} onClick={() => onDelete(id)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}
