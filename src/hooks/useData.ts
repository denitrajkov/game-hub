import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

interface FetchResponse<T> {
  count: number;
  results: T[];
}

const useData = <T>(endpoint: string) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
  // const controller = new AbortController()
  // , {signal: controller.signal}
   setIsLoading(true)
    apiClient
      .get<FetchResponse<T>>(endpoint)
      .then((res) => {
        setData(res.data.results) 
        setIsLoading(false)})
      .catch((err: Error) => {
        if ( err instanceof CanceledError)
        setError(err.message)
        setIsLoading(false)
      });

//  return () => controller.abort()
  }, []);

  return {data, error, isLoading}
}

export default useData