import { useAppContext } from '../../context/useAppContext'
import { useFetch } from '../../hooks/useFetch'
import { ErrorState } from '../states/ErrorState'
import { LoadingState } from '../states/LoadingState'

function getImageUrl(item) {
  if (!item?.images || item.images.length === 0) {
    return ''
  }

  const firstImage = item.images[0]
  return firstImage.large || firstImage.original || firstImage.thumb || ''
}

export function WantedDetails() {
  const { selectedItem: item, favorites, handleBackFromDetails } = useAppContext()
  const detailsUrl = item?.pathId ? item.pathId : 'https://api.fbi.gov/wanted/v1/list?uid=' + item.uid
  const { data, loading, error } = useFetch(detailsUrl, {
    ttl: 1000 * 60 * 10,
    initialData: item,
  })

  const detail = data ?? item
  const imageUrl = getImageUrl(detail)
  const isFavorite = favorites.isFavorite(detail)
  const metaItems = [
    ['Birou FBI', detail.field_offices?.join(', ')],
    ['Data publicarii', detail.publication],
    ['Clasificare', detail.poster_classification],
    ['Aliasuri', detail.aliases?.join(', ')],
    ['Subiecte', detail.subjects?.join(', ')],
  ].filter(([, value]) => Boolean(value))

  return (
    <section className="details-panel">
      <div className="details-actions">
        <button type="button" className="ghost-button" onClick={handleBackFromDetails}>
          Inapoi la lista
        </button>
        <button
          type="button"
          className={isFavorite ? 'primary-button saved-cta' : 'primary-button'}
          onClick={() => favorites.toggleFavorite(detail)}
        >
          {isFavorite ? 'Scoate din favorite' : 'Adauga la favorite'}
        </button>
      </div>

      <div className="details-layout">
        <div className="details-visual">
          {imageUrl ? (
            <img src={imageUrl} alt={detail.title} className="details-image" />
          ) : (
            <div className="details-placeholder">No image available</div>
          )}
          <a href={detail.url} target="_blank" rel="noreferrer" className="link-button">
            Deschide posterul oficial
          </a>
        </div>

        <div className="details-content">
          <p className="eyebrow">Vizualizare detaliata</p>
          <h2>{detail.title}</h2>

          {loading && <LoadingState message="Se incarca date suplimentare pentru caz..." compact />}
          {error && (
            <ErrorState
              message="Cererea de detalii a esuat, afisez informatiile deja disponibile din lista."
              compact
            />
          )}

          <div className="detail-copy">
            <p>{detail.description || 'Nu exista o descriere scurta disponibila.'}</p>
            {detail.details && <p>{detail.details}</p>}
            {detail.caution && <p>{detail.caution}</p>}
          </div>

          <dl className="meta-grid">
            {metaItems.map(([label, value]) => (
              <div key={label} className="meta-card">
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
