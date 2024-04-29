import Banner from '@/components/home/banner';
import PricingCard from '@/components/home/pricingCard';

export default async function Home() {
  return (
    <main>
      <div className="absolute inset-0 -z-10 h-[500px] md:min-h-[1200px] w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
      </div>

      <Banner />
      <PricingCard />
    </main>
  );
}
