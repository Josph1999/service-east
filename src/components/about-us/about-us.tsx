'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

import { useLanguage } from '@/contexts/language-context';

import DotsIcon from '../icons/dots-icon';

import 'swiper/css';
import 'swiper/css/pagination';

import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import Card from '../key-concepts/card/card';
import { teamData } from './team-data';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, duration: 5 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, duration: 5 },
};

export default function AboutUs(): React.JSX.Element {
  const { renderLanguage } = useLanguage();

  return (
    <Box>
      <Box
        sx={{
          backgroundImage: `url(/assets/DotsBackground.png)`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'right',
          paddingTop: '100px',
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
            backgroundColor: '#F1F7FE',
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
              padding: '64px 24px',
              '@media (max-width: 900px)': {
                padding: '0px',
              },
            }}
          >
            {renderLanguage('ჩვენს შესახებ', 'About Us')}
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
                padding: '0px 24px',
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
          sx={{
            padding: '0px 256px',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            '@media (max-width: 1200px)': {
              padding: '0px 128px',
            },
            '@media (max-width: 1000px)': {
              padding: '0px 64px',
            },
            '@media (max-width: 760px)': {
              padding: '0px 24px',
            },
          }}
        >
          <Typography>
            {renderLanguage(
              `სერვის ისტ საქართველო გახლავთ სამრეწველო და საწარმოო დანადგარებისა და აღჭურვილობის სერვისების პროვაიდერი კომპანია. გასული წლების განმავლობაში, კომპანიამ განახორციელა არაერთი პროექტი ევროკავშირის, ევრაზიისა და ყოფილი დსთ-ის ქვეყნებში, რითაც გაიმყარა საკუთარი პოზიციები როგორც რეგიონალურმა ლიდერმა ამ სფეროში. 
კომპანიის ლიდერშიპი შედგება სფეროს პროფესიონალებისგან მრავალწლიანი გამოცდილებით. სწორედ მოწინავე ტექნოლოგიებისა და მექანიზმების დანერგვა, გლობალური პარტნიორების ქსელის ინტეგრირება და სერვისების ყველაზე მოქნილი და ეფექტური კონფიგურაციის მიწოდება ქმნის მომხმარებელთა კმაყოფილებისა და ნდობის გარანტიას. 
სერვის ისტ საქართველოს გამოცდილი ინჟინერებისა და მექანიკოსებისგან შემდგარი გუნდი მზად არის გაგიწიოთ მომსახურება საწარმოო ხაზების სერვისების ფართო სპექტრში. 
მრავალწლიანი გამოცდილებისა და გლობალური პარტნიორობების შედეგად, სერვის ისტ საქართველოს გუნდს გააჩნია ხარისხისა და ეფექტურობის გარანტია, რომელიც თავის მხრივ ჩვენს მომხმარებლებსა და პარტნიორებს უქმნის საწარმოო ბიზნესის წარმართვის სტაბილურ და გამართულ შესაძლებლობებს. 
ჩვენი გუნდი მზად არის გაგიწიოთ მომსახურება მაღალი წარმადობის დანადგარების ინსტალირების, დე-ინსტალირების, შეკეთების, მოდიფიკაციის, ოპტიმიზაციის, განახლების, პროგრამული უზრუნველყოფის, გაშვებისა და ინსპექციის მიმართულებით. 
მზად ვართ მოვემსახუროთ მომხმარებლებს შემდეგ საწარმოო სპექტრში: მინერალური წყლები / ალკოჰოლური სასმელები / ზეთი / ღვინო / რძის ნაწარმი / ქიმიკატები / სხვა.
`,
              `Service East Georgia LLC is a global company specializing in the installation, assembly, and maintenance of equipment for the food, medical, and chemical industries. Our primary focus is the repair and servicing of filling systems for a wide variety of products, including water, beer, juice, oil, wine, milk, and bulk goods of different consistencies. We also provide expert services for labeling and packaging equipment for both glass and PET bottles, among other solutions.
Our team of skilled professionals, including technicians, mechanics, electricians, and software engineers, is equipped to deliver exceptional services across a broad range of production line repairs. With years of hands-on experience and global partnerships with industry leaders, we’ve built a service model centered on innovation, cutting-edge technology, and a strong foundation of expertise.
Our services range from assembly and installation to software optimization, process technology, and production line commissioning. We are committed to providing efficient solutions for industries spanning water and liquids, chemicals, dairy, and more.
At the core of our company’s mission is continuous growth, progress, and regional expansion. Every individual within our team drives our success, and we prioritize the well-being and professional development of our colleagues. We are always seeking to attract young talent, mid-level professionals, and seasoned industry veterans to strengthen and diversify our team.
If you share our vision and goals, and are ready to be part of a dynamic and ambitious organization, we encourage you to reach out to us today!
`
            )}
          </Typography>
          <Box>
            <Typography
              sx={{
                fontSize: '32px',
                fontWeight: 700,
                fontFeatureSettings: "'case' on",
                color: 'black',
                padding: '64px 24px',
                '@media (max-width: 900px)': {
                  padding: '0px',
                },
              }}
            >
              {renderLanguage('განხორციელებული პროექტები', 'Projects')}
            </Typography>
            <Swiper
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
                reverseDirection: true,
              }}
              modules={[Navigation, Autoplay]}
              loop
              slidesPerView={3}
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
              className="mySwiper"
              breakpoints={{
                360: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                920: {
                  slidesPerView: 2,
                  spaceBetween: 40,
                },
                1224: {
                  slidesPerView: 3,
                  spaceBetween: 50,
                },
              }}
              style={{
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                backgroundPosition: 'right',
              }}
            >
              {teamData.map((item) => (
                <SwiperSlide key={item.title_eng}>
                  <Card {...item} isTeam/>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
