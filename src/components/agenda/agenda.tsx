'use client';

import * as React from 'react';
import { useWindowWidth } from '@/helpers/window-width';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import axios, { type AxiosResponse } from 'axios';
import dayjs from 'dayjs';

import { useLanguage } from '@/contexts/language-context';

import { type ResponseInterface } from '../dashboard/speakers/interfaces/response.interface';
import CalendarIcon from '../icons/calendar-icon';
import GreenDotIcon from '../icons/green-dot-icon';
import LocationIcon from '../icons/location-icon';
import TimeIcon from '../icons/time-icon';
import { type AgendaInterface } from './interfaces/agenda.interface';

export default function Agenda(): React.JSX.Element {
  const handleChange = (event: React.SyntheticEvent, newValue: string): void => {
    setValue(newValue);
  };

  const [agenda, setAgenda] = React.useState<AgendaInterface[]>([]);

  const { renderLanguage } = useLanguage();

  const fetchAgenda = React.useCallback(async (): Promise<void> => {
    const response: AxiosResponse<ResponseInterface<AgendaInterface[]>> = await axios.get(`/api/agenda`);

    if (response.data.success) {
      setAgenda(response.data.data);
    }
  }, []);

  React.useEffect(() => {
    fetchAgenda().catch((error: unknown) => {
      console.error('Error in fetchSpeakers:', error);
    });
  }, [fetchAgenda]);
  const [value, setValue] = React.useState('255a7ab4-415f-459e-beb6-b8def2c46cc1');

  const windowWidth = useWindowWidth();

  const renderColor = (panel: string): string => {
    if (panel.includes('Panel Discussion 1')) {
      return '#FF7B00';
    }

    if (panel.includes('Panel Discussion 2')) {
      return '#059666';
    }

    if (panel.includes('Panel Discussion 3')) {
      return '#D70000';
    }

    return 'transparent';
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(/assets/MainBackground.png)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Box
        sx={{
          width: '100%',
          padding: '84px 256px',
          marginTop: '120px',
          backgroundImage: `url(/assets/Vector.png)`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'left',
          backgroundSize: 'contain',
          '@media (max-width: 1200px)': {
            padding: '90px 128px',
          },
          '@media (max-width: 1000px)': {
            padding: '80px 64px',
          },
          '@media (max-width: 760px)': {
            padding: '0px 24px',
          },
        }}
      >
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example" variant="scrollable">
              {agenda.length > 0
                ? agenda.map((agendaData, index) => {
                    return (
                      <Tab
                        key={agendaData.id}
                        label={`${renderLanguage('დღე', 'Day')} ${(index + 1).toString()}: ${renderLanguage('ივლისი', 'July')} ${dayjs(agendaData.date).format('D')}`}
                        value={agendaData.id}
                      />
                    );
                  })
                : null}
            </TabList>
          </Box>
          {agenda.length > 0
            ? agenda
                .find((item) => item.id === value)
                ?.agenda.map((agendaData, idx) => {
                  return (
                    <TabPanel
                      key={agendaData.id}
                      value={agendaData.agenda_date_id}
                      sx={{ display: 'flex', flexWrap: 'wrap' }}
                    >
                      <Box>
                        {idx === 0 ? (
                          <Box>
                            <Box display="flex" gap="16px" width="300px">
                              <CalendarIcon />{' '}
                              <Box>
                                <Typography
                                  variant="h6"
                                  sx={{
                                    color: '#232C65 !important',
                                  }}
                                >
                                  {renderLanguage('დღე', 'Day')}{' '}
                                  {(agenda.findIndex((item) => item.id === value) + 1).toString()}:{' '}
                                  {dayjs(agenda.find((item) => item.id === value)?.date).format('D')}{' '}
                                  {renderLanguage('ივლისი', 'July')}
                                </Typography>
                                <Typography>
                                  {dayjs(agenda.find((item) => item.id === value)?.date).format('dddd')}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        ) : (
                          <Box width="300px" />
                        )}
                      </Box>
                      <Box>
                        <Box
                          sx={{
                            width: '600px',
                            '@media (max-width: 1000px)': {
                              width: '100%',
                            },
                            '@media (max-width: 760px)': {
                              marginTop: '20px',
                            },
                            color: agendaData.activity_eng.includes('Panel Discussion') ? 'white' : '#232C65',
                            backgroundColor: renderColor(agendaData.activity_eng ? agendaData.activity_eng : ''),
                            borderRadius: '8px',
                            padding: '20px',
                          }}
                        >
                          <Typography
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '12px',
                            }}
                          >
                            <TimeIcon width={windowWidth > 1200 ? 21 : 30} />{' '}
                            <Typography
                              sx={{
                                '@media (max-width: 1000px)': {
                                  fontSize: '16px',
                                },
                              }}
                            >
                              {dayjs(agendaData.time).format('HH:mm')}
                            </Typography>{' '}
                            <GreenDotIcon fill="#232C65" width={windowWidth > 1200 ? 21 : 30} />{' '}
                            <LocationIcon width={windowWidth > 1200 ? 21 : 30} />{' '}
                            <Typography
                              sx={{
                                '@media (max-width: 1000px)': {
                                  fontSize: '16px',
                                },
                              }}
                            >
                              {' '}
                              {renderLanguage(agendaData.location_ka, agendaData.location_eng)}
                            </Typography>
                          </Typography>
                          <Typography
                            fontWeight={700}
                            sx={{
                              fontSize: '20px',
                              marginTop: '12px',
                              '@media (max-width: 1000px)': {
                                fontSize: '19px',
                              },
                            }}
                          >
                            {renderLanguage(agendaData.activity_ka, agendaData.activity_eng)}
                          </Typography>
                        </Box>
                        <Box border="1px solid #9BBDF5" width="100%" marginTop="20px" />
                      </Box>
                    </TabPanel>
                  );
                })
            : null}
        </TabContext>
      </Box>
    </Box>
  );
}
