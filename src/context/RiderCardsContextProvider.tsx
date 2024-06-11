import React, { createContext, useState, useCallback } from "react";
import { shuffle } from "../lib/utils";
import { exhaustionCardValue } from "../config";
import { Rider, RiderId, Game } from "../lib/types";

type RiderCardsProviderProps = { children: React.ReactNode };

type RiderCardsContextType = {
  areCardsReaviled: () => boolean;
  hasCardsInHand: (riderId: RiderId) => boolean;
  gameData: Game;
  setGameData: (gameData: Game) => void;
  ridersData: Rider[];
  setRidersData: (ridersData: Rider[]) => void;
  revealAllCards: () => void;
  startNewRound: () => void;
  isLastStep: () => boolean;
  isRiderLocked: (riderId: RiderId) => boolean;
  hasSeletedCard: (riderId: RiderId) => boolean;
  addExhaustionCard: (riderId: RiderId) => void;
  selectCard: (riderId: RiderId, card: number) => void;
  drawCards: (riderId: RiderId) => void;
  getCurrentHand: (riderId: RiderId) => number[];
};

export const RiderCardsContext = createContext<RiderCardsContextType | null>(
  null
);

/**
 * @description
 * The purpouse of this Hook is to have all cards state related actions (logic) in one place
 * The main goal is not to expose state getter and setter directly but via specialized methods which are responsible for state update
 */

export default function RiderCardsContextProvider({
  children,
}: RiderCardsProviderProps) {
  // Context state
  const [gameData, setGameData] = useState<Game>({
    ridersIds: [],
    selectedCardsState: [],
    locked: [],
    cardsAreReaviled: false,
    isPending: false,
  });
  const [ridersData, setRidersData] = useState<Rider[]>([]);

  // Private methods
  const getIndexOfArrayState = (riderId: RiderId): number => {
    return ridersData.findIndex((rider: Rider) => rider.id === riderId);
  };

  // ******************************
  //
  // State shared methods
  //
  // ******************************
  const isLastStep = () =>
    gameData.selectedCardsState.length === ridersData.length;

  const isRiderLocked = (riderId: RiderId) =>
    -1 < gameData.locked.indexOf(riderId);

  const hasSeletedCard = (riderId: RiderId) =>
    -1 < gameData.selectedCardsState.indexOf(riderId);

  const hasCardsInHand = (riderId: RiderId) =>
    getCurrentHand(riderId).length > 0;

  const areCardsReaviled = () => gameData.cardsAreReaviled;
  const revealAllCards = () =>
    setGameData({ ...gameData, cardsAreReaviled: true });

  const getCurrentHand = (riderId: RiderId): number[] =>
    ridersData[getIndexOfArrayState(riderId)].hand;

  const addExhaustionCard = useCallback(
    (riderId: RiderId) => {
      const newRidersData = [...ridersData],
        currentRider = newRidersData[getIndexOfArrayState(riderId)];

      currentRider.stash.push(exhaustionCardValue);

      setRidersData(newRidersData);
    },
    ["riderId"]
  );

  const startNewRound = () => {
    const newGameData = { ...gameData };
    const newRidersData = [...ridersData];

    newGameData.cardsAreReaviled = false;
    newGameData.selectedCardsState.length = 0;
    newGameData.locked.length = 0;

    newRidersData.forEach((rider) => {
      rider.selected.length = 0;
    });

    setGameData(newGameData);
    setRidersData(newRidersData);
  };

  // zmienic nazwe - bo za duzo sie tu dzieje
  const selectCard = (riderId: RiderId, card: number) => {
    const newRidersData = [...ridersData],
      currentGameData = { ...gameData },
      currentRider = newRidersData[getIndexOfArrayState(riderId)],
      cardIndex = currentRider.hand.findIndex((c) => c === card),
      selectedCard = currentRider.hand.splice(cardIndex, 1),
      newStash = currentRider.stash.concat(currentRider.hand.splice(0));

    currentRider.stash = newStash;
    currentRider.selected = selectedCard;

    currentGameData.selectedCardsState.push(riderId);
    currentGameData.locked = [];

    setRidersData(newRidersData);
    setGameData(currentGameData);
  };

  const drawCards = (riderId: RiderId) => {
    let temporaryHand: number[] = [],
      shuffledStash;

    const newRidersData = [...ridersData],
      currentRider = newRidersData[getIndexOfArrayState(riderId)],
      deckLength = currentRider.deck.length,
      stashLength = currentRider.stash.length;

    // Jeśli Deck jest duzy
    if (deckLength >= 4) {
      temporaryHand = currentRider.deck.splice(0, 4);
    } else if (deckLength < 4) {
      // weź pozostałośc deck do ręki
      temporaryHand = temporaryHand.concat(currentRider.deck.splice(0)); // weź wszystko

      // jeśli jest cos w stash to na poczatku potasuj karty
      if (stashLength) {
        // potasuj karty ze stasha
        shuffledStash = shuffle(currentRider.stash);
        // Fullfil Hand up to 4
        temporaryHand = temporaryHand.concat(
          shuffledStash.splice(0, 4 - deckLength)
        );
        currentRider.deck = shuffledStash.splice(0);
      } else {
        currentRider.deck = [];
      }
    }

    if (temporaryHand.length < 1) {
      temporaryHand.push(2);
    }

    currentRider.hand = temporaryHand;

    setRidersData(newRidersData);

    //lockAllRiders
    setGameData({ ...gameData, locked: gameData.ridersIds });
  };

  return (
    <RiderCardsContext.Provider
      value={{
        areCardsReaviled,
        hasCardsInHand,
        gameData,
        setGameData,
        ridersData,
        setRidersData,
        revealAllCards,
        startNewRound,
        isLastStep,
        isRiderLocked,
        hasSeletedCard,
        addExhaustionCard,
        selectCard,
        drawCards,
        getCurrentHand,
      }}
    >
      {children}
    </RiderCardsContext.Provider>
  );
}

//export const RiderCardsContext = () => useContext(RiderCards);
//export default RiderCardsContextProvider;
