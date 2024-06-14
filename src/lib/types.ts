export type RiderId = string;

export type RiderType = "rouler" | "sprinter";
export type RiderColors = "white" | "black" | "red" | "green" | "blue" | "pink";

export type RiderColor = {
  name: RiderColors;
  value: string;
};

export type Rider = {
  id: RiderId;
  name: string;
  type: RiderType;
  color: string;
  label: string;
  deck: number[];
  hand: number[];
  stash: number[];
  selected: number[];
  penalty: number;
};

export type Game = {
  ridersIds: string[];
  selectedCardsState: string[];
  locked: string[];
  cardsAreReaviled: boolean;
  isPending: boolean;
};

export type BoardRider = {
  riderId: RiderId;
  allow: boolean;
  completed: boolean;
};

export type HandleSelectCardProps = (riderId: RiderId, num: number) => void;
export type HandleDrawCardsProps = (riderId: RiderId) => void;
