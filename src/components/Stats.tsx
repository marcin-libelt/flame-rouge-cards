import { Badge, Box, Flex, Separator, Text } from "@radix-ui/themes";
import { Rider } from "../lib/types";
import StaminaBar from "./StaminaBar";

export default function Stats({ rider }: { rider: Rider }) {
  const { deck, stash, hand, penalty } = rider;
  const allCards = [...deck, ...stash, ...hand];

  return (
    <Box my="4">
      <Flex align="center" gapX="1">
        <Text as="div" size="1">{`Power:`}</Text>
        <StaminaBar type={rider.type} cards={allCards} />
        <Separator orientation="vertical" size="1" />
        <Text as="div" size="1">{`Cards:`}</Text>
        <Badge size="1">{allCards.length}</Badge>
        <Badge size="1" color="crimson">
          {penalty}
        </Badge>
      </Flex>
    </Box>
  );
}
