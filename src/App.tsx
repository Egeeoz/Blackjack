import { useState } from 'react';
import './App.css';
import { createDeck, shuffleDeck, dealCard, Card } from './blackjackLogic';

function App() {
  const [deck, setDeck] = useState<Card[]>(shuffleDeck(createDeck()));
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [dealerHand, setDealerHand] = useState<Card[]>([]);

  const handleDealCard = () => {
    const newCards = [];
    for (let i = 0; i < 2; i++) {
      const card = dealCard(deck);
      if (card) {
        newCards.push(card);
      } else {
        console.log('No cards left in deck');
      }
    }
    if (newCards.length > 0) {
      setPlayerHand([...playerHand, ...newCards]);
      setDeck(deck);
    }
  };

  return (
    <div className="App">
      <button onClick={handleDealCard}>Deal Card</button>
      <div>
        <h2>Player Hand</h2>
        {playerHand.map((card, index) => (
          <div key={index}>
            {card.value} of {card.suit}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
