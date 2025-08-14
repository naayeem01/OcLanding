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
    name: 'আবদুল্লাহ আল মামুন',
    pharmacy: 'মামুন ফার্মেসি, ঢাকা',
    avatar: 'আ',
    image: 'https://placehold.co/100x100.png',
    dataAiHint: 'man portrait',
    quote:
      'ঔষধক্লাউড আমার ইনভেন্টরি ব্যবস্থাপনায় বিপ্লব এনেছে। মেয়াদ উত্তীর্ণের সতর্কীকরণ ফিচারটি একাই আমার হাজার হাজার টাকা বাঁচিয়েছে। এটি সহজ, দ্রুত এবং অবিশ্বাস্যভাবে নির্ভরযোগ্য।',
  },
  {
    name: 'ফাতিমা আক্তার',
    pharmacy: 'শিফা মেডিকেল হল, চট্টগ্রাম',
    avatar: 'ফা',
    image: 'https://placehold.co/100x100.png',
    dataAiHint: 'woman portrait',
    quote:
      'পিওএস সিস্টেমটি খুবই সহজ। আমার কর্মীরা একদিনেই এটি শিখে নিয়েছে। বিলিং আগের চেয়ে দ্রুত হয়েছে, এবং গ্রাহকরাও খুশি। আমি প্রত্যেক ফার্মেসি মালিককে এটি ব্যবহারের সুপারিশ করছি।',
  },
  {
    name: 'রহিম শেখ',
    pharmacy: 'নিরাময় ড্রাগ হাউস, সিলেট',
    avatar: 'র',
    image: 'https://placehold.co/100x100.png',
    dataAiHint: 'man smiling',
    quote:
      'আমার ফোনের মাধ্যমে যেকোনো জায়গা থেকে বিক্রয় প্রতিবেদন দেখতে পারাটা একটা গেম-চেঞ্জার। ক্লাউড ব্যাকআপ আমাকে মানসিক শান্তি দেয়। চমৎকার সফ্টওয়্যার এবং সাপোর্ট!',
  },
  {
    name: 'সাদিয়া ইসলাম',
    pharmacy: 'সেন্ট্রাল ফার্মেসি, রাজশাহী',
    avatar: 'সা',
    image: 'https://placehold.co/100x100.png',
    dataAiHint: 'woman professional',
    quote:
      'ঔষধক্লাউড ব্যবহারের আগে একাধিক শাখা পরিচালনা করাটা একটা দুঃস্বপ্নের মতো ছিল। এখন আমি এক ড্যাশবোর্ড থেকেই আমার সব দোকানের স্টক এবং বিক্রয় দেখতে পারি। এটি আমার ব্যবসাকে সহজ করে দিয়েছে।',
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-16 sm:py-24 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-bangla">
            সারাদেশের ফার্মেসির বিশ্বস্ত
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
                      <blockquote className="text-lg text-foreground italic border-l-4 border-primary pl-4 font-bangla">
                        "
                        {testimonial.quote.replace(
                          /ঔষধক্লাউড/g,
                          '<span class="font-bold text-primary">ঔষধক্লাউড</span>'
                        )}
                        "
                      </blockquote>
                      <div className="mt-6 flex items-center">
                        <Avatar>
                          <AvatarImage src={testimonial.image} alt={testimonial.name} data-ai-hint={testimonial.dataAiHint} />
                          <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                          <p className="font-semibold text-foreground font-bangla">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground font-bangla">{testimonial.pharmacy}</p>
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
