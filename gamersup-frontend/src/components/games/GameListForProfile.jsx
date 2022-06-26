import { useContext, useEffect } from "react";
import GamesContext from "../../context/games/GamesContext";
import UserContext from "../../context/user/UserContext";
import PropTypes from "prop-types";
import GameListItem from "./GameListItem";
import Loading from "../layout/Loading";
import GameListMiddleLayer from "./GameListMiddleLayer";

function GameListForProfile({ title }) {
  const { loading, gameData, getGameById } = useContext(GamesContext);
  const { gamesWantToPlay, gamesPlayed, getGamer } = useContext(UserContext);

 
  //useEffect
  useEffect(() => {
    getGamer();
    let list = [3498,3576];
    getGameById(list);
    
  }, []);

  return (
    <>
      <h1>{title}</h1>
      <div className="grid gap-5 grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 mt-5 mb-5">
        {/* {gameData.map((game) => (
          <GameListItem key={game.id} game={game} />
        ))} */}
      </div>
    </>
  );
}
GameListForProfile.propTypes = {
  title: PropTypes.string,
};

export default GameListForProfile;
