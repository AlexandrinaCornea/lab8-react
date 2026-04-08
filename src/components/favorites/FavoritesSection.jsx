import { useAppContext } from "../../context/useAppContext";
import { CardGrid } from "../cards/CardGrid";
import { EmptyState } from "../states/EmptyState";

export function FavoritesSection() {
  const { favorites, handleOpenDetails } = useAppContext();
  const favoriteEntries = favorites.favorites;

  return (
    <section className="favorites-panel">
      <div className="section-heading">
        <div>
          <h2>Favorites</h2>
        </div>
      </div>

      {favoriteEntries.length === 0 ? (
        <EmptyState
          title="Nu ai favorite salvate"
          description="Adauga cazuri din lista principala si ele vor aparea aici instant."
        />
      ) : (
        <CardGrid
          items={favoriteEntries}
          sourceView="favorites"
          favorites={favorites}
          onOpenDetails={handleOpenDetails}
        />
      )}
    </section>
  );
}
