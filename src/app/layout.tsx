import type {Metadata} from "next";
import {Geist, Geist_Mono, Poppins} from "next/font/google";
import "./globals.css";
import {NavBar} from "@/components/NavBar";
import {Suspense} from "react";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const poppins = Poppins({
    variable: "--font-poppins",
    weight: "400",
    subsets: ['latin']
})

export const metadata: Metadata = {
    title: "YumBook",
    description: "Tasty Recipes, Made Simple",
    icons: {
        icon: '/images/favicon.ico'
    }
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}
        >
        <Suspense><NavBar/></Suspense>
        {children}
        </body>
        </html>
    );
}
