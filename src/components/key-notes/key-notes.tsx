'use client';

import React from 'react';
import { useWindowWidth } from '@/helpers/window-width';
import { Box } from '@mui/material';
import { useInView } from 'react-intersection-observer';

import KeyNoteCard from '../key-note-card/key-note-card';
import { keyNoteData } from './data';

export default function KeyNotes(): React.JSX.Element {
  const windowWidth = useWindowWidth();

  const [ref, inView] = useInView({
    triggerOnce: false,
  });

  return (
    <Box
      sx={{
        backgroundImage: `url(/assets/MainBackground.png)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
      }}
      ref={ref}
    >
      {windowWidth > 1400 ? (
        <Box sx={{ padding: '100px 256px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {keyNoteData.map((item) => {
              return (
                <Box key={item.id}>
                  {item.id === 1 ? (
                    <Box sx={{ marginRight: '20px' }}>
                      <KeyNoteCard width="456px" data={item} />{' '}
                    </Box>
                  ) : null}
                  {item.id === 2 ? <KeyNoteCard width="100%" data={item} /> : null}
                </Box>
              );
            })}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
            {keyNoteData.map((item) => {
              return (
                <Box key={item.id}>
                  {item.id === 3 ? (
                    <Box sx={{ marginRight: '20px' }}>
                      <KeyNoteCard width="100%" data={item} />{' '}
                    </Box>
                  ) : null}
                  {item.id === 4 ? <KeyNoteCard width="456px" data={item} /> : null}
                </Box>
              );
            })}
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            padding: '90px 256px',
            '@media (max-width: 1200px)': {
              padding: '90px 128px',
            },
            '@media (max-width: 1000px)': {
              padding: '80px 64px',
            },
            '@media (max-width: 760px)': {
              padding: '80px 24px',
            },
          }}
        >
          {keyNoteData.map((item) => {
            return (
              <Box key={item.id}>
                <KeyNoteCard width="100%" data={item} />{' '}
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
}
