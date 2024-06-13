import {
  CheckCircledIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons";
import { Badge, Box, Flex, Text } from "@radix-ui/themes";
import { Rider } from "../lib/types";

type RiderHeaderPanelProps = {
  rider: Rider;
  isAllow: boolean;
  isReady: boolean;
  children: React.ReactNode;
};

export default function RiderHeaderPanel({
  rider,
  isAllow,
  isReady,
  children,
}: RiderHeaderPanelProps) {
  const sizes = { height: 25, width: 25 };

  return (
    <Box>
      <Flex justify="between" align="center">
        <Badge
          size="3"
          style={{ backgroundColor: rider.color, color: "#cfcfcf" }}
        >
          {rider.label}
        </Badge>
        <Text size="2">{`${rider.name}`}</Text>
        {isReady && <CheckCircledIcon {...sizes} color="green" />}
        {isAllow && !isReady && <QuestionMarkCircledIcon {...sizes} />}
        {!isAllow && !isReady && <CrossCircledIcon {...sizes} color="orange" />}
      </Flex>
      {children}
    </Box>
  );
}
