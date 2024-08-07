'use client';

import React from 'react';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

import { useLanguage } from '@/contexts/language-context';

import bottlesSrc from '../../../public/assets/Bottles.jpeg';
import factorySrc from '../../../public/assets/FactoryPhoto.jpg';
import smalldots from '../../../public/assets/SmallDots.png';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, duration: 5 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, duration: 5 },
};

export default function Services(): React.JSX.Element {
  const { renderLanguage } = useLanguage();

  return (
    <Box>
      <Box
        component={motion.div}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        sx={{
          marginTop: '60px',
          backgroundColor: '#1E1E26',
          paddingRight: '256px',
          display: 'flex',
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
            paddingTop: '90px'
          },
        }}
      >
        <Image width={92} height={106} src={smalldots} alt="Small Dots Image" className="dotsImage" />

        <Typography
          component={motion.div}
          variants={fadeInUp}
          sx={{
            fontSize: '32px',
            fontWeight: 700,
            fontFeatureSettings: "'case' on",
            color: 'white',
            padding: '64px 0px',
            '@media (max-width: 900px)': {
              padding: '0px',
            },
          }}
        >
          {renderLanguage('რას გთავაზობთ', 'What We Offer')}
        </Typography>
        <Typography
          component={motion.div}
          variants={fadeInUp}
          sx={{
            fontFeatureSettings: "'case' on",
            color: 'white',
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
            'სამრეწველო აღჭურვილობის გადაწყვეტილებები. გლობალური ექსპერტიზა. შეუდარებელი სერვისი',
            'Industrial Equipment Solutions. Global Expertise. Unrivaled Service'
          )}
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundImage: `url(/assets/Rectangle.png)`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          backgroundPosition: 'right',
          paddingTop: '120px',
        }}
      >
        <Box
          component={motion.div}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          sx={{
            backgroundColor: '#0A4AEB',
            width: '70%',
            padding: '64px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            justifyContent: 'center',
            alignItems: 'center',
            '@media (max-width: 900px)': {
              width: '100%',
              padding: '24px'
            },
          }}
        >
          <Box
            sx={{
              width: '544px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              justifyContent: 'center',
              alignItems: 'center',
              '@media (max-width: 600px)': {
                width: '100%',
              },
            }}
          >
            <Typography
              component={motion.div}
              variants={fadeInUp}
              sx={{
                color: 'white',
                fontSize: '32px',
                fontWeight: 700,
                fontFeatureSettings: "'case' on",
                '@media (max-width: 900px)': {
                  fontSize: '24px',
                },
              }}
            >
              {renderLanguage(
                `ჩვენი ინჟინრები და მექანიკოსები ეხმარებიან მომხმარებლებს შემდეგი ტექნოლოგიური აღჭურვილობის დაყენებაში, სერვისის სამუშაოებში და შეკეთებაში`,
                `Our engineers and mechanics help customers with set up, service works and repairing the following technological equipment`
              )}
            </Typography>
            <Typography component={motion.div} variants={fadeInUp} sx={{ color: 'white' }}>
              {renderLanguage(
                `ჩვენი გამოცდილი ინჟინრებისა და მექანიკოსების გუნდი უზრუნველყოფს ყოვლისმომცველ მხარდაჭერას ტექნოლოგიური აღჭურვილობის ფართო სპექტრისთვის, რომელიც აუცილებელია თქვენი საწარმოო ხაზებისთვის. ჩვენ სპეციალიზირებულნი ვართ შემდეგი სისტემების უწყვეტი დაყენების, მუდმივი მოვლისა და ეფექტური შეკეთების საქმეში`,
                `Our team of experienced engineers and mechanics provide comprehensive support for a wide range of technological equipment essential to your production lines. We specialize in the seamless setup, ongoing maintenance, and efficient repair of the following systems:`
              )}
            </Typography>
            <Image
              src={bottlesSrc}
              width={0}
              height={0}
              alt="Bottles"
              style={{ objectFit: 'cover', width: '100%', height: '400px' }}
            />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundImage: `url(/assets/DotsBackground.png)`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'top',
          paddingTop: '120px',
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          paddingBottom: '100px',
        }}
      >
        <Box
          component={motion.div}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          sx={{
            backgroundColor: '#F80',
            width: '70%',
            padding: '64px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            justifyContent: 'center',
            alignItems: 'center',
            '@media (max-width: 900px)': {
              width: '100%',
              padding: '24px'
            },
          }}
        >
          <Box
            sx={{
              width: '544px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              justifyContent: 'center',
              alignItems: 'center',
              '@media (max-width: 600px)': {
                width: '100%',
              },
            }}
          >
            <Typography
              component={motion.div}
              variants={fadeInUp}
              sx={{
                color: 'black',
                fontSize: '32px',
                fontWeight: 700,
                fontFeatureSettings: "'case' on",
                '@media (max-width: 900px)': {
                  fontSize: '24px',
                },
              }}
            >
              {renderLanguage(
                `ჩვენი ინჟინრები და მექანიკოსები ეხმარებიან მომხმარებლებს შემდეგი ტექნოლოგიური აღჭურვილობის დაყენებაში, სერვისის სამუშაოებში და შეკეთებაში`,
                `Our engineers and mechanics help customers with set up, service works and repairing the following technological equipment`
              )}
            </Typography>
            <Typography component={motion.div} variants={fadeInUp} sx={{ color: 'black' }}>
              {renderLanguage(
                `ჩვენი გამოცდილი ინჟინრებისა და მექანიკოსების გუნდი უზრუნველყოფს ყოვლისმომცველ მხარდაჭერას ტექნოლოგიური აღჭურვილობის ფართო სპექტრისთვის, რომელიც აუცილებელია თქვენი საწარმოო ხაზებისთვის. ჩვენ სპეციალიზირებულნი ვართ შემდეგი სისტემების უწყვეტი დაყენების, მუდმივი მოვლისა და ეფექტური შეკეთების საქმეში`,
                `Our team of experienced engineers and mechanics provide comprehensive support for a wide range of technological equipment essential to your production lines. We specialize in the seamless setup, ongoing maintenance, and efficient repair of the following systems:`
              )}
            </Typography>
            <Image
              src={factorySrc}
              width={0}
              height={0}
              alt="Bottles"
              style={{ objectFit: 'cover', width: '100%', height: '400px' }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
