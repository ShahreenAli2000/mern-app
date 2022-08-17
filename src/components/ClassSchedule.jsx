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
import EditClass from './EditClass';

const ClassSchedule = () => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData(initialState);
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

  const deleteMember = (id) => {
    axios
      .delete(`${URL}/deleteclass/${id}`)
      .then((res) => {
        getUsers();
      })
      .catch((err) => console.log(err));
  };

  const addUser = () => {
    axios
      .patch(`${URL}/addclass`, formData)
      .then((res) => {
        console.log(res);
        setFormData(initialState);
        handleClose();
        setOpen(false);
        getUsers();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUsers();
  }, []);

  let d = new Date();
  let hour = d.getHours();
  let min = d.getMinutes();
  if(min < 10) {
    min = '0'+min;
  }
  let time = hour+':'+min;

  const initialState = {
    className: "",
    staffName: "",
    days: [],
    startTime: time,
    endTime: time,
  };
  const [formData, setFormData] = useState(initialState);

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

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" onClick={handleClickOpen}>
          Add Schedule
        </Button>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
          <DialogTitle id="alert-dialog-title">Add Class Schedule</DialogTitle>
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
              defaultValue={time}
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
              defaultValue={time}
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
                <TableCell>Class Name</TableCell>
                <TableCell>Staff Name</TableCell>
                <TableCell>Start Time</TableCell>
                <TableCell>End Time</TableCell>
                <TableCell>Day</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.className}</TableCell>
                  <TableCell>{row.staffName}</TableCell>
                  <TableCell>{row.startTime}</TableCell>
                  <TableCell>{row.endTime}</TableCell>
                  <TableCell>{row.days.join(", ")}</TableCell>
                  <TableCell align="center">
                    <EditClass id={row._id} data={row} />
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

export default ClassSchedule;
