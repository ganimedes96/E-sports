import { useEffect, useState } from "react";
import LogoImage from "./assets/Logo.svg";
import { GameBanner } from "./components/GameBanner";
import { CreateAdBanner } from "./components/CreateAdBanner";
import { CreateAdModal } from "./components/CreateAdModal";
import * as Dialog from "@radix-ui/react-dialog";
import "./styles/main.css";
import axios from "axios";
import { api } from "./services/api";

interface GameProps {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = useState<GameProps[]>([]);
  useEffect(() => {
    api.get("games")
      .then((response) => {
        setGames(response.data);
      })
      
     
  }, []);

  console.log(games);
  return (
    <div className="max-w-[1344px] mx-auto flex flex-col  items-center my-20">
      <img src={LogoImage} alt="" />
      <h1 className="text-6xl text-white font-bold m-20 ">
        Seu{" "}
        <span className="bg-nlw-gradient bg-clip-text text-transparent font-bold">
          duo
        </span>{" "}
        esta aqui.
      </h1>
      <div className="grid grid-cols-6 gap-6">
        {games.map((game) => (
          <GameBanner
            key={game.id}
            bannerUrl={game.bannerUrl}
            title={game.title}
            adsCount={game._count.ads}
          />
        ))}
      </div>
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
}

export default App;
