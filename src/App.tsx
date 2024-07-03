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
  const [activeGame, setActiveGame] = useState<boolean>(false);
  const [playerStayed, setPlayerStayed] = useState<Boolean>(false);
  const [playerPoints, setPlayerPoints] = useState<number>(0);
  const [dealerPoints, setDealerPoints] = useState<number>(0);

  const handleDealCard = () => {
    if (activeGame || playerStayed) return;

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
      const updatedPlayerHand = [...playerHand, ...newPlayerCards];
      const updatedDealerHand = [...dealerHand, ...newDealerCards];

      setPlayerHand([...playerHand, ...newPlayerCards]);
      setDealerHand([...dealerHand, ...newDealerCards]);
      setDeck(deck);
      setPlayerPoints(calculatePoints(updatedPlayerHand));
      setDealerPoints(calculatePoints(updatedDealerHand));
      setActiveGame(true);
    }
  };

  const handleHit = () => {
    if (!activeGame) return;

    const card = dealCard(deck);
    if (card) {
      const updatedPlayerHand = [...playerHand, card];
      setPlayerHand([...playerHand, card]);
      setDeck(deck);
      setPlayerPoints(calculatePoints(updatedPlayerHand));
    }
  };

  const handleStay = () => {
    let updatedDealerHand = [...dealerHand];

    while (calculatePoints(updatedDealerHand) <= 16) {
      const card = dealCard(deck);
      if (card) {
        updatedDealerHand.push(card);
      }
    }

    setDealerHand(updatedDealerHand);
    setDeck(deck);
    setDealerPoints(calculatePoints(updatedDealerHand));
    setActiveGame(false);
    setPlayerStayed(true);
  };

  const handleNewGame = () => {
    const newDeck = shuffleDeck(createDeck());
    setDeck(newDeck);
    setPlayerHand([]);
    setDealerHand([]);
    setActiveGame(false);
    setPlayerStayed(false);
    setPlayerPoints(0);
    setDealerPoints(0);
  };

  return (
    <div className="App">
      <button onClick={handleNewGame}>New Game</button>
      <button onClick={handleDealCard}>Deal Card</button>
      <button onClick={handleHit}>Hit</button>
      <button onClick={handleStay}>Stay</button>
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
            {index === 0 && activeGame
              ? 'Hidden Card'
              : `${card.value} of ${card.suit}`}
          </div>
        ))}
        <h3>
          Total Points:
          {playerStayed ? dealerPoints : calculatePoints(dealerHand.slice(1))}
        </h3>
        {dealerPoints > 21 ? <p>Dealer Busts!</p> : null}
      </div>
    </div>
  );
}

export default App;
