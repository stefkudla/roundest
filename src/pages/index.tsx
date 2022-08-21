import type { NextPage } from "next";
import { trpc } from "@/utils/trpc";
import { getOptionsForVote } from "@/utils/getRandomPokemon";
import { useState } from "react";
import Image from "next/image";

const Home: NextPage = () => {
  const [ids, updateIds] = useState(getOptionsForVote());

  const [first, second] = ids;

  const firstPokemon = trpc.useQuery(["get-pokemon-by-id", { id: first }]);
  const secondPokemon = trpc.useQuery(["get-pokemon-by-id", { id: second }]);

  if (firstPokemon.isLoading || secondPokemon.isLoading) return null;

  return (
    <div className="h-screen w-creen flex flex-col justify-center items-center">
      <div className="text-2xl text-center">Which Pokemon is Rounder?</div>
      <div className="p-2" />
      <div className="border rounded p-8 flex justify-between max-w-2xl items-center">
        <div className="relative w-64 h-64 flex flex-col-reverse ">
          <Image src={firstPokemon.data?.sprites.front_default} layout="fill" />
          <div className="text-xl text-center capitalize">
            {firstPokemon.data.name}
          </div>
        </div>
        <div className="p-8">Vs</div>
        <div className="relative w-64 h-64 flex flex-col-reverse">
          <Image
            src={secondPokemon.data?.sprites.front_default}
            layout="fill"
          />
          <div className="text-xl text-center capitalize">
            {secondPokemon.data.name}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
