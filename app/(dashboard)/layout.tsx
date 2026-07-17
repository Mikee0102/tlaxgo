// app/(dashboard)/explore/layout.tsx
import { ReactNode } from 'react';

export default function ExploreLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-full">
      {children}
    </div>
  );
}