import { pricingCards } from '@/lib/constants';
import { cn } from '@/lib/utils';
import clsx from 'clsx';
import { Check } from 'lucide-react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';

const PricingCard = () => {
  return (
    <section className="my-12 space-y-8 lg:my-20 flex justify-center items-center flex-col ">
      <div className="space-y-8 mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-center mx-6">
          Choose What Fits You Right
        </h2>
        <p className="text-muted-foreground text-center mx-12">
          Our straightforward pricing plans are tailored to meet your needs.
        </p>
      </div>
      <div className="flex justify-center gap-4 flex-wrap">
        {pricingCards.map(card => (
          <Card
            key={card.id}
            className={clsx(
              'relative w-[300px] flex flex-col justify-between cursor-pointer md:hover:scale-105 transition-all ease-in-out duration-150',
              {
                '': card.title === 'Pro',
              },
            )}
          >
            <div className="absolute bg-black w-full h-[6px] rounded-t-md bg-gradient-to-r from-[#792ec4] via-[#5e1956] to-[#004909]"></div>
            <CardHeader>
              <CardTitle
                className={clsx('', {
                  '': card.title == 'Basic',
                })}
              >
                {card.title}
              </CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <span className="text-4xl font-bold">${card.price}</span>
              <span className="text-muted-foreground">
                <span>/ {card.duration}</span>
              </span>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-4">
              <div>
                {card.features.map(feature => (
                  <div key={feature} className="flex gap-2">
                    <Check className="w-4" />
                    <p>{feature}</p>
                  </div>
                ))}
              </div>
              <Link
                href={`/`}
                className={clsx(
                  'w-full text-center  p-2 rounded-md',
                  cn(
                    card.title === 'Pro'
                      ? 'bg-[#000000] hover:opacity-80 text-white'
                      : 'bg-[#e6e6e6] hover:bg-black text-muted-foreground hover:text-white',
                  ),
                )}
              >
                Get Started
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default PricingCard;
