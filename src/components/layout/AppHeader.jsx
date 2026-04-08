import { useAppContext } from '../../context/useAppContext'

export function AppHeader() {
  const { view, favorites, openBrowse, openFavorites } = useAppContext()

  return (
    <header className="topbar">
      <div>
        <p className="brand">FBI Wanted Cases</p>
      </div>

      <nav className="nav-tabs" aria-label="Primary">
        <button
          type="button"
          className={view === 'browse' || view === 'details' ? 'tab active' : 'tab'}
          onClick={openBrowse}
        >
          Explore
        </button>
        <button
          type="button"
          className={view === 'favorites' || view === 'favorite-details' ? 'tab active' : 'tab'}
          onClick={openFavorites}
        >
          Favorites ({favorites.favorites.length})
        </button>
      </nav>
    </header>
  )
}
