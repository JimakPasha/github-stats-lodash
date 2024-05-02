import { useGetStatistic } from "./hooks";
import { useMemo, useState } from "react";
import { IFilters } from "./types";
import { FiltersSettings, Statistic } from "../../features";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { defaultFilters } from "./constants";

export const GitHubStats = () => {
  const [filters, setFilters] = useState<IFilters>(defaultFilters);

  const {
    sortedLetterFrequency,
    fileNamesCurrent,
    fileNamesAll,
    isLoading,
    isError,
  } = useGetStatistic({ filters });

  const isValidFileNames = useMemo(
    () => !!fileNamesCurrent.length,
    [fileNamesCurrent]
  );

  const handleResetFiltersSettings = () => setFilters(defaultFilters);

  return (
    <>
      <Typography
        variant="h1"
        fontWeight={600}
        fontSize={36}
        sx={{
          textTransform: "uppercase",
          padding: "20px 0",
          textAlign: "center",
        }}
      >
        lodash/lodash repository letter statistics
      </Typography>

      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Stack spacing={2}>
          <FiltersSettings
            defaultFilters={filters}
            fileNamesCurrent={fileNamesCurrent}
            fileNamesAll={fileNamesAll}
            isValidFileNames={isValidFileNames}
            onReset={handleResetFiltersSettings}
            onSubmit={setFilters}
          />
          <Statistic
            data={sortedLetterFrequency}
            isValidFileNames={isValidFileNames}
            isError={isError}
          />
        </Stack>
      )}
    </>
  );
};
