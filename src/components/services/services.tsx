'use client';

import React from 'react';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

import { useLanguage } from '@/contexts/language-context';

import bottlesSrc from '../../../public/assets/Service_Page_Card_Pic.jpg';
// import factorySrc from '../../../public/assets/FactoryPhoto.jpg';
import DotsIcon from '../icons/dots-icon';

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
        sx={{
          backgroundImage: `url(/assets/DotsBackground.png)`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'right',
          paddingTop: '100px'
        }}
      >
        <Box
          component={motion.div}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          sx={{
            paddingRight: '256px',
            display: 'flex',
            marginBottom: '120px',
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
              paddingTop: '90px',
            },
          }}
        >
          <DotsIcon />

          <Typography
            component={motion.div}
            variants={fadeInUp}
            sx={{
              fontSize: '32px',
              fontWeight: 700,
              fontFeatureSettings: "'case' on",
              color: 'black',
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
              color: 'black',
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
              'სერვის ისტ საქართველო არის თქვენი სანდო პარტნიორი საწარმოო ხაზებისა და მაღალი წარმადობის დანადგარების ტექნიკური და კომპონენტური სერვისების მომსახურების სფეროში. ჩვენი სწრაფვა ხარისხის სანდოობის სრულყოფისკენ ქმნის გარანტიას თქვენი ბიზნესის საიმედო და სტაბილური წარმართვისთვის. ',
              'Expert Team Delivering Comprehensive Production Line Support Services'
            )}
          </Typography>
        </Box>
        <Box
          component={motion.div}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          sx={{
            backgroundColor: '#F1F7FE',
            width: '80%',
            padding: '64px 256px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            justifyContent: 'center',
            alignItems: 'center',
            '@media (max-width: 900px)': {
              width: '100%',
              padding: '24px',
            },
          }}
        >
          <Box
            sx={{
              width: '100%',
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
                `გამოცდილი ინჟინერებისა და მექანიკოსებისგან შემდგარი გუნდი მზად არის გაგიწიოთ მომსახურება საწარმოო ხაზების სერვისების ფართო სპექტრში. `,
                `A team of experienced engineers and mechanics are ready to serve you in a wide range of production line services.`
              )}
            </Typography>
            <Typography component={motion.div} variants={fadeInUp} sx={{ color: 'black' }}>
              {renderLanguage(
                `მრავალწლიანი გამოცდილებისა და გლობალური პარტნიორობების შედეგად, სერვის ისტ საქართველოს გუნდს გააჩნია ხარისხისა და ეფექტურობის გარანტია, რომელიც თავის მხრივ ჩვენს მომხმარებლებსა და პარტნიორებს უქმნის საწარმოო ბიზნესის წარმართვის სტაბილურ და გამართულ შესაძლებლობებს. 
ჩვენი გუნდი მზად არის გაგიწიოთ მომსახურება მაღალი წარმადობის დანადგარების ინსტალირების, დე-ინსტალირების, შეკეთების, მოდიფიკაციის, ოპტიმიზაციის, განახლების, პროგრამული უზრუნველყოფის, გაშვებისა და ინსპექციის მიმართულებით. 
მზად ვართ მოვემსახუროთ მომხმარებლებს შემდეგ საწარმოო სპექტრში: მინერალური წყლები / ალკოჰოლური სასმელები / ზეთი / ღვინო / რძის ნაწარმი / ქიმიკატები / სხვა
`,
                `Our team of skilled professionals, including technicians, mechanics, electricians, and software engineers, is equipped to deliver exceptional services across a broad range of production line repairs. With years of hands-on experience and global partnerships with industry leaders, we’ve built a service model centered on innovation, cutting-edge technology, and a strong foundation of expertise.
Our services range from assembly and installation to software optimization, process technology, and production line commissioning. We are committed to providing efficient solutions for industries spanning water and liquids, chemicals, dairy, and more.
`
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
      {/* <Box
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
            backgroundColor: '#F1F7FE',
            width: '80%',
            padding: '64px 256px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            justifyContent: 'center',
            alignItems: 'center',
            '@media (max-width: 900px)': {
              width: '100%',
              padding: '24px',
            },
          }}
        >
          <Box
            sx={{
              width: '100%',
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
                `გამოცდილი ინჟინერებისა და მექანიკოსებისგან შემდგარი გუნდი მზად არის გაგიწიოთ მომსახურება საწარმოო ხაზების სერვისების ფართო სპექტრში. `,
                `Our engineers and mechanics help customers with set up, service works and repairing the following technological equipment`
              )}
            </Typography>
            <Typography component={motion.div} variants={fadeInUp} sx={{ color: 'black' }}>
              {renderLanguage(
                `მრავალწლიანი გამოცდილებისა და გლობალური პარტნიორობების შედეგად, სერვის ისტ საქართველოს გუნდს გააჩნია ხარისხისა და ეფექტურობის გარანტია, რომელიც თავის მხრივ ჩვენს მომხმარებლებსა და პარტნიორებს უქმნის საწარმოო ბიზნესის წარმართვეს სტაბილურ და გამართულ შესაძლებლობებს. 
ჩვენი გუნდი მზად არის გაგიწიოთ მომსახურება მაღალი წარმადობის დანადგარების ინსტალირების, დე-ინსტალირების, შეკეთების, მოდიფიკაციის, ოპტიმიზაციის, განახლების, პროგრამული უზრუნველყოფის, გაშვებისა და ინსპექციის მიმართულებით. 
მზად ვართ მოვემსახუროთ მომხმარებლებს შემდეგ საწარმოო სპექტრში: მინერალური წყლები / ალკოჰოლური სასმელები / ზეთი / ღვინო / რძის ნაწარმი / ქიმიკატები / სხვა
`,
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
      </Box> */}
    </Box>
  );
}
