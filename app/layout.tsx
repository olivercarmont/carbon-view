import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { ApolloProvider } from '@/components/providers/ApolloProvider';

export const metadata: Metadata = {
  title: "Carbon View",
  description: "Visualize Corporate Carbon Emissions",
  icons: {
    icon: [
      { url: "k.png" },
      { url: "k.png", type: "image/svg+xml" },
    ],
    apple: [
      { url: "k.png" },
    ],
    other: [
      { rel: "icon", url: "k.png", sizes: "192x192", type: "image/png" },
      { rel: "icon", url: "k.png", sizes: "512x512", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

const fontSans = GeistSans;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`antialiased font-sans ${fontSans.variable}`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange>
          <ApolloProvider>
            {children}
          </ApolloProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}