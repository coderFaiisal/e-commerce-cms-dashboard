import bannerImage from '@/assets/preview.png';
import Image from 'next/image';

const Banner = () => {
  return (
    <section className="mt-16 md:mt-24 lg:mt-36 h-full w-full flex flex-col items-center justify-center ">
      <h3 className="text-md md:text-2xl  text-center mb-[-5%]">
        Run Your E-commerce Inventories In One Place
      </h3>

      <h1 className="text-[90px] md:text-[200px] lg:text-[300px] font-bold text-center">
        Invento
      </h1>

      <Image
        src={bannerImage}
        alt="banner image"
        height={1200}
        width={1200}
        className="rounded-tl-2xl rounded-tr-2xl border-2 border-muted mt-[-40px] md:mt-[-90px] lg:mt-[-140px]"
      />
    </section>
  );
};

export default Banner;
