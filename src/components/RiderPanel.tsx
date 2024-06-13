import {
  BoardRider,
  HandleDrawCardsProps,
  HandleSelectCardProps,
  Rider,
} from "../lib/types";
import { Box, Card } from "@radix-ui/themes";
import RiderCardsPanel from "./RiderCardsPanel";
import RiderHeaderPanel from "./RiderHeaderPanel";
import classes from "./RiderPanel.module.less";
import { useRiderCardsContext } from "../lib/hooks";

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
  const { hasSeletedCard } = useRiderCardsContext();

  const isReady = hasSeletedCard(rider.id);
  const isAllow = rider.allow;

  let boxClass = isAllow ? "card-default" : "card-locked";
  boxClass = "";

  return (
    <Box>
      <Card className={classes[boxClass]}>
        <RiderHeaderPanel rider={rider} isAllow={isAllow} isReady={isReady} />
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
