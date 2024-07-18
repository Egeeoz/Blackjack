export interface Card {
  suit: string;
  value: string;
  points: number;
}

// Function to create deck
export function createDeck(): Card[] {
  const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
  const values = [
    'Ace',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'Jack',
    'Queen',
    'King',
  ];
  let deck: Card[] = [];

  for (let suit of suits) {
    for (let value of values) {
      let points = 0;
      if (value === 'Ace') {
        points = 11;
      } else if (['Jack', 'Queen', 'King'].includes(value)) {
        points = 10;
      } else {
        points = parseInt(value);
      }
      deck.push({ suit, value, points });
    }
  }
  return deck;
}

// Function that shuffles the deck
export function shuffleDeck(deck: Card[]): Card[] {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck;
}

// Function to deal card
export function dealCard(deck: Card[]): Card | undefined {
  return deck.pop();
}

// Function to calculate user points
export function calculatePoints(hand: Card[]): number {
  let totalPoints = 0;
  let acesCount = 0;

  for (let card of hand) {
    totalPoints += card.points;
    if (card.value === 'Ace') {
      acesCount += 1;
    }
  }

  while (totalPoints > 21 && acesCount > 0) {
    totalPoints -= 10;
    acesCount -= 1;
  }

  return totalPoints;
}
