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
import EditMembership from './EditMembership';

const Membership = () => {
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

  const deleteMember = (id) => {
    axios
      .delete(`${URL}/deletemembership/${id}`)
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
  const [formData, setFormData] = useState(initialState);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" onClick={handleClickOpen}>
          Add Membership
        </Button>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
          <DialogTitle id="alert-dialog-title">Add New Membership</DialogTitle>
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
            <Button onClick={addUser} autoFocus>
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div style={{ marginTop: "20px" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Days</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Tax</TableCell>
                <TableCell align="right">Membership List</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.days}</TableCell>
                  <TableCell align="right">{row.amount}</TableCell>
                  <TableCell align="right">{row.tax}</TableCell>
                  <TableCell align="right">{row.membership}</TableCell>
                  <TableCell align="center">
                    <EditMembership id={row._id} data={row} />
                    <Button onClick={() => deleteMember(row._id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Membership;
