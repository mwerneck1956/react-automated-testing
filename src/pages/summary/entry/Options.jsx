import React , {useEffect, useState} from 'react';
import axios from 'axios';
import ScoopOption from './ScoopOption';


function Options(props) {
  const {optionType} = props;
  const [items,setItems] = useState([]);

  useEffect(() => {
   axios.get(`http://localhost:3030/${optionType}`)
   .then(response => {
      setItems(response.data)
   })
   .catch(err => {

   })
  },[optionType])

  const ItemComponent = optionType === 'scoops' ? ScoopOption : null

  const optionItems = items.map(item => (
     <ItemComponent 
         key = {item.name}
         name ={item.name}
         imagePath  = {item.imagePath}
     />
  ))

  return optionItems;
}

export default Options;