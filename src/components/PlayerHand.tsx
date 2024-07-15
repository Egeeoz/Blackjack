import { Card } from '../blackjackLogic';
import CardIcon from './CardIcon';
import { motion } from 'framer-motion';
import { cardAnimation } from './CardIcon';
interface PlayerHandProps {
  playerHand: Card[];
}

const PlayerHand = ({ playerHand }: PlayerHandProps) => {
  return (
    <motion.section
      className="player-hand"
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
      {playerHand.map((card, index) => (
        <motion.div key={index} variants={cardAnimation(index)}>
          <CardIcon card={card} />
        </motion.div>
      ))}
    </motion.section>
  );
};

export default PlayerHand;
