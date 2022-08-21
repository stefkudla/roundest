import type { NextPage } from "next";
import { trpc } from "@/utils/trpc";
import { getOptionsForVote } from "@/utils/getRandomPokemon";
import { useState } from "react";
import Image from "next/image";

const btn =
  "inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";

const Home: NextPage = () => {
  const [ids, updateIds] = useState(getOptionsForVote());

  const [first, second] = ids;

  const firstPokemon = trpc.useQuery(["get-pokemon-by-id", { id: first }]);
  const secondPokemon = trpc.useQuery(["get-pokemon-by-id", { id: second }]);

  if (firstPokemon.isLoading || secondPokemon.isLoading) return null;

  const voteForRoundest = (selected: number) => {
    // todo: fire mutations to persist changes

    updateIds(getOptionsForVote());
  };

  return (
    <div className="h-screen w-creen flex flex-col justify-center items-center">
      <div className="text-2xl text-center">Which Pokemon is Rounder?</div>
      <div className="p-2" />
      <div className="border rounded p-8 flex justify-between max-w-2xl items-center">
        <div className="w-64 h-64 flex flex-col items-center">
          <div className="relative w-60 h-60">
            <Image
              src={firstPokemon.data?.sprites.front_default}
              layout="fill"
            />
          </div>
          <div className="text-xl text-center capitalize">
            {firstPokemon.data.name}
          </div>
          <button onClick={() => voteForRoundest(first)} className={btn}>
            Rounder
          </button>
        </div>
        <div className="p-8">Vs</div>
        <div className="w-64 h-64 flex flex-col items-center">
          <div className="relative w-60 h-60">
            <Image
              src={secondPokemon.data?.sprites.front_default}
              layout="fill"
            />
          </div>
          <div className="text-xl text-center capitalize">
            {secondPokemon.data.name}
          </div>
          <button onClick={() => voteForRoundest(first)} className={btn}>
            Rounder
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
