import { Order, OrderBookItemData } from "../types/OrderBookData";

const MAX_ITEMS = 6;

const sortDescOrdersBooks = (a: OrderBookItemData, b: OrderBookItemData) =>
  b.price - a.price;

const sortDescOrders = (a: Order, b: Order) => b[0] - a[0];

const loadAccumulatedSize = (
  orders: Order[],
  result: OrderBookItemData[] = [],
  accSize = 0
): OrderBookItemData[] => {
  if (!orders?.length) return result;
  const price = orders[0][0];
  const size = orders[0][1];
  const newAccSize = accSize + size;
  return loadAccumulatedSize(
    orders.slice(1),
    [
      ...result,
      {
        price,
        size,
        accumulatedSize: newAccSize,
      },
    ],
    newAccSize
  );
};

export const handleOrdersData = (
  input: Order[] | undefined,
  current: OrderBookItemData[]
) => {
  if (!input || !input.length) return;
  // remove new entries with size 0
  const cleanInput = input.filter(([__, size]) => size > 0);

  // Data union overwritting current price state with the new one
  const mappedCurrent: Order[] = current.map(({ price, size }) => [
    price,
    size,
  ]);

  const dataUnion: Order[] = [
    ...new Map([...mappedCurrent, ...cleanInput].sort(sortDescOrders)),
  ]
    .slice(0, MAX_ITEMS)
    .sort();
  const newData = loadAccumulatedSize(dataUnion).sort(sortDescOrdersBooks);
  return newData;
};
