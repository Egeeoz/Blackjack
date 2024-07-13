import { Card } from '../blackjackLogic';

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
            {index === 0 && activeGame
              ? 'Hidden Card'
              : `${card.value} of ${card.suit}`}
          </p>
        </section>
      ))}
    </section>
  );
};

export default DealerHand;
