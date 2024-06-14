import { riderColors } from "../lib/config";
import { CheckIcon } from "@radix-ui/react-icons";
import classes from "./RiderColorsSelector.module.less";
import { RiderColor } from "../lib/types";

type RiderColorsSelector = {
  selection: string[];
  onColorSelect: (color: string) => void;
};
export default function RiderColorsSelector({
  selection,
  onColorSelect,
}: RiderColorsSelector) {
  return (
    <>
      {riderColors.map(({ name, value }: RiderColor) => (
        <button
          key={name}
          style={{ backgroundColor: value }}
          onClick={() => onColorSelect(value)}
          className={classes.item}
        >
          {selection.includes(value) && (
            <CheckIcon
              width="25"
              height="25"
              className={classes[name === "white" ? "icon-reverse" : "icon"]}
            />
          )}
        </button>
      ))}
    </>
  );
}
