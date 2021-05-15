import { FC } from "react";

import * as S from "./styles";

type Props = {
  message: string;
};

const ErrorMessage: FC<Props> = ({ message }) => (
  <S.Container>
    <S.Text>{message}</S.Text>
  </S.Container>
);

export default ErrorMessage;
