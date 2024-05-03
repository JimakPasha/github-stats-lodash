import { FC } from "react";
import { CaseType, FilesType } from "../../../../widgets/GitHubStats/types";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

interface FiltersInfoProps {
  caseType: CaseType;
  filesType: FilesType;
  isValidFileNames: boolean;
  fileNamesCurrent: string[];
}

export const FiltersInfo: FC<FiltersInfoProps> = ({
  caseType,
  filesType,
  fileNamesCurrent,
  isValidFileNames,
}) => {
  return (
    <div>
      <Card sx={{ p: 1.5 }}>
        <Typography sx={{ textTransform: "uppercase" }}>
          {caseType === "ignoreCase" ? "Ignore Case" : "Case Sensitive"}:{" "}
          <Chip label="ON" variant="outlined" size="small" color="info" />
        </Typography>
      </Card>
      <Accordion
        defaultExpanded={true}
        sx={{ backgroundColor: isValidFileNames ? "inherit" : "#F1E0E0" }}
        disableGutters
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ textTransform: "uppercase" }}>
            file type:{" "}
            <Chip
              label={filesType}
              variant="outlined"
              size="small"
              color={isValidFileNames ? "info" : "error"}
            />
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={{ xs: 1 }} direction="row" useFlexGap flexWrap="wrap">
            {isValidFileNames ? (
              fileNamesCurrent.map((fileName) => <Chip label={fileName} />)
            ) : (
              <Typography color="red">-</Typography>
            )}
          </Stack>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
