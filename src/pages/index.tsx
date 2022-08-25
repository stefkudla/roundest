import type { NextPage } from "next";
import { trpc } from "@/utils/trpc";
import { getOptionsForVote } from "@/utils/getRandomPokemon";
import { useState } from "react";
import type React from "react";
import Image from "next/image";
import { inferQueryResponse } from "./api/trpc/[trpc]";

const btn =
  "inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";

const Home: NextPage = () => {
  const [ids, updateIds] = useState(getOptionsForVote());

  const [first, second] = ids;

  if (!first || !second) return null;

  const firstPokemon = trpc.useQuery(["get-pokemon-by-id", { id: first }]);
  const secondPokemon = trpc.useQuery(["get-pokemon-by-id", { id: second }]);

  const voteForRoundest = (selected: number) => {
    // todo: fire mutations to persist changes

    updateIds(getOptionsForVote());
  };

  return (
    <div className="h-screen w-creen flex flex-col justify-center items-center">
      <div className="text-2xl text-center">Which Pokemon is Rounder?</div>
      <div className="py-8" />
      <div className="w-full max-w-3xl mx-auto h-64 p-8 flex justify-between items-center">
        {!firstPokemon.isLoading &&
          firstPokemon.data &&
          !secondPokemon.isLoading &&
          secondPokemon.data && (
            <>
              <PokemonListing
                pokemon={firstPokemon.data}
                vote={() => voteForRoundest(first)}
              />
              <div className="p-8 text-2xl">Vs</div>
              <PokemonListing
                pokemon={secondPokemon.data}
                vote={() => voteForRoundest(second)}
              />
            </>
          )}
      </div>
    </div>
  );
};
export default Home;

type PokemonFromServer = inferQueryResponse<"get-pokemon-by-id">;

const PokemonListing: React.FC<{
  pokemon: PokemonFromServer;
  vote: () => void;
}> = (props) => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-xl text-center capitalize">{props.pokemon.name}</div>
      <div className="relative w-60 h-60">
        <Image
          src={props.pokemon.sprites.front_default || ""}
          quality={50}
          layout="fill"
        />
      </div>
      <button onClick={() => props.vote()} className={btn}>
        Rounder
      </button>
    </div>
  );
};
