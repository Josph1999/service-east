'use client';

import React, { useState } from 'react';
import { Box, Button, FormHelperText, TextField, Typography, Snackbar, Alert } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useLanguage } from '@/contexts/language-context';

import GoogleMaps from '../google-maps/google-maps';
import DirectionIcon from '../icons/direction';
import MailIcon from '../icons/mail';
import PhoneIcon from '../icons/phone';

export default function Contact(): React.JSX.Element {
  const { renderLanguage } = useLanguage();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    validationSchema: Yup.object({
      name: Yup.string()
        .required(renderLanguage('სახელი სავალდებულოა', 'Name is required'))
        .max(20, renderLanguage('მაქს 20 ', 'Max 20')),
      last_name: Yup.string()
        .required(renderLanguage('გვარი სავალდებულოა', 'Lastname is required'))
        .max(20, renderLanguage('მაქს 20 ', 'Max 20')),
      email: Yup.string()
        .email()
        .required(renderLanguage('მეილი სავალდებულოა', 'Mail is required'))
        .max(130, renderLanguage('მაქს 130 ', 'Max 130')),
      subject: Yup.string()
        .required(renderLanguage('სათაური სავალდებულოა', 'Subject is required'))
        .max(50, renderLanguage('მაქს 50 ', 'Max 50')),
      message: Yup.string()
        .required(renderLanguage('აღწერა სავალდებულოა', 'Message is required'))
        .max(250, renderLanguage('მაქს 250 ', 'Max 250')),
    }),
    initialValues: {
      name: '',
      last_name: '',
      email: '',
      subject: '',
      message: '',
      phone_number: null,
    },
    onSubmit: (values, currFormik) => {
      console.log('Values:', values);
      setOpen(true);
      currFormik.resetForm();
    },
  });

  return (
    <Box
      sx={{
        backgroundImage: `url(/assets/Rectangle.png)`, // replace with your SVG file path
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'right',
      }}
    >
      <Box
        sx={{
          padding: '128px',
          '@media (max-width: 800px)': {
            padding: '20px',
            marginTop: '120px',
          },
        }}
      >
        <Typography sx={{ fontFeatureSettings: "'case' on" }} fontSize={32}>
          {renderLanguage('კონტაქტი', 'Contact')}
        </Typography>
        <Typography sx={{ fontFeatureSettings: "'case' on" }}>
          {renderLanguage(
            'ინფორმაციის მისაღებად ან ნებისმიერ სხვა საკითხთან დაკავშირებით, დაგვიკავშირდით: ',
            'For information or any other matter, contact us:'
          )}
        </Typography>
        <Box
          marginTop={5}
          marginBottom={5}
          sx={{
            display: 'flex',
            gap: '20px',
            '@media (max-width: 800px)': {
              flexDirection: 'column',
            },
          }}
        >
          <Button
            fullWidth
            sx={{
              borderBottom: '1px solid #232C65',
              borderRadius: '0px',
              color: '#232C65',
            }}
          >
            <a
              href="tel:+380443443901"
              style={{
                color: '#4338CA',
                textDecoration: 'none',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <Box
                sx={{
                  color: '#4338CA',
                  textDecoration: 'none',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '10px',
                  '@media (max-width: 800px)': {
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                  },
                }}
              >
                <PhoneIcon /> +380 (44) 344 39 01
              </Box>
            </a>
          </Button>
          <Button
            fullWidth
            sx={{
              borderBottom: '1px solid #232C65',
              borderRadius: '0px',
              textTransform: 'none',
              color: '#232C65',
            }}
          >
            <Box
              sx={{
                color: '#4338CA',
                textDecoration: 'none',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
                '@media (max-width: 800px)': {
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                },
              }}
            >
              {' '}
              <DirectionIcon />{' '}
              {renderLanguage(
                `SERVICE EAST LLC
"Horizon Office Tower"
42-44 Shovkovychna Str, office 2-A
01601 Kyiv Ukraine`,
                `SERVICE EAST LLC
"Horizon Office Tower"
42-44 Shovkovychna Str, office 2-A
01601 Kyiv Ukraine`
              )}
            </Box>
          </Button>
          <Button
            fullWidth
            sx={{
              borderBottom: '1px solid #232C65',
              borderRadius: '0px',
              textTransform: 'none',
              color: '#232C65',
            }}
          >
            <a
              href="mailto:info@service-east.com"
              style={{
                color: '#4338CA',
                textDecoration: 'none',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <Box
                sx={{
                  color: '#4338CA',
                  textDecoration: 'none',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '10px',
                  '@media (max-width: 800px)': {
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                  },
                }}
              >
                <MailIcon /> info@service-east.com
              </Box>
            </a>
          </Button>
        </Box>
        <GoogleMaps />
        <form noValidate onSubmit={formik.handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '40px', marginTop: '80px' }}>
            <Typography sx={{ fontSize: '26px', fontWeight: 700, fontFeatureSettings: "'case' on" }}>
              {renderLanguage('კონტაქტის ფორმა', 'Contact Form')}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                gap: '150px',
                '@media (max-width: 700px)': {
                  flexDirection: 'column',
                  gap: '40px',
                },
              }}
            >
              <TextField
                error={Boolean(formik.touched.name && formik.errors.name)}
                helperText={formik.touched.name ? formik.errors.name : null}
                label={renderLanguage('სახელი', 'Name')}
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.name}
                required
                fullWidth
                variant="standard"
              />
              <TextField
                error={Boolean(formik.touched.last_name && formik.errors.last_name)}
                helperText={formik.touched.last_name ? formik.errors.last_name : null}
                label={renderLanguage('გვარი', 'Last Name')}
                name="last_name"
                onBlur={formik.handleBlur}
                required
                onChange={formik.handleChange}
                value={formik.values.last_name}
                fullWidth
                variant="standard"
              />
            </Box>
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              helperText={formik.touched.email ? formik.errors.email : null}
              label={renderLanguage('მეილი', 'Email')}
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              required
              value={formik.values.email}
              fullWidth
              variant="standard"
            />
            <TextField
              error={Boolean(formik.touched.subject && formik.errors.subject)}
              helperText={formik.touched.subject ? formik.errors.subject : null}
              label={renderLanguage('სათაური', 'Subject')}
              name="subject"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              required
              value={formik.values.subject}
              fullWidth
              variant="standard"
            />
            <textarea
              name="message"
              value={formik.values.message}
              onChange={formik.handleChange}
              required
              onBlur={formik.handleBlur}
              placeholder={renderLanguage('აღწერა მაქსიმუმ 250 სიმბოლო *', 'Message Max 250 symbols *')}
              style={{
                width: '100%',
                border: 'none',
                borderBottom: '1px solid #000',
                resize: 'none',
                padding: '8px 0',
                fontFamily: 'UpperCaseGeo',
                fontSize: '16px',
                backgroundColor: 'transparent',
              }}
              rows={5}
            />
            <FormHelperText sx={{ color: 'red' }}>
              {formik.touched.message ? formik.errors.message : null}
            </FormHelperText>
            <Button variant="outlined" type="submit">
              {renderLanguage('გაგზავნა', 'Send')}
            </Button>
          </Box>
        </form>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}   anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }} >
            {renderLanguage('ფორმა წარმატებით გაიგზავნა!', 'Form submitted successfully!')}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}
