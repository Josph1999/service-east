import React from 'react';
import { type FormSubmissionInterface } from '@/app/api/contact-form/interfaces/form-submission.interface';
import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material';
import dayjs from 'dayjs';

import styles from './contact-form-card.module.css';

export interface PublishedVacancyCardProps {
  contactForm: FormSubmissionInterface;
}

export default function ContactFormsCard(props: PublishedVacancyCardProps): React.JSX.Element {
  const {
    contactForm: { first_name: firstName, last_name: lastName, created_at: createdAt, description, email },
  } = props;

  return (
    <Card className={styles.card}>
      <CardHeader title={`${firstName} ${lastName}`} />
      <CardContent>
        {dayjs(createdAt).format('DD/MM/YYYY')}{' '}
        <Box sx={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
          <Typography sx={{ display: 'flex', gap: '12px' }}>სათაური: {`${firstName} ${lastName}`}</Typography>
          <Typography sx={{ display: 'flex', gap: '12px' }}>მეილი: {email}</Typography>
          <Typography sx={{ display: 'flex', gap: '12px' }}>აღწერა: {description}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
