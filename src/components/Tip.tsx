import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Flex, Text } from "@radix-ui/themes";
import React from "react";

export default function Tip({ children }: { children: React.ReactNode }) {
  return (
    <Flex gapX="1">
      <InfoCircledIcon width={14} height={14} />
      <Text size="1" color="gray">
        {children}
      </Text>
    </Flex>
  );
}
