import { Popover, OverlayTrigger } from 'react-bootstrap';
import React, { useState } from 'react'


export default function SummaryForm(){
   
   const [isChecked,setIsChecked] = useState(false);

   const popover = (
      <Popover>
         <Popover.Body>No ice cream will actually be delivered</Popover.Body>
      </Popover>
   )

   return(
      <form>
         <OverlayTrigger placement="right" overlay={popover}>
            <label
               htmlFor='termsCheckbox'
            >
               I agree to Terms and Conditions
            </label>
       
         </OverlayTrigger>
         <input
            checked ={isChecked}
            type='checkbox'
            id = "termsCheckbox"
            onChange={(event) => setIsChecked(event.target.checked)}
         />
         <button
            disabled = {!isChecked}
         >
            Confirm order
         </button>
     
      </form>
   )
}