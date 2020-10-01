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
  const [emailDetails,setEmailDetails]=React.useState({});
  

  const handleClose = () => {
    setOpen(false);
    props.handleClose();
  };

  const handleSend=()=>{
  console.log("email details:",emailDetails);
  props.sendEmail(emailDetails);
  }

  const handleChange=(e)=>{
      setEmailDetails({...emailDetails,[e.target.id]:e.target.value})
  }
  
  return (
    <div>
      
      <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create Email</DialogTitle>
        <DialogContent>
          
          <TextField
            autoFocus
            margin="dense"
            id="emailSubject"
            label="Subject"
            type="text"
            fullWidth
            value={emailDetails.emailSubject}
            onChange={handleChange}
          />
                    <TextField
            autoFocus
            margin="dense"
            id="emailContent"
            label="Content"
            type="text"
            fullWidth
            value={emailDetails.emailContent}
            onChange={handleChange}
          />

           
          
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
           <Button onClick={handleSend} color="primary">
            Send
          </Button> 
        </DialogActions>
      </Dialog>
    </div>
  );
}
