'use client';

import * as React from 'react';
import { TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/system';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export function SignInForm(): React.JSX.Element {
  const auth = getAuth();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Must be a valid email').max(255).required('ელ ფოსტა სავალდებულია'),
      password: Yup.string().max(255).required('პაროლი სავალდებულოა'),
    }),
    onSubmit: async (values, helpers) => {
      try {
        await signInWithEmailAndPassword(auth, values.email, values.password);
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: 'Error' });
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <Box
        sx={{
          backgroundColor: 'background.paper',
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '50px',
            width: '100%',
          }}
        >
          <div>
            <form noValidate onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  error={Boolean(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email ? formik.errors.email : null}
                  label="ელ ფოსტა"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                />
                <TextField
                  error={Boolean(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password ? formik.errors.password : null}
                  label="პაროლი"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                />
              </Stack>
              {formik.errors.submit ? <Typography color="error" sx={{ mt: 3 }} variant="body2">
                  {formik.errors.submit}
                </Typography> : null}
              <Button fullWidth size="large" sx={{ mt: 3 }} type="submit" variant="contained">
                შესვლა
              </Button>
            </form>
          </div>
        </Box>
      </Box>
  );
}
