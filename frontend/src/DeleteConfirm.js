import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertDialog({
  recipeToBeDeleted,
  setRecipeToBeDeleted,
}) {
  const persistDeleteRequest = async (id) => {
    await fetch(
      "http://group1recipebook-env.eba-qmv2vkx8.eu-west-1.elasticbeanstalk.com/recipes/" +
        id,
      {
        method: "DELETE",
      }
    );
  };

  const handleCancel = () => {
    setRecipeToBeDeleted(0);
  };

  const handleClose = async () => {
    await persistDeleteRequest(recipeToBeDeleted);
    setRecipeToBeDeleted(0);
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };

  return (
    <div>
      <Dialog
        open={recipeToBeDeleted !== 0}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete recipe from Recipe Book"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Once you delete this recipe it is lost for ever.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleClose} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
