export function Pagination({ page, totalPages, onPrevious, onNext }) {
  return (
    <div className="pagination">
      <button type="button" className="ghost-button" onClick={onPrevious} disabled={page <= 1}>
        Prev
      </button>
      <span>
        Pagina <strong>{page}</strong> din <strong>{totalPages}</strong>
      </span>
      <button type="button" className="ghost-button" onClick={onNext} disabled={page >= totalPages}>
        Next
      </button>
    </div>
  )
}
