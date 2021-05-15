export type Order = number[];

export type OrderBookData = {
  bids: Order[];
  asks: Order[];
};

export type OrderBookItemData = {
  price: number;
  size: number;
  accumulatedSize: number;
};
