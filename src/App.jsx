import "./App.css";
import { FavoritesSection } from "./components/favorites/FavoritesSection";
import { WantedDetails } from "./components/details/WantedDetails";
import { AppHeader } from "./components/layout/AppHeader";
import { ResultsSection } from "./components/results/ResultsSection";
import { SearchToolbar } from "./components/search/SearchToolbar";
import { AppProvider } from "./context/AppProvider";
import { useAppContext } from "./context/useAppContext";

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

function AppContent() {
  const { view, selectedItem } = useAppContext();

  return (
    <div className="app-shell">
      <AppHeader />

      <main className="page-content">
        {(view === "browse" || view === "favorites") && (
          <>
            {view === "browse" ? (
              <>
                <SearchToolbar />
                <ResultsSection />
              </>
            ) : (
              <FavoritesSection />
            )}
          </>
        )}

        {(view === "details" || view === "favorite-details") &&
          selectedItem && <WantedDetails />}
      </main>
    </div>
  );
}

export default App;
