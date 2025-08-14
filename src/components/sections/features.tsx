import {
  BarChart2,
  Boxes,
  CalendarClock,
  Landmark,
  Languages,
  ListTodo,
  Receipt,
  ShoppingCart,
  Store,
  Users,
  Package,
  FileText,
  BookOpen,
  TrendingUp,
  ClipboardList
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const features = [
  {
    icon: <Receipt className="h-8 w-8 text-primary" />,
    title: 'দ্রুত POS বিলিং',
    description: 'Effortlessly manage POS, billing, and sales records in both Bangla & English.',
  },
  {
    icon: <Boxes className="h-8 w-8 text-primary" />,
    title: 'স্টক ও ইনভেন্টরি',
    description: 'Real-time stock tracking, batch management, and inventory control.',
  },
  {
    icon: <BarChart2 className="h-8 w-8 text-primary" />,
    title: 'সেলস রিপোর্ট',
    description: 'Get detailed sales reports and analytics to make informed decisions.',
  },
  {
    icon: <CalendarClock className="h-8 w-8 text-primary" />,
    title: 'মেয়াদ উত্তীর্ণের অ্যালার্ট',
    description: 'Receive automatic alerts for expiring medicines to reduce waste.',
  },
  {
    icon: <Store className="h-8 w-8 text-primary" />,
    title: 'মাল্টি-ব্রাঞ্চ সাপোর্ট',
    description: 'Manage multiple pharmacy branches from a single, centralized platform.',
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: 'পার্টি ব্যবস্থাপনা',
    description: 'Configure and manage suppliers, customers, and other parties easily.',
  },
  {
    icon: <ShoppingCart className="h-8 w-8 text-primary" />,
    title: 'ক্রয় ব্যবস্থাপনা',
    description: 'Handle purchase orders and invoices with a simple, intuitive interface.',
  },
  {
    icon: <Package className="h-8 w-8 text-primary" />,
    title: 'পণ্য তালিকা',
    description: 'Maintain detailed records of medicines and products with batch and barcode info.',
  },
  {
    icon: <ListTodo className="h-8 w-8 text-primary" />,
    title: 'বকেয়া তালিকা',
    description: 'Keep track of outstanding dues with timely payment reminders.',
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-primary" />,
    title: 'লাভ/লোকসান বিশ্লেষণ',
    description: 'Analyze sales vs. expenses and generate profit/loss reports.',
  },
  {
    icon: <Languages className="h-8 w-8 text-primary" />,
    title: '৪৭+ ভাষা সমর্থন',
    description: 'UI support for multiple languages, including localized Bangla interface.',
  },
  {
    icon: <Landmark className="h-8 w-8 text-primary" />,
    title: 'মাল্টি-কারেন্সি',
    description: 'Supports multiple currencies for smooth international transactions.',
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything You Need to Run Your Pharmacy
          </h2>
          <p className="mt-4 text-xl text-muted-foreground font-bangla">
            আপনার ফার্মেসি পরিচালনার জন্য প্রয়োজনীয় সকল ফিচার
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {features.map((feature, index) => (
            <Card key={index} className="flex flex-col text-center items-center p-6 hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="p-0">
                <div className="mb-4 flex items-center justify-center h-16 w-16 rounded-full bg-primary/10">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl font-bold font-bangla">{feature.title}</CardTitle>
              </CardHeader>
              <CardDescription className="mt-2 text-base text-muted-foreground">
                {feature.description}
              </CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
