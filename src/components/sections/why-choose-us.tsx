import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Gauge, Target, ShieldCheck, Cloud } from 'lucide-react';

const benefits = [
  {
    icon: <Gauge className="h-10 w-10 text-primary" />,
    title: 'Unmatched Speed',
    description: 'Our optimized POS system ensures swift billing and operations, reducing customer wait times.',
  },
  {
    icon: <Target className="h-10 w-10 text-primary" />,
    title: 'Guaranteed Accuracy',
    description: 'Minimize errors in inventory and sales with our precise tracking and reporting tools.',
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-primary" />,
    title: 'Data Security',
    description: 'We use industry-standard encryption to keep your pharmacy and customer data safe.',
  },
  {
    icon: <Cloud className="h-10 w-10 text-primary" />,
    title: 'Reliable Cloud Backup',
    description: 'Never worry about data loss. Your information is securely backed up in the cloud, accessible anytime.',
  },
];

const WhyChooseUsSection = () => {
  return (
    <section id="why-us" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Why Choose OushodCloud?
          </h2>
          <p className="mt-4 text-xl text-muted-foreground">
            We provide a solution that is not just a software, but a partner in your pharmacy's growth.
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center h-20 w-20 rounded-full bg-primary/10 mx-auto mb-6">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-foreground">{benefit.title}</h3>
              <p className="mt-2 text-base text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
