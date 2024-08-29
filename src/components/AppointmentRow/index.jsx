import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { timeExtractor, dateExtractor } from '../../helpers';
import { TrashIcon, EditIcon } from '../../icons';
import ButtonWithIcon from '../ButtonWithIcon';
import { CircularProgress } from '@mui/material';
import { utilsData } from '../../utils/utilsData';

const AppointmentRow = ({ row, i }) => {
  const [deletingStatus, setDeletingStatus] = useState('initial');
  const [rowDeleted, setRowDeleted] = useState('');
  const { apiURL, apiDeleteAppointment } = utilsData;

  const reouteState = {
    id: row.id,
    title: row.title,
    startTime: row.startTime,
    endTime: row.endTime,
    description: row.description
  };

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

  const appointmentDeleter = async (appointmentID) => {
    try {
      const response = await fetch(
        `${apiURL}${apiDeleteAppointment}/${appointmentID}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('fetchedToken')
          }
        }
      );
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      setDeletingStatus('deleted');
      statusReset();
    } catch (error) {
      console.error('Error deleting appointment: ', error);
    }
  };

  const statusReset = () => {
    setTimeout(() => {
      setDeletingStatus('initialStatus');
      setRowDeleted('removed');
    }, 1500);
  };

  return (
    <>
      {rowDeleted !== 'removed' ? (
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
                <Link
                  to={'/EditAppointment'}
                  className="flex items-center"
                  state={reouteState}
                >
                  <ButtonWithIcon
                    key={i}
                    btnClassName="hover:scale-110 ease-in-out"
                    IconComp={<EditIcon />}
                  />
                </Link>
                <ButtonWithIcon
                  key={i}
                  btnCaption=""
                  btnClassName="hover:scale-110 ease-in-out"
                  IconComp={<TrashIcon />}
                  onClickFn={async () => {
                    setDeletingStatus('deleting');
                    appointmentDeleter(row.id);
                  }}
                />
              </div>
            ) : null}
            {deletingStatus === 'deleting' ? (
              <ButtonWithIcon
                key={i}
                btnCaption=""
                btnClassName="hover:scale-110 ease-in-out"
                IconComp={
                  <CircularProgress
                    size={20}
                    sx={{
                      color: 'black'
                    }}
                  />
                }
              />
            ) : deletingStatus === 'deleted' ? (
              <p>deleted</p>
            ) : null}
          </StyledTableCell>
        </StyledTableRow>
      ) : null}
    </>
  );
};

export default AppointmentRow;
