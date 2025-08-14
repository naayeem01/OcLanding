import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const pricingPlans = [
  {
    name: 'Free Trial',
    price: '৳0',
    period: 'for 14 days',
    description: 'Explore all features with no commitment.',
    features: [
      'Full POS & Billing Access',
      'Inventory Management',
      'Sales Analytics',
      '24/7 Support',
    ],
    isPopular: false,
    cta: 'Start Free Trial',
  },
  {
    name: 'Standard',
    price: '৳1,500',
    period: '/month',
    description: 'Perfect for single-branch pharmacies.',
    features: [
      'All features in Free Trial',
      'Multi-user access',
      'Medicine Expiry Alerts',
      'Cloud Backup',
    ],
    isPopular: true,
    cta: 'Choose Standard',
  },
  {
    name: 'Professional',
    price: '৳2,500',
    period: '/month',
    description: 'Ideal for multi-branch operations and growing businesses.',
    features: [
      'All features in Standard',
      'Multi-branch Support',
      'Advanced Reporting',
      'ZKTeco Device Integration',
    ],
    isPopular: false,
    cta: 'Choose Professional',
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Transparent Pricing for Every Pharmacy
          </h2>
          <p className="mt-4 text-xl text-muted-foreground font-bangla">
            আপনার প্রয়োজন অনুযায়ী সেরা প্ল্যানটি বেছে নিন।
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3 justify-center">
          {pricingPlans.map((plan, index) => (
            <Card
              key={index}
              className={cn(
                'flex flex-col rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105',
                plan.isPopular ? 'border-primary border-2 relative' : ''
              )}
            >
              {plan.isPopular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most Popular</Badge>
              )}
              <CardHeader className="p-6">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-base text-muted-foreground">{plan.description}</CardDescription>
                <div className="flex items-baseline gap-2 mt-4">
                  <span className="text-4xl font-extrabold tracking-tight">{plan.price}</span>
                  <span className="text-sm font-medium text-muted-foreground">{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-6 pt-0">
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3 shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="p-6">
                <Button className="w-full" variant={plan.isPopular ? 'default' : 'outline'}>
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12 text-muted-foreground">
            <p>Need a custom plan? <a href="mailto:contact@oushodcloud.com" className="text-primary hover:underline font-medium">Contact us</a> for enterprise solutions.</p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
