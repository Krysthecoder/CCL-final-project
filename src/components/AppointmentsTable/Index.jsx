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
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

const AppointmentsTable = ({ rowData }) => {
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
              {[
                'Title',
                'Start Time',
                'End Time',
                'Date',
                'Created By',
                'Description',
                'Actions'
              ].map((headItem, indx) => (
                <StyledTableCell align="center" key={indx}>
                  {headItem}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rowData.map((row) => (
              <AppointmentRow row={row} key={uuidv4()} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

AppointmentsTable.propTypes = {
  rowData: PropTypes.array
};

export default AppointmentsTable;
