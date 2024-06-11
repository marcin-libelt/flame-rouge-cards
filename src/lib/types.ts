export type RiderId = string;

export type RiderType = "rouler" | "sprinter";

export type Rider = {
  id: RiderId;
  name: string;
  type: RiderType;
  label: string;
  deck: number[];
  hand: number[];
  stash: number[];
  selected: number[];
};

export type Game = {
  ridersIds: string[];
  selectedCardsState: string[];
  locked: string[];
  cardsAreReaviled: boolean;
  isPending: boolean;
};
