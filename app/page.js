import TableTennis from "../public/table-tennis-racket.svg";
import SoccerBoots from "../public/soccer-boots.svg";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main class="min-h-screen bg-gradient-to-b from-blue-700 from-25% to-sky-300">
      <div class="flex justify-end p-5">
        <Link
          href="/dashboard"
          class="bg-green-500 hover:bg-green-600 p-3 rounded-lg text-white cursor-pointer"
        >
          Start quiz
        </Link>
      </div>
      <h1 class="text-center text-white font-bold text-title py-20 ">
        Welcome to the quiz
      </h1>
      <p className="game-paragraph">
        Lets test your knowledge about table tennis and football
      </p>
      <div className="images-container">
        <Image src={TableTennis} alt="Table tennis racket" />
        <h1 className="images-text-container">
          <span className="images-text">VS</span>
        </h1>
        <div className="image">
          <Image src={SoccerBoots} alt="Soccer boots" />
        </div>
      </div>
    </main>
  );
}
