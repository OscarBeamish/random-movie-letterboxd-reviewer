import React from 'react';
import MovieList from './components/MovieList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Random Movie Browser</h1>
        <p>Discover movies and review them on Letterboxd</p>
      </header>
      <main>
        <MovieList />
      </main>
    </div>
  );
}

export default App;