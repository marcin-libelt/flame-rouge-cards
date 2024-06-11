import { useRiderCardsContext } from "../lib/hooks";
import { Rider } from "../lib/types";

export default function List() {
  const { ridersData } = useRiderCardsContext();

  return (
    <ul>
      {ridersData.map((rider: Rider) => (
        <RiderItem key={rider.id} rider={rider} />
      ))}
    </ul>
  );
}

function RiderItem({ rider }: { rider: Rider }) {
  const { name, label } = rider;
  return <li>{`${name} - ${label}`}</li>;
}
