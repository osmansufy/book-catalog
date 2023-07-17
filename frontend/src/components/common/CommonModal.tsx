import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const CommonModal=({
    title,
    modalMsg,
    open,
    handleConfirm,
    handleClose,
}:{
    title:string,
    modalMsg:string,
    open:boolean,
    handleConfirm:()=>void,
    handleClose:()=>void
})=> {



  return (
    <div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
{title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
        {
            modalMsg
        }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleConfirm} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CommonModal;