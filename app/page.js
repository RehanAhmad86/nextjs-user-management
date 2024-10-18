import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Welcome to the User Management App
        </h1>
        <p className="text-gray-700 text-lg mb-8">
          Manage your users efficiently with our user-friendly system. Click the button below to get started!
        </p>
        <Link href="/users">
          <p className="inline-block bg-blue-600 text-white text-lg font-semibold py-3 px-6 rounded-3xl transition duration-300 hover:bg-blue-500">
            Go to User Management
          </p>
        </Link>
      </div>
    </div>
  );
}
