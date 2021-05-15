import { render, screen } from "@testing-library/react";
import WS from "jest-websocket-mock";

import App from "../App";
import orderBooksFixtures from "../__fixtures__/orderBooks.json";

const wsRender = async () => {
  const wsServer = new WS("wss://www.cryptofacilities.com/ws/v1");
  render(<App />);
  await wsServer.connected;
  return wsServer;
};

describe("App integration tests", () => {
  describe("error scenarios", () => {
    it("should show wrong data format error message", async () => {
      const wsServer = await wsRender();
      wsServer.send(JSON.stringify({ bid: [], ask: [] }));
      expect(
        screen.getByText("Incorrect data. Expected: OrderBookData")
      ).toBeInTheDocument();
      wsServer.close();
    });
    it("should show socket error message", async () => {
      const wsServer = await wsRender();
      wsServer.error();
      expect(
        screen.getByText(
          "An error happened with the communication. Please try again later."
        )
      ).toBeInTheDocument();
      wsServer.close();
    });
  });
  describe("happy path", () => {
    it("should not show prices with size 0", async () => {
      const wsServer = await wsRender();
      wsServer.send(JSON.stringify(orderBooksFixtures[0]));
      const orderBookRows = screen.getAllByRole("row", {
        name: "orders-book-row",
      });
      expect(orderBookRows.length).toBe(4);
      expect(screen.getByText("4.79")).toBeInTheDocument();
      expect(screen.getByText("4.89")).toBeInTheDocument();
      expect(screen.queryByText("4.82")).not.toBeInTheDocument();
      expect(screen.getByText("4.56")).toBeInTheDocument();
      expect(screen.getByText("4.77")).toBeInTheDocument();
      expect(screen.queryByText("4.63")).not.toBeInTheDocument();
      wsServer.close();
    });
    it("should not more than 12 combined rows - show the higher values", async () => {
      const wsServer = await wsRender();
      wsServer.send(JSON.stringify(orderBooksFixtures[1]));
      const orderBookRows = screen.getAllByRole("row", {
        name: "orders-book-row",
      });
      expect(orderBookRows.length).toBe(12);
      expect(screen.queryByText("4.56")).not.toBeInTheDocument();
      expect(screen.queryByText("4.79")).not.toBeInTheDocument();
      wsServer.close();
    });
    it("should sum the accumulated size", async () => {
      const wsServer = await wsRender();
      wsServer.send(JSON.stringify(orderBooksFixtures[1]));
      const orderBookRows = screen.getAllByRole("row", {
        name: "orders-book-row",
      });
      expect(orderBookRows[0].childNodes[2].textContent).toBe("125");
      expect(orderBookRows[1].childNodes[2].textContent).toBe("76");
      expect(orderBookRows[6].childNodes[2].textContent).toBe("63");
      expect(orderBookRows[7].childNodes[2].textContent).toBe("20");
      wsServer.close();
    });
    it("should sort values desc", async () => {
      const wsServer = await wsRender();
      wsServer.send(JSON.stringify(orderBooksFixtures[1]));
      const orderBookRows = screen.getAllByRole("row", {
        name: "orders-book-row",
      });
      expect(orderBookRows[0].childNodes[0].textContent).toBe("4.87");
      expect(orderBookRows[1].childNodes[0].textContent).toBe("4.86");
      expect(orderBookRows[5].childNodes[0].textContent).toBe("4.82");
      expect(orderBookRows[6].childNodes[0].textContent).toBe("4.68");
      expect(orderBookRows[7].childNodes[0].textContent).toBe("4.67");
      expect(orderBookRows[11].childNodes[0].textContent).toBe("4.63");
      wsServer.close();
    });
    it("should show overwritten values", async () => {
      const wsServer = await wsRender();
      wsServer.send(JSON.stringify(orderBooksFixtures[1]));
      wsServer.send(JSON.stringify(orderBooksFixtures[2]));
      const orderBookRows = screen.getAllByRole("row", {
        name: "orders-book-row",
      });

      expect(orderBookRows[0].childNodes[0].textContent).toBe("4.92");
      expect(orderBookRows[0].childNodes[1].textContent).toBe("56");
      expect(orderBookRows[0].childNodes[2].textContent).toBe("442");

      expect(orderBookRows[1].childNodes[0].textContent).toBe("4.91");
      expect(orderBookRows[1].childNodes[1].textContent).toBe("236");
      expect(orderBookRows[1].childNodes[2].textContent).toBe("386");

      expect(orderBookRows[2].childNodes[0].textContent).toBe("4.89");
      expect(orderBookRows[2].childNodes[1].textContent).toBe("35");
      expect(orderBookRows[2].childNodes[2].textContent).toBe("150");


      expect(orderBookRows[6].childNodes[0].textContent).toBe("4.71");
      expect(orderBookRows[6].childNodes[1].textContent).toBe("8");
      expect(orderBookRows[6].childNodes[2].textContent).toBe("146");

      expect(orderBookRows[7].childNodes[0].textContent).toBe("4.7");
      expect(orderBookRows[7].childNodes[1].textContent).toBe("23");
      expect(orderBookRows[7].childNodes[2].textContent).toBe("138");

      expect(orderBookRows[8].childNodes[0].textContent).toBe("4.69");
      expect(orderBookRows[8].childNodes[1].textContent).toBe("63");
      expect(orderBookRows[8].childNodes[2].textContent).toBe("115");



      wsServer.close();
    });
  });
});

export {};
