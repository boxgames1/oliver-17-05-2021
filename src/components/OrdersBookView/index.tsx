import { FC } from "react";

import { OrderBooksState } from "../../types/OrderBookData";
import OrdersBookTable from "./OrdersBookTable";

import * as S from "./styles";

type Props = {
  orderBooks: OrderBooksState;
};

const OrdersBookView: FC<Props> = ({ orderBooks }) => {
  return (
    <S.Container>
      <S.InnerContainer>
        <OrdersBookTable ordersData={orderBooks.asks} asks />
        <OrdersBookTable ordersData={orderBooks.bids} />
      </S.InnerContainer>
    </S.Container>
  );
};

export default OrdersBookView;
