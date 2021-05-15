import { useState, useEffect, useMemo, useCallback } from "react";

import { OrderBookData } from "../types/OrderBookData";

const SOCKET_ENDPOINT = "wss://www.cryptofacilities.com/ws/v1";

const SOCKET_SUBSCRIBE_QUERY = {
  event: "subscribe",
  feed: "book_ui_1",
  product_ids: ["PI_XBTUSD"],
};

const isOrderBookDataTypeGuard = (data: any): data is OrderBookData => {
  return (
    (data as OrderBookData).bids !== undefined &&
    (data as OrderBookData).asks !== undefined
  );
};

const useOrderBookSocket = () => {
  const [response, setResponse] = useState<OrderBookData | undefined>();
  const [error, setError] = useState("");

  const socket = useMemo(() => new WebSocket(SOCKET_ENDPOINT), []);
  const suscribe = useCallback(() => {
    socket.send(JSON.stringify(SOCKET_SUBSCRIBE_QUERY));
  }, [socket]);
  const unsuscribe = useCallback(() => {
    socket.close();
  }, [socket]);

  useEffect(() => {
    socket.onopen = suscribe;
    socket.onmessage = (event: MessageEvent) => {
      try {
        setError("");

        if (typeof event.data !== "string")
          throw new Error("Received data type is not string");

        const data = JSON.parse(event.data);

        if (!isOrderBookDataTypeGuard(data))
          throw new Error("Incorrect data. Expected: OrderBookData");

        setResponse(data);
      } catch (error) {
        setError(error.message);
      }
    };
    socket.onerror = () =>
      setError("An error happened reading from the endpoint");
    return () => unsuscribe();
  }, [socket, suscribe, unsuscribe]);

  return { response, error };
};

export default useOrderBookSocket;
