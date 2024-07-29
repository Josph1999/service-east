'use client';

import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
// import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useLanguage } from '@/contexts/language-context';

export default function Subscribe(): React.JSX.Element {
  const { renderLanguage } = useLanguage();

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required(renderLanguage('გთხოვთ შეიყვანოთ მეილი', 'Please enter email'))
        .email(renderLanguage('გთხოვთ შეიყვანოთ სწორი ფორმატით', 'Please enter correct email')),
    }),
    onSubmit: async () => {
      formik.resetForm();
      setLoading(false);
    //   await axios.post(`${process.env.NEXT_PUBLIC_ACT_API_URL || ''}/subscribe?email=${valules.email}`);
    },
  });

  return (
    <Box
      sx={{
        padding: '64px 128px',
        backgroundColor: '#F0F5FE',
        '@media (max-width: 760px)': {
          padding: '24px !important',
        },
        '@media (max-width: 1000px)': {
          padding: '64px',
        },
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '256px',
          '@media (max-width: 1224px)': {
            flexWrap: 'wrap',
            gap: '16px',
          },
        }}
      >
        <Typography fontSize={22} fontWeight={700} sx={{ fontFeatureSettings: "'case' on" }}>
          {renderLanguage(
            `გამოიწერე სიახლეები ორგანიზაციის საქმიანობის შესახებ`,
            `Subscribe to news about the organization's activities`
          )}
        </Typography>

        <Box sx={{ display: 'flex', width: '100%', gap: '16px' }}>
          <TextField
            fullWidth
            id="standard-basic"
            sx={{ '& label': { fontFeatureSettings: "'case' on" } }}
            label={renderLanguage(`თქვენი ელფოსტის მისამართი`, `Your email address`)}
            variant="standard"
            error={Boolean(formik.touched.email && formik.errors.email)}
            helperText={formik.touched.email ? formik.errors.email : null}
            onChange={formik.handleChange}
            value={formik.values.email}
            name="email"
          />
          <Button
            variant="contained"
            onClick={() => {
              formik.handleSubmit();
            }}
            disabled={loading}
          >
            {renderLanguage(`გამოწერა`, `Subscribe`)}
          </Button>
        </Box>
      </Box>
      <Typography fontSize={16} sx={{ marginTop: '48px', fontFamily: 'UpperCaseGeo' }}>
        {renderLanguage(
          `თქვენი ელფოსტის მისამართის შეყვანით, თქვენ თანახმა ხართ მიიღოთ განახლებები ACT Georgia-ს შესახებ. მეტი ინფორმაციის მისაღებად, თუ როგორ ვიყენებთ და დავიცვათ თქვენი პერსონალური მონაცემები, გთხოვთ, იხილოთ ჩვენი კონფიდენციალურობის პოლიტიკა.`,
          `By entering your e-mail address, you agree to receive updates about the work of ACT Georgia. For more information on how we use and protect your personal data, please see our privacy policy.`
        )}
      </Typography>
    </Box>
  );
}
