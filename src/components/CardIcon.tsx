import { IconBaseProps } from 'react-icons';
import * as GiIcons from 'react-icons/gi';
import { Card } from '../blackjackLogic';
import { motion } from 'framer-motion';
import '../styling/cardIcon.scss';

export const cardAnimation = (index: number) => ({
  hidden: {
    opacity: 0,
    transform: 'rotateY(90deg)',
  },
  visible: {
    opacity: 1,
    transform: 'rotateY(0deg)',
    transition: {
      duration: 1,
      delay: index * 0.2,
    },
  },
});

interface CardIconProps {
  card: Card;
  index: number;
}

const CardIcon = ({ card, index }: CardIconProps) => {
  const { value, suit } = card;

  const iconName = `GiCard${value}${suit}` as keyof typeof GiIcons;
  const CardIconComponent = GiIcons[
    iconName
  ] as React.ComponentType<IconBaseProps>;

  const FallbackIcon = GiIcons.GiCard3Hearts;

  return (
    <motion.div
      variants={cardAnimation(index)}
      initial="hidden"
      animate="visible"
      className="card-icon"
    >
      {CardIconComponent ? <CardIconComponent /> : <FallbackIcon />}
    </motion.div>
  );
};

export default CardIcon;
