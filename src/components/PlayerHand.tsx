import { Card } from '../blackjackLogic';
import CardIcon from './CardIcon';
import { motion } from 'framer-motion';
import { cardAnimation } from './CardIcon';
interface PlayerHandProps {
  playerHand: Card[];
}

const PlayerHand = ({ playerHand }: PlayerHandProps) => {
  return (
    <section className="player-hand">
      {playerHand.map((card, index) => (
        <motion.div key={index} variants={cardAnimation(index)}>
          <CardIcon key={index} card={card} index={index} />
        </motion.div>
      ))}
    </section>
  );
};

export default PlayerHand;
