import * as React from 'react';
import Table from '@mui/material/Table';
import { styled } from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableFooter } from '@mui/material';

const timeExtractor = (dateString) => {
  const timeMatch = dateString.match(/T(\d{2}:\d{2}:\d{2})/);
  if (timeMatch) {
    console.log('timeMatch', timeMatch[1]);
    return timeMatch[1];
  } else {
    return null;
  }
};

export default function AppointmentsTable({ rowData }) {
  console.log('rowData', rowData);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#0284c7',
      color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14
    }
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0
    }
  }));

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer component={Paper}>
        <Table
          stickyHeader
          sx={{
            minWidth: 650,
            maxHeight: 200
          }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Title</StyledTableCell>
              <StyledTableCell align="center">StartTime</StyledTableCell>
              <StyledTableCell align="center">EndTime</StyledTableCell>
              <StyledTableCell align="center">Created By</StyledTableCell>
              <StyledTableCell align="center">Description</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowData.map((row) => (
              <StyledTableRow
                key={row.title}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <StyledTableCell component="th" align="center" scope="row">
                  {row.title}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {timeExtractor(row.startTime)}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {timeExtractor(row.endTime)}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.createdBy}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.description || '--'}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
          <TableFooter>Testing</TableFooter>
        </Table>
      </TableContainer>
    </Paper>
  );
}
