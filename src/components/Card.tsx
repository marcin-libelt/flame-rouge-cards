import { Button, Box } from "@radix-ui/themes";

type PlayerCard = {
  isReaviled?: boolean;
  onClick?: () => void;
  color?: "green" | "red" | undefined;
  children: React.ReactNode;
};
export default function PlayerCard({
  isReaviled = false,
  onClick = () => {},
  color = undefined,
  children,
}: PlayerCard) {
  return (
    <Button
      color={color}
      variant="soft"
      asChild={true}
      size={isReaviled ? "4" : "2"}
      onClick={onClick}
    >
      <Box>{children}</Box>
    </Button>
  );
}
