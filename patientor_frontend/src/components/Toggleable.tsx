import { Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import { useImperativeHandle, forwardRef, useState } from "react";

export interface ToggleableHandle {
  toggleVisibile: () => void;
}

interface Props {
  children: React.ReactNode;
  showLabel?: string;
  hideLabel?: string;
}

const Toggleable = forwardRef<ToggleableHandle, Props>(({ children, showLabel = "SHOW", hideLabel = "CANCEL" }, ref) => {
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
});

export default Toggleable;
