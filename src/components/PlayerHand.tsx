import { Card } from '../blackjackLogic';
import CardIcon from './CardIcon';
interface PlayerHandProps {
  playerHand: Card[];
}

const PlayerHand = ({ playerHand }: PlayerHandProps) => {
  return (
    <section className="player-hand">
      {playerHand.map((card, index) => (
        <section key={index}>
          <p>
            {/* {card.value} of {card.suit} */}
            <CardIcon card={card} />
          </p>
        </section>
      ))}
    </section>
  );
};

export default PlayerHand;
