import { screen } from "@testing-library/react";
import { render } from '../../../../test-utils//testing-library-utils'
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from '../OrderEntry'

test("update scoop subtotal when scoops change", async () => {
  render(<Options optionType="scoops" />);

  //tests default value
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});


test("update toppings subtotal when toppings change", async () => {
  render(<Options optionType="toppings" />);

  //tests default value
  const scoopsSubtotal = screen.getByText("Toppings total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  const cherriesInput = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  expect(cherriesInput).not.toBeChecked();

  userEvent.click(cherriesInput);
  expect(scoopsSubtotal).toHaveTextContent("1.5");

  const chocolateInput = await screen.findByRole("checkbox", {
    name: "M&Ms",
  });chocolateInput
  userEvent.click(chocolateInput);
  expect(scoopsSubtotal).toHaveTextContent("3");
  userEvent.click(chocolateInput);
  expect(scoopsSubtotal).toHaveTextContent("1.5")

});

describe('grand total', () => {
 
  const setup = () => {
    render(<OrderEntry/>)
  }

  test('grand total starts at $0.00', async () => {
    setup();

    const grandTotal = await screen.findByText(/grand total:/i,{exact:false});
    expect(grandTotal).toHaveTextContent("0.00");
  })

  test('grand total updates properly if scoop is added first' , async () => {
    setup()

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");

    const grandTotal = await screen.findByText(/grand total:/i,{exact:false});
    expect(grandTotal).toHaveTextContent("2");

    const cherriesInput = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    userEvent.click(cherriesInput);

    expect(grandTotal).toHaveTextContent(3.5);
  })

  test('grand total updates properly if toppings is added first' , async () => {
    setup()

    const cherriesInput = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    userEvent.click(cherriesInput);
    const grandTotal = await screen.findByText(/grand total:/i,{exact:false});
    expect(grandTotal).toHaveTextContent("1.5");

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");

    expect(grandTotal).toHaveTextContent("3.5");
  })

  test('grand total updates properly if item is removed' , async () => {
    setup()

    const cherriesInput = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    userEvent.click(cherriesInput);
    const grandTotal = await screen.findByText(/grand total:/i,{exact:false});
    expect(grandTotal).toHaveTextContent("1.5");

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");

    expect(grandTotal).toHaveTextContent("3.5");

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput,"0");
    
    expect(grandTotal).toHaveTextContent("1.5")

  })

}) 