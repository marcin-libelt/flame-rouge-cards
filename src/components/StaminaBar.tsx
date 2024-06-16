import { charactersDataObj } from "../lib/config";
import { Flex } from "@radix-ui/themes";
import { RiderType } from "../lib/types";
import classes from "./StaminaBar.module.less";

const colorsSegments = new Map<number, string>([
  [1, "#ff0000"],
  [2, "#ff8600"],
  [3, "#e9cd2c"],
  [4, "#81b328"],
  [5, "#00a900"],
  [6, "#009d00"],
  [7, "#009d00"],
  [8, "#009d00"],
]);
const LIMIT = 8;

export default function StaminaBar({
  type,
  allCards,
}: {
  type: RiderType;
  allCards: number[];
}) {
  const data = charactersDataObj.find((character) => character.code === type);
  if (!data) {
    return;
  }

  const powerLeft = allCards.reduce((accu, curr) => accu + curr, 0);
  const currentPotential = Math.round(powerLeft / allCards.length) - 1;

  return <CustomProgress step={currentPotential} />;
}

function CustomProgress({ step = 1 }: { step: number }) {
  const color = colorsSegments.get(step);

  return (
    <Flex className={classes["potential-graph"]}>
      {Array(step)
        .fill(undefined)
        .map((_, index) => (
          <span
            key={index}
            className={classes.item}
            style={{ backgroundColor: color }}
          ></span>
        ))}
      {Array(LIMIT - step)
        .fill(undefined)
        .map((_, index) => (
          <span key={index} className={classes.item}></span>
        ))}
    </Flex>
  );
}
