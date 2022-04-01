import {
  render,
  screen,
  waitFor,
  act,
} from "../../../../test-utils/testing-library-utils";
import OrderEntry from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../../../mocks/server";
import { OrderDetailsProvider } from "../../../../contexts/OrderDetails";

test.only("handles error for scoops and topping routes", async () => {
  const scoopHandler = rest.get(
    "http://localhost:3030/scoops",
    (req, res, ctx) => res(ctx.status(500))
  );
  const toppingsHandler = rest.get(
    "http://localhost:3030/toppings",
    (req, res, ctx) => res(ctx.status(500))
  );

  server.resetHandlers(scoopHandler, toppingsHandler);
  render(<OrderEntry />, { wrapper: OrderDetailsProvider });

  await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(2);
  });
});
