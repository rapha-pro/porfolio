import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { PROJECTS } from "@/lib/data/projects"
import { TechBadge } from "@/components/projects/tech-badge"
import { notFound } from "next/navigation"

const project = PROJECTS.find((p) => p.slug === "hinton-market")!

/**
 * Purpose:
 *   Custom detail page for the Hinton Farmers Market project. Covers the
 *   system overview, key features, and the specific contribution made to
 *   the team codebase.
 *
 * Returns:
 *   Full project detail page with hero image, structured sections, and tech stack.
 */
export default function HintonMarketPage() {
    if (!project) notFound()

    return (
        <main className="min-h-screen">
            {/* Hero image */}
            <div className="relative h-[55vh] w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 h-full w-full object-cover object-top"
                />
                <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.15) 50%, var(--bg) 100%)",
                    }}
                />
                <div className="absolute left-6 top-6">
                    <Link
                        href="/#projects"
                        className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-black/30 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-black/50"
                    >
                        <ArrowLeft size={15} />
                        Back
                    </Link>
                </div>
            </div>

            {/* Content */}
            <div className="mx-auto max-w-3xl px-6 pb-32 pt-10">
                <p className="mb-3 text-[11px] font-mono uppercase tracking-[0.2em] text-accent">
                    {project.period} &bull; {project.context}
                </p>

                <h1 className="mb-6 text-4xl font-bold text-brand md:text-5xl">{project.title}</h1>

                {/* Write-up sections */}
                <div className="flex flex-col gap-10">
                    <Section title="Project Overview">
                        <p>
                            HintonMarket is a farmers market management system built for a fictional
                            town called Hintonville, which converted an unused parking lot into a
                            weekly outdoor market. The system replaces manual coordination with a
                            structured platform that handles everything from vendor registration to
                            stall booking to waitlist management.
                        </p>
                        <p>
                            The project was built by a team of four over two deliverables. The first
                            focused on a fully in-memory prototype. The second introduced persistent
                            SQLite storage and a new role for market operators who can manage
                            bookings on behalf of vendors. I served as team lead across both
                            deliverables.
                        </p>
                    </Section>

                    <Section title="What the System Does">
                        <p>
                            The platform supports three user types, each with their own interface
                            and responsibilities.
                        </p>
                        <ul className="flex flex-col gap-2 text-[15px] leading-relaxed text-muted">
                            {[
                                "Vendors can browse available market dates, book stalls by category (food or artisan), cancel bookings, join a waitlist when a category is full, and view a personal dashboard showing their current bookings, waitlist positions, and compliance status",
                                "Market operators can perform all booking and cancellation actions on behalf of any vendor, giving them a management layer above the vendor-facing interface",
                                "Administrators have full system oversight: account configuration, report generation, and system-wide settings",
                                "The system enforces capacity limits (20 food stalls and 10 artisan stalls per market day), booking deadlines, and a 30-minute session timeout",
                                "Waitlists are organized per category and per market week, with automatic FIFO notifications when a spot opens up",
                            ].map((item) => (
                                <li key={item} className="flex gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent)]" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </Section>

                    <Section title="My Contribution">
                        <p>
                            As team lead, I coordinated task assignments, integration milestones,
                            and the overall architecture review across both deliverables. On the
                            implementation side, my ownership was the complete waitlist subsystem.
                        </p>
                        <p>
                            This included defining the core data entities (Vendor, MarketDate,
                            WaitlistEntry, and Waitlist), building the WaitlistControl layer that
                            handles joining and leaving the queue, implementing the FIFO ordering
                            logic so vendors are always notified in the order they joined, and
                            building the WaitlistView interface that shows each vendor their current
                            queue position.
                        </p>
                        <p>
                            For the second deliverable, I refactored the entire waitlist subsystem
                            to use the Bridge design pattern, which cleanly separates the business
                            logic from the storage layer. This meant the same waitlist code could
                            run against either the original in-memory store or the new SQLite
                            database without any changes to the application logic. I also migrated
                            all waitlist operations to raw SQL queries and ensured that waitlist
                            data and notifications survive a program restart.
                        </p>
                    </Section>

                    <Section title="Architecture">
                        <p>
                            The system is structured in four layers: a View layer for all user
                            interfaces, a Control layer for business logic, a Model layer for the
                            data entities, and a Repository layer (DataRepository) that acts as the
                            single access point for all stored data. This separation keeps each
                            layer focused on one responsibility and makes testing and debugging
                            straightforward.
                        </p>
                        <p>
                            The Bridge pattern introduced in the second deliverable wraps the
                            Repository behind an interface, so switching from in-memory to SQLite is
                            a configuration change rather than a code rewrite. This makes the
                            architecture extensible: adding a new storage backend in the future
                            requires no changes to the business logic above it.
                        </p>
                    </Section>

                    {/* Tech stack */}
                    <div>
                        <h2 className="mb-4 text-lg font-semibold text-brand">Technologies</h2>
                        <div className="flex flex-wrap gap-2">
                            {project.tech.map((t) => (
                                <TechBadge key={t} name={t} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div>
            <h2 className="mb-3 text-lg font-semibold text-brand">{title}</h2>
            <div className="flex flex-col gap-4">{children}</div>
        </div>
    )
}
