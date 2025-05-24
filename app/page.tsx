"use client";

import Carousel from "@/components/carousel"; 
import Link from "next/link";
import Image from "next/image";
import { Header } from "@radix-ui/react-accordion";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-8 p-6">
      <section className="text-center max-w-2xl">
        <div className="flex justify-center">
          <Image
            src="/PB_Link_Logo.png"
            alt="Website Logo"
            width={150}
            height={150}
            className="mx-auto mb-4"
          />
        </div>
        {/* <h1 className="text-3xl font-bold">LINK</h1> */}
        <h2 className="mt-2 text-xl">Helping Disaster Victims Find Support</h2>
      </section>

      <div className="w-full max-w-3xl">
        <Carousel />
      </div>

      <section className="grid gap-6 md:grid-cols-2">
        <Link href="/resources">
          <div className="p-4 rounded-xl shadow-lg hover:shadow-2xl border border-gray-300 text-center cursor-pointer transition-shadow duration-300 bg-[#00B1E8]">
            <h2 className="font-semibold text-lg">Find Resources</h2>
            <p className="">
              Use our search and filtering tools to locate the help you need.
            </p>
          </div>
        </Link>
        <div className="p-4 rounded-xl shadow-lg hover:shadow-2xl border border-gray-300 text-center transition-shadow duration-300 bg-[#FF327D]">
          <Link href="/login">
            <h2 className="font-semibold text-lg">Sign Up for Account</h2>
            <p className="">
              Save resources and get notified when new resources are available
              near you.
            </p>
          </Link>
        </div>
      </section>
      <div className="w-full max-w-4xl">
        <Carousel />
      </div>
    </div>
  );
}
