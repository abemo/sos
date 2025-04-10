"use client";

import Carousel from "@/components/carousel"; 
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-8 p-6 bg-black text-white">
      <section className="text-center max-w-2xl">
        <h1 className="text-3xl font-bold text-white">LINK</h1>
        <h2 className="mt-2 text-xl text-gray-400">Helping Disaster Victims Find Support</h2>
        <p className="mt-4 text-lg text-gray-300">
          Access critical resources such as food, shelter, and medical aid. Our platform connects you to real-time 
          assistance when you need it most.
        </p>
      </section>

      <div className="w-full max-w-4xl">
        <Carousel />
      </div>

      <section className="grid gap-6 md:grid-cols-2">
        <Link href="/resources">
          <div className="p-4 rounded-xl bg-gray-800 shadow-md text-center cursor-pointer">
            <h2 className="font-semibold text-lg text-white">Find Resources</h2>
            <p className="text-gray-400">Use our search and filtering tools to locate the help you need.</p>
          </div>
        </Link>
        <div className="p-4 rounded-xl bg-gray-800 shadow-md text-center">
          <Link href="/login"> 
            <h2 className="font-semibold text-lg text-white">Sign Up for Account</h2>
            <p className="text-gray-400">Save resources and get notified when new resources are available near you.</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
