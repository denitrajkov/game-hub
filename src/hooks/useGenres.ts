import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";



export interface Genre {
  id: number;
  name: string;
 
}

interface FetchGenresResponse {
  count: number;
  results: Genre[];
}

const useGenres = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
  // const controller = new AbortController()
  // , {signal: controller.signal}
   setIsLoading(true)
    apiClient
      .get<FetchGenresResponse>("/genres")
      .then((res) => {
        setGenres(res.data.results) 
        setIsLoading(false)})
      .catch((err: Error) => {
        if ( err instanceof CanceledError)
        setError(err.message)
        setIsLoading(false)
      });

//  return () => controller.abort()
  }, []);

  return {genres, error, isLoading}
}

export default useGenres 