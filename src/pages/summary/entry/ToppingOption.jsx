import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";


export default function ToopingOptions(props){
   const {name,imagePath, updateItemCount} = props;

   const [isChecked,setIsChecked] = useState(false);

   function handleChange(event) {
      const {checked} = event.target;
      setIsChecked(checked);

      const newItemCount = checked ? 1 : 0;
      updateItemCount(name, newItemCount, "toppings");
   }

   return (
      <Col xs={12} sm={6} md ={4} lg={3} style={{
         textAlign : 'center'
      }}>
        <img style={{width : '75%'}}  src ={imagePath} alt={`${name} topping`} />
            <Form.Group>
               <Form.Label column xs={6} style={{ textAlign: "right" }}>
               {name}
            </Form.Label>
            <label htmlFor={`${name}-checkbox`} aria-label={name}>
               <input id={`${name}-checkbox`} type="checkbox" checked={isChecked} onChange={handleChange}  />
            </label>
         </Form.Group>
      </Col>
         
   )
}