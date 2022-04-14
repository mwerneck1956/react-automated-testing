import React, { useEffect, useState } from "react";
import axios from "axios";
import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";
import AlertBanner from "../../../common/AlertBanner";
import { Row } from "react-bootstrap";
import { PRICE_PER_ITEM } from "../../../constants";
import { useOrderDetails } from "../../../contexts/OrderDetails";
import {formatCurrency} from '../../../utils';

function Options(props) {
  const { optionType } = props;
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);

  const [orderDetails, updateItemCount] = useOrderDetails();


  useEffect(() => {
    async function fetchOptions() {
      try {
        const response = await axios.get(`http://localhost:3030/${optionType}`);
        setItems(response.data);
      } catch (err) {
        setError(true);
      }
    }

    fetchOptions();
  }, [optionType]);

  if (error) return <AlertBanner />;

  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
      updateItemCount={updateItemCount}
    />
  ));

  return (
    <>
      <h2> {title} </h2>
      <p> {formatCurrency(PRICE_PER_ITEM[optionType])} </p>
      <p>
        {title} total: {orderDetails.totals[optionType]}
      </p>
      <Row>{optionItems}</Row>
    </>
  );
}

export default Options;
