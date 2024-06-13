import {
  BoardRider,
  HandleDrawCardsProps,
  HandleSelectCardProps,
  Rider,
} from "../lib/types";
import { Box, Card } from "@radix-ui/themes";
import RiderCardsPanel from "./RiderCardsPanel";
import RiderHeaderPanel from "./RiderHeaderPanel";
type RiderPanelProps = {
  rider: Rider & BoardRider;
  handleDrawCards: HandleDrawCardsProps;
  handleSelectCard: HandleSelectCardProps;
};

export default function RiderPanel({
  rider,
  handleDrawCards,
  handleSelectCard,
}: RiderPanelProps) {
  const isAllow = rider.allow;

  return (
    <Box>
      <Card>
        <RiderHeaderPanel rider={rider} isAllow={isAllow} />
        <RiderCardsPanel
          rider={rider}
          isAllow={isAllow}
          handleDrawCards={handleDrawCards}
          handleSelectCard={handleSelectCard}
        />
      </Card>
    </Box>
  );
}
