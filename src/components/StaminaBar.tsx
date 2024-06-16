import { charactersDataObj } from "../lib/config";
import { Progress } from "@radix-ui/themes";
import { RiderType } from "../lib/types";

export default function StaminaBar({
  type,
  cards,
}: {
  type: RiderType;
  cards: number[];
}) {
  const data = charactersDataObj.find((character) => character.code === type);
  if (!data) {
    return;
  }

  const powerLimit = data.powerIndex;
  const powerLeft = cards.reduce((accu, curr) => accu + curr, 0);
  let currentPower = (powerLeft * 100) / powerLimit;

  if (currentPower > 100) {
    currentPower = 100;
  } else if (currentPower < 0) {
    currentPower = 0;
  }

  return <Progress value={currentPower} />;
}
