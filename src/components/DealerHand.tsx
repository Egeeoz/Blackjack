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
    <motion.section
      className="dealer-hand"
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.75,
          },
        },
      }}
    >
      {dealerHand.map((card, index) => (
        <motion.div key={index} variants={cardAnimation(index)}>
          {index === 0 && activeGame ? (
            <div className="card-icon hidden-card">?</div>
          ) : (
            <CardIcon card={card} />
          )}
        </motion.div>
      ))}
    </motion.section>
  );
};

export default DealerHand;
