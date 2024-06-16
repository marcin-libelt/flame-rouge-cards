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
import Stats from "./Stats";
import { useState } from "react";

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
  const [penaltyLength, setPenaltyLength] = useState(0);

  const isReady = hasSeletedCard(rider.id);
  const isAllow = rider.allow;
  const boxClass = isAllow ? "card-default" : "card-locked";

  return (
    <Box>
      <Card className={classes[boxClass]}>
        <RiderHeaderPanel rider={rider} isAllow={isAllow} isReady={isReady}>
          <Stats rider={rider} penaltyLength={penaltyLength} />
        </RiderHeaderPanel>
        <RiderCardsPanel
          rider={rider}
          isAllow={isAllow}
          penaltyLength={penaltyLength}
          setPenaltyLength={setPenaltyLength}
          handleDrawCards={handleDrawCards}
          handleSelectCard={handleSelectCard}
        />
      </Card>
    </Box>
  );
}
