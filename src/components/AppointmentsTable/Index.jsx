import * as React from 'react';
import Table from '@mui/material/Table';
import { styled } from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AppointmentRow from '../AppointmentRow';

export default function AppointmentsTable({ rowData }) {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#0284c7',
      color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14
    }
  }));

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }} className="mt-4">
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
              <StyledTableCell align="center">Date</StyledTableCell>
              <StyledTableCell align="center">Created By</StyledTableCell>
              <StyledTableCell align="center">Description</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowData.map((row, i) => (
              <AppointmentRow row={row} i={i} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
