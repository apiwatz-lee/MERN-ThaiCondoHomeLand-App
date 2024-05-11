import { socialMedia } from '../data/SocialMedia';
import { Link } from 'react-router-dom';
import { AiOutlineMail } from 'react-icons/ai';

const Footer = () => {
  const socials = socialMedia.map((item) => {
    return (
      <Link to={item?.url} target='_blank' key={item?.id}>
        {item?.icon}
      </Link>
    );
  });

  return (
    <footer
      className={`w-full flex flex-col items-center justify-center lg:justify-between gap-5 bg-mountain bg-no-repeat lg:gap-5 lg:flex-row lg:h-36 bg-neutral-100 py-6 lg:px-28`}
    >
      <section className='flex justify-center items-center gap-2'>
        <AiOutlineMail />
        <p>thaicondohomeland@gmail.com</p>
      </section>
      <section className=' flex justify-center items-center gap-2 flex-wrap'>
        <span> &copy;</span>
        <p>Copyright 2024 |</p>
        <span>ThaiCondoHomeLand</span>
      </section>
      <section className='flex justify-center items-center text-2xl gap-5'>
        {socials}
      </section>
    </footer>
  );
};

export default Footer;
