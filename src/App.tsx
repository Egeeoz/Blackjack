import './App.css';
import { createDeck, shuffleDeck } from './blackjackLogic';

function App() {
  shuffleDeck(createDeck());

  return <section></section>;
}

export default App;
