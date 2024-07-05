import './App.css';
import { calculatePoints } from './blackjackLogic';

import gameLogic from './gameLogic';

// TODO Decide winner and loser

function App() {
  const {
    handleBet,
    handleDealCard,
    handleHit,
    handleStay,
    handleNewGame,
    playerHand,
    dealerHand,
    activeGame,
    playerStayed,
    playerPoints,
    dealerPoints,
    playerChips,
    playerBet,
    gameResultMessage,
  } = gameLogic();

  // Handle the button to place bet
  const handlePlaceBet = () => {
    const betInput = document.getElementById(
      'betInput'
    ) as HTMLInputElement | null;
    if (betInput) {
      handleBet(betInput.value);
      betInput.value = '';
    }
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
        <h4>{gameResultMessage}</h4>
      </div>
      <button onClick={handleNewGame}>New Game</button>
      <button onClick={handleDealCard}>Deal Card</button>
      <button onClick={handleHit}>Hit</button>
      <button onClick={handleStay}>Stay</button>
      <input type="text" id="betInput" placeholder="Bet amount" />
      <p>
        total bet: {playerBet} <br /> player chips: {playerChips}
      </p>
      <button onClick={handlePlaceBet}>Place Bet</button>
    </div>
  );
}

export default App;
