'use client';

import React from 'react';
import { useWindowWidth } from '@/helpers/window-width';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useInView } from 'react-intersection-observer';

import { useLanguage } from '@/contexts/language-context';

import BrainIcon from '../icons/brain-icon';
import DisinfirmationIcon from '../icons/disinfirmation-icon';
import PoliticalIcon from '../icons/political-icon';

export default function Panels(): React.JSX.Element {
  const { renderLanguage } = useLanguage();
  const windowWidth = useWindowWidth();

  const [ref, inView] = useInView({
    triggerOnce: false,
  });

  const panelData = [
    {
      id: 1,
      title_ka: `დეზინფორმაცია და ახალგაზრდობა ციფრულ ეპოქაში`,
      title_eng: `Disinformation and Youth in the Digital Era`,
      description_eng: `How does social media shape the way young people access
              information? In what ways does social media impact the formation of
              opinions among youth? What are the threats of misinformation and
              disinformation for young people in the digital age? How can we
              empower youth to critically evaluate information they encounter
              online? How can digital literacy education be improved to better
              prepare youth for navigating the online world? What role should the
              government, technology companies, and civil society play in ensuring
              a safer and more beneficial digital environment for youth?`,
      description_ka: `როგორ აყალიბებს სოციალური მედია ახალგაზრდების წვდომას
              ინფორმაცია? რა გავლენას ახდენს სოციალური მედია ჩამოყალიბებაზე
              ახალგაზრდების აზრი? რა არის დეზინფორმაციის საფრთხეები და
              დეზინფორმაცია ახალგაზრდებისთვის ციფრულ ეპოქაში? როგორ შეგვიძლია
              მიეცით ახალგაზრდებს საშუალება კრიტიკულად შეაფასონ ინფორმაცია, რომელსაც ისინი ხვდებიან
              ონლაინ? როგორ შეიძლება გაუმჯობესდეს ციფრული წიგნიერების განათლება უკეთესობისკენ
              მოამზადე ახალგაზრდობა ონლაინ სამყაროში ნავიგაციისთვის? რა როლი უნდა ჰქონდეს
              მთავრობა, ტექნოლოგიური კომპანიები და სამოქალაქო საზოგადოება თამაშობენ უზრუნველსაყოფად
              უფრო უსაფრთხო და უფრო მომგებიანი ციფრული გარემო ახალგაზრდებისთვის?`,
      icon: windowWidth > 1200 ? <DisinfirmationIcon width={250} height={120} /> : <DisinfirmationIcon width={40} />,
    },
    {
      id: 2,
      title_ka: `ახალგაზრდების პოლიტიკური მონაწილეობა და წარმომადგენლობა
        გარდამავალ დემოკრატიებში`,
      title_eng: `Political Participation and Representation of Youth
        in Transitional Democracies`,
      description_eng: `What factors influence youth turnout in elections, and how can we
        increase political participation among young people? How can
        political parties and candidates better engage with young voters and
        address their concerns? How can academic institutions, higher
        education institutions, and community organizations improve civic
        education programs to better prepare young people for active
        citizenship? What are the most effective strategies for mobilizing
        youth around social and political issues?`,
      description_ka: `რა ფაქტორები ახდენს გავლენას ახალგაზრდების აქტივობაზე არჩევნებში და როგორ შეგვიძლია
        გაზარდოს ახალგაზრდების პოლიტიკური მონაწილეობა? როგორ შეიძლება
        პოლიტიკური პარტიები და კანდიდატები უკეთ ჩაერთვებიან ახალგაზრდა ამომრჩევლებთან და
        მათი შეშფოთება? როგორ შეიძლება აკადემიური დაწესებულებები, უმაღლესი
        საგანმანათლებლო დაწესებულებები და სათემო ორგანიზაციები აუმჯობესებენ სამოქალაქო
        საგანმანათლებლო პროგრამები ახალგაზრდების აქტიურობისთვის უკეთ მოსამზადებლად
        მოქალაქეობა? რა არის მობილიზაციის ყველაზე ეფექტური სტრატეგიები
        ახალგაზრდობა სოციალური და პოლიტიკური საკითხების გარშემო?`,
      icon: windowWidth > 1200 ? <PoliticalIcon width={250} height={120} /> : <PoliticalIcon width={40} />,
    },
    {
      id: 3,
      title_ka: `Brain Drain ან Brain Gain: ეკონომიკის დინამიკა
        ახალგაზრდების მიგრაცია`,
      title_eng: `Brain Drain or Brain Gain: Dynamics of Economic
        Migration of Youth`,
      description_eng: `What factors contribute to the emigration of young people from their
        home countries? What are the economic and social consequences of
        brain drain for sending countries? What policies can countries
        implement to create more attractive work and career opportunities
        domestically?`,
      description_ka: `რა ფაქტორები უწყობს ხელს ახალგაზრდების ემიგრაციას მათგან
        სამშობლო ქვეყნები? რა არის ეკონომიკური და სოციალური შედეგები
        ტვინების გადინება გაგზავნის ქვეყნებისთვის? რა პოლიტიკა შეუძლიათ ქვეყნებს
        განახორციელოს უფრო მიმზიდველი სამუშაო და კარიერული შესაძლებლობების შესაქმნელად
        შინაურულად?`,
      icon: windowWidth > 1200 ? <BrainIcon width={120} height={120} /> : <BrainIcon width={40} />,
    },
  ];

  return (
    <Box
      sx={{
        padding: '156px 256px',
        backgroundImage: `url(/assets/PanelBackground.jpeg)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'right',
        '@media (max-width: 1200px)': {
          padding: '50px 128px',
          backgroundImage: 'none',
        },
        '@media (max-width: 1000px)': {
          padding: '50px 64px',
        },
        '@media (max-width: 760px)': {
          padding: '60px 24px',
        },
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
      }}
      ref={ref}
    >
      <Box
        sx={{
          padding: '54px',
          boxShadow: '0px 48px 100px 0px rgba(17, 12, 46, 0.15)',
          borderRadius: '8px',
          backgroundImage: `url(/assets/PanelContentBackground.jpeg)`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          '@media (max-width: 1000px)': {
            padding: '24px',
          },
        }}
      >
        <Typography
          fontWeight={700}
          sx={{
            fontSize: '32px',
            '@media (max-width: 1200px)': {
              fontSize: '24px',
            },
            fontFeatureSettings: "'case' on",
            textTransform: 'uppercase',
          }}
        >
          {renderLanguage('პანელები', 'PANELS')}
        </Typography>
        {windowWidth > 1200 ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {panelData.map((panel) => {
              return (
                <Box key={panel.id} sx={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '50px' }}>
                  {panel.icon}
                  <Box sx={{ color: '#232C65', display: 'flex', gap: '16px', flexDirection: 'column' }}>
                    <Typography
                      fontWeight={700}
                      sx={{ fontSize: '24px', fontFeatureSettings: "'case' on", textTransform: 'uppercase' }}
                    >
                      {renderLanguage(panel.title_ka, panel.title_eng)},
                    </Typography>
                    <Typography>{renderLanguage(panel.description_ka, panel.description_eng)}</Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>
        ) : (
          <Box>
            {panelData.map((panel) => {
              return (
                <Accordion key={panel.id} sx={{ marginTop: '40px' }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                    <Box
                      sx={{
                        gap: '16px',
                        alignItems: 'center',
                        '@media (max-width: 1200px)': {
                          fontSize: '16px',
                        },
                      }}
                    >
                      {panel.icon}{' '}
                      <Typography
                        fontWeight={700}
                        sx={{
                          '@media (max-width: 900px)': {
                            width: '100px',
                          },
                        }}
                      >
                        {renderLanguage(panel.title_ka, panel.title_eng)}
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography
                      sx={{
                        '@media (max-width: 1200px)': {
                          fontSize: '16px',
                        },
                      }}
                    >
                      {renderLanguage(panel.description_ka, panel.description_eng)}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </Box>
        )}
      </Box>
    </Box>
  );
}
