import React from 'react';
import { useRouter } from 'next/navigation';
import EditIcon from '@mui/icons-material/Edit';
import { Card, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import parser from 'html-react-parser';

import { paths } from '@/paths';
import { useLanguage } from '@/contexts/language-context';

import { type NewsInterface } from '../interfaces/news.interface';
import styles from './published-news-card.module.css';

export interface PublishedNewsCardProps {
  news: NewsInterface;
}

export default function PublishedNewsCard(props: PublishedNewsCardProps): React.JSX.Element {
  const {
    news: { description_eng: descEng, description_ka: descKa, images, title_eng: titleEng, title_ka: titleKa, id },
  } = props;

  const { renderLanguage } = useLanguage();

  const router = useRouter();

  return (
    <Card className={styles.card}>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
        <IconButton
          onClick={() => {
            router.push(`${paths.dashboard.publishedNews}/${id}`);
          }}
        >
          <EditIcon />
        </IconButton>
      </Box>
      <CardHeader title={renderLanguage(titleKa.slice(0, 30), titleEng.slice(0, 30))} />
      <CardContent>
        <img
          src={images[0].url}
          alt={images[0].original_name}
          width={0}
          height={0}
          style={{ width: '100%', height: '200px', objectFit: 'cover' }}
        />
        <Typography>{parser(renderLanguage(descKa.slice(0, 50), descEng.slice(0, 50)))}</Typography>
      </CardContent>
    </Card>
  );
}
