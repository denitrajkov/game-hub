import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

export interface Platform {
  id: number,
  name: string,
  slug:string
}

export interface Game {
  id: number;
  name: string;
  background_image: string,
  parent_platforms:{platform: Platform}[],
  metacritic: number
}

interface FetchGamseResponse {
  count: number;
  results: Game[];
}

const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
  // const controller = new AbortController()
  // , {signal: controller.signal}
   setIsLoading(true)
    apiClient
      .get<FetchGamseResponse>("/games")
      .then((res) => {
        setGames(res.data.results) 
        setIsLoading(false)})
      .catch((err: Error) => {
        if ( err instanceof CanceledError)
        setError(err.message)
        setIsLoading(false)
      });

//  return () => controller.abort()
  }, []);

  return {games, error, isLoading}
}

export default useGames