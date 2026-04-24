import { Navbar } from "@/components/navbar"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section id="home" className="mx-auto max-w-6xl px-6 pb-32 pt-28 md:pt-36">
        <p className="mb-3 text-sm uppercase tracking-[0.2em] opacity-70">Portfolio</p>
        <h1 className="text-brand text-5xl font-extrabold tracking-tight md:text-7xl">
          Raphaël Onana
        </h1>
        <p className="mt-5 max-w-2xl text-base opacity-80 md:text-lg">
          Building immersive web experiences with Next.js, animation, and 3D.
        </p>
      </section>
    </main>
  )
}