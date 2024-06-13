import { Box, Card, Flex, Heading } from "@radix-ui/themes";
import { useRiderCardsContext } from "../lib/hooks";
import { Rider } from "../lib/types";
import RiderHeaderPanel from "./RiderHeaderPanel";

export default function List() {
  const { ridersData } = useRiderCardsContext();

  if (!ridersData.length) {
    return "";
  }

  return (
    <Box mb="6">
      <Heading as="h3" mb="4">
        Start list
      </Heading>
      <Flex gap="2" direction="column">
        {ridersData.map((rider: Rider) => (
          <Card key={rider.id}>
            <RiderHeaderPanel
              rider={rider}
              isAllow={true}
              isReady={false}
              children={undefined}
            ></RiderHeaderPanel>
          </Card>
        ))}
      </Flex>
    </Box>
  );
}
