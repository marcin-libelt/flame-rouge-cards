import {
  CheckCircledIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons";
import { Badge, Box, Flex, Text } from "@radix-ui/themes";
import { Rider } from "../lib/types";
import Stats from "./Stats";

type RiderHeaderPanelProps = {
  rider: Rider;
  isAllow: boolean;
  isReady: boolean;
};

export default function RiderHeaderPanel({
  rider,
  isAllow,
  isReady,
}: RiderHeaderPanelProps) {
  const sizes = { height: 25, width: 25 };

  return (
    <>
      <Box>
        <Flex justify="between" align="center">
          <Badge color="crimson" size="3">
            {rider.label}
          </Badge>
          <Text size="2">{`${rider.name}`}</Text>
          {isReady && <CheckCircledIcon {...sizes} color="green" />}
          {isAllow && !isReady && <QuestionMarkCircledIcon {...sizes} />}
          {!isAllow && !isReady && (
            <CrossCircledIcon {...sizes} color="orange" />
          )}
        </Flex>
      </Box>
      <Stats rider={rider} />
    </>
  );
}
