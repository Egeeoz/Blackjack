import './styling/App.scss';
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
    <main className="App">
      <section className="section-outputs">
        <section className="hands">
          <section className="player-hand">
            {playerHand.map((card, index) => (
              <section key={index}>
                <p>
                  {card.value} of {card.suit}
                </p>
              </section>
            ))}
          </section>

          <section className="dealer-hand">
            {dealerHand.map((card, index) => (
              <section key={index}>
                <p>
                  {index === 0 && activeGame
                    ? 'Hidden Card'
                    : `${card.value} of ${card.suit}`}
                </p>
              </section>
            ))}
          </section>
        </section>

        <section className="hands-title">
          <h2>Player Hand</h2>
          <h2>Dealer Hand</h2>
        </section>
        <section className="points">
          <h3>Total Points: {playerPoints}</h3>
          <h3>
            Total Points:
            {playerStayed ? dealerPoints : calculatePoints(dealerHand.slice(1))}
          </h3>
        </section>
        <h4>{gameResultMessage}</h4>
      </section>
      <section className="section-inputs">
        <button onClick={handleNewGame}>New Game</button>
        <button onClick={handleDealCard}>Deal Card</button>
        <button onClick={handleHit}>Hit</button>
        <button onClick={handleStay}>Stay</button>
        <input type="text" id="betInput" placeholder="Bet amount" />
        <p>
          total bet: {playerBet} <br /> player chips: {playerChips}
        </p>
        <button onClick={handlePlaceBet}>Place Bet</button>
      </section>
    </main>
  );
}

export default App;
