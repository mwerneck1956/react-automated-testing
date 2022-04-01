import { Col } from "react-bootstrap";

export default function ToopingOptions(props){
   const {name,imagePath} = props;

   return (
      <Col xs={12} sm={6} md ={4} lg={3} style={{
         textAlign : 'center'
      }}>
        <img style={{width : '75%'}}  src ={imagePath} alt={`${name} topping`} />
      </Col>
         
   )
}