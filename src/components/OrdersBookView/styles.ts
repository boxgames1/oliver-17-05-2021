import styled from "styled-components";
import { colors } from "../../theme/colors";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InnerContainer = styled.div`
  max-width: 100%;
`;

export const Title = styled.h2`
  color: ${colors.primary};
  text-align: center;
`;

export const OrdersTable = styled.table`
  background-color: ${colors.bg};
  border: 1px solid ${colors.tableBorder};
  border-radius: 5px;
  width: 100%;
  & th {
    text-decoration: underline;
    text-decoration-style: dotted;
    color: ${colors.secondary};
  }
  & td {
    ${({ asks }: { asks?: boolean }) => `
    color: ${asks ? colors.ask : colors.bid};
  `}
  }
  & th,
  td {
    padding: 0.25em 1em;
    text-align: center;
  }
`;
