import { Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import { useImperativeHandle, useState } from "react";

export interface ToggleableHandle {
  toggleVisibile: () => void;
}

interface Props {
  ref: React.RefObject<ToggleableHandle | null>;
  children: React.ReactNode;
  showLabel?: string;
  hideLabel?: string;
}

const Toggleable = ({ ref, children, showLabel = "SHOW", hideLabel = "CANCEL" }: Props) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibile = (): void => setVisible(!visible);

  useImperativeHandle(ref, () => {
    return { toggleVisibile };
  });

  return (
    <div>
      {!visible && (
        <Button
          onClick={toggleVisibile}
          variant="outlined"
          color="primary"
          startIcon={<AddCircleOutlineIcon />}
          sx={{ borderStyle: "dashed" }}
        >
          {showLabel}
        </Button>
      )}

      {visible && (
        <div>
          {children}
          <Button onClick={toggleVisibile} variant="text" color="inherit" startIcon={<CloseIcon />} sx={{ mt: 1 }}>
            {hideLabel}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Toggleable;
