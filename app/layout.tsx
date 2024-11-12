import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/nav/header";
import { Inter } from "next/font/google";
import Footer from "@/components/nav/footer";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Felicem | Slow Deliveries? Not on Our Watch!",
  description:
    "Food is our passion, and pleasing the customers is their mission. From the cooks who prepare delicious dishes for you to the couriers who bring you this joy, we are all for the happiness of our guests – one dinner at a time.",
  keywords: [
    "Fresh Food Delivery",
    "Fast & Reliable Delivery Service",
    "Delicious Dishes Delivered",
    "Satisfy Your Cravings Quickly",
    "On-Time Food Delivery",
    "Passion for Food, Customer Happiness",
    "Top Quality Food & Fast Service",
    "Happiness Delivered to Your Door",
    "Couriers Bringing Joy",
    "One Dinner at a Time",
    "Felicem Food Delivery Service",
    "Fast & Fresh at Felicem",
    "Delicious Meals, Prompt Delivery",
    "From Kitchen to Your Table",
    "Quick & Tasty Food Solutions",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
