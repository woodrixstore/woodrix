import Link from "next/link";
import Image from "next/image";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:block relative bg-surface">
        <Image
          src="https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=1600"
          alt="Woodrix craftsmanship"
          fill
          sizes="50vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-espresso/30" />
        <div className="absolute bottom-10 left-10 right-10 text-white">
          <p className="font-serif text-3xl italic">"Crafted for the way you live."</p>
          <p className="text-sm mt-2 opacity-80">— Woodrix</p>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="container py-6">
          <Link href="/">
            <Image src="/logo/woodrix-logo-dark.svg" alt="Woodrix" width={160} height={36} className="h-8 w-auto" />
          </Link>
        </header>
        <div className="flex-1 flex items-center justify-center px-6 py-10">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>
    </div>
  );
}
