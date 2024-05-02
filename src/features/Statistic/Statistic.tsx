import { FC } from "react";
import {
  Typography,
  List,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { Paper } from "../../shared/ui";

interface StatisticProps {
  data: [string, number][];
  isValidFileNames: boolean;
  isError: boolean;
}

export const Statistic: FC<StatisticProps> = ({
  data,
  isValidFileNames,
  isError,
}) => {
  return (
    <Paper>
      <Typography variant="h4">
        Frequency of occurrence of each letter:
      </Typography>
      <List>
        {isValidFileNames && !isError ? (
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography fontWeight={600}>Letter</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={600}>Frequency</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(([letter, frequency]) => (
                <TableRow key={letter}>
                  <TableCell>{letter}</TableCell>
                  <TableCell>{frequency}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography color="red">Something went wrong</Typography>
        )}
      </List>
    </Paper>
  );
};
