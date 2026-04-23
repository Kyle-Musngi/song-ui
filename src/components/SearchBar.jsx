import { Search, Close } from '@mui/icons-material';
import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className="search-bar">
      <Search className="search-icon" />
      <input
        type="text"
        placeholder="Search songs, artists, albums..."
        value={query}
        onChange={handleChange}
        className="search-input"
      />
      {query && (
        <button onClick={handleClear} className="search-clear">
          <Close />
        </button>
      )}
    </div>
  );
}