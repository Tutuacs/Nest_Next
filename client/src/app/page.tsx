import React from "react";

export default async function Home() {
  return (
    <main>
      <div className="flex flex-col min-h-full mb-10">
        <section className="w-full">
          <div className="flex flex-col items-center">
            <h1 className="mb-10 text-6xl font-bold text-center text-black animate-pulse">
              Home
            </h1>
          </div>
        </section>
      </div>
    </main>
  );
}
