import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const testimonials = [
  {
    name: 'Abdullah Al Mamun',
    pharmacy: 'Mamun Pharmacy, Dhaka',
    avatar: 'AM',
    image: 'https://placehold.co/100x100.png',
    dataAiHint: 'man portrait',
    quote:
      'OushodCloud has revolutionized how I manage my inventory. The expiry alerts feature alone has saved me thousands. It\'s simple, fast, and incredibly reliable.',
  },
  {
    name: 'Fatima Akhter',
    pharmacy: 'Shifa Medical Hall, Chittagong',
    avatar: 'FA',
    image: 'https://placehold.co/100x100.png',
    dataAiHint: 'woman portrait',
    quote:
      'The POS system is so intuitive. My staff learned it in a day. Billing is faster than ever, and customers are happier. I highly recommend it to every pharmacy owner.',
  },
  {
    name: 'Rahim Sheikh',
    pharmacy: 'Niramoy Drug House, Sylhet',
    avatar: 'RS',
    image: 'https://placehold.co/100x100.png',
    dataAiHint: 'man smiling',
    quote:
      'Being able to check sales reports from anywhere on my phone is a game-changer. The cloud backup gives me peace of mind. Excellent software and support!',
  },
    {
    name: 'Sadia Islam',
    pharmacy: 'Central Pharmacy, Rajshahi',
    avatar: 'SI',
    image: 'https://placehold.co/100x100.png',
    dataAiHint: 'woman professional',
    quote:
      'Managing multiple branches was a nightmare before OushodCloud. Now, I can see the stock and sales of all my stores from one dashboard. It has simplified my business.',
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-16 sm:py-24 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Trusted by Pharmacies Across Bangladesh
          </h2>
          <p className="mt-4 text-xl text-muted-foreground font-bangla">
            আমাদের ব্যবহারকারীরা কী বলছেন শুনুন
          </p>
        </div>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto mt-12"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                <div className="p-1">
                  <Card className="h-full flex flex-col">
                    <CardContent className="p-6 flex-1 flex flex-col justify-between">
                      <blockquote className="text-lg text-foreground italic border-l-4 border-primary pl-4">
                        "{testimonial.quote}"
                      </blockquote>
                      <div className="mt-6 flex items-center">
                        <Avatar>
                          <AvatarImage src={testimonial.image} alt={testimonial.name} data-ai-hint={testimonial.dataAiHint} />
                          <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                          <p className="font-semibold text-foreground">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.pharmacy}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialsSection;
