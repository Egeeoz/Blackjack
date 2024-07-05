import { useEffect, useState } from 'react';
import {
  createDeck,
  shuffleDeck,
  dealCard,
  Card,
  calculatePoints,
} from './blackjackLogic';

const gameLogic = () => {
  const [deck, setDeck] = useState<Card[]>(shuffleDeck(createDeck()));
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [dealerHand, setDealerHand] = useState<Card[]>([]);
  const [activeGame, setActiveGame] = useState<boolean>(false);
  const [playerStayed, setPlayerStayed] = useState<Boolean>(false);
  const [playerPoints, setPlayerPoints] = useState<number>(0);
  const [dealerPoints, setDealerPoints] = useState<number>(0);
  const [playerChips, setPlayerChips] = useState<number>(500);
  const [playerBet, setPlayerBet] = useState<number>(0);
  const [gameResultMessage, setGameResultMessage] = useState<string>('');

  // Function to handle player bet
  const handleBet = (betInput: string) => {
    // If there is a bet the parse it and pass it into the state
    if (betInput) {
      let betAmount = parseInt(betInput, 10);
      if (!isNaN(betAmount)) {
        if (playerChips > 0) {
          setPlayerBet(betAmount);
          setPlayerChips(playerChips - betAmount);
        }
      }
    }
  };

  //   Function to deal cards to player and dealer
  const handleDealCard = () => {
    if (!playerBet || activeGame || playerStayed) return;

    const newPlayerCards = [];
    const newDealerCards = [];

    // Dealing cards
    for (let i = 0; i < 4; i++) {
      const card = dealCard(deck);
      if (i % 2 === 0) {
        newPlayerCards.push(card);
      } else {
        newDealerCards.push(card);
      }
    }

    // Check if they are any new cards dealt
    if (newPlayerCards.length > 0 || newDealerCards.length > 0) {
      // Ensures that valid cards are kept and nothing is undefined in the array
      const filteredPlayerCards = newPlayerCards.filter(
        (card): card is Card => card !== undefined
      );
      const filteredDealerCards = newDealerCards.filter(
        (card): card is Card => card !== undefined
      );

      //   Update and set dealer and player hand to the updated hand
      const updatedPlayerHand = [...playerHand, ...filteredPlayerCards];
      const updatedDealerHand = [...dealerHand, ...filteredDealerCards];
      setPlayerHand(updatedPlayerHand);
      setDealerHand(updatedDealerHand);

      //   Calculate and update player and dealer points (total card values)
      setPlayerPoints(calculatePoints(updatedPlayerHand));
      setDealerPoints(calculatePoints(updatedDealerHand));

      //   Set game to active so cards cant be dealt again
      setActiveGame(true);
    }
  };

  //   Function to give a player a card when pressed on corresponding button
  const handleHit = () => {
    if (!activeGame || playerStayed) return;

    // take a card out from the deck
    const card = dealCard(deck);

    // If card exists update the player hand with the latest card
    if (card) {
      const updatedPlayerHand = [...playerHand, card];

      setPlayerHand(updatedPlayerHand);

      // Update the deck
      setDeck(deck);

      //   Calculate the players new points and update it
      const newPlayerPoints = calculatePoints(updatedPlayerHand);
      setPlayerPoints(newPlayerPoints);

      //  TODO Check if player bust? maybe somewhere else
      if (newPlayerPoints > 21) {
        setPlayerStayed(true);
        setActiveGame(false);
        setGameResultMessage('Player Bust');
      }
    }
  };
  //   Function to handle player stay
  const handleStay = () => {
    if (!activeGame) return;

    // Create a copy dealers hand and a copy of the deck
    let updatedDealerHand = [...dealerHand];
    let updatedDeck = [...deck];

    // If the dealer has less than 16 points keep adding cards
    while (calculatePoints(updatedDealerHand) <= 16) {
      const card = dealCard(updatedDeck);
      if (card) {
        updatedDealerHand.push(card); // Update the dealers copied hand
      }
    }

    // Update the state with the new hand
    setDealerHand(updatedDealerHand);

    // Update the deck state with the updated deck
    setDeck(updatedDeck);

    // Calculate dealers new hand update the points state
    const newDealerPoints = calculatePoints(updatedDealerHand);
    setDealerPoints(newDealerPoints);

    setPlayerStayed(true);
  };

  // Run checkGameResults after all states in handlestay has finished
  useEffect(() => {
    if (activeGame && playerStayed) {
      checkGameResults();
      setActiveGame(false);
    }
  }),
    [playerStayed, dealerPoints];

  // Function to check game winner or loser
  const checkGameResults = () => {
    if (playerStayed) {
      if (playerPoints === 21 && dealerPoints !== 21) {
        const message = 'Blackjack player';
        setGameResultMessage(message);
        betPayout(playerBet);
      } else if (dealerPoints === 21 && playerPoints !== 21) {
        const message = 'Blackjack dealer';
        setGameResultMessage(message);
      } else if (playerPoints > 21) {
        const message = 'Player bust';
        setGameResultMessage(message);
      } else if (dealerPoints > 21) {
        const message = 'Dealer bust';
        betPayout(playerBet);
        setGameResultMessage(message);
      } else if (playerPoints > dealerPoints) {
        const message = 'Player wins, noone busts';
        setGameResultMessage(message);
        betPayout(playerBet);
      } else if (dealerPoints > playerPoints) {
        const message = 'Dealer wins, noone busts';
        setGameResultMessage(message);
      } else if (playerPoints === dealerPoints) {
        const message = 'Draw';
        setGameResultMessage(message);
      }
    }
  };

  // Bet payout
  const betPayout = (bet: number) => {
    let winnings = 2 * bet;
    const updatedPlayerchips = playerChips + winnings;
    setPlayerChips(updatedPlayerchips);
  };

  //   Reset the game
  const handleNewGame = () => {
    const newDeck = shuffleDeck(createDeck());
    setDeck(newDeck);
    setPlayerHand([]);
    setDealerHand([]);
    setActiveGame(false);
    setPlayerStayed(false);
    setPlayerPoints(0);
    setDealerPoints(0);
    setPlayerBet(0);
    setGameResultMessage('');
  };

  return {
    handleDealCard,
    handleBet,
    handleHit,
    handleStay,
    handleNewGame,
    playerHand,
    dealerHand,
    activeGame,
    playerStayed,
    playerPoints,
    dealerPoints,
    playerChips,
    playerBet,
    gameResultMessage,
  };
};

export default gameLogic;
