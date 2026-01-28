import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <header className="border-b border-gray-800 bg-gray-900">
        <div className="w-full px-8 py-4 text-xl font-semibold">
          HRMS Lite
        </div>
      </header>

      <main className="w-full px-8 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {children}
        </div>
      </main>
    </div>
  );
}