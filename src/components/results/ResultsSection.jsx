import { useAppContext } from '../../context/useAppContext'
import { CardGrid } from '../cards/CardGrid'
import { EmptyState } from '../states/EmptyState'
import { ErrorState } from '../states/ErrorState'
import { LoadingState } from '../states/LoadingState'
import { Pagination } from '../shared/Pagination'

export function ResultsSection() {
  const {
    items,
    loading,
    error,
    total,
    page,
    totalPages,
    favorites,
    handleOpenDetails,
    goToPreviousPage,
    goToNextPage,
  } = useAppContext()

  return (
    <section className="results-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Rezultate</p>
          <h2>Lista cautata</h2>
        </div>
        <p className="muted-copy">
          {loading
            ? 'Se incarca rezultatele...'
            : `${total.toLocaleString()} rezultate totale, pagina ${page} din ${totalPages}`}
        </p>
      </div>

      {loading && <LoadingState message="Cererea catre FBI API este in curs..." />}
      {!loading && error && (
        <ErrorState message="Nu am putut incarca datele. Verifica conexiunea sau incearca alta cautare." />
      )}
      {!loading && !error && items.length === 0 && (
        <EmptyState
          title="Nu exista rezultate"
          description="Incearca alt text de cautare sau schimba filtrul de birou."
        />
      )}
      {!loading && !error && items.length > 0 && (
        <>
          <CardGrid
            items={items}
            sourceView="browse"
            favorites={favorites}
            onOpenDetails={handleOpenDetails}
          />
          <Pagination
            page={page}
            totalPages={totalPages}
            onPrevious={goToPreviousPage}
            onNext={goToNextPage}
          />
        </>
      )}
    </section>
  )
}
