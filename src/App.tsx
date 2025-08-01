import React, { useState, useCallback } from 'react';
import MovieList from './components/MovieList';
import MovieFilters from './components/MovieFilters';
import BackgroundAnimation from './components/BackgroundAnimation';
import ThemeToggle from './components/ThemeToggle';
import RefreshButton from './components/RefreshButton';
import './App.css';

function App() {
  const [filters, setFilters] = useState<{
    year?: number;
    genre?: number;
    sortBy?: string;
  }>({});

  const handleFiltersChange = useCallback((newFilters: typeof filters) => {
    setFilters(newFilters);
  }, []);

  return (
    <div className="App">
      <BackgroundAnimation />
      <RefreshButton />
      <ThemeToggle />
      
      <header className="App-header">
        <div className="header-content">
          <h1 className="gradient-text">Random Movie Browser</h1>
          <p className="subtitle">
            Discover movies <br className="md:inline" />
            & review them on <span className="letterboxd-text">Letterboxd</span>
          </p>
        </div>
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