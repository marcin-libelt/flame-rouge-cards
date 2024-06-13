import { Button, Box } from "@radix-ui/themes";

type PlayerCard = {
  isReaviled?: boolean;
  onClick?: () => void;
  variant?: "penalty" | "default";
  children: React.ReactNode;
};
export default function PlayerCard({
  isReaviled = false,
  onClick = () => {},
  variant = undefined,
  children,
}: PlayerCard) {
  const color = variant === "penalty" ? "red" : undefined;

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
