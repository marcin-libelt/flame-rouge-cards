import { RiderColor } from "./types";

export const charactersDataObj = [
  {
    code: "rouler",
    label: "Rouler",
    deck: [3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7], // stamina: 75
    staminaIndex: 75,
    image: "./../assets/images/donald.png",
  },
  {
    code: "sprinter",
    label: "Sprinter",
    deck: [2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 9, 9, 9], // stamina: 69
    staminaIndex: 69,
    image: "./../assets/images/micky.png",
  },
];

export const exhaustionCardValue = 2;

export const RIDERS_LIMIT = 4;

export const riderColors: RiderColor[] = [
  {
    name: "white",
    value: "#FFFFFF",
  },
  {
    name: "black",
    value: "#000000",
  },
  {
    name: "green",
    value: "#1b971b",
  },
  {
    name: "red",
    value: "#db2524",
  },
  {
    name: "blue",
    value: "#4949c5",
  },
  {
    name: "pink",
    value: "#ff8bc7",
  },
];
