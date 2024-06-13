import { Flex } from "@radix-ui/themes";
import { riderColors } from "../lib/config";
import { CheckIcon } from "@radix-ui/react-icons";
import classes from "./RiderColorsSelector.module.less";

export default function RiderColorsSelector({
  selected,
  setColor,
}: {
  selected: string;
  setColor: (color: string) => void;
}) {
  return (
    <Flex mb="4" gap="2">
      {riderColors.map(({ name, value }: { name: string; value: string }) => (
        <button
          key={name}
          style={{ backgroundColor: value }}
          onClick={() => setColor(value)}
          className={classes.item}
        >
          {selected === value && (
            <CheckIcon
              width="25"
              height="25"
              className={classes[name === "white" ? "icon-reverse" : "icon"]}
            />
          )}
        </button>
      ))}
    </Flex>
  );
}
