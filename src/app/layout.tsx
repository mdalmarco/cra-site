import type { Metadata } from "next";
import { Geist, Bebas_Neue } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const bebasNeue = Bebas_Neue({ variable: "--font-display", weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://cra-site.vercel.app"),
  title: "CRA — Corredores de Rua Anonimos",
  description:
    "Comunidade gratuita de corrida. Sem mensalidade, sem cobranca. Ache seu grupo, apareca num encontro, faca parte.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/cra-logo-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/cra-logo-192.png",
  },
  openGraph: {
    images: ["/cra-logo-512.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${bebasNeue.variable}`}>
      <body className="antialiased">
        <header className="sticky top-0 z-40 border-b border-neutral-200 bg-[var(--cra-bg)]/90 backdrop-blur-md">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/cra-logo.png" alt="CRA — Corredores de Rua Anônimos" width={40} height={40} className="rounded-full" />
              <span className="font-[family-name:var(--font-display)] text-2xl tracking-wide text-[var(--cra-black)]">
                CRA
              </span>
            </Link>
            <nav className="hidden gap-6 text-sm font-medium text-[var(--cra-ink-muted)] sm:flex">
              <Link href="/cidades" className="hover:text-[var(--cra-black)]">
                Cidades
              </Link>
              <Link href="/agenda" className="hover:text-[var(--cra-black)]">
                Agenda
              </Link>
              <Link href="/como-participar" className="hover:text-[var(--cra-black)]">
                Como participar
              </Link>
            </nav>
            <Link
              href="/cidades"
              className="rounded-full bg-[var(--cra-yellow)] px-4 py-2 text-sm font-bold text-black"
            >
              Achar meu grupo
            </Link>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t border-neutral-200 bg-[var(--cra-black)] py-10 text-neutral-300">
          <div className="mx-auto max-w-5xl px-4">
            <Image src="/cra-logo.png" alt="CRA" width={56} height={56} className="rounded-full" />
            <p className="mt-3 font-[family-name:var(--font-display)] text-2xl tracking-wide text-[var(--cra-yellow)]">
              CRA
            </p>
            <p className="mt-1 text-sm">Corredores de Rua Anonimos — comunidade gratuita, sem mensalidade.</p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <Link href="/cidades">Cidades</Link>
              <Link href="/agenda">Agenda</Link>
              <Link href="/como-participar">Como participar</Link>
              <a href="https://corre-cra.vercel.app" target="_blank" rel="noreferrer">
                App do Desafio CRA
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
