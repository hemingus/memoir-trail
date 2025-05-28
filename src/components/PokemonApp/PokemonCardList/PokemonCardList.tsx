"use client";

import React, { useEffect, useState } from 'react';
import './PokemonCardList.css';

interface PokemonCard {
  id: string;
  name: string;
  images: {
    small: string;
    large: string;
  };
  set: {
    releaseDate: string;
  };
}

const PAGE_SIZE = 10;

const PokemonCardList: React.FC = () => {
  const [cards, setCards] = useState<PokemonCard[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      setError(null);
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.pokemontcg.io/v2/cards?q=name:*${encodeURIComponent(searchInput)}*&page=${page}&pageSize=${PAGE_SIZE}`
        );
  
        if (!response.ok) {
          throw new Error(`API-feil: ${response.status}`);
        }
  
        const data = await response.json();
  
        const sortedCards = data.data.sort(
          (a: PokemonCard, b: PokemonCard) =>
            new Date(a.set.releaseDate).getTime() - new Date(b.set.releaseDate).getTime()
        );
  
        setCards(sortedCards);
      } catch (error) {
        console.error('Feil ved henting av kort:', error);
        setCards([]); // tomt array hvis feil
        setError('Kunne ikke hente kort.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCards();
  }, [page, searchInput]);

  function handleSearchInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchInput(event.target.value)
  }

  return (
    <div className="container">
      <h1 className="title">Pokémon Cards (Page {page})</h1>
      <label>Input:</label>
      <input
        value={searchInput}
        onChange={handleSearchInputChange}
      />

      {isLoading ? (
        <p>Laster kort...</p>
      ) : (
        <div className="card-grid">
          {cards.map((card) => (
            <div key={card.id} className="card">
              <h2 className="card-title">{card.name}</h2>
              <h3>{card.set.releaseDate}</h3>
              <img src={card.images.small} alt={card.name} />
            </div>
          ))}
        </div>
      )}

      <div className="pagination">
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
          Forrige
        </button>
        <button onClick={() => setPage((prev) => prev + 1)}>Neste</button>
      </div>
    </div>
  );
};

export default PokemonCardList;