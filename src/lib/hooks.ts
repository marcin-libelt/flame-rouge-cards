import { useContext } from "react";
import { RiderCardsContext } from "../context/RiderCardsContextProvider";

export function useRiderCardsContext() {
  const context = useContext(RiderCardsContext);
  if (!context) {
    throw new Error(
      "useRiderCardsContext must be used within a RiderCardsContextProvider"
    );
  }
  return context;
}
