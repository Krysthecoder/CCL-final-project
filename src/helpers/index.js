import { useState } from 'react';

export const useFormStatusController = () => {
  const [fetchingStatus, setFetchingStatus] = useState('initialStatus');
  const [submittingForm, setSubmittingForm] = useState(false);

  const loadingStatus = () => {
    setFetchingStatus('loadingStatus');
    setSubmittingForm(true);
    resetStatus();
  };

  const failedStatus = () => {
    setFetchingStatus('failedStatus');
    setSubmittingForm(false);
    resetStatus();
  };

  const successStatus = () => {
    setFetchingStatus('successStatus');
    resetStatus();
  };

  const resetStatus = () => {
    setTimeout(() => {
      setFetchingStatus('initialStatus');
      setSubmittingForm(false);
    }, 1500);
  };

  return {
    fetchingStatus,
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
