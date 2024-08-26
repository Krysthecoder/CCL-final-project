import React from 'react';
import NavBar from '../components/NavBar';
import { Link, useLocation } from 'react-router-dom';

function EditAppointment() {
  const location = useLocation();

  const id = location.state.id;
  const title = location.state.title;
  const startTime = location.state.startTime;
  const endTime = location.state.endTime;
  const description = location.state.description;

  return (
    <div>
      <NavBar />
      <h1>{id}</h1>
      <h1>{title}</h1>
      <h1>{startTime}</h1>
      <h1>{endTime}</h1>
      <h1>{description}</h1>
    </div>
  );
}

export default EditAppointment;
