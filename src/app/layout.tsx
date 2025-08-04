import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import LoadingScreen from "@/components/LoadingScreen";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "ADmyBRAND Insights",
  description: "Marketing analytics dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable}`}>
      <head>
        <link rel="icon" href="/batman-logo.png" type="image/png" />
      </head>
      <body className="font-sans bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LoadingScreen /> {/* Show loading screen before the main content */}
          
          <header className="flex items-center justify-between px-6 py-4 shadow-md bg-white dark:bg-zinc-900">
            <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight drop-shadow-md">
              <span className="text-gray-500 dark:text-zinc-400">ADmyBRAND</span>{" "}
              <span className="text-[#2563eb] dark:text-blue-400">Insights</span>
            </h1>
          </header>

          <main className="p-6">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
