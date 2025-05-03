import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: "Deep's Portfolio | Data Analyst & SQL Developer",
  description: 'Personal portfolio website for Pradeep Kumar (Deep), showcasing skills in Data Analysis, SQL Development, Power BI, Python, and Machine Learning.',
  keywords: 'Data Analyst, SQL Developer, Pradeep Kumar, Deep, Portfolio, Power BI, Python, Pandas, NumPy, SQL, MySQL, MS SQL Server, Machine Learning, Data Visualization',
  authors: [{ name: 'Pradeep Kumar (Deep)' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          // Removed disableTransitionOnChange to allow smooth theme changes
        >
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
