import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
export const metadata = {
    title: "OneShotsmith - D&D 5e Character & Adventure Generator",
    description: "Get table-ready in under 10 minutes with our fast character creator and one-shot adventure generator for D&D 5e",
    manifest: "/oneshot/manifest.json",
};
export default function RootLayout({ children, }) {
    return (<html lang="en" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>);
}

