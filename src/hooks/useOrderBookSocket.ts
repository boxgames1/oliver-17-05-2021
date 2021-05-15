import { useEffect, useState } from "react";

import { handleOrdersData } from "../helpers/bookOrders";
import { orderBookdataTypeCheck } from "../helpers/typeCheckers";

import { OrderBooksState } from "../types/OrderBookData";

import useSocket from "./useSocket";

const SOCKET_ENDPOINT = "wss://www.cryptofacilities.com/ws/v1";

const SOCKET_SUBSCRIBE_QUERY = {
  event: "subscribe",
  feed: "book_ui_1",
  product_ids: ["PI_XBTUSD"],
};

const useOrderBookSocket = () => {
  const [orderBooks, setOrderBooks] = useState<OrderBooksState>({
    bids: [],
    asks: [],
  });
  const { response, error } = useSocket(
    SOCKET_ENDPOINT,
    SOCKET_SUBSCRIBE_QUERY,
    orderBookdataTypeCheck
  );

  useEffect(() => {
    const newState = {
      bids: handleOrdersData(response?.bids, orderBooks.bids) || orderBooks.bids,
      asks: handleOrdersData(response?.asks, orderBooks.asks) || orderBooks.asks,
    };
    setOrderBooks(newState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response?.asks, response?.bids]);

  return { orderBooks, error };
};
export default useOrderBookSocket;
