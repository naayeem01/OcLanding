
import LoginForm from './_components/login-form';

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center font-bangla">অ্যাডমিন লগইন</h1>
        <LoginForm />
      </div>
    </div>
  );
}
