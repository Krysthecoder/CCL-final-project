import React, { useState } from 'react';
import dayjs from 'dayjs';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { timeExtractor, dateExtractor } from '../../helpers';
import { TrashIcon, EditIcon } from '../../icons';
import ButtonWithIcon from '../ButtonWithIcon';
import { CircularProgress } from '@mui/material';
import { utilsData } from '../../utils/utilsData';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

const AppointmentRow = ({ row, i }) => {
  const [deletingStatus, setDeletingStatus] = useState('initial');
  const [rowDeleted, setRowDeleted] = useState('');
  const { apiURL, apiAppointments } = utilsData;
  const tableCellKey = uuidv4();

  const routeState = {
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
        `${apiURL}${apiAppointments}/${appointmentID}`,
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
          key={tableCellKey}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <StyledTableCell
            component="th"
            align="center"
            scope="row"
            key={tableCellKey}
          >
            {row.title}
          </StyledTableCell>
          <StyledTableCell align="center" key={tableCellKey}>
            {timeExtractor(row.startTime)}
          </StyledTableCell>
          <StyledTableCell align="center" key={tableCellKey}>
            {timeExtractor(row.endTime)}
          </StyledTableCell>
          <StyledTableCell align="center" key={tableCellKey}>
            {dayjs(dateExtractor(row.startTime)).format('ddd, DD MMM YYYY')}
          </StyledTableCell>
          <StyledTableCell align="center" key={tableCellKey}>
            {row?.user?.firstName ?? '--'}
          </StyledTableCell>
          <StyledTableCell align="center" key={tableCellKey}>
            {row.description || '--'}
          </StyledTableCell>

          <StyledTableCell align="center">
            {deletingStatus === 'initial' ? (
              <div className="flex flex-row  justify-around">
                <ButtonWithIcon
                  key={tableCellKey}
                  linkType={true}
                  linkRoute={'/EditAppointment'}
                  linkClassName="flex items-center"
                  linkState={routeState}
                  btnClassName="hover:scale-110 ease-in-out"
                  IconComp={<EditIcon />}
                />
                <ButtonWithIcon
                  key={tableCellKey}
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
                key={tableCellKey}
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

AppointmentRow.propTypes = {
  row: PropTypes.object,
  i: PropTypes.number
};

export default AppointmentRow;
