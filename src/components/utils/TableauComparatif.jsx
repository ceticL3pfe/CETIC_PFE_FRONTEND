import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Typography,
  Stack,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { selectTenders } from "../../features/tenders/tender";

function TableauComparatif({ tenderId, isOpen, setIsOpen }) {
  const tenders = useSelector(selectTenders);
  const [open, setOpen] = useState(isOpen);
  const [tender, setTender] = useState(null);
console.log("renders")
  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);
  useEffect(()=>{
console.log(open)
  },[open])

  useEffect(() => {
    const selectedTender = tenders.find((item) => item._id === tenderId);
    setTender(selectedTender);
    console.log(selectedTender);
  }, [tenders, tenderId]);

  if (!tender) {
    return null; // Return early if tender is not available
  }

  return (
    <Dialog
      open={open}
      onClose={() => {
        setIsOpen(false);
      }}
    >
      <DialogTitle>Tableau Comparatif</DialogTitle>
      <DialogContent>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Selected</TableCell>

                <TableCell>Nom</TableCell>
                <TableCell>
                  <Stack direction={"row"}>
                    <Typography>Prix</Typography>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        marginTop: "10px",
                        marginLeft: "3px",
                      }}
                    >
                      Da
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack direction={"row"}>
                    <Typography>Durée</Typography>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        marginTop: "10px",
                        marginLeft: "3px",
                      }}
                    >
                      jours
                    </Typography>
                  </Stack>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <IconButton>
                    {tender?.selectedFournisseur === "fournisseur_1" ? (
                      <CheckIcon color="success" />
                    ) : (
                      <CloseIcon color="error" />
                    )}
                  </IconButton>
                </TableCell>
                <TableCell>{tender.fournisseur_1}</TableCell>
                <TableCell>{tender.prix_fournisseur_1}</TableCell>
                <TableCell>{tender.durée_fournisseur_1}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  {
                    <IconButton>
                      {tender?.selectedFournisseur === "fournisseur_2" ? (
                        <CheckIcon color="success" />
                      ) : (
                        <CloseIcon color="error" />
                      )}
                    </IconButton>
                  }
                </TableCell>
                <TableCell>{tender.fournisseur_2}</TableCell>
                <TableCell>{tender.prix_fournisseur_2}</TableCell>
                <TableCell>{tender.durée_fournisseur_2}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  {
                    <IconButton>
                      {tender?.selectedFournisseur === "fournisseur_3" ? (
                        <CheckIcon color="success" />
                      ) : (
                        <CloseIcon color="error" />
                      )}
                    </IconButton>
                  }
                </TableCell>
                <TableCell>{tender.fournisseur_3}</TableCell>
                <TableCell>{tender.prix_fournisseur_3}</TableCell>
                <TableCell>{tender.durée_fournisseur_3}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
    </Dialog>
  );
}

export default TableauComparatif;
