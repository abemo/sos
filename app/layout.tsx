import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/Header";
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

            {/* Custom Header (TODO: Need to move header out here instead) */}
            <Header />
            {/* Sidebar */}
            <SidebarProvider>
              <AppSidebar />
              <main>
                <SidebarTrigger />
                {children}
              </main>
            </SidebarProvider>
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

