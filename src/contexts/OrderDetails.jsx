import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { PRICE_PER_ITEM } from "../constants";
import {formatCurrency} from '../utils'

const OrderDetails = createContext();

function useOrderDetails() {
  const context = useContext(OrderDetails);

  if (!context)
    throw new Error(
      "useOrderDetails must be used within an OrderDetailsProvider"
    );

  return context;
}

function OrderDetailsProvider(props, children) {
  const [optionsCount, setOptionsCount] = useState({
    scoops: new Map(),
    toppings: new Map(),
  });

  const zero = formatCurrency(0);

  const [totals, setTotals] = useState({
    scoops: zero,
    toppings: zero,
    grandTotal: zero,
  });

  function calculateSubTotal(optionType, optionsCount) {
    let optionCount = 0;

    for (const count of optionsCount[optionType].values()) {
      optionCount += count;
    }

    return optionCount * PRICE_PER_ITEM[optionType];
  }

  useEffect(() => {
    const scoopSubTotal = calculateSubTotal("scoops", optionsCount);
    const toppingsSubTotal = calculateSubTotal("toppings", optionsCount);
    const grandTotal = scoopSubTotal + toppingsSubTotal;

    setTotals({
      scoops: formatCurrency(scoopSubTotal),
      toppings: formatCurrency(toppingsSubTotal),
      grandTotal: formatCurrency(grandTotal),
    });
  }, [optionsCount]);

  const value = useMemo(() => {
    function updateItemCount(itemName, newItemCount, optionType) {
      const newOptionCount = { ...optionsCount };

      const optionCountsMap = optionsCount[optionType];
      optionCountsMap.set(itemName, parseInt(newItemCount));

      setOptionsCount(newOptionCount);
    }

    return [{ ...optionsCount, totals }, updateItemCount];
  }, [optionsCount, totals]);

  return <OrderDetails.Provider value={value} {...props} />;
}

export { OrderDetailsProvider, useOrderDetails };
