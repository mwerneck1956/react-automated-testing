import Alert from 'react-bootstrap';

export default function AlertBanner(props){
   const { message, variant } = props;
   const alertMessage = message || "An unexpected error ocurred. Please try again later."
   const alertVariant = variant || 'danger';

   return(
      <div role='alert' style={{backgroundColor : 'red'}}> 
         {alertMessage}
      </div>
   )
   
}