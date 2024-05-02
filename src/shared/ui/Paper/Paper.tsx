import { FC, ReactNode } from "react";
import { Paper as PaperMUI } from "@mui/material";

interface DrawerProps {
  elevation?: number;
  children: ReactNode;
}

export const Paper: FC<DrawerProps> = ({ elevation = 3, children }) => {
  return (
    <PaperMUI elevation={elevation} sx={{ p: 3 }}>
      {children}
    </PaperMUI>
  );
};
