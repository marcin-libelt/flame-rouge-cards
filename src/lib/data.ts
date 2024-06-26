import { getRandomInt } from "./utils";

const popularneImionaMeske = [
  "James",
  "John",
  "Robert",
  "Michael",
  "William",
  "David",
  "Richard",
  "Joseph",
  "Charles",
  "Thomas",
  "Christopher",
  "Daniel",
  "Matthew",
  "Anthony",
  "Mark",
  "Donald",
  "Steven",
  "Paul",
  "Andrew",
  "Joshua",
  "Kevin",
  "Brian",
  "George",
  "Edward",
  "Ronald",
  "Timothy",
  "Jason",
  "Jeffrey",
  "Ryan",
  "Jacob",
  "Gary",
  "Nicholas",
  "Eric",
  "Jonathan",
  "Stephen",
  "Larry",
  "Justin",
  "Scott",
  "Brandon",
  "Benjamin",
  "Samuel",
  "Frank",
  "Gregory",
  "Raymond",
  "Alexander",
  "Patrick",
  "Jack",
  "Dennis",
  "Jerry",
  "Tyler",
];
const polskieProduktySpozywcze = [
  "Chlebek",
  "Mlekczko",
  "Serek",
  "Masełko",
  "Kaszanka",
  "Kotlet",
  "Jajeczko",
  "Kalarepa",
  "Makaron",
  "Cukier",
  "Ziemniak",
  "Marchew",
  "Pomidor",
  "Ogórek",
  "Sałata",
  "Cebula",
  "Czosnek",
  "Papryka",
  "Burak",
  "Szpinak",
  "Rzodkiewka",
  "Groszek",
  "Kalarior",
  "Kukurydza",
  "Fasolka",
  "Migdał",
  "Pieprz",
  "Czekolada",
  "Waflel",
  "Precel",
  "Jogurt",
  "Keczup",
  "Majonez",
  "Musztarda",
  "Marmolada",
  "Piwo",
  "Wódka",
  "Bułka",
  "Rogal",
  "Ciasteczko",
  "Galaretka",
  "Pudding",
  "Sernik",
  "Keks",
  "Owsianka",
  "Pieróg",
  "Serwatka",
  "Twaróg",
  "Kefir",
  "Śmietana",
  "Kiełbasa",
  "Pieróg",
  "Bigos",
  "Żurek",
  "Gołąbek",
  "Flak",
  "Barszcz",
  "Kiełbasa",
  "Placek",
  "Kluska",
  "Gulasz",
  "Pasztet",
  "Kopytko",
  "Sernik",
  "Makowiec",
  "Zraz",
  "Krupnik",
  "Fasolka",
  "Rosół",
  "Naleśnik",
  "Pyza",
];

/** Generates random person name: 'firstname lastname' based on given arrays */
export const getFakeName = () => {
  const getName = (data: string[]) => data[getRandomInt(data.length)]; // zero based index

  return `${getName(popularneImionaMeske)} ${getName(
    polskieProduktySpozywcze
  )}`;
};
