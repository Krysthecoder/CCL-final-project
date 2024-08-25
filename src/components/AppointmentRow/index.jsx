import React, { useState } from 'react';
import dayjs from 'dayjs';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import {
  timeExtractor,
  appointmentDeleter,
  dateExtractor
} from '../../helpers';
import { TrashIcon, EditIcon } from '../../icons';
import ButtonWithIcon from '../ButtonWithIcon';

const AppointmentRow = ({ row, i }) => {
  const [deletingStatus, setDeletingStatus] = useState('initial');

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
    '&:last-child td, &:last-child th': {
      border: 0
    }
  }));
  return (
    <>
      <StyledTableRow
        key={i}
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
          {dayjs(dateExtractor(row.startTime)).format('ddd, DD MMM YYYY')}
        </StyledTableCell>
        <StyledTableCell align="center">
          {row?.user?.firstName ?? '--'}
        </StyledTableCell>
        <StyledTableCell align="center">
          {row.description || '--'}
        </StyledTableCell>

        <StyledTableCell align="center">
          {deletingStatus === 'initial' ? (
            <div className="flex flex-row  justify-around">
              <ButtonWithIcon
                key={i}
                btnCaption=""
                btnClassName="hover:scale-110 ease-in-out"
                IconComp={<EditIcon />}
                onClickFn={() => {
                  console.log(row.id);
                }}
              />
              <ButtonWithIcon
                key={i}
                btnCaption=""
                btnClassName="hover:scale-110 ease-in-out"
                // btnClassName="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                IconComp={<TrashIcon />}
                onClickFn={async () => {
                  setDeletingStatus('deleting');
                  appointmentDeleter(row.id);
                }}
              />
            </div>
          ) : null}
          {deletingStatus === 'deleting' ? <p>working</p> : null}
        </StyledTableCell>
      </StyledTableRow>
    </>
  );
};

export default AppointmentRow;
