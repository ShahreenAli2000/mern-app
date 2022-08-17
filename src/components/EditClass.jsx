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
  Typography,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import { URL } from "../uri";

const EditClass = (props) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData(props.data);
  };

  const [users, setUsers] = useState([]);

  const getUsers = () => {
    axios
      .get(`${URL}/getclasses`)
      .then((res) => {
        setUsers(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const editClass = () => {
    console.log(formData);
    axios
      .put(`${URL}/editclass/${props.id}`, formData)
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

  useEffect(() => {
    getUsers();
  }, []);

  const initialState = {
    className: "",
    staffName: "",
    days: [],
    startTime: "",
    endTime: "",
  };
  const [formData, setFormData] = useState(props.data);

  const CustomCheckbox = ({ day }) => {
    return (
      <>
        <Checkbox
          checked={formData.days.includes(day)}
          onChange={(e) => {
            if (e.target.checked)
              setFormData({
                ...formData,
                days: [...formData.days, day],
              });
            else
              setFormData({
                ...formData,
                days: formData.days.filter((d) => d !== day),
              });
          }}
        />
        {day}
        <br />
      </>
    );
  };

  console.log(formData);

  return (
    <div>

        <Button variant="contained" onClick={handleClickOpen}>
          Edit
        </Button>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
          <DialogTitle id="alert-dialog-title">Edit Class Schedule</DialogTitle>
          <DialogContent>
            <TextField
              label="Class Name"
              value={formData.className}
              onChange={(e) =>
                setFormData({ ...formData, className: e.target.value })
              }
              style={{ marginTop: "10px" }}
              fullWidth
            />
            <TextField
              label="Staff Name"
              value={formData.staffName}
              onChange={(e) =>
                setFormData({ ...formData, staffName: e.target.value })
              }
              style={{ marginTop: "10px" }}
              fullWidth
            />
            <TextField
              label="Start Time"
              type="time"
              value={formData.startTime}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300,
              }}
              fullWidth
              style={{ marginTop: "10px" }}
              onChange={(e) =>
                setFormData({ ...formData, startTime: e.target.value })
              }
            />
            <TextField
              label="End Time"
              type="time"
              value={formData.endTime}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300,
              }}
              fullWidth
              style={{ marginTop: "10px" }}
              onChange={(e) =>
                setFormData({ ...formData, endTime: e.target.value })
              }
            />
            <div>
              <Typography style={{ marginLeft: "5px", marginTop: "10px" }}>
                Days
              </Typography>{" "}
              <br />
              <CustomCheckbox day="Monday" />
              <CustomCheckbox day="Tuesday" />
              <CustomCheckbox day="Wednesday" />
              <CustomCheckbox day="Thursday" />
              <CustomCheckbox day="Friday" />
              <CustomCheckbox day="Saturday" />
              <CustomCheckbox day="Sunday" />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={editClass} autoFocus>
              Update
            </Button>
          </DialogActions>
        </Dialog>
    </div>
  );
};

export default EditClass;
