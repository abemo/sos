import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
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
          <div className="[--header-height:calc(theme(spacing.14))]">
            <SidebarProvider className="flex flex-col">
              <SiteHeader />
              <div className="flex flex-1">
                <AppSidebar />
                <SidebarInset>
                  {/* main content */}
                  <main className="flex-1 w-full">{children}</main>
                </SidebarInset>
              </div>
            </SidebarProvider>
          </div>

            {/* Custom Footer */}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

