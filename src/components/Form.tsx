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

// todo rename that interface name
interface ObjectLiteral {
  [key: string]: string[];
}

const generateInitialValue = () => {
  const result: ObjectLiteral = {};
  for (const riderCfg of charactersDataObj) {
    result[riderCfg.code] = [];
  }
  return result;
};
const initialValue = generateInitialValue();

export default function Form() {
  const { setRidersData, ridersData } = useRiderCardsContext();
  const [pairSelecting, setPairSelecting] = useState(true);
  const [ridersEnroll, setRidersEnroll] = useState(initialValue);

  const ifSomeEnrolled = () => {
    return Object.keys(ridersEnroll).reduce(
      (accu, curr) => accu + ridersEnroll[curr].length,
      0
    );
  };
  const isDisabled = !ifSomeEnrolled();

  const handleColorSelect = (color: string, type: RiderType) => {
    if (pairSelecting) {
      const keys = Object.keys(ridersEnroll);
      const newEnroll: ObjectLiteral = {};
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

  const addRider = async (type: RiderType): Promise<void> => {
    if (!color) {
      alert("Please specify color at least");
      return;
    }

    const data = charactersDataObj.find((character) => character.code === type);

    if (data) {
      // const response = await fetch(
      //   "https://api.parser.name/?api_key=65ae76a9a472817634b02508d964689e&endpoint=generate&gender=m&country_code=DE"
      // );
      // const person = await response.json();
      // if (!person.error) {
      //   name = `${person.data[0].name.firstname.name} ${person.data[0].name.lastname.name}`;
      // }

      const newPlayer: Rider = {
        id: uuidv4(),
        name: name || "Jan Kowalski",
        type: type,
        color: color,
        label: data.label,
        deck: shuffle([...data.deck]),
        hand: [],
        stash: [],
        selected: [],
        penalty: 0,
      };

      setRidersData([...ridersData, newPlayer]);
    }
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
        <Button size="4" disabled={isDisabled}>
          <RocketIcon width="20" height="20" />
          Start the race!
        </Button>
      </Flex>
    </Card>
  );
}
