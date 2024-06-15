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
  const potentialPowerIndex =
    (cards.reduce((accu, curr) => accu + curr, 0) / cards.length) * 9 || 0;

  return <Progress value={potentialPowerIndex} />;
}
