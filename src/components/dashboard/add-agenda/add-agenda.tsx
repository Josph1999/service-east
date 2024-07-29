'use client';

import * as React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Fade,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import Stack from '@mui/material/Stack';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { type Agenda } from '@prisma/client';
import axios, { AxiosResponse } from 'axios';
import dayjs, { type Dayjs } from 'dayjs';
import { useFormik, type FormikProps } from 'formik';
import * as Yup from 'yup';

import { useLanguage } from '@/contexts/language-context';

import { ResponseInterface } from '../speakers/interfaces/response.interface';
import styles from './add-agenda.module.css';

interface AgendaDateProps {
  formik: FormikProps<{
    location_ka: string;
    location_eng: string;
    activity_ka: string;
    activity_eng: string;
    time: Dayjs;
  }>;
  agendaDetails: Agenda[];
  setAgendaDetails: (value: Agenda[]) => void;
}

export default function AddAgendaDetails(props: AgendaDateProps): React.JSX.Element {
  const { renderLanguage } = useLanguage();

  const { formik, agendaDetails, setAgendaDetails } = props;

  const [agendaDetailData, setAgendaDetailData] = React.useState<Agenda | null>(null);

  const setValue = (date: Dayjs | null): void => {
    formik
      .setFieldValue('time', date)
      .then((data) => {
        data;
      })
      .catch((error: unknown) => {
        error;
      });
  };

  React.useEffect(() => {
    setAgendaDetails(agendaDetails);
  }, [agendaDetails]);

  const addAgendaDetailsFormik = useFormik({
    validationSchema: Yup.object({
      location_ka: Yup.string().required(renderLanguage('ლოკაცია ქართულად სავალდებულოა', 'Location ka required')),
      location_eng: Yup.string().required(renderLanguage('ლოკაცია ინგლისურად სავალდებულოა', 'Title eng required')),
      activity_ka: Yup.string().required(renderLanguage('აქტივობა ქართულად სავალდებულოა', 'Activity ka required')),
      activity_eng: Yup.string().required(renderLanguage('აქტივობა ინგლისურად სავალდებულოა', 'Activity eng required')),
    }),
    initialValues: {
      location_ka: agendaDetailData?.activity_ka ? agendaDetailData?.activity_ka : '',
      location_eng: agendaDetailData?.location_eng ? agendaDetailData?.location_eng : '',
      activity_ka: agendaDetailData?.activity_ka ? agendaDetailData?.activity_ka : '',
      activity_eng: agendaDetailData?.activity_eng ? agendaDetailData?.activity_eng : '',
      time: dayjs(),
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        if (agendaDetailData) {
          const response: AxiosResponse<ResponseInterface<Agenda>> = await axios.patch(
            `/api/agenda/${agendaDetailData?.id}`,
            values
          );

          if (response.data.success) {
            const newAgendaDetails: Agenda[] = agendaDetails.map((detail) => {
              if (detail.id === agendaDetailData.id) {
                return {
                  created_at: agendaDetailData.created_at,
                  id: agendaDetailData.id,
                  activity_eng: values.activity_eng,
                  activity_ka: values.activity_ka,
                  location_eng: values.location_eng,
                  location_ka: values.location_ka,
                  time: dayjs(values.time).toDate(),
                  updated_at: agendaDetailData.updated_at,
                  agenda_date_id: agendaDetailData.agenda_date_id,
                  description_eng: agendaDetailData.description_eng,
                  description_ka: agendaDetailData.description_ka,
                };
              }
              return detail;
            });

            setAgendaDetails(newAgendaDetails);
            setAgendaDetailData(null);
            resetForm();
          }
        }
      } catch (error) {
        return error;
      }
    },
  });

  const handleRemoveAgenda = async (agendaId: string) => {
    const response: AxiosResponse<ResponseInterface<Agenda>> = await axios.delete(`/api/agenda/${agendaId}`);

    if (response.data.success) {
      setAgendaDetails(agendaDetails.filter((item) => item.id !== agendaId));
    }
  };

  const setEditedValue = (date: Dayjs | null): void => {
    addAgendaDetailsFormik
      .setFieldValue('time', date)
      .then((data) => {
        data;
      })
      .catch((error: unknown) => {
        error;
      });
  };

  return (
    <Fade in>
      <Stack spacing={3}>
        <form onSubmit={formik.handleSubmit} noValidate>
          <Stack spacing={2}>
            <Box className={styles.boxWrapper}>
              <Box>
                <Box display="flex" alignItems="center" gap="20px">
                  <Typography>აირჩიეთ საათი</Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                      <TimePicker
                        label="Basic date picker"
                        value={formik.values.time}
                        onChange={(newValue) => {
                          setValue(newValue);
                        }}
                        ampm={false}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Box>
              </Box>
              <TextField
                error={Boolean(formik.touched.location_ka && formik.errors.location_ka)}
                helperText={formik.touched.location_ka ? formik.errors.location_ka : null}
                label={renderLanguage('ლოკაცია ქართულად', 'Location ka')}
                name="location_ka"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.location_ka}
                fullWidth
                className={styles.input}
              />
              <TextField
                error={Boolean(formik.touched.location_eng && formik.errors.location_eng)}
                helperText={formik.touched.location_eng ? formik.errors.location_eng : null}
                label={renderLanguage('ლოკაცია ინგლისურად', 'Location eng')}
                name="location_eng"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.location_eng}
                fullWidth
                className={styles.input}
              />
              <TextField
                error={Boolean(formik.touched.activity_ka && formik.errors.activity_ka)}
                helperText={formik.touched.activity_ka ? formik.errors.activity_ka : null}
                label={renderLanguage('აქტივობა ქართულად', 'Activity ka')}
                name="activity_ka"
                fullWidth
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.activity_ka}
                className={styles.input}
              />
              <TextField
                error={Boolean(formik.touched.activity_eng && formik.errors.activity_eng)}
                helperText={formik.touched.activity_eng ? formik.errors.activity_eng : null}
                label={renderLanguage('აქტივობა ინგლისურად', 'Activity eng')}
                name="activity_eng"
                fullWidth
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.activity_eng}
                className={styles.input}
              />
            </Box>
          </Stack>
        </form>
        <Box>
          {agendaDetails.length ? (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>{renderLanguage('დრო', 'Time')}</TableCell>
                    <TableCell align="center">{renderLanguage('ლოკაცია ქართულად', 'Location ka')}</TableCell>
                    <TableCell align="center">{renderLanguage('ლოკაცია ინგლისურად', 'Location eng')}</TableCell>
                    <TableCell align="center">{renderLanguage('აქტივობა ქართულად', 'Activity ka')}</TableCell>
                    <TableCell align="center">{renderLanguage('აქტივობა ინგლისურად', 'Activity eng')}</TableCell>
                    <TableCell align="center">{renderLanguage('რედაქტირება/წაშლა', 'Edit/Delete')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {agendaDetails.map((row) => (
                    <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell align="center" width="250px">
                        {agendaDetailData && agendaDetailData?.id === row.id ? (
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                              <TimePicker
                                label="Basic date picker"
                                value={addAgendaDetailsFormik.values.time}
                                onChange={(newValue) => {
                                  setEditedValue(newValue);
                                }}
                                ampm={false}
                              />
                            </DemoContainer>
                          </LocalizationProvider>
                        ) : (
                          `${new Date(row.time).getHours().toString()}:${new Date(row.time).getMinutes().toString()}`
                        )}
                      </TableCell>
                      <TableCell align="center" width="250px">
                        {agendaDetailData && agendaDetailData?.id === row.id ? (
                          <TextField
                            error={Boolean(
                              addAgendaDetailsFormik.touched.activity_ka && addAgendaDetailsFormik.errors.activity_ka
                            )}
                            helperText={
                              addAgendaDetailsFormik.touched.activity_ka
                                ? addAgendaDetailsFormik.errors.activity_ka
                                : null
                            }
                            label={renderLanguage('აქტივობა ქართულად', 'Activity ka')}
                            name="activity_ka"
                            onBlur={addAgendaDetailsFormik.handleBlur}
                            onChange={addAgendaDetailsFormik.handleChange}
                            value={addAgendaDetailsFormik.values.activity_ka}
                            fullWidth
                            className={styles.input}
                          />
                        ) : (
                          row.activity_ka
                        )}
                      </TableCell>
                      <TableCell align="center" width="250px">
                        {agendaDetailData && agendaDetailData?.id === row.id ? (
                          <TextField
                            error={Boolean(
                              addAgendaDetailsFormik.touched.activity_eng && addAgendaDetailsFormik.errors.activity_eng
                            )}
                            helperText={
                              addAgendaDetailsFormik.touched.activity_eng
                                ? addAgendaDetailsFormik.errors.activity_eng
                                : null
                            }
                            label={renderLanguage('აქტივობა ინგლისურად', 'Location eng')}
                            name="activity_eng"
                            onBlur={addAgendaDetailsFormik.handleBlur}
                            onChange={addAgendaDetailsFormik.handleChange}
                            value={addAgendaDetailsFormik.values.activity_eng}
                            fullWidth
                            className={styles.input}
                          />
                        ) : (
                          row.activity_eng
                        )}
                      </TableCell>
                      <TableCell align="center" width="250px">
                        {agendaDetailData && agendaDetailData?.id === row.id ? (
                          <TextField
                            error={Boolean(
                              addAgendaDetailsFormik.touched.location_ka && addAgendaDetailsFormik.errors.location_ka
                            )}
                            helperText={
                              addAgendaDetailsFormik.touched.location_ka
                                ? addAgendaDetailsFormik.errors.location_ka
                                : null
                            }
                            label={renderLanguage('ლოკაცია ქართულად', 'Location ka')}
                            name="location_ka"
                            onBlur={addAgendaDetailsFormik.handleBlur}
                            onChange={addAgendaDetailsFormik.handleChange}
                            value={addAgendaDetailsFormik.values.location_ka}
                            fullWidth
                            className={styles.input}
                          />
                        ) : (
                          row.location_ka
                        )}
                      </TableCell>
                      <TableCell align="center" width="250px">
                        {agendaDetailData && agendaDetailData?.id === row.id ? (
                          <TextField
                            error={Boolean(
                              addAgendaDetailsFormik.touched.location_eng && addAgendaDetailsFormik.errors.location_eng
                            )}
                            helperText={
                              addAgendaDetailsFormik.touched.location_eng
                                ? addAgendaDetailsFormik.errors.location_eng
                                : null
                            }
                            label={renderLanguage('ლოკაცია ინგლისურად', 'Location eng')}
                            name="location_eng"
                            onBlur={addAgendaDetailsFormik.handleBlur}
                            onChange={addAgendaDetailsFormik.handleChange}
                            value={addAgendaDetailsFormik.values.location_eng}
                            fullWidth
                            className={styles.input}
                          />
                        ) : (
                          row.location_eng
                        )}
                      </TableCell>
                      <TableCell width="300px" align="center">
                        <IconButton
                          onClick={() => {
                            setAgendaDetailData(row);
                            addAgendaDetailsFormik
                              .setFieldValue('time', dayjs(row.time))
                              .then((data) => {
                                data;
                              })
                              .catch((error: unknown) => {
                                error;
                              });
                            addAgendaDetailsFormik
                              .setFieldValue('activity_ka', row.activity_ka)
                              .then((data) => {
                                data;
                              })
                              .catch((error: unknown) => {
                                error;
                              });
                            addAgendaDetailsFormik
                              .setFieldValue('activity_eng', row.activity_eng)
                              .then((data) => {
                                data;
                              })
                              .catch((error: unknown) => {
                                error;
                              });
                            addAgendaDetailsFormik
                              .setFieldValue('location_ka', row.location_ka)
                              .then((data) => {
                                data;
                              })
                              .catch((error: unknown) => {
                                error;
                              });
                            addAgendaDetailsFormik
                              .setFieldValue('location_eng', row.location_eng)
                              .then((data) => {
                                data;
                              })
                              .catch((error: unknown) => {
                                error;
                              });
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            handleRemoveAgenda(row.id)
                              .then((data) => data)
                              .catch((error: unknown) => error);
                          }}
                        >
                          <DeleteIcon sx={{ color: 'red' }} />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            addAgendaDetailsFormik.handleSubmit();
                          }}
                        >
                          <CheckIcon sx={{ color: 'green' }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    // </ClickAwayListener>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : null}
        </Box>
      </Stack>
    </Fade>
  );
}
