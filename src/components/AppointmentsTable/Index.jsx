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
import dayjs from 'dayjs';

const timeExtractor = (dateString) => {
  const timeMatch = dateString.match(/T(\d{2}:\d{2}:\d{2})/);
  if (timeMatch) {
    return timeMatch[1];
  } else {
    return null;
  }
};

const dateExtractor = (dateString) => {
  const dateMatch = dateString.match(/(\d{4}-\d{2}-\d{2})/);
  if (dateMatch) {
    return dateMatch[0];
  } else {
    return null;
  }
};

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

  console.log(rowData);

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    },
    '&:last-child td, &:last-child th': {
      border: 0
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
                  {dayjs(dateExtractor(row.startTime)).format(
                    'ddd, DD MMM YYYY'
                  )}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row?.user?.firstName ?? '--'}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.description || '--'}
                </StyledTableCell>

                <StyledTableCell align="center">
                  <button
                    className="hover:scale-110 ease-in-out"
                    onClick={() => {
                      console.log(row.id);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
          <TableFooter>
            <p>test</p>
          </TableFooter>
        </Table>
      </TableContainer>
    </Paper>
  );
}
