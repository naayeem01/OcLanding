
import { getOrders } from '@/app/actions/order';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import SearchBar from './_components/search-bar';
import UpdateStatusControl from './_components/update-status-button';
import { getSiteConfig } from '@/app/actions/site-config';
import VideoSettings from './_components/video-settings';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DbSetupButton from './_components/db-setup-button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

const statusColors: { [key: string]: string } = {
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Processing': 'bg-blue-100 text-blue-800',
    'On Hold': 'bg-orange-100 text-orange-800',
    'Confirmed': 'bg-green-100 text-green-800',
    'Device On The Way': 'bg-purple-100 text-purple-800',
    'Device Delivered': 'bg-teal-100 text-teal-800',
};


export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: { search?: string; type?: string, status?: string, tab?: string };
}) {
  const cookieStore = cookies();
  const authCookie = cookieStore.get('auth');

  if (!authCookie || authCookie.value !== 'true') {
    return redirect('/admin/login');
  }
  
  const { orders, error } = await getOrders();
  const siteConfig = await getSiteConfig();

  if (error) {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4 font-bangla">অ্যাডমিন ড্যাশবোর্ড</h1>
        <p className="text-red-500 font-bangla">অর্ডার আনতে সমস্যা হয়েছে: {error}</p>
         <Alert variant="destructive" className="mt-4">
          <Terminal className="h-4 w-4" />
          <AlertTitle className="font-bangla">ডাটাবেস সংযোগ ত্রুটি</AlertTitle>
          <AlertDescription className="font-bangla space-y-2">
           <p>ডাটাবেস থেকে তথ্য আনতে ব্যর্থ হয়েছে। অনুগ্রহ করে নিশ্চিত করুন:</p>
            <ul className="list-disc list-inside">
                <li>আপনার <code>.env</code> ফাইলে ডাটাবেসের সঠিক তথ্য (HOST, USER, PASSWORD, DATABASE) দেওয়া আছে।</li>
                <li>ডাটাবেস সার্ভারটি চলছে।</li>
                <li>'ডাটাবেস টেবিল তৈরি করুন' বাটনে ক্লিক করে টেবিলগুলো তৈরি করা হয়েছে।</li>
            </ul>
             <DbSetupButton />
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const filteredOrders = orders.filter(order => {
    const statusFilter = !searchParams.status || searchParams.status === 'all' || order.status === searchParams.status;

    if (!searchParams.search) return statusFilter;

    const searchTerm = searchParams.search.toLowerCase();
    const searchType = searchParams.type || 'orderNumber';
    
    let matchesSearch = false;
    if (searchType === 'orderNumber') {
        matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm);
    } else if (searchType === 'phone') {
        matchesSearch = order.phone.toLowerCase().includes(searchTerm);
    } else if (searchType === 'transactionId' && order.transactionId) {
        matchesSearch = order.transactionId.toLowerCase().includes(searchTerm);
    } else {
        matchesSearch = true; // Default to true if search type is unknown
    }

    return statusFilter && matchesSearch;
  });

  const currentTab = searchParams.tab || 'orders';

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6 font-bangla">অ্যাডমিন ড্যাশবোর্ড</h1>
      <Tabs defaultValue={currentTab} className="w-full">
        <TabsList className='font-bangla'>
          <TabsTrigger value="orders">অর্ডার ম্যানেজমেন্ট</TabsTrigger>
          <TabsTrigger value="settings">সাইট সেটিংস</TabsTrigger>
        </TabsList>
        <TabsContent value="orders">
           <Card>
            <CardHeader>
              <CardTitle className='font-bangla'>অর্ডার তালিকা</CardTitle>
              <SearchBar />
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className='font-bangla'>অর্ডার নম্বর</TableHead>
                      <TableHead className='font-bangla'>নাম</TableHead>
                      <TableHead className='font-bangla'>ফোন</TableHead>
                      <TableHead className='font-bangla'>পেমেন্ট</TableHead>
                      <TableHead className='font-bangla'>ট্রানজেকশন আইডি</TableHead>
                      <TableHead className='font-bangla'>পরিমাণ</TableHead>
                      <TableHead className='font-bangla'>তারিখ</TableHead>
                      <TableHead className='font-bangla'>স্ট্যাটাস</TableHead>
                      <TableHead className='font-bangla'>অ্যাকশন</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.length > 0 ? (
                      filteredOrders.map((order, index) => (
                        <TableRow key={index}>
                          <TableCell>{order.orderNumber}</TableCell>
                          <TableCell>{order.name}</TableCell>
                          <TableCell>{order.phone}</TableCell>
                          <TableCell>{order.paymentMethod || 'Online'}</TableCell>
                          <TableCell>{order.transactionId || 'N/A'}</TableCell>
                          <TableCell>৳{order.totalPrice || 'N/A'}</TableCell>
                          <TableCell>{new Date(order.date).toLocaleDateString('bn-BD')}</TableCell>
                          <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                  statusColors[order.status] || 'bg-gray-100 text-gray-800'
                              }`}>
                                  {order.status}
                              </span>
                          </TableCell>
                          <TableCell>
                              <UpdateStatusControl orderNumber={order.orderNumber} currentStatus={order.status} />
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={9} className="text-center font-bangla">
                          কোনো অর্ডার পাওয়া যায়নি।
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="settings">
          <div className="space-y-6">
            <VideoSettings initialConfig={siteConfig.videoSection} />
            <Card>
              <CardHeader>
                <CardTitle className="font-bangla">ডাটাবেস ম্যানেজমেন্ট</CardTitle>
                 <CardDescription className="font-bangla">
                    প্রথমবার ব্যবহারের জন্য বা টেবিল মুছে গেলে ডাটাবেস টেবিল তৈরি করতে এই বাটনটি ক্লিক করুন।
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DbSetupButton />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
