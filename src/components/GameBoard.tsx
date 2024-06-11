import { Button, Flex } from "@radix-ui/themes";

import * as Accordion from "@radix-ui/react-accordion";
import { useRiderCardsContext } from "../lib/hooks";
import { Rider } from "../lib/types";

export default function GameBoard() {
  const {
    ridersData,
    isRiderLocked,
    drawCards,
    getCurrentHand,
    hasCardsInHand,
  } = useRiderCardsContext();

  return (
    <Accordion.Root type="single" onValueChange={(id) => console.log(id)}>
      {ridersData.map((rider: Rider) => {
        const isLocked = isRiderLocked(rider.id);
        return (
          <Accordion.Item value={rider.id} key={rider.id} disabled={isLocked}>
            <Accordion.Header>
              <Flex justify="between">
                {`${rider.name} - ${rider.label}`}
                <Accordion.Trigger>
                  <span>open</span>
                </Accordion.Trigger>
              </Flex>
            </Accordion.Header>
            <Accordion.Content>
              {!hasCardsInHand(rider.id) && (
                <Button onClick={() => drawCards(rider.id)}>Draw Cards</Button>
              )}

              <Flex gapX="2">
                {getCurrentHand(rider.id).map((num) => (
                  <Button variant="soft">{num}</Button>
                ))}
              </Flex>
            </Accordion.Content>
          </Accordion.Item>
        );
      })}
    </Accordion.Root>
  );
}
