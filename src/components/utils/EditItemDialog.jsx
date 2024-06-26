import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  ListItemIcon,
  FormControl,
  InputLabel,
  IconButton,
  Stack,
  Checkbox,
  Box,
} from "@mui/material";

import {
  HourglassEmpty as HourglassEmptyIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

import { useEditTenderNoticeMutation } from "../../app/api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setProduct, setTenders } from "../../features/tenders/tender";
import { selectUser } from "../../features/users/userSlice";

function EditItemDialog({ users, isOpen, setIsOpen, itemId, items }) {
  const user = useSelector(selectUser);
  const [open, setOpen] = useState(isOpen);
  const [isDisabled, setIsDisabled] = useState(true);
  const [tcagents, setTcAgents] = useState([]);
  const [updateItem, updateItemResult] = useEditTenderNoticeMutation();
  const [item, setItem] = useState(null);
  const [fournisseurChecked, setFournisseurChecked] = useState(false);
  const [data, setData] = useState({
    object: null,
    source: null,
    description: null,
    status: null,
    missionHead: null,
    fournisseur_1: null,
    prix_fournisseur_1: null,
    durée_fournisseur_1: null,
    fournisseur_2: null,
    prix_fournisseur_2: null,
    durée_fournisseur_2: null,
    fournisseur_3: null,
    prix_fournisseur_3: null,
    durée_fournisseur_3: null,
    username:user.username
  });
  const dispatch = useDispatch();
  const handleClose = () => {
    setData({
      object: null,
      source: null,
      description: null,
      status: null,
      missionHead: null,
      fournisseur_1: null,
      prix_fournisseur_1: null,
      durée_fournisseur_1: null,
      fournisseur_2: null,
      prix_fournisseur_2: null,
      durée_fournisseur_2: null,
      fournisseur_3: null,
      prix_fournisseur_3: null,
      durée_fournisseur_3: null,
      selectedFournisseur: null,
      username: user.username,
    });
    setIsDisabled(true);
    setOpen(false);
    setIsOpen(false);
    // setData("");
  };

  useEffect(() => {
    const arr =users
      .map((item) => {
        if (item.role === "agentTc") return item;
        else return null;
      })
      .filter((item) => item !== null);
      setTcAgents(arr)
  }, [users]);
  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const arr = items.filter((element) => element._id === itemId);
    setItem(arr[0]);
  }, [isOpen]);

  useEffect(() => {
    if (updateItemResult.status === "rejected") {
      console.log("error while updating item");
    } else if (updateItemResult.status === "fulfilled") {
      console.log(updateItemResult.data);
      const filteredItems = items?.map((item) => {
        if (item._id !== updateItemResult.data.msg._id) {
          return item;
        } else {
          return updateItemResult.data.msg;
        }
      });
      console.log("filtred Items edit", filteredItems);
      dispatch(setTenders(filteredItems));
    }

    console.log("item have updated successfully");

    handleClose();
  }, [updateItemResult]);

  const handleSave = async () => {
    console.log("data,id", data, item._id);
    console.log(data)
    await updateItem({ data, id: item._id });
  };

  const handleChange = (field) => (event) => {
    setData({
      ...data,
      [field]: event.target.value,
    });
    //   console.log(...data)
  };
  const handleFournisseurCheck = (event, fournisseurName) => {
    console.log(fournisseurName);
    setData({
      ...data,
      ["selectedFournisseur"]: fournisseurName,
    });
    setIsDisabled(false);
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Dialog
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      open={open}
      onClose={handleClose}
    >
      <DialogTitle id="dialog-title" sx={{ textAlign: "center" ,}} >Modifier l'AO</DialogTitle>
      <Box></Box>
      <DialogContent >
      <Stack direction="column" spacing={2}>
        <TextField
          disabled={!(user.role === "agentTc")}
          sx={{ marginTop: "5px"}}
          
          type="text"
          label="Object"
          defaultValue={item?.object}
          onChange={(e) => {
            if (e.currentTarget.value.length > 0) {
              setIsDisabled(false);

              handleChange("object")(e);
            } else {
              e.target.value = "";
              setIsDisabled(true);
            }
          }}
        />
        <TextField
          disabled={!(user.role === "agentTc")}
          sx={{ marginTop: "5px",marginRight: "15px" }}
          type="text"
          label="SOURCE"
          defaultValue={item?.source}
          onChange={(e) => {
            if (e.currentTarget.value !== "") {
              setIsDisabled(false);

              handleChange("source")(e);
            } else {
              setIsDisabled(true);
            }
          }}
        />
        <TextField
          disabled={!(user.role === "agentTc")}
          sx={{ marginTop: "5px" }}
          type="text"
          label="DESCRIPTION"
          defaultValue={item?.description}
          onChange={(e) => {
            if (e.currentTarget.value !== "") {
              setIsDisabled(false);

              handleChange("description")(e);
            } else {
              setIsDisabled(true);
            }
          }}
        />

        <FormControl fullWidth required>
          <InputLabel id="mission-head-label">Responsable de la Mission</InputLabel>
          <Select
            disabled={!(user.role === "directeur")}
            labelId="mission-head-label"
            onChange={(e) => {
              if (e.target.value !== "") {
                setIsDisabled(false);

                handleChange("status")(e);
              } else {
                setIsDisabled(true);
              }

              handleChange("missionHead")(e);
            }}
            value={data.missionHead}
          >
            {tcagents.map((user) => (
              <MenuItem key={user._id} value={user.username}>
                {user.username}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth required>
          <InputLabel id="status-label">Statut</InputLabel>
          <Select
            required
            label={"Status"}
            onChange={handleChange("status")}
            value={data.status}
          >
            <MenuItem value={"validation de retrait de cdc"}>
              <ListItemIcon>
                <HourglassEmptyIcon />
              </ListItemIcon>
              validation de retrait de cdc
            </MenuItem>
            <MenuItem value={"analyse de la commission"}>
              <ListItemIcon>
                <CheckCircleIcon />
              </ListItemIcon>
              analyse de la commission
            </MenuItem>
            <MenuItem value={"analyse de contolleur de gestion"}>
              <ListItemIcon>
                <CheckCircleIcon />
              </ListItemIcon>
              analyse de contolleur de gestion
            </MenuItem>
            <MenuItem value={"validation de directeur"}>
              <ListItemIcon>
                <CheckCircleIcon />
              </ListItemIcon>
              validation de directeur
            </MenuItem>
            <MenuItem value={"Terminer"}>
              <ListItemIcon>
                <CloseIcon />
              </ListItemIcon>
              Terminer
            </MenuItem>
            <MenuItem value={"Annuler"}>
              <ListItemIcon>
                <CancelIcon />
              </ListItemIcon>
              Annuler
            </MenuItem>
          </Select>
        </FormControl>
        <Stack direction={"row"} spacing={1}>
          <TextField
            defaultValue={item?.fournisseur_1}
            label={"fournisseur 1"}
            onChange={(e) => {
              if (e.target.value !== "") {
                setIsDisabled(false);
              } else {
                setIsDisabled(true);
              }
              handleChange("fournisseur_1")(e);
            }}
            name="fournisseur_1"
            value={data.fournisseur_1}
          />
          <TextField
            defaultValue={item?.prix_fournisseur_1}
            label={"prix"}
            onChange={(e) => {
              if (e.target.value !== "") {
                setIsDisabled(false);
              } else {
                setIsDisabled(true);
              }
              handleChange("prix_fournisseur_1")(e);
            }}
            name="prix_fournisseur_1"
            value={data.prix_fournisseur_1}
          />
          <TextField
            defaultValue={item?.durée_fournisseur_1}
            label={"durée"}
            onChange={(e) => {
              if (e.target.value !== "") {
                setIsDisabled(false);
              } else {
                setIsDisabled(true);
              }
              handleChange("durée_fournisseur_1")(e);
            }}
            name="durée_fournisseur_1"
            value={data.durée_fournisseur_1}
          />
          <Checkbox
            defaultChecked={item?.selectedFournisseur === "fournisseur_1"}
            data-fournisseur={"fournisseur_1"}
            onChange={(e) => handleFournisseurCheck(e, "fournisseur_1")}
          />
        </Stack>
        <Stack direction={"row"} spacing={1}>
          <TextField
            defaultValue={item?.fournisseur_2}
            label={"fournisseur 2"}
            onChange={(e) => {
              if (e.target.value !== "") {
                setIsDisabled(false);
              } else {
                setIsDisabled(true);
              }
              handleChange("fournisseur_2")(e);
            }}
            name="fournisseur_2"
            value={data.fournisseur_2}
          />
          <TextField
            defaultValue={item?.prix_fournisseur_2}
            label={"prix"}
            onChange={(e) => {
              if (e.target.value !== "") {
                setIsDisabled(false);
              } else {
                setIsDisabled(true);
              }
              handleChange("prix_fournisseur_2")(e);
            }}
            name="prix_fournisseur_2"
            value={data.prix_fournisseur_2}
          />
          <TextField
            defaultValue={item?.durée_fournisseur_2}
            label={"durée"}
            onChange={(e) => {
              if (e.target.value !== "") {
                setIsDisabled(false);
              } else {
                setIsDisabled(true);
              }
              handleChange("durée_fournisseur_2")(e);
            }}
            name="durée_fournisseur_2"
            value={data.durée_fournisseur_2}
          />
          <Checkbox
            defaultChecked={item?.selectedFournisseur === "fournisseur_2"}
            onChange={(e) => handleFournisseurCheck(e, "fournisseur_2")}
          />
        </Stack>
        <Stack direction={"row"} spacing={1}>
          <TextField
            defaultValue={item?.fournisseur_3}
            label={"fournisseur 3"}
            onChange={(e) => {
              if (e.target.value !== "") {
                setIsDisabled(false);
              } else {
                setIsDisabled(true);
              }
              handleChange("fournisseur_3")(e);
            }}
            name="fournisseur_3"
            value={data.fournisseur_3}
          />
          <TextField
            defaultValue={item?.prix_fournisseur_3}
            label={"prix"}
            onChange={(e) => {
              if (e.target.value !== "") {
                setIsDisabled(false);
              } else {
                setIsDisabled(true);
              }
              handleChange("prix_fournisseur_3")(e);
            }}
            name="prix_fournisseur_3"
            value={data.prix_fournisseur_3}
          />
          <TextField
            defaultValue={item?.durée_fournisseur_3}
            label={"durée"}
            onChange={(e) => {
              if (e.target.value !== "") {
                setIsDisabled(false);
              } else {
                setIsDisabled(true);
              }
              handleChange("durée_fournisseur_3")(e);
            }}
            name="durée_fournisseur_3"
            value={data.durée_fournisseur_3}
          />
          <Checkbox
            defaultChecked={item?.selectedFournisseur === "fournisseur_3"}
            onChange={(e) => handleFournisseurCheck(e, "fournisseur_3")}
          />
        </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Annuler</Button>
        <Button onClick={handleSave} disabled={isDisabled}>
          Sauvegarder 
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditItemDialog;
