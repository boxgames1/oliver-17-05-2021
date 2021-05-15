import { useState, useEffect, useMemo } from "react";

import { OrderBookData } from "../types/OrderBookData";

const THROTTLE_DELTA = 100;

const useSocket = (
  endpoint: string,
  query: Record<string, any>,
  dataTypeCheck?: (data: object) => any
) => {
  const [response, setResponse] = useState<OrderBookData | undefined>();
  const [error, setError] = useState("");

  const socket = useMemo(() => new WebSocket(endpoint), [endpoint]);

  useEffect(() => {
    socket.onopen = () => socket.send(JSON.stringify(query));
    socket.onmessage = (event: MessageEvent) => {
      try {
        setError("");

        const data = JSON.parse(event.data);

        dataTypeCheck && dataTypeCheck(data);
        setResponse(data);
      } catch (error) {
        setError(error.message);
      }
    };
    socket.onerror = () =>
      setError("An error happened with the communication. Please try again later.");

    return () => socket.close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { response, error };
};

export default useSocket;
