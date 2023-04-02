import Cards from "../Cards/Cards";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getGames } from "../redux/actions";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGames());
  }, []);

  return (
    <div>
      <Cards />
    </div>
  );
}
