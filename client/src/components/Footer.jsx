import React from 'react';
import { socialMedia } from '../data/SocialMedia';
import { Link } from 'react-router-dom';
import { AiOutlineMail } from 'react-icons/ai';

const Footer = () => {
  const socials = socialMedia.map((item) => {
    return (
      <Link to={item.url} target='_blank' key={item.id}>
        {item.icon}
      </Link>
    );
  });

  return (
    <footer
      className={`flex flex-col items-center justify-center lg:justify-between gap-10 bg-mountain bg-no-repeat lg:gap-5 lg:flex-row lg:h-36`}
    >
      <section className='flex justify-center items-center gap-2 w-72'>
        <AiOutlineMail />
        <p>thaicondohomeland@gmail.com</p>
      </section>
      <section className='w-96 flex justify-center items-center gap-2'>
        <span> &copy;</span>
        <p>Copyright 2024 | ThaiCondoHomeLand</p>
      </section>
      <section className='flex justify-center items-center text-2xl gap-5 w-72'>
        {socials}
      </section>
    </footer>
  );
};

export default Footer;
