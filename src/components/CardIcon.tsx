import {
  GiCardAceHearts,
  GiCardAceDiamonds,
  GiCardAceClubs,
  GiCardAceSpades,
  GiCard2Hearts,
  GiCard2Diamonds,
  GiCard2Clubs,
  GiCard2Spades,
  GiCard3Hearts,
  GiCard3Diamonds,
  GiCard3Clubs,
  GiCard3Spades,
  GiCard4Hearts,
  GiCard4Diamonds,
  GiCard4Clubs,
  GiCard4Spades,
  GiCard5Hearts,
  GiCard5Diamonds,
  GiCard5Clubs,
  GiCard5Spades,
  GiCard6Hearts,
  GiCard6Diamonds,
  GiCard6Clubs,
  GiCard6Spades,
  GiCard7Hearts,
  GiCard7Diamonds,
  GiCard7Clubs,
  GiCard7Spades,
  GiCard8Hearts,
  GiCard8Diamonds,
  GiCard8Clubs,
  GiCard8Spades,
  GiCard9Hearts,
  GiCard9Diamonds,
  GiCard9Clubs,
  GiCard9Spades,
  GiCard10Hearts,
  GiCard10Diamonds,
  GiCard10Clubs,
  GiCard10Spades,
  GiCardJackHearts,
  GiCardJackDiamonds,
  GiCardJackClubs,
  GiCardJackSpades,
  GiCardQueenHearts,
  GiCardQueenDiamonds,
  GiCardQueenClubs,
  GiCardQueenSpades,
  GiCardKingHearts,
  GiCardKingDiamonds,
  GiCardKingClubs,
  GiCardKingSpades,
} from 'react-icons/gi';
import { Card } from '../blackjackLogic';

interface CardIconProps {
  card: Card;
}

const CardIcon: React.FC<CardIconProps> = ({ card }) => {
  const { value, suit } = card;

  // Define a type for cardIcons
  type CardIconType = {
    [key: string]: {
      [key: string]: JSX.Element;
    };
  };

  // Map card values and suits to corresponding icons
  const cardIcons: CardIconType = {
    Ace: {
      Hearts: <GiCardAceHearts />,
      Diamonds: <GiCardAceDiamonds />,
      Clubs: <GiCardAceClubs />,
      Spades: <GiCardAceSpades />,
    },
    '2': {
      Hearts: <GiCard2Hearts />,
      Diamonds: <GiCard2Diamonds />,
      Clubs: <GiCard2Clubs />,
      Spades: <GiCard2Spades />,
    },
    '3': {
      Hearts: <GiCard3Hearts />,
      Diamonds: <GiCard3Diamonds />,
      Clubs: <GiCard3Clubs />,
      Spades: <GiCard3Spades />,
    },
    '4': {
      Hearts: <GiCard4Hearts />,
      Diamonds: <GiCard4Diamonds />,
      Clubs: <GiCard4Clubs />,
      Spades: <GiCard4Spades />,
    },
    '5': {
      Hearts: <GiCard5Hearts />,
      Diamonds: <GiCard5Diamonds />,
      Clubs: <GiCard5Clubs />,
      Spades: <GiCard5Spades />,
    },
    '6': {
      Hearts: <GiCard6Hearts />,
      Diamonds: <GiCard6Diamonds />,
      Clubs: <GiCard6Clubs />,
      Spades: <GiCard6Spades />,
    },
    '7': {
      Hearts: <GiCard7Hearts />,
      Diamonds: <GiCard7Diamonds />,
      Clubs: <GiCard7Clubs />,
      Spades: <GiCard7Spades />,
    },
    '8': {
      Hearts: <GiCard8Hearts />,
      Diamonds: <GiCard8Diamonds />,
      Clubs: <GiCard8Clubs />,
      Spades: <GiCard8Spades />,
    },
    '9': {
      Hearts: <GiCard9Hearts />,
      Diamonds: <GiCard9Diamonds />,
      Clubs: <GiCard9Clubs />,
      Spades: <GiCard9Spades />,
    },
    '10': {
      Hearts: <GiCard10Hearts />,
      Diamonds: <GiCard10Diamonds />,
      Clubs: <GiCard10Clubs />,
      Spades: <GiCard10Spades />,
    },
    Jack: {
      Hearts: <GiCardJackHearts />,
      Diamonds: <GiCardJackDiamonds />,
      Clubs: <GiCardJackClubs />,
      Spades: <GiCardJackSpades />,
    },
    Queen: {
      Hearts: <GiCardQueenHearts />,
      Diamonds: <GiCardQueenDiamonds />,
      Clubs: <GiCardQueenClubs />,
      Spades: <GiCardQueenSpades />,
    },
    King: {
      Hearts: <GiCardKingHearts />,
      Diamonds: <GiCardKingDiamonds />,
      Clubs: <GiCardKingClubs />,
      Spades: <GiCardKingSpades />,
    },
  };

  // Default icon in case the value or suit is not found
  const defaultIcon = <GiCard3Hearts />;

  // Return the corresponding icon for the card, or default if not found
  return (
    <div className="card-icon">{cardIcons[value]?.[suit] || defaultIcon}</div>
  );
};

export default CardIcon;
