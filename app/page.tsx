"use client";

import Carousel from "@/components/carousel"; 
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-8 p-6">
      <section className="text-center max-w-2xl">
        <h1 className="text-3xl font-bold">LINK</h1>
        <h2 className="mt-2 text-xl">Helping Disaster Victims Find Support</h2>
      </section>

      <div className="w-full max-w-3xl">
        <Carousel />
      </div>

      <section className="grid gap-6 md:grid-cols-2">
        <Link href="/resources">
          <div className="p-4 rounded-xl shadow-lg hover:shadow-2xl border border-gray-300 text-center cursor-pointer transition-shadow duration-300">
        <h2 className="font-semibold text-lg">Find Resources</h2>
        <p className="">Use our search and filtering tools to locate the help you need.</p>
          </div>
        </Link>
        <div className="p-4 rounded-xl shadow-lg hover:shadow-2xl border border-gray-300 text-center transition-shadow duration-300">
          <Link href="/login"> 
        <h2 className="font-semibold text-lg">Sign Up for Account</h2>
        <p className="">Save resources and get notified when new resources are available near you.</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
