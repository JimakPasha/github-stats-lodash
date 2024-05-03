import { ChangeEvent, FC, useMemo, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { Drawer, Paper } from "../../shared/ui";
import { CaseType, FilesType, IFilters } from "../../widgets/GitHubStats/types";
import { FiltersInfo } from "./ui";

interface FiltersSettingsProps {
  defaultFilters: IFilters;
  fileNamesCurrent: string[];
  fileNamesAll: string[];
  isValidFileNames: boolean;
  onReset: () => void;
  onSubmit: (newFilters: IFilters) => void;
}

export const FiltersSettings: FC<FiltersSettingsProps> = ({
  defaultFilters,
  fileNamesCurrent,
  fileNamesAll,
  isValidFileNames,
  onReset,
  onSubmit,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [caseType, setCaseType] = useState(defaultFilters.caseType);
  const [filesType, setFilesType] = useState<FilesType>(
    defaultFilters.filesType
  );
  const [checkedFileNames, setCheckedFileNames] = useState<string[]>(
    defaultFilters.checkedFileNames
  );

  const isDisableSubmit = useMemo(
    () => filesType === "CUSTOM" && checkedFileNames.length <= 0,
    [filesType, checkedFileNames]
  );

  const handleOpenFiltersSettings = () => setIsOpen(true);

  const handleCloseFiltersSettings = () => setIsOpen(false);

  const handleIgnoreCaseChange = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setCaseType(target.value as CaseType);

  const handleChangeFilesType = (e: SelectChangeEvent) =>
    setFilesType(e.target.value as FilesType);

  const handleCheckFiles = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setCheckedFileNames((prev) =>
      target.checked
        ? [...prev, target.name]
        : prev.filter((name) => name !== target.name)
    );
  };

  const handleSubmit = () => {
    onSubmit({ caseType, filesType, checkedFileNames });
    handleCloseFiltersSettings();
  };

  return (
    <Paper>
      <Typography variant="h4" sx={{ paddingBottom: 1 }}>
        Filters:
      </Typography>

      <FiltersInfo
        caseType={defaultFilters.caseType}
        filesType={defaultFilters.filesType}
        fileNamesCurrent={fileNamesCurrent}
        isValidFileNames={isValidFileNames}
      />

      <Stack direction="row" spacing={{ xs: 1 }} pt={4}>
        <Button onClick={handleOpenFiltersSettings} variant="contained">
          filter settings
        </Button>
        <Button onClick={onReset} variant="outlined">
          reset filters
        </Button>
      </Stack>

      <Drawer
        isOpen={isOpen}
        title="Setting up filters"
        onClose={handleCloseFiltersSettings}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
          pt={2}
        >
          <Box
            sx={{ display: "flex", flexDirection: "column", rowGap: "12px" }}
          >
            <FormControl>
              <RadioGroup
                defaultValue={defaultFilters.caseType}
                name="isIgnoreCase"
                onChange={handleIgnoreCaseChange}
              >
                <Box sx={{ display: "flex" }}>
                  <FormControlLabel
                    value="ignoreCase"
                    control={<Radio />}
                    label="Ignore Case"
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label="sensitiveCase"
                  />
                </Box>
              </RadioGroup>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="filesType-label">type</InputLabel>
              <Select
                labelId="filesType-label"
                id="filesType"
                value={filesType}
                label="filesType"
                onChange={handleChangeFilesType}
              >
                <MenuItem value={"JS/TS"}>js/ts</MenuItem>
                <MenuItem value={"JS"}>js</MenuItem>
                <MenuItem value={"TS"}>ts</MenuItem>
                <MenuItem value={"CUSTOM"}>custom</MenuItem>
              </Select>
            </FormControl>

            {filesType === "CUSTOM" && (
              <FormGroup
                sx={{
                  pb: 6,
                }}
              >
                {fileNamesAll.map((fileName) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={handleCheckFiles}
                        name={fileName}
                        defaultChecked={defaultFilters.checkedFileNames.includes(
                          fileName
                        )}
                      />
                    }
                    label={fileName}
                  />
                ))}
              </FormGroup>
            )}
          </Box>

          <Box
            sx={{
              display: "flex",
              position: "fixed",
              columnGap: "26px",
              bottom: 0,
              pt: 2,
              pb: 2,
              backgroundColor: "#fff",
            }}
          >
            <Button
              onClick={handleSubmit}
              variant="contained"
              disabled={isDisableSubmit}
            >
              Submit
            </Button>
            <Button onClick={handleCloseFiltersSettings} variant="outlined">
              Cancel
            </Button>
          </Box>
        </Box>
      </Drawer>
    </Paper>
  );
};
