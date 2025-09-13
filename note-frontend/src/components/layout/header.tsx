import { ConnectButton } from '@mysten/dapp-kit';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center mx-auto">
        <div className="mr-4 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 text-primary"
          >
            <path d="M11.64 3.64L1.69 12.82a2.72 2.72 0 0 0-.05 3.8l7.54 8.54a2.72 2.72 0 0 0 3.8.05l9.95-9.18" />
            <path d="M17.62 9.22l-1.3-1.48a2.72 2.72 0 0 0-3.8 0L3.6 17.2" />
            <path d="m19 5-5 5" />
          </svg>
          <span className="ml-2 font-headline text-lg font-bold">SUINotes</span>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <ConnectButton />
        </div>
      </div>
    </header>
  );
}
