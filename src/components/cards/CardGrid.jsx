import { WantedCard } from './WantedCard'

export function CardGrid({ items, sourceView, favorites, onOpenDetails }) {
  return (
    <div className="card-grid">
      {items.map((item) => (
        <WantedCard
          key={item.uid}
          item={item}
          sourceView={sourceView}
          favorites={favorites}
          onOpenDetails={onOpenDetails}
        />
      ))}
    </div>
  )
}
