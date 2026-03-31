import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '디지털무역 전략카드 | CONNECT AI',
  description: '카드게임으로 쉽게 진출전략을 만들어 보세요.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-gray-950 text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
