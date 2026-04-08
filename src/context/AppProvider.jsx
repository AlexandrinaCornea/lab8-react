import { useState } from "react";
import { useFavorites } from "../hooks/useFavorites";
import { useFetch } from "../hooks/useFetch";
import { AppContext } from "./AppContextObject";

export function AppProvider({ children }) {
  const [searchText, setSearchText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [fieldOffice, setFieldOffice] = useState("");
  const [page, setPage] = useState(1);
  const [view, setView] = useState("browse");
  const [selectedItem, setSelectedItem] = useState(null);
  const favorites = useFavorites();

  let listUrl = "https://api.fbi.gov/wanted/v1/list?page=" + page;

  if (searchQuery) {
    listUrl += "&title=" + searchQuery;
  }

  if (fieldOffice) {
    listUrl += "&field_offices=" + fieldOffice;
  }

  const { data, loading, error } = useFetch(listUrl, { ttl: 1000 * 60 * 10 });
  const items = data?.items ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / 20));

  function handleSearchSubmit(event) {
    event.preventDefault();
    setPage(1);
    setSearchQuery(searchText.trim());
  }

  function handleFieldOfficeChange(value) {
    setPage(1);
    setFieldOffice(value);
  }

  function handleReset() {
    setSearchText("");
    setSearchQuery("");
    setFieldOffice("");
    setPage(1);
  }

  function handleOpenDetails(item, sourceView = "browse") {
    setSelectedItem(item);
    setView(sourceView === "favorites" ? "favorite-details" : "details");
  }

  function handleBackFromDetails() {
    setSelectedItem(null);
    setView(view === "favorite-details" ? "favorites" : "browse");
  }

  function openBrowse() {
    setSelectedItem(null);
    setView("browse");
  }

  function openFavorites() {
    setSelectedItem(null);
    setView("favorites");
  }

  const value = {
    searchText,
    searchQuery,
    fieldOffice,
    page,
    view,
    selectedItem,
    favorites,
    items,
    total,
    totalPages,
    loading,
    error,
    setSearchText,
    handleSearchSubmit,
    handleFieldOfficeChange,
    handleReset,
    handleOpenDetails,
    handleBackFromDetails,
    openBrowse,
    openFavorites,
    goToPreviousPage: () => setPage((current) => Math.max(1, current - 1)),
    goToNextPage: () => setPage((current) => Math.min(totalPages, current + 1)),
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
