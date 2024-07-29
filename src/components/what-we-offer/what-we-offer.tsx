'use client';

import React from 'react';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';

import { useLanguage } from '@/contexts/language-context';

import bottlesSrc from '../../../public/assets/Bottles.jpeg';
import structureSrc from '../../../public/assets/Structure.jpeg';
import ArrowIcon from '../icons/arrow-icon';

export default function WhatWeOffer(): React.JSX.Element {
  const { renderLanguage } = useLanguage();

  return (
    <Box display="flex" gap="20px">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
        <Box sx={{ display: 'flex' }}>
          <Box
            sx={{
              padding: '32px 24px',
              backgroundColor: '#F80',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <ArrowIcon fill="white" />
            <Typography
              sx={{
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                transform: 'rotate(180deg)',

                fontWeight: 700,
              }}
            >
              {renderLanguage('რას გთავაზობთ?', 'What We Offer?')}
            </Typography>
          </Box>
          <Box sx={{ padding: '64px', backgroundColor: '#F80', display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <Typography sx={{ fontSize: '32px', fontWeight: 700 }}>
              {renderLanguage(
                'ჩვენი ინჟინრები და მექანიკოსები ეხმარებიან მომხმარებლებს შემდეგი ტექნოლოგიური აღჭურვილობის დაყენებაში, სერვისის სამუშაოებში და შეკეთებაში',
                'Our engineers and mechanics help customers with set up, service works and repairing the following technological equipment'
              )}
            </Typography>
            <Typography>
              {renderLanguage(
                'ჩვენი გამოცდილი ინჟინრებისა და მექანიკოსების გუნდი უზრუნველყოფს ყოვლისმომცველ მხარდაჭერას ტექნოლოგიური აღჭურვილობის ფართო სპექტრისთვის, რომელიც აუცილებელია თქვენი საწარმოო ხაზებისთვის. ჩვენ სპეციალიზირებულნი ვართ შემდეგი სისტემების უწყვეტი დაყენების, მუდმივი მოვლისა და ეფექტური შეკეთების საქმეში',
                'Our team of experienced engineers and mechanics provide comprehensive support for a wide range of technological equipment essential to your production lines. We specialize in the seamless setup, ongoing maintenance, and efficient repair of the following systems:'
              )}
            </Typography>
            <Image src={bottlesSrc} width={544} height={400} alt="Services" style={{ objectFit: 'cover' }} />
          </Box>
          <Box
            sx={{
              padding: '32px 24px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              border: '5px solid #F80',
            }}
          >
            <ArrowIcon fill="black" />
            <Typography
              sx={{
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                transform: 'rotate(180deg)',

                fontWeight: 700,
              }}
            >
              {renderLanguage('რას გთავაზობთ?', 'What We Offer?')}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
          <Typography sx={{ width: '800px', fontSize: '26px', fontWeight: 700 }}>
            {renderLanguage(
              'Service East არის თქვენი სანდო გლობალური პარტნიორი უმაღლესი ხარისხის სამრეწველო აღჭურვილობის მომსახურებისა და ტექნიკური მომსახურებისთვის. ჩვენი ერთგულება სრულყოფილებისადმი უზრუნველყოფს თქვენი ოპერაციების შეუფერხებლად წარმართვას, მიუხედავად იმისა, თუ სად ხართ მსოფლიოში',
              'Service East is your trusted global partner for top-quality industrial equipment service and maintenance. Our commitment to excellence ensures your operations run smoothly, no matter where you are in the world'
            )}
          </Typography>
        </Box>
      </Box>
      <Image width={770} height={1218} src={structureSrc} alt="Structure" style={{objectFit: 'cover'}}/>
    </Box>
  );
}
