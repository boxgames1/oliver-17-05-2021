import React, { FC } from "react";
import { OrderBookItemData } from "../../types/OrderBookData";

import * as S from "./styles";

type Props = {
  ordersData: OrderBookItemData[];
  asks?: boolean;
};

const OrdersBookTable: FC<Props> = ({ ordersData, asks }) => (
  <div>
    <S.Title>{asks ? "Asks" : "Bids"}</S.Title>
    <S.OrdersTable asks={asks}>
      <thead>
        <tr>
          <th>Price</th>
          <th>Size</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {ordersData.map(({ price, size, accumulatedSize }) => (
          <tr key={price} role="row" aria-label="orders-book-row">
            <td>{price}</td>
            <td>{size}</td>
            <td>{accumulatedSize}</td>
          </tr>
        ))}
      </tbody>
    </S.OrdersTable>
  </div>
);

export default OrdersBookTable;
