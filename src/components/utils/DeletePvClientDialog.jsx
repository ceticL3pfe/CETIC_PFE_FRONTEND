import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import {  useDeletePvClientMutation } from "../../app/api/apiSlice";
import { selectTenders, setTenders } from "../../features/tenders/tender";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../features/users/userSlice";

function DeletePvClient({ isOpen, setIsOpen, itemId, documentId ,}) {
    const dispatch = useDispatch();
const tenders = useSelector(selectTenders)
  const [open, setOpen] = useState(isOpen);
const user = useSelector(selectUser)
  const [deleteItem, deleteItemResult] = useDeletePvClientMutation();

  const handleClose = () => {
    setOpen(false);
    setIsOpen(false);
    // setData("");
  };

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (deleteItemResult.status === "rejected") {
      console.log("error while adding item");
    } else if (deleteItemResult.status === "fulfilled") {
           const filteredItems = tenders.map((tender) => {
             if (tender._id === itemId) {
               // Modify the tender with the updated information
               return {
                 ...tender,
                 // Assuming you have a field like 'hasPvClient', you can set it to true
                 pvClient: null,
                 // You can modify other fields as needed
               };
             }
             return tender;
           });
           console.log(filteredItems);
           dispatch(setTenders(filteredItems));
      console.log("item have been deleted successfully");
      setOpen(false);
      setIsOpen(false);
    }
  }, [deleteItemResult]);

  const handleDelete = async () => {
    console.log("itemId", itemId);
    await deleteItem({ itemId, documentId,username:user.username });
  };
  const handleCancel = () => {
    setOpen(false);
    setIsOpen(false);
  };

  return (
    <Dialog
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      open={open}
      onClose={handleClose}
    >
      <DialogTitle id="dialog-title">Delete Pv Client</DialogTitle>
      <DialogContent>
        Are you sure you want to remove the Pv Client  from the app?
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDelete} variant="contained">
          Delete
        </Button>
        <Button onClick={handleCancel} variant="outlined">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeletePvClient;
