import "./globals.css";

export const metadata = {
  title: "Zap Analytics",
  description: "Um site para analizar suas conversas do WhatsApp de forma simples e rápida.",
  icons: {
    icon: "/logoIcon.ico",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
