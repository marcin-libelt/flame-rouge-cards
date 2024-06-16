import { Button, Box } from "@radix-ui/themes";

type PlayerCard = {
  isReaviled?: boolean;
  onClick?: () => void;
  color?: "green" | "red" | undefined;
  children: React.ReactNode;
};
export default function PlayerCard({
  onClick = () => {},
  color = undefined,
  children,
}: PlayerCard) {
  return (
    <Button
      color={color}
      variant="soft"
      asChild={true}
      size={"3"}
      onClick={onClick}
      style={{ aspectRatio: 0.7, height: "auto" }}
    >
      <Box>{children}</Box>
    </Button>
  );
}
