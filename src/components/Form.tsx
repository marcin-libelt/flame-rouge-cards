import { charactersDataObj } from "../lib/config";
import { useRiderCardsContext } from "../lib/hooks";
import { Rider, RiderType } from "../lib/types";
import { v4 as uuidv4 } from "uuid";
import { RIDERS_LIMIT } from "../lib/config";
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  TextField,
  Text,
} from "@radix-ui/themes";
import { shuffle } from "../lib/utils";
import { useState } from "react";
import RiderColorsSelector from "./RiderColorsSelector";
import classes from "./Form.module.less";

export default function Form() {
  const { setRidersData, ridersData } = useRiderCardsContext();
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const isDisabled = ridersData.length >= RIDERS_LIMIT;

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
      setName("");
      setColor("");
    }
  };

  return (
    <Card className={classes.form} size="2">
      <Heading as="h3" mb="4">
        Registration is open
      </Heading>

      <Card>
        <Heading as="h3" size="3" mb="2">
          Register form
        </Heading>
        <Flex direction="column" gapX="2">
          <Box>
            <label>
              <Text size="2">Enter rider name</Text>
              <TextField.Root
                variant="surface"
                placeholder="Enter rider name"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
                mb="4"
              />
            </label>
          </Box>

          <Box>
            <label>
              <Text size="2">Choose color</Text>
              <RiderColorsSelector selected={color} setColor={setColor} />
            </label>
          </Box>

          <Box>
            <label>
              <Text size="2">Choose rider type</Text>
              <Flex gap="4" mb="2" justify="between">
                <Button
                  variant="classic"
                  onClick={() => addRider("rouler")}
                  disabled={isDisabled}
                >
                  Add new Rouler
                </Button>

                <Button
                  onClick={() => addRider("sprinter")}
                  disabled={isDisabled}
                >
                  Add new Sprinter
                </Button>
              </Flex>
            </label>
          </Box>
        </Flex>
      </Card>
    </Card>
  );
}
