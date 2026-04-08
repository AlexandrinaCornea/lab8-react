function getImageUrl(item) {
  if (!item?.images || item.images.length === 0) {
    return ''
  }

  const firstImage = item.images[0]
  return firstImage.large || firstImage.original || firstImage.thumb || ''
}

export function WantedCard({ item, sourceView, favorites, onOpenDetails }) {
  const imageUrl = getImageUrl(item)
  const isFavorite = favorites.isFavorite(item)

  return (
    <article className="wanted-card" onClick={() => onOpenDetails(item, sourceView)}>
      <div className="card-image-wrapper">
        {imageUrl ? (
          <img src={imageUrl} alt={item.title} className="card-image" />
        ) : (
          <div className="card-placeholder">No image</div>
        )}

        <button
          type="button"
          className={isFavorite ? 'favorite-button saved' : 'favorite-button'}
          onClick={(event) => {
            event.stopPropagation()
            favorites.toggleFavorite(item)
          }}
        >
          {isFavorite ? 'Saved' : 'Save'}
        </button>
      </div>

      <div className="card-body">
        <div className="pill-row">
          <span className="pill">{item.poster_classification || 'wanted'}</span>
          <span className="pill subtle">{item.field_offices?.[0] || 'multiple offices'}</span>
        </div>
        <h3>{item.title}</h3>
        <p className="card-text">
          {item.description || item.details || item.caution || 'Deschide cardul pentru detalii.'}
        </p>
      </div>
    </article>
  )
}
