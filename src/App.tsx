import { Button, Center, Heading, Text, VStack } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useLocalStorage } from "./hooks/useLocalStorage";

export default function App() {
  const today = dayjs();
  const timeLeft = today.diff("2022-12-31", "days") * -1;

  const [user, setUser] = useLocalStorage<string>("user", "");

  function handleUpdate() {
    fetch("https://api.github.com/users/fernandobelotto")
      .then((res) => res.json())
      .then((res) => setUser(JSON.stringify(res)));
  }

  let public_repos;
  let reposLeft;
  let percentage;
  let reposPerDay;
  if (user) {
    public_repos = JSON.parse(user).public_repos;
    reposLeft = 1000 - public_repos;
    percentage = (reposLeft / 1000) * 100;
    reposPerDay = reposLeft / timeLeft
  }

  return (
    <Center h="100vh">
      <VStack spacing={5} alignItems='flex-start'>
        <Heading fontSize="6xl">1000 Repos Challenge</Heading>
        <Text fontSize="4xl">
          Repos Cout: {public_repos ? public_repos : "no value founded"}{" "}
        </Text>

        <Text fontSize="4xl" bg='gray.700' paddingX='3' rounded='lg' color='white'>
          Repos left: {reposLeft ? reposLeft : "no value founded"} ={" "}
          {percentage ? percentage + "%" : ""}
        </Text>

        <Text fontSize="4xl">Time Left: {timeLeft}</Text>

        <Text fontSize="4xl">
          Repos per day: {reposPerDay ? reposPerDay.toFixed() : ""}
        </Text>

        <Button onClick={handleUpdate}>Update</Button>
      </VStack>
    </Center>
  );
}
