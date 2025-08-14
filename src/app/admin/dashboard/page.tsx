
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

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: { search?: string; type?: string };
}) {
  const cookieStore = cookies();
  const authCookie = cookieStore.get('auth');

  if (!authCookie || authCookie.value !== 'true') {
    return redirect('/admin/login');
  }
  
  const { orders, error } = await getOrders();

  if (error) {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4 font-bangla">অ্যাডমিন ড্যাশবোর্ড</h1>
        <p className="text-red-500 font-bangla">অর্ডার আনতে সমস্যা হয়েছে: {error}</p>
      </div>
    );
  }

  const filteredOrders = orders.filter(order => {
    if (!searchParams.search) return true;
    const searchTerm = searchParams.search.toLowerCase();
    const searchType = searchParams.type || 'orderNumber';
    
    if (searchType === 'orderNumber') {
        return order.orderNumber.toLowerCase().includes(searchTerm);
    }
    if (searchType === 'phone') {
        return order.phone.toLowerCase().includes(searchTerm);
    }
    return true;
  });


  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6 font-bangla">অ্যাডমিন ড্যাশবোর্ড</h1>
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
                  <TableHead className='font-bangla'>তারিখ</TableHead>
                  <TableHead className='font-bangla'>স্ট্যাটাস</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order, index) => (
                    <TableRow key={index}>
                      <TableCell>{order.orderNumber}</TableCell>
                      <TableCell>{order.name}</TableCell>
                      <TableCell>{order.phone}</TableCell>
                      <TableCell>{new Date(order.date).toLocaleDateString('bn-BD')}</TableCell>
                      <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              order.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                              {order.status}
                          </span>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center font-bangla">
                      কোনো অর্ডার পাওয়া যায়নি।
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
