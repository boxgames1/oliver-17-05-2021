import { OrderBookData } from "../types/OrderBookData";

const isOrderBookDataTypeGuard = (data: any): data is OrderBookData =>
  (data as OrderBookData).bids !== undefined &&
  (data as OrderBookData).asks !== undefined;

export const orderBookdataTypeCheck = (data: any) => {
  if (!isOrderBookDataTypeGuard(data))
    throw new Error("Incorrect data. Expected: OrderBookData");
};
