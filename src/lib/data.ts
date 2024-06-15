import { getRandomInt } from "./utils";

/** Generates random person name: 'firstname lastname' based on given arrays */
export const getFakeName = () => {
  const firstName = [
    "Adam",
    "Adrien",
    "Alain",
    "Albert",
    "Alexandre",
    "Ambroise",
    "André",
    "Antoine",
    "Apollinaire",
    "Arcadius",
    "Arnaud",
    "Arthur",
    "Auguste",
    "Aurélien",
    "Armand",
    "Adalbert",
    "Basile",
    "Bénédicte",
    "Benoît",
    "Benjamin",
    "Bernard",
    "Blaise",
    "Boris",
    "Bruno",
    "Bastien",
    "Bartholomé",
    "Barthélemy",
    "Barthélémi",
    "César",
    "Cyprien",
    "Cyrille",
    "Camille",
    "Charles",
    "Clément",
    "Conrad",
    "Constantine",
    "Corneille",
    "Christian",
    "Christophe",
    "Damien",
    "Daniel",
    "Darius",
    "David",
    "Denis",
    "Dominique",
    "Edmond",
    "Édouard",
    "Emmanuel",
    "Émile",
    "Ernest",
    "Éric",
    "Eugène",
    "Enzo",
    "Fabien",
    "Fabrice",
    "Félix",
    "Florian",
    "Francis",
    "François",
    "Frédéric",
    "Gabriel",
    "Gilbert",
    "Gregoire",
    "Gilles",
    "Georges",
    "Gaspard",
    "Gaétan",
    "Guillaume",
    "Hippolite",
    "Henri",
    "Horace",
    "Hubert",
    "Hugo",
    "Hugues",
    "Hyacinthe",
    "Ignace",
    "Igor",
    "Jacob",
    "Jacques",
    "Jean",
    "Jérémy",
    "Joachim",
    "Jonathan",
    "Joseph",
    "Julien",
    "Jules",
    "Jérôme",
    "Léon",
    "Léonard",
    "Lucien",
    "Lou",
    "Louis",
    "Luc",
    "Lucas",
    "Laurent",
    "Matthias",
    "Maxime",
    "Maximilien",
    "Marcel",
    "Martin",
    "Marc",
    "Marian",
    "Marius",
    "Mathieu",
    "Maurice",
    "Michel",
    "Nicolas",
    "Noël",
    "Nicodème",
    "Olaf",
    "Olivier",
    "Oscar",
    "Patrick",
    "Paul",
    "Pierre",
    "Philippe",
    "Raphaël",
    "Raymond",
    "Rémi",
    "Robert Roch",
    "Roland",
    "Romain",
    "Roméo",
    "Richard",
    "Samuel",
    "Sébastien",
    "Simon",
    "Thaddee",
    "Théodore",
    "Théo",
    "Thierry",
    "Théophile",
    "Théo",
    "Tobias",
    "Thomas",
    "Timon",
    "Timothée",
    "Valentin",
    "Valéry",
    "Vincent",
    "Victor",
    "Xavier",
  ];
  const lastName = [
    "Martin",
    "Bernard",
    "Robert",
    "Richard",
    "Durand",
    "Dubois",
    "Moreau",
    "Simon",
    "Laurent",
    "Michel",
    "Garcia",
    "Thomas",
    "Leroy",
    "David",
    "Morel",
    "Roux",
    "Fournier",
    "Girard",
    "Lambert",
    "Mercier",
    "Blanc",
    "Lefebvre",
    "Dupont",
    "Faure",
    "Bertrand",
    "Morin",
    "Garnier",
    "Nicolas",
    "Marie",
    "Rousseau",
    "Bonnet",
    "Vincent",
    "Henry",
    "Masson",
    "Robin",
    "Martinez",
    "Boyer",
    "Muller",
    "Denis",
    "Chevalier",
    "Lemaire",
    "Meyer",
    "Blanchard",
    "Dufour",
    "Vidal",
    "Gauthier",
    "Perez",
    "Fontaine",
    "Perrin",
    "Joly",
    "Jean",
    "Da silva",
    "Gautier",
    "Roche",
    "Mathieu",
    "Pereira",
    "Roussel",
    "Guerin",
  ];

  const getName = (data: string[]) => data[getRandomInt(data.length)]; // zero based index

  return `${getName(firstName)} ${getName(lastName)}`;
};