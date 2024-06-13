import { Box, Flex, Progress, Text } from "@radix-ui/themes";
import { Rider } from "../lib/types";

export default function Stats({ rider }: { rider: Rider }) {
  const { deck, stash, hand, penalty } = rider;
  const allCardsLimit = [...deck, ...stash, ...hand].length;
  const deckPercent = Math.ceil(
    ([...deck, ...hand].length * 100) / allCardsLimit
  );

  let penaltyPercent = Math.ceil((penalty * 100) / allCardsLimit);
  penaltyPercent = penaltyPercent >= 100 ? 100 : penaltyPercent;

  return (
    <Box my="4">
      <Flex align="center" gapX="1">
        <Text as="div" size="1">{`Exhaustion (${penalty})`}</Text>
        <Progress value={penaltyPercent} size="1" />
        <Text as="div" size="1">{`All (${allCardsLimit})`}</Text>
      </Flex>

      <Flex align="center" gapX="1">
        <Text as="div" size="1">{`Deck`}</Text>
        <Progress value={deckPercent} size="1" />
        <Text as="div" size="1">{`Stash`}</Text>
      </Flex>
    </Box>
  );
}
