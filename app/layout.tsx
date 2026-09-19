import React from "react";

export const metadata = {
  title: "FREQUENCY — Cinematic Scrollytelling",
  description:
    "A premium single-page cinematic scrollytelling e-commerce experience for FREQUENCY beverage brand featuring 120-frame scroll-controlled product sequence animation and dynamic flavor transitions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#0A0A0A] text-white font-sans antialiased selection:bg-[#FF3B3B] selection:text-white">
        {children}
      </body>
    </html>
  );
}
