import './styling/App.scss';
import { calculatePoints } from './blackjackLogic';
import gameLogic from './gameLogic';
import Button from './components/Button.tsx';
import Input from './components/Input.tsx';
import PlayerHand from './components/PlayerHand.tsx';
import DealerHand from './components/DealerHand.tsx';
import TotalPoints from './components/TotalPoints.tsx';

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
      <section className="table">
        <section className="section-outputs">
          <section className="hands">
            <PlayerHand playerHand={playerHand} />
            <DealerHand dealerHand={dealerHand} activeGame={activeGame} />
          </section>

          <section className="hands-title">
            <h2>Player Hand</h2>
            <h2>Dealer Hand</h2>
          </section>
          <section className="points">
            <TotalPoints label="Total Points: " points={playerPoints} />
            <TotalPoints
              label="Total Points: "
              points={
                playerStayed
                  ? dealerPoints
                  : calculatePoints(dealerHand.slice(1))
              }
            />
          </section>
          <section className="game-message-container">
            <h4 className="game-message">{gameResultMessage}</h4>
          </section>
        </section>
        <p className="bet-text">
          total bet: {playerBet} <br /> player chips: {playerChips}
        </p>
        <section className="section-inputs">
          <Button handleClick={handleNewGame} text="New Game" />
          <Button handleClick={handleDealCard} text="Deal Card" />
          <Button handleClick={handleHit} text="Hit" />
          <Button handleClick={handleStay} text="Stay" />
          <Button handleClick={handlePlaceBet} text="Place Bet" />
          <Input />
        </section>
      </section>
    </main>
  );
}

export default App;
