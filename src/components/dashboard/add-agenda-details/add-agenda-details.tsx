'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { Fade } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import { type Agenda } from '@prisma/client';
import axios, { type AxiosResponse } from 'axios';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useLanguage } from '@/contexts/language-context';

import AddAgendaDate from '../add-agenda-date/add-agenda-date';
import AddAgendaDetails from '../add-agenda/add-agenda';
import { type ResponseInterface } from '../speakers/interfaces/response.interface';
import styles from './add-agenda-details.module.css';
import { type AgendaDateInterface } from './interfaces/agenda-response.interface';

export default function AddAgendaForm(): React.JSX.Element {
  const { renderLanguage } = useLanguage();

  const steps = [
    renderLanguage('აირჩიეთ თარიღი', 'Please select date'),
    renderLanguage('დაამატეთ დეტალები', 'Please add details'),
  ];
  const [activeStep, setActiveStep] = React.useState(0);
  const [agendaDate, setAgendaDate] = React.useState<AgendaDateInterface | null>(null);
  const [agendaDetails, setAgendaDetails] = React.useState<Agenda[]>([]);

  const searchParams = useSearchParams();

  
  const agendaId = searchParams.get('agendaId');

  const fetchAgenda = React.useCallback(
    async (agenda: string) => {
      const response: AxiosResponse<ResponseInterface<AgendaDateInterface>> = await axios.get(`/api/agenda/${agenda}`);

      if (response.data.success) {
        setAgendaDate(response.data.data);
        setAgendaDetails(response.data.data.agenda)
        setActiveStep(1);
      }
    },
    [agendaId]
  );

  React.useEffect(() => {
    if (agendaId) {
      fetchAgenda(agendaId)
        .then((item) => item)
        .catch((error: unknown) => error);
    }
  }, [agendaId]);

  const agendaDateFormik = useFormik({
    validationSchema: Yup.object({
      date: Yup.string().required(renderLanguage('თარიღი სავალდებულოა', 'Date required')),
    }),
    initialValues: {
      date: dayjs(),
    },
    onSubmit: async (values) => {
      try {
        const data = {
          agenda_date: dayjs(values.date).toISOString(),
        };

        if (agendaDate) {
          //Update logic goes here
          setActiveStep(1);
          return;
        }

        const response: AxiosResponse<ResponseInterface<AgendaDateInterface>> = await axios.post('/api/agenda', data);

        if (response.data.success) {
          setAgendaDate(response.data.data);
          setAgendaDetails(response.data.data.agenda);
          setActiveStep(1);
        }
      } catch (error) {
        return error;
      }
    },
  });

  const addAgendaDetailsFormik = useFormik({
    validationSchema: Yup.object({
      location_ka: Yup.string().required(renderLanguage('ლოკაცია ქართულად სავალდებულოა', 'Location ka required')),
      location_eng: Yup.string().required(renderLanguage('ლოკაცია ინგლისურად სავალდებულოა', 'Title eng required')),
      activity_ka: Yup.string().required(renderLanguage('აქტივობა ქართულად სავალდებულოა', 'Activity ka required')),
      activity_eng: Yup.string().required(renderLanguage('აქტივობა ინგლისურად სავალდებულოა', 'Activity eng required')),
    }),
    initialValues: {
      location_ka: '',
      location_eng: '',
      activity_ka: '',
      activity_eng: '',
      time: dayjs(),
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        if (agendaDate) {
          const response: AxiosResponse<ResponseInterface<Agenda>> = await axios.post(
            `/api/agenda/${agendaDate?.id}`,
            values
          );

          if (response.data.success) {
            setAgendaDetails((prev) => [...prev, response.data.data]);
            resetForm();
          }
        }
      } catch (error) {
        return error;
      }
    },
  });

  const handleNext = () => {
    if (activeStep === 0) {
      agendaDateFormik.handleSubmit();
    }
    if (activeStep === 1) {
      addAgendaDetailsFormik.handleSubmit();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography textAlign="center">{dayjs(agendaDate?.date).format('MM/DD/YYYY')}</Typography>
      <Stepper activeStep={activeStep} className={styles.stepper}>
        {steps.map((label) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          return (
            <Step key={label} {...stepProps} sx={{ color: 'white !important' }}>
              <StepLabel {...labelProps} className={styles.label}>
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box display="flex" width="100%" justifyContent="center" marginTop="26px">
            {activeStep === 0 && (
              <Fade>
                <AddAgendaDate formik={agendaDateFormik} />
              </Fade>
            )}
            {activeStep === 1 && (
              <AddAgendaDetails
                formik={addAgendaDetailsFormik}
                agendaDetails={agendaDetails}
                setAgendaDetails={setAgendaDetails}
              />
            )}
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }} variant="outlined">
              {renderLanguage('უკან', 'Back')}
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {activeStep !== 3 && (
              <Button variant="contained" onClick={handleNext}>
                {renderLanguage('დამატება', 'Add')}
              </Button>
            )}
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
