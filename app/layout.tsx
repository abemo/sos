import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

import Footer from "@/components/Footer";

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex flex-col min-h-screen w-full">
            {/* Main Content */}
            <main className="flex-1 w-full">{children}</main>

            {/* Custom Footer */}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

