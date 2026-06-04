import ReactPaginateModule from 'react-paginate'
import type { ReactPaginateProps } from 'react-paginate'
import type { ComponentType } from 'react'
import css from './Pagination.module.css'
type ModuleWithDefault<T> = { default: T }

const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<
    ComponentType<ReactPaginateProps>
  >
).default

interface PaginationProps {
  pageCount: number
  onPageChange: (page: number) => void
}

export default function Pagination({
  pageCount,
  onPageChange,
}: PaginationProps) {
  const handlePageClick = (event: { selected: number }) => {
    onPageChange(event.selected + 1)
  }

  return (
    <ReactPaginate
      pageCount={pageCount}
      onPageChange={handlePageClick}
      containerClassName={css.pagination}
      activeClassName={css.active}
      pageClassName={css.pageItem}
      previousClassName={css.pageItem}
      nextClassName={css.pageItem}
      previousLabel="&lt;"
      nextLabel="&gt;"
      breakLabel="..."
    />
  )
}
