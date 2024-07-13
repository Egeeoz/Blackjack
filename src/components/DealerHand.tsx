import { Card } from '../blackjackLogic';
import CardIcon from './CardIcon';

interface DealerHandProps {
  dealerHand: Card[];
  activeGame: boolean;
}

const DealerHand = ({ dealerHand, activeGame }: DealerHandProps) => {
  return (
    <section className="dealer-hand">
      {dealerHand.map((card, index) => (
        <section key={index}>
          <p>
            {index === 0 && activeGame ? (
              <p className="hidden-card">?</p>
            ) : (
              <CardIcon card={card} />
            )}
          </p>
        </section>
      ))}
    </section>
  );
};

export default DealerHand;
