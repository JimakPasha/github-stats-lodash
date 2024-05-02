import { FC, ReactNode } from "react";
import {
  Drawer as DrawerMUI,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface DrawerProps {
  isOpen: boolean;
  children: ReactNode;
  title?: string | ReactNode;
  contentWidth?: number;
  onClose: () => void;
}

export const Drawer: FC<DrawerProps> = ({
  isOpen,
  title,
  children,
  contentWidth = 380,
  onClose,
}) => {
  return (
    <DrawerMUI anchor="right" open={isOpen} onClose={onClose}>
      <Box p={3} pt={2}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" fontWeight={600}>
            {title}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box width={contentWidth}>{children}</Box>
      </Box>
    </DrawerMUI>
  );
};
