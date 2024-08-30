import { useState } from 'react';

export const useStatusReset = () => {
  const [createApptStatus, setCreateApptStatus] = useState('initialStatus');
  const [submittingForm, setSubmittingForm] = useState(false);

  const loadingStatus = () => {
    setCreateApptStatus('loadingStatus');
    setSubmittingForm(true);
    resetStatus();
  };

  const failedStatus = () => {
    setCreateApptStatus('failedStatus');
    setSubmittingForm(false);
    resetStatus();
  };

  const successStatus = () => {
    setCreateApptStatus('successStatus');
    resetStatus();
  };

  const resetStatus = () => {
    setTimeout(() => {
      setCreateApptStatus('initialStatus');
      setSubmittingForm(false);
    }, 1500);
  };

  return {
    createApptStatus,
    submittingForm,
    loadingStatus,
    failedStatus,
    successStatus
  };
};

export const dateExtractor = (dateString) => {
  const dateMatch = dateString.match(/(\d{4}-\d{2}-\d{2})/);
  if (dateMatch) {
    return dateMatch[0];
  } else {
    return null;
  }
};

export const timeExtractor = (dateString) => {
  const timeMatch = dateString.match(/T(\d{2}:\d{2}:\d{2})/);
  if (timeMatch) {
    return timeMatch[1];
  } else {
    return null;
  }
};
