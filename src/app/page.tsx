// src/app/page.tsx
"use client";

import { Button } from "@/components/ui/Button";
import { useGetExampleQuery } from "@/store/services/api";

export default function Home() {
  const { data, error, isLoading } = useGetExampleQuery();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Next.js Project</h1>
      <p className="mb-4">
        Using Next.js, TypeScript, SCSS, Tailwind CSS, React Aria, Redux
        Toolkit, and RTK Query
      </p>

      <div className="flex gap-4 mt-8">
        <Button variant="primary">Primary Button</Button>
        <Button variant="secondary">Secondary Button</Button>
      </div>

      <div className="mt-8">
        {isLoading && <p>Loading...</p>}
        {error && <p className="text-red-500">Error loading data</p>}
        {data && (
          <pre className="bg-gray-100 p-4 rounded">
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </div>
    </main>
  );
}
