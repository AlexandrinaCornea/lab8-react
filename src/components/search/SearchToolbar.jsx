import { useAppContext } from "../../context/useAppContext";

const fieldOffices = [
  { value: "", label: "Toate birourile" },
  { value: "miami", label: "Miami" },
  { value: "newyork", label: "New York" },
  { value: "losangeles", label: "Los Angeles" },
  { value: "chicago", label: "Chicago" },
  { value: "washingtondc", label: "Washington DC" },
  { value: "sanjuan", label: "San Juan" },
];

export function SearchToolbar() {
  const {
    searchText,
    searchQuery,
    fieldOffice,
    setSearchText,
    handleSearchSubmit,
    handleFieldOfficeChange,
    handleReset,
  } = useAppContext();

  return (
    <section className="toolbar-panel">
      <form className="search-form" onSubmit={handleSearchSubmit}>
        <label className="field">
          <span>Cautare dupa titlu</span>
          <input
            type="search"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="Ex: joseph, reward, missing"
          />
        </label>

        <label className="field">
          <span>Filtru dupa field office</span>
          <select
            value={fieldOffice}
            onChange={(event) => handleFieldOfficeChange(event.target.value)}
          >
            {fieldOffices.map((office) => (
              <option key={office.value || "all"} value={office.value}>
                {office.label}
              </option>
            ))}
          </select>
        </label>

        <div className="actions">
          <button type="submit" className="primary-button">
            Cauta
          </button>
          <button type="button" className="ghost-button" onClick={handleReset}>
            Reseteaza
          </button>
        </div>
      </form>

      <div className="query-summary">
        <span>
          Cautare activa: <strong>{searchQuery || "toate cazurile"}</strong>
        </span>
        <span>
          Filtru activ: <strong>{fieldOffice || "toate birourile"}</strong>
        </span>
      </div>
    </section>
  );
}
