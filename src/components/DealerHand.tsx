import { Card } from '../blackjackLogic';
import CardIcon from './CardIcon';
import { motion } from 'framer-motion';
import { cardAnimation } from './CardIcon';

interface DealerHandProps {
  dealerHand: Card[];
  activeGame: boolean;
}

const DealerHand = ({ dealerHand, activeGame }: DealerHandProps) => {
  return (
    <section className="dealer-hand">
      {dealerHand.map((card, index) => (
        <motion.div key={index} variants={cardAnimation(index)}>
          {index === 0 && activeGame ? (
            <div className="card-icon hidden-card">?</div>
          ) : (
            <CardIcon key={index} card={card} index={index} />
          )}
        </motion.div>
      ))}
    </section>
  );
};

export default DealerHand;
