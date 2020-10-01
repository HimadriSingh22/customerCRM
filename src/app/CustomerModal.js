import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
//import ContractModal from '../AggregatorSection/ContractModal';

export default function Modal1(props) {
  const [open, setOpen] = React.useState(props.open);
  const [customerDetails,setCustomerDetails]=React.useState({});
  // const [customerName,setCustomerName]=React.useState("");
  // const [customerEmail,setCustomerEmail]=React.useState("");
  // const [customerPhone,setCustomerPhone]=React.useState("");
  // const [customerAddress,setCustomerAddress]=React.useState("");
  // const [customerGST,setCustomerGST]=React.useState("");
  
//   const handleClickOpen = () => {
//     setOpen(true);
//   };

  const handleClose = () => {
    setOpen(false);
    props.handleClose();
  };

  const handleAdd=()=>{
  console.log("customer details:",customerDetails);
  props.addCustomer(customerDetails);
  }

  const handleChange=(e)=>{
      setCustomerDetails({...customerDetails,[e.target.id]:e.target.value})
  }
  
  return (
    <div>
      
      <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Customer</DialogTitle>
        <DialogContent>
          
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Customer Name"
            type="text"
            fullWidth
            value={customerDetails.customerName}
            onChange={handleChange}
          />
                    <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            value={customerDetails.customerEmail}
            onChange={handleChange}
          />
                    <TextField
            autoFocus
            margin="dense"
            id="phone"
            label="Phone"
            type="number"
            fullWidth
            value={customerDetails.customerPhone}
            onChange={handleChange}
          />
                    <TextField
            autoFocus
            margin="dense"
            id="gst"
            label="Customer GST"
            type="text"
            fullWidth
            value={customerDetails.customerGST}
            onChange={handleChange}
          />

           <TextField
            autoFocus
            margin="dense"
            id="address"
            label="Address"
            type="text"
            fullWidth
            value={customerDetails.customerAddress}
            onChange={handleChange}
          />
           
          
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
           <Button onClick={handleAdd} color="primary">
            Add
          </Button> 
        </DialogActions>
      </Dialog>
    </div>
  );
}
