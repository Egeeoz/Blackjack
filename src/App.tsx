import { useState } from 'react';
import './App.css';
import {
  createDeck,
  shuffleDeck,
  dealCard,
  Card,
  calculatePoints,
} from './blackjackLogic';

function App() {
  const [deck, setDeck] = useState<Card[]>(shuffleDeck(createDeck()));
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [dealerHand, setDealerHand] = useState<Card[]>([]);
  const [activeGame, setActiveGame] = useState<Number>(0);

  const handleDealCard = () => {
    const newPlayerCards = [];
    const newDealerCards = [];

    for (let i = 0; i < 4; i++) {
      const card = dealCard(deck);
      if (card && activeGame == 0) {
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
      setActiveGame(1);
    }
  };

  const handleHit = () => {
    const card = dealCard(deck);
    if (card) {
      setPlayerHand([...playerHand, card]);
      setDeck(deck);
    }
  };

  const handleNewGame = () => {
    const newDeck = shuffleDeck(createDeck());
    setDeck(newDeck);
    setPlayerHand([]);
    setDealerHand([]);
    setActiveGame(0);
  };

  const playerPoints = calculatePoints(playerHand);
  const dealerPoints = calculatePoints(dealerHand);

  return (
    <div className="App">
      <button onClick={handleNewGame}>New Game</button>
      <button onClick={handleDealCard}>Deal Card</button>
      <button onClick={handleHit}>Hit</button>
      <div>
        <h2>Player Hand</h2>
        {playerHand.map((card, index) => (
          <div key={index}>
            {card.value} of {card.suit}
          </div>
        ))}
        <h3>Total Points: {playerPoints}</h3>
        {playerPoints > 21 ? <p>Player Busts!</p> : null}
        <h2>Dealer Hand</h2>
        {dealerHand.map((card, index) => (
          <div key={index}>
            {card.value} of {card.suit}
          </div>
        ))}
        <h3>Total Points: {dealerPoints}</h3>
        {dealerPoints > 21 ? <p>Dealer Busts!</p> : null}
      </div>
    </div>
  );
}

export default App;
