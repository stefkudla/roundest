import type { NextPage } from "next";
import { trpc } from "@/utils/trpc";
import { getOptionsForVote } from "@/utils/getRandomPokemon";

const Home: NextPage = () => {
  const [first, second] = getOptionsForVote();
  return (
    <div className="h-screen w-creen flex flex-col justify-center items-center">
      <div className="text-2xl text-center">Which Pokemon is Rounder?</div>
      <div className="p-2" />
      <div className="border rounded p-8 flex justify-between max-w-2xl items-center">
        <div className="w-16 h-16 bg-red-200">{first}</div>
        <div className="p-8">Vs</div>
        <div className="w-16 h-16 bg-red-200">{second}</div>
      </div>
    </div>
  );
};

export default Home;
