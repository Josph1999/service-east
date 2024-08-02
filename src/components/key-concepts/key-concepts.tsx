'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import Card from './card/card';
import { data } from './data';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
};

export default function KeyConcepts(): React.JSX.Element {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={containerVariants}
      style={{
        padding: '128px 256px',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'right',
        backgroundImage: `url(/assets/DotsBackground.png)`,
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      {data.map((item) => (
        <motion.div key={item.title_ka} variants={itemVariants}>
          <Card {...item} />
        </motion.div>
      ))}
    </motion.div>
  );
}
