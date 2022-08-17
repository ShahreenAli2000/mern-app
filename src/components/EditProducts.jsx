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
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import { URL } from "../uri";
import { v4 as uuid4 } from "uuid";
import Dropzone from "react-dropzone";
import { firestore, storage } from "../Firebase/index";

const EditProducts = (props) => {
  const [file, setFile] = useState([]);
  const [openSnack, setOpenSnack] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = useState("");

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
      .get(`${URL}/getproducts`)
      .then((res) => {
        setUsers(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const editProducts = () => {
    console.log(formData);
    axios
      .put(`${URL}/editproduct/${props.id}`, formData)
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
    categories: "",
    fullName: "",
    price: "",
    quantity: "",
    manufacture: "",
    expire: "",
  };
  const [formData, setFormData] = useState(props.data);

  const handleClick = () => {
    setOpenSnack(true);
  };
  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };

  useEffect(() => {
    if (file.length > 0) {
      onSubmit();
    } else {
      console.log("N");
    }
  }, [file]);

  const onSubmit = () => {
    if (file.length > 0) {
      file.forEach((file) => {
        const timeStamp = Date.now();
        var uniquetwoKey = uuid4();
        uniquetwoKey = uniquetwoKey + timeStamp;
        const uploadTask = storage
          .ref(`pictures/products/${uniquetwoKey}/${file.name}`)
          .put(file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            handleClick();
            setMessage(`Uploading ${progress} %`);
          },
          (error) => {
            setMessage(error);
            handleClick();
          },
          async () => {
            // When the Storage gets Completed
            const fp = await uploadTask.snapshot.ref.getDownloadURL();
            setFormData({ ...formData, filepath: fp });

            handleClick();
            setMessage("File Uploaded");
          }
        );
      });
    } else {
      setMessage("No File Selected Yet");
    }
  };

  const handleDrop = async (acceptedFiles) => {
    setFile(acceptedFiles.map((file) => file));
  };

  return (
    <div>
      <div>
        <Button variant="contained" onClick={handleClickOpen}>
          Edit
        </Button>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
          <DialogTitle id="alert-dialog-title">Edit Product</DialogTitle>
          <DialogContent>
            <TextField
              label="Categories"
              value={formData.categories}
              onChange={(e) =>
                setFormData({ ...formData, categories: e.target.value })
              }
              fullWidth
              style={{ marginTop: "10px" }}
            />
            <TextField
              label="Name"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              fullWidth
              style={{ marginTop: "10px" }}
            />
            <TextField
              label="Price"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              fullWidth
              style={{ marginTop: "10px" }}
            />
            <TextField
              label="Quantity"
              value={formData.quantity}
              onChange={(e) =>
                setFormData({ ...formData, quantity: e.target.value })
              }
              fullWidth
              style={{ marginTop: "10px" }}
            />

            <TextField
              label="Manufacture Date"
              type="date"
              defaultValue="2022-01-01"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) =>
                setFormData({ ...formData, manufacture: e.target.value })
              }
              style={{ marginTop: "10px" }}
            />
            <TextField
              label="Expiry Date"
              type="date"
              defaultValue="2022-01-01"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) =>
                setFormData({ ...formData, expire: e.target.value })
              }
              style={{ marginTop: "10px" }}
            />

            <center>
              <Dropzone onDrop={handleDrop}>
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps({ className: "dropzone" })}>
                    <input {...getInputProps()} />
                    <Button
                      style={{ marginTop: "10px" }}
                      size="large"
                      color="primary"
                      variant="outlined"
                      fullWidth
                    >
                      Upload Picture
                    </Button>
                  </div>
                )}
              </Dropzone>
            </center>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={editProducts} autoFocus>
              Update
            </Button>
          </DialogActions>
        </Dialog>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={openSnack}
        autoHideDuration={2000}
        onClose={handleCloseSnack}
        message={message}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleCloseSnack}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
      </div>
    </div>
  );
};

export default EditProducts;
