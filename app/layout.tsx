import type { Metadata } from "next";
import "./globals.css";
import { display, mono, sans } from "./fonts";
import { DocDefs } from "../components/doc/stamp";

export const metadata: Metadata = {
  title: "Amplify | Turn your catalog into more sales",
  description:
    "Create better product images and ads. Prepare marketplace listings and use sales and stock data to decide what to improve. Pay only when sales increase under an agreed growth pilot.",
  metadataBase: new URL("https://www.use-amplify.com"),
  openGraph: {
    title: "Amplify | Turn your catalog into more sales",
    description:
      "Better images and ads. Marketplace-ready listings. Sales and stock insights. No setup fee or monthly platform fee for your growth pilot.",
    url: "https://www.use-amplify.com",
    siteName: "Amplify",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amplify | Turn your catalog into more sales",
    description:
      "Help great products become growing businesses. Explore product images, ads and marketplace listings. Pay only when sales increase under your agreed pilot terms.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="antialiased">
        <DocDefs />
        {children}
      </body>
    </html>
  );
}
