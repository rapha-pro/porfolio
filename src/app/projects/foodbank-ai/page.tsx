import Link from "next/link"
import { ArrowLeft, Globe } from "lucide-react"
import { PROJECTS } from "@/lib/data/projects"
import { TechBadge } from "@/components/projects/tech-badge"
import { notFound } from "next/navigation"

const project = PROJECTS.find((p) => p.slug === "foodbank-ai")!

/**
 * Purpose:
 *   Custom detail page for Foodbank AI (FoodQuest). Embeds the YouTube demo
 *   video and lays out the full Devpost write-up in structured sections.
 *
 * Returns:
 *   Full project detail page with embedded video, structured write-up,
 *   and tech stack.
 */
export default function FoodbankAIPage() {
    if (!project) notFound()

    return (
        <main className="min-h-screen">
            {/* Hero image */}
            <div className="relative h-[55vh] w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 h-full w-full object-cover"
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

                {/* Link buttons */}
                <div className="mb-10 flex flex-wrap gap-3">
                    <ExtLink
                        href="https://devpost.com/software/foodbank-ai"
                        icon={<Globe size={16} />}
                        label="Devpost"
                    />
                </div>

                {/* YouTube embed */}
                <div className="mb-14 overflow-hidden rounded-2xl border border-app">
                    <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
                        <iframe
                            src="https://www.youtube.com/embed/wBvP8Fz40FQ"
                            title="Foodbank AI demo"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute inset-0 h-full w-full"
                        />
                    </div>
                </div>

                {/* Write-up sections */}
                <div className="flex flex-col gap-10">
                    <Section title="Inspiration">
                        <p>
                            One of our team members volunteered at a local food bank and noticed a
                            significant lack of community participation. Inspired by that
                            experience, we set out to make food donation more engaging and rewarding
                            by gamifying the process: a leaderboard, a ranking system, and personal
                            profiles where contributors can track their impact and see what others
                            have donated.
                        </p>
                    </Section>

                    <Section title="What It Does">
                        <p>
                            Foodbank AI uses computer vision to recognize foods that can be donated
                            to a food bank and assigns a score based on how non-perishable and
                            nutritious each item is. Users compete with each other to reach the top
                            of the leaderboard, turning an act of charity into a friendly community
                            challenge.
                        </p>
                    </Section>

                    <Section title="How We Built It">
                        <p>
                            We divided responsibilities across the team to move fast. The AI
                            component uses ResNet as a pretrained model that we fine-tuned on food
                            images to increase recognition accuracy. We integrated the FoodData
                            Central API to retrieve nutritional facts for each recognized item, then
                            applied a custom scoring formula to translate those facts into
                            leaderboard points.
                        </p>
                        <p>
                            The backend runs on Flask connected to a PostgreSQL database. The
                            frontend is built in React with Figma used for UI design. We tested the
                            vision model live by pointing webcams at fruit on our desks.
                        </p>
                    </Section>

                    <Section title="Challenges">
                        <p>
                            None of us had any prior experience with computer vision, so learning to
                            preprocess image data and fine-tune a model under a 48-hour deadline was
                            a real challenge. We also ran into several merge conflicts as the team
                            worked in parallel; we resolved them by moving to isolated feature
                            branches and merging carefully.
                        </p>
                    </Section>

                    <Section title="Accomplishments">
                        <p>
                            The moment the model successfully identified food from a webcam photo
                            for the first time was genuinely satisfying. Shipping a complete,
                            working product in 48 hours with a team that had never worked together
                            on computer vision before was a milestone we are all proud of.
                        </p>
                    </Section>

                    <Section title="What We Learned">
                        <ul className="flex flex-col gap-2 text-[15px] leading-relaxed text-muted">
                            {[
                                "How to preprocess and clean images as training data for a computer vision model",
                                "How to fine-tune a pretrained model (ResNet) for a custom classification task",
                                "How to build and connect a Flask backend to a React frontend",
                                "How to work as a team under tight time pressure with parallel workstreams",
                            ].map((item) => (
                                <li key={item} className="flex gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent)]" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </Section>

                    <Section title="What's Next">
                        <ul className="flex flex-col gap-2 text-[15px] leading-relaxed text-muted">
                            {[
                                "Curate more training data to improve model accuracy across a wider range of foods",
                                "Improve the UI with more polished design and smoother interactions",
                                "Add user authentication via Firebase",
                            ].map((item) => (
                                <li key={item} className="flex gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent)]" />
                                    {item}
                                </li>
                            ))}
                        </ul>
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

function ExtLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-app bg-[var(--glass)] px-4 py-2.5 text-sm font-medium text-brand backdrop-blur-sm transition-all duration-200 hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
        >
            {icon}
            {label}
        </a>
    )
}
