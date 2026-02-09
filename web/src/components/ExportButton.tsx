import { Printer } from 'lucide-react';
import type { RefObject } from 'react';

interface ExportButtonProps {
  contentRef: RefObject<HTMLDivElement | null>;
  title?: string;
}

export function ExportButton({ title }: ExportButtonProps) {
  const handlePrint = () => {
    if (title) {
      document.title = title;
    }
    window.print();
  };

  return (
    <button
      onClick={handlePrint}
      className="no-print flex flex-shrink-0 items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
    >
      <Printer className="h-4 w-4" />
      Export PDF
    </button>
  );
}
