import React, { useState, useEffect } from "react";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Autocomplete,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { URL } from "../uri";

const EditMembership = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [users, setUsers] = useState([]);

  const getUsers = () => {
    axios
      .get(`${URL}/getusers`)
      .then((res) => {
        setUsers(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const addUser = () => {
    axios
      .patch(`${URL}/adduser`, formData)
      .then((res) => {
        console.log(res);
        setFormData(initialState);
        handleClose();
        setOpen(false);
        getUsers();
      })
      .catch((err) => console.log(err));
  };

  const editMembership = () => {
    console.log(formData);
    axios
      .put(`${URL}/editmembership/${props.id}`, formData)
      .then((res) => {
        setFormData(initialState);
        handleClose();
        setOpen(false);
        getUsers();
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        alert('An error occured! Try submitting the form again.');
      });
  };

  const deleteMember = (id) => {
    axios
      .delete(`${URL}/deletemember/${id}`)
      .then((res) => {
        getUsers();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUsers();
  }, []);

  const initialState = {
    name: "",
    days: "",
    amount: "",
    tax: "",
    membership: "",
  };
  const [formData, setFormData] = useState(props.data);

  return (
    <div>
        <Button variant="contained" onClick={handleClickOpen}>
          Edit
        </Button>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
          <DialogTitle id="alert-dialog-title">Edit Membership</DialogTitle>
          <DialogContent>
            <TextField
              label="Name"
              fullWidth
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              style={{ marginTop: "10px" }}
            />
            <TextField
              label="Days"
              fullWidth
              value={formData.days}
              onChange={(e) =>
                setFormData({ ...formData, days: e.target.value })
              }
              style={{ marginTop: "10px" }}
            />
            <TextField
              label="Amount"
              fullWidth
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
              style={{ marginTop: "10px" }}
            />
            <TextField
              label="Tax"
              fullWidth
              value={formData.tax}
              onChange={(e) =>
                setFormData({ ...formData, tax: e.target.value })
              }
              style={{ marginTop: "10px" }}
            />
            <TextField
              label="Membership"
              fullWidth
              value={formData.membership}
              onChange={(e) =>
                setFormData({ ...formData, membership: e.target.value })
              }
              style={{ marginTop: "10px" }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={editMembership} autoFocus>
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </div>
  );
};

export default EditMembership;
