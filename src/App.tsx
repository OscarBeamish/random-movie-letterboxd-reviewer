import React, { useState } from 'react';
import MovieList from './components/MovieList';
import MovieFilters from './components/MovieFilters';
import './App.css';

function App() {
  const [filters, setFilters] = useState<{
    year?: number;
    genre?: number;
    sortBy?: string;
  }>({});

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Random Movie Browser</h1>
        <p>Discover movies and review them on Letterboxd</p>
      </header>
      <main>
        <div className="container">
          <MovieFilters onFiltersChange={handleFiltersChange} />
          <MovieList filters={filters} />
        </div>
      </main>
    </div>
  );
}

export default App;