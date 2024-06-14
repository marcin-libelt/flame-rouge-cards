import { Badge, Box, Grid } from "@radix-ui/themes";
import RiderColorsSelector from "./RiderColorsSelector";
import { RiderType } from "../lib/types";
import { charactersDataObj } from "../lib/config";

export default function RiderSelection({
  type,
  onColorSelect,
  selection,
}: {
  type: RiderType;
  onColorSelect: (color: string) => void;
  selection: string[];
}) {
  const rider = charactersDataObj.find((riderCfg) => riderCfg.code === type);

  if (!rider) {
    return;
  }

  return (
    <Box>
      <Badge
        size="3"
        mb="3"
        style={{ width: "100%", textAlign: "center", display: "block" }}
      >
        {rider.label}
      </Badge>
      <Grid columns="2" gap="3" rows="repeat(2, 64px)" width="auto">
        <RiderColorsSelector
          onColorSelect={onColorSelect}
          selection={selection}
        />
      </Grid>
    </Box>
  );
}
