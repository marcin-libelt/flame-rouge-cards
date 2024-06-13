import {
  CheckCircledIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons";
import { Flex, Text } from "@radix-ui/themes";
import { Rider } from "../lib/types";
import { useRiderCardsContext } from "../lib/hooks";

export default function RiderHeaderPanel({
  rider,
  isAllow,
}: {
  rider: Rider;
  isAllow: boolean;
}) {
  const { hasSeletedCard } = useRiderCardsContext();

  const id = rider.id;
  const sizes = { height: 25, width: 25 };

  return (
    <Flex justify="between" align="center">
      <Text size="2">{`${rider.name}`}</Text>

      {hasSeletedCard(id) && <CheckCircledIcon {...sizes} color="green" />}
      {isAllow && !hasSeletedCard(id) && <QuestionMarkCircledIcon {...sizes} />}
      {!isAllow && !hasSeletedCard(id) && (
        <CrossCircledIcon {...sizes} color="orange" />
      )}
    </Flex>
  );
}
