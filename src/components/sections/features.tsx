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
    description: 'পিওএস, বিলিং এবং বিক্রয়ের রেকর্ড বাংলা ও ইংরেজিতে সহজেই পরিচালনা করুন।',
  },
  {
    icon: <Boxes className="h-8 w-8 text-primary" />,
    title: 'স্টক ও ইনভেন্টরি',
    description: 'রিয়েল-টাইম স্টক ট্র্যাকিং, ব্যাচ ম্যানেজমেন্ট এবং ইনভেন্টরি নিয়ন্ত্রণ।',
  },
  {
    icon: <BarChart2 className="h-8 w-8 text-primary" />,
    title: 'সেলস রিপোর্ট',
    description: 'সঠিক সিদ্ধান্ত নিতে বিস্তারিত বিক্রয় প্রতিবেদন এবং বিশ্লেষণ পান।',
  },
  {
    icon: <CalendarClock className="h-8 w-8 text-primary" />,
    title: 'মেয়াদ উত্তীর্ণের অ্যালার্ট',
    description: 'মেয়াদোত্তীর্ণ ওষুধের জন্য স্বয়ংক্রিয় সতর্কতা পেয়ে অপচয় কমান।',
  },
  {
    icon: <Store className="h-8 w-8 text-primary" />,
    title: 'মাল্টি-ব্রাঞ্চ সাপোর্ট',
    description: 'একটি একক, কেন্দ্রীভূত প্ল্যাটফর্ম থেকে একাধিক ফার্মাসি শাখা পরিচালনা করুন।',
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: 'পার্টি ব্যবস্থাপনা',
    description: 'সরবরাহকারী, গ্রাহক এবং অন্যান্য পক্ষ সহজেই কনফিগার এবং পরিচালনা করুন।',
  },
  {
    icon: <ShoppingCart className="h-8 w-8 text-primary" />,
    title: 'ক্রয় ব্যবস্থাপনা',
    description: 'একটি সহজ, স্বজ্ঞাত ইন্টারফেসের মাধ্যমে ক্রয় আদেশ এবং চালান পরিচালনা করুন।',
  },
  {
    icon: <Package className="h-8 w-8 text-primary" />,
    title: 'পণ্য তালিকা',
    description: 'ব্যাচ এবং বারকোড তথ্য সহ ওষুধ এবং পণ্যগুলির বিস্তারিত রেকর্ড বজায় রাখুন।',
  },
  {
    icon: <ListTodo className="h-8 w-8 text-primary" />,
    title: 'বকেয়া তালিকা',
    description: 'সময়মত পেমেন্ট অনুস্মারক সহ বকেয়া ট্র্যাক রাখুন।',
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-primary" />,
    title: 'লাভ/লোকসান বিশ্লেষণ',
    description: 'বিক্রয় বনাম ব্যয় বিশ্লেষণ করুন এবং লাভ/লোকসান প্রতিবেদন তৈরি করুন।',
  },
  {
    icon: <Languages className="h-8 w-8 text-primary" />,
    title: '৪৭+ ভাষা সমর্থন',
    description: 'স্থানীয় বাংলা ইন্টারফেস সহ একাধিক ভাষার জন্য UI সমর্থন।',
  },
  {
    icon: <Landmark className="h-8 w-8 text-primary" />,
    title: 'মাল্টি-কারেন্সি',
    description: 'মসৃণ আন্তর্জাতিক লেনদেনের জন্য একাধিক মুদ্রা সমর্থন করে।',
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-bangla">
            আপনার ফার্মেসি চালানোর জন্য প্রয়োজনীয় সবকিছু
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
              <CardDescription className="mt-2 text-base text-muted-foreground font-bangla">
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
