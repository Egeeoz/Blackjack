import { useState } from 'react';
import './App.css';
import {
  createDeck,
  shuffleDeck,
  dealCard,
  Card,
  calculatePoints,
} from './blackjackLogic';

// TODO when player busts make so player cant press stay

function App() {
  const [deck, setDeck] = useState<Card[]>(shuffleDeck(createDeck()));
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [dealerHand, setDealerHand] = useState<Card[]>([]);
  const [activeGame, setActiveGame] = useState<boolean>(false);
  const [playerStayed, setPlayerStayed] = useState<Boolean>(false);
  const [playerPoints, setPlayerPoints] = useState<number>(0);
  const [dealerPoints, setDealerPoints] = useState<number>(0);
  const [playerChips, setPlayerChips] = useState<number>(500);
  const [playerBet, setPlayerBet] = useState<number>(0);

  const handleBet = () => {
    const betInput = document.getElementById(
      'betInput'
    ) as HTMLInputElement | null;
    if (betInput) {
      let betAmount = parseInt(betInput.value, 10);
      if (!isNaN(betAmount)) {
        setPlayerBet(betAmount);
        setPlayerChips(playerChips - betAmount);
        console.log(playerChips);
      }
    }
  };

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
      const newPlayerPoints = calculatePoints(updatedPlayerHand);
      setPlayerPoints(newPlayerPoints);

      if (newPlayerPoints > 21) {
        setActiveGame(false);
        setPlayerStayed(true);
      }
    }
  };

  const handleStay = () => {
    if (!activeGame) return;

    let updatedDealerHand = [...dealerHand];

    while (calculatePoints(updatedDealerHand) <= 16) {
      const card = dealCard(deck);
      if (card) {
        updatedDealerHand.push(card);
      }
    }

    setDealerHand(updatedDealerHand);
    setDeck(deck);
    const newDealerPoints = calculatePoints(updatedDealerHand);
    setDealerPoints(newDealerPoints);

    if (newDealerPoints > 21) {
      setActiveGame(false);
    }

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
      <button onClick={handleNewGame}>New Game</button>
      <button onClick={handleDealCard}>Deal Card</button>
      <button onClick={handleHit}>Hit</button>
      <button onClick={handleStay}>Stay</button>
      <input type="text" id="betInput" placeholder="Bet amount" />
      <button onClick={handleBet}>Place Bet</button>
    </div>
  );
}

export default App;
