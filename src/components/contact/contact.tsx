'use client';

import React, { useState } from 'react';
import { Alert, Box, Button, FormHelperText, Snackbar, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import * as Yup from 'yup';

import { useLanguage } from '@/contexts/language-context';

import GoogleMaps from '../google-maps/google-maps';
import DirectionIcon from '../icons/direction';
import DotsIcon from '../icons/dots-icon';
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
      message: Yup.string().required(renderLanguage('აღწერა სავალდებულოა', 'Message is required')),
    }),
    initialValues: {
      name: '',
      last_name: '',
      email: '',
      subject: '',
      message: '',
      phone_number: null,
    },
    onSubmit: async (values, currFormik) => {
      const dataToSend = {
        first_name: values.name,
        last_name: values.last_name,
        description: values.message,
        subject: values.subject,
        email: values.email,
      };
      await axios.post('/api/contact-form', dataToSend);
      setOpen(true);
      currFormik.resetForm();
    },
  });

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, duration: 5 },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, duration: 5 },
  };

  return (
    <motion.div variants={fadeInVariants} initial="hidden" animate="visible" transition={{ duration: 0.6 }}>
      <Box
        sx={{
          backgroundImage: `url(/assets/DotsBackground.png)`, // replace with your SVG file path
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
          <Box
            component={motion.div}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            sx={{
              paddingRight: '256px',
              display: 'flex',
              marginBottom: '120px',
              justifyContent: 'space-around',
              '@media (max-width: 1200px)': {
                paddingRight: '128px',
              },
              '@media (max-width: 900px)': {
                flexDirection: 'column',
                paddingRight: '0px',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '24px',
                marginTop: '0px',
                paddingTop: '90px',
              },
            }}
          >
            <DotsIcon />

            <Typography
              component={motion.div}
              variants={fadeInUp}
              sx={{
                fontSize: '32px',
                fontWeight: 700,
                fontFeatureSettings: "'case' on",
                color: 'black',
                padding: '64px 0px',
                '@media (max-width: 900px)': {
                  padding: '0px',
                },
              }}
            >
              {renderLanguage('კონტაქტი', 'Contact')}
            </Typography>
            <Typography
              component={motion.div}
              variants={fadeInUp}
              sx={{
                fontFeatureSettings: "'case' on",
                color: 'black',
                width: '600px',
                padding: '64px 0px',
                '@media (max-width: 900px)': {
                  padding: '0px',
                  paddingBottom: '24px',
                  width: '100%',
                },
              }}
            >
              {renderLanguage(
                'გახდი ჩვენი პარტნიორი - ერთად შევცვალოთ ხარისხი სტანდარტი ინდუსტრიაში!',
                `Service East Georgia’s team is open for new horizons of partnerships. If you share our vision and objectives, reach out to discuss joint ventures and opportunities!`
              )}
            </Typography>
          </Box>
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
                href="tel:+995511333386"
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
                  <PhoneIcon /> +995 511 33 33 86
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
                  `გურამ ფანჯიკიძის 22, ბლოკი ა, ოფისი 7, 0160, თბილისი, საქართველო`,
                  `Guram Panjikidze Street 22, Block A, Office 7, 0160, Tbilisi, Georgia`
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
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              {renderLanguage('ფორმა წარმატებით გაიგზავნა!', 'Form submitted successfully!')}
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </motion.div>
  );
}
