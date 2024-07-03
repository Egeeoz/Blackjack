import { useState } from 'react';
import './App.css';
import { createDeck, shuffleDeck, dealCard, Card } from './blackjackLogic';

function App() {
  const [deck, setDeck] = useState<Card[]>(shuffleDeck(createDeck()));
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [dealerHand, setDealerHand] = useState<Card[]>([]);

  const handleDealCard = () => {
    const newPlayerCards = [];
    const newDealerCards = [];

    for (let i = 0; i < 4; i++) {
      const card = dealCard(deck);
      if (card) {
        if (i % 2 === 0) {
          newPlayerCards.push(card);
        } else {
          newDealerCards.push(card);
        }
      }
    }

    if (newPlayerCards.length > 0 || newDealerCards.length > 0) {
      setPlayerHand([...playerHand, ...newPlayerCards]);
      setDealerHand([...dealerHand, ...newDealerCards]);
      setDeck(deck);
    }
  };

  const handleNewGame = () => {
    const newDeck = shuffleDeck(createDeck());
    setDeck(newDeck);
    setPlayerHand([]);
    setDealerHand([]);
  };

  return (
    <div className="App">
      <button onClick={handleNewGame}>New Game</button>
      <button onClick={handleDealCard}>Deal Card</button>
      <div>
        <h2>Player Hand</h2>
        {playerHand.map((card, index) => (
          <div key={index}>
            {card.value} of {card.suit}
          </div>
        ))}
        <h2>Dealer Hand</h2>
        {dealerHand.map((card, index) => (
          <div key={index}>
            {card.value} of {card.suit}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
