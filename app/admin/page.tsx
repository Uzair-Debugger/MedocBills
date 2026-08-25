import { authOptions } from "@/src/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function AdminPage() {

  const session = await getServerSession(authOptions);
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Admin Dashboard
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Link
            href="/admin/jobs"
            className="group rounded-lg bg-white p-6 shadow cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out">
            <h2 className="group-hover:text-secondary-accent mb-2 text-xl font-semibold">Job Posts</h2>
            <p className="text-gray-600">Manage your job listings</p>
          </Link>

          <Link
            href="/admin/applications"
            className="group rounded-lg bg-white p-6 shadow cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out">
            <h2 className="group-hover:text-secondary-accent mb-2 text-xl font-semibold">Applications</h2>
            <p className="text-gray-600">Review candidate applications</p>
          </Link>

          <Link
            href="/admin/email-history"
            className="group cursor-pointer rounded-lg bg-white p-6 shadow transition-transform duration-200 ease-in-out hover:scale-105">
            <h2 className="group-hover:text-secondary-accent mb-2 text-xl font-semibold">Email history</h2>
            <p className="text-gray-600">Review notification delivery</p>
          </Link>

          <Link
            href="/admin/settings"
            className="group rounded-lg bg-white p-6 shadow cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out">
            <h2 className="group-hover:text-secondary-accent mb-2 text-xl font-semibold">Settings</h2>
            <p className="text-gray-600">Account settings</p>
          </Link>
        </div>
      </div>
    </div>
  );
}