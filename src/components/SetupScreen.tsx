import List from "./List";
import Form from "./Form";
import { Heading } from "@radix-ui/themes";

export default function SetupScreen() {
  return (
    <>
      <Heading as="h2">List</Heading>
      <List />
      <Heading as="h2">Form</Heading>
      <Form />
    </>
  );
}
