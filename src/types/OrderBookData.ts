export type Price = number;
export type Size = number;

export type Order = [Price, Size];

export type OrderBookData = {
  bids: Order[];
  asks: Order[];
};

export type OrderBookItemData = {
  price: number;
  size: number;
  accumulatedSize: number;
};


export type OrderBooksState = {
  bids: OrderBookItemData[],
  asks: OrderBookItemData[],
}