import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import { Bunch } from "../components/bunch";

export default function SelectedBunchActions(
  props: React.HTMLAttributes<HTMLDivElement> & {
    bunch: Bunch;
    onRemove: () => void;
  }
) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRemove = () => {
    props.onRemove();
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Grid size={4}>
      <Button
        style={{ width: "100%" }}
        variant="outlined"
        onClick={handleClick}
        disabled={!props.bunch}
      >
        {props.bunch ? `${props.bunch.herb.name}` : `Nada`}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Button
          style={{ width: "100%" }}
          variant="outlined"
          onClick={handleRemove}
        >
          Tirar
        </Button>
      </Popover>
    </Grid>
  );
}
