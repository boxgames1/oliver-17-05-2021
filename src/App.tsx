import styled from "styled-components";

import OrdersBookView from "./components/OrdersBookView";
import ErrorMessage from "./components/ErrorMessage";
import useOrderBookSocket from "./hooks/useOrderBookSocket";
import { colors } from "./theme/colors";

const AppContainer = styled.div`
  background-color: ${colors.mainBg};
  min-height: 100vh;
  width: 100vw;
  padding: 1em 0;
`;

const Title = styled.h1`
  color: ${colors.primary};
  text-align: center; 
`;

function App() {
  const { orderBooks, error } = useOrderBookSocket();
  
  if (error) return <ErrorMessage message={error} />;

  return (
    <AppContainer className="App">
      <Title>XBT/USD Orders Book</Title>
      <OrdersBookView orderBooks={orderBooks} />
    </AppContainer>
  );
}

export default App;
