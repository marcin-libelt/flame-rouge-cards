import { charactersDataObj } from "../lib/config";
import { useRiderCardsContext } from "../lib/hooks";
import { Rider, RiderType } from "../lib/types";
import { v4 as uuidv4 } from "uuid";
import {
  Card,
  Heading,
  Text,
  Grid,
  Separator,
  Box,
  Button,
  Flex,
  Switch,
} from "@radix-ui/themes";
import { shuffle } from "../lib/utils";
import { useState } from "react";
import classes from "./Form.module.less";
import RiderSelection from "./RiderSelection";
import { RocketIcon } from "@radix-ui/react-icons";
import { getFakeName } from "../lib/data";

type initialGameValueType = { [k: string]: string[] };
const initialValue: initialGameValueType = {
  rouler: [],
  sprinter: [],
};

export default function Form() {
  const { setRidersData, setGameData, gameData } = useRiderCardsContext();
  const [pairSelecting, setPairSelecting] = useState(true);
  const [ridersEnroll, setRidersEnroll] = useState(initialValue);

  const ifSomeEnrolled = () => {
    return Object.keys(ridersEnroll).reduce(
      (accu, curr) => accu + ridersEnroll[curr].length,
      0
    );
  };

  const enrollLength = ifSomeEnrolled();
  const isDisabled = !enrollLength;

  const handleColorSelect = (color: string, type: RiderType) => {
    if (pairSelecting) {
      const keys = Object.keys(ridersEnroll);
      const newEnroll: initialGameValueType = {};
      // check first item only
      if (ridersEnroll[keys[0]].includes(color)) {
        for (const d of keys) {
          const filtered = ridersEnroll[d].filter((col) => col !== color);
          newEnroll[d] = filtered;
        }
      } else {
        for (const d of keys) {
          newEnroll[d] = [...ridersEnroll[d], color];
        }
      }
      setRidersEnroll(newEnroll);
    } else {
      if (ridersEnroll[type].includes(color)) {
        const filtered = ridersEnroll[type].filter((col) => col !== color);
        setRidersEnroll({ ...ridersEnroll, [type]: filtered });
      } else {
        setRidersEnroll({
          ...ridersEnroll,
          [type]: [...ridersEnroll[type], color],
        });
      }
    }
  };

  const startGame = () => {
    // TODO: get unique and random names for riders
    // example: const randomNames = generateUniqueAndRandomNames(enrollLength)

    const registeredRiders: Rider[] = [];
    Object.keys(ridersEnroll).forEach((type) => {
      const data = charactersDataObj.find(
        (character) => character.code === type
      );

      if (data) {
        ridersEnroll[type].forEach((color) => {
          registeredRiders.push({
            id: uuidv4(),
            name: getFakeName(),
            type: type as RiderType,
            color: color,
            label: data.label,
            deck: shuffle([...data.deck]),
            hand: [],
            stash: [],
            selected: [],
            penalty: 0,
          });
        });
      }
    });

    setRidersData(registeredRiders);
    setGameData({ ...gameData, isPending: true });
  };

  return (
    <Card className={classes.form} size="2">
      <Heading as="h3" mb="4">
        Registration is open
      </Heading>
      <Card mb="5">
        <Heading as="h3" size="3" mb="1">
          Register form
        </Heading>
        <Box mb="2">
          <Text size="2" as="div">
            Compose your dream team
          </Text>
          <Text size="1">Select all at once and click button below.</Text>
        </Box>
        {true && (
          <Grid columns="2fr 0.2fr 2fr" align="center">
            <RiderSelection
              type="rouler"
              onColorSelect={(color) => handleColorSelect(color, "rouler")}
              selection={ridersEnroll["rouler"]}
            />
            <Separator
              orientation="vertical"
              size="3"
              style={{ justifySelf: "center" }}
            />
            <RiderSelection
              type="sprinter"
              onColorSelect={(color) => handleColorSelect(color, "sprinter")}
              selection={ridersEnroll["sprinter"]}
            />
          </Grid>
        )}
        <Flex justify="center" gap="2" mt="2">
          <Text as="div" align="center" size="1">
            I am usung as a pair
          </Text>
          <Switch
            size="1"
            defaultChecked
            checked={pairSelecting}
            onCheckedChange={setPairSelecting}
          />
        </Flex>
      </Card>
      <Flex justify="center">
        <Button
          size="4"
          variant="classic"
          color="tomato"
          disabled={isDisabled}
          onClick={startGame}
        >
          <RocketIcon width="20" height="20" />
          Start the race!
        </Button>
      </Flex>
    </Card>
  );
}
