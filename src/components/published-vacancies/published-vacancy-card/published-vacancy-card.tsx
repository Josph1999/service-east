import React from 'react';
import { useRouter } from 'next/navigation';
import EditIcon from '@mui/icons-material/Edit';
import { Card, CardContent, CardHeader, IconButton } from '@mui/material';
import dayjs from 'dayjs';

import { paths } from '@/paths';
import { useLanguage } from '@/contexts/language-context';
import { type Vacancy } from '@/components/interfaces/response.interface';

import styles from './published-vacancy-card.module.css';

export interface PublishedVacancyCardProps {
  vacancy: Vacancy;
}

export default function PublishedVacancyCard(props: PublishedVacancyCardProps): React.JSX.Element {
  const {
    vacancy: { title_eng: titleEng, title_ka: titleKa, id },
  } = props;

  const { renderLanguage } = useLanguage();

  const router = useRouter();

  return (
    <Card className={styles.card}>
      <CardHeader
        title={renderLanguage(titleKa.slice(0, 30), titleEng.slice(0, 30))}
        action={
          <IconButton
            onClick={() => {
              router.push(`${paths.dashboard.publishedVacancies}/${id}`);
            }}
          >
            <EditIcon />
          </IconButton>
        }
      />
      <CardContent>{dayjs().format('DD/MM/YYYY')}</CardContent>
    </Card>
  );
}
