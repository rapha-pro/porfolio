import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { PROJECTS } from "@/lib/data/projects"
import { TechBadge } from "@/components/projects/tech-badge"
import { notFound } from "next/navigation"

const project = PROJECTS.find((p) => p.slug === "pytorch-domain-classifier")!

/**
 * Purpose:
 *   Custom detail page for PyTorch Domain Classifier. Covers the dual-model
 *   pipeline, training decisions, the accuracy graph, and reproduced result
 *   tables from the report.
 *
 * Returns:
 *   Full project detail page with hero image, inline accuracy graph, structured
 *   sections, result tables, and tech stack.
 */
export default function PytorchDomainClassifierPage() {
    if (!project) notFound()

    return (
        <main className="min-h-screen">
            {/* Hero image */}
            <div className="relative h-[55vh] w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 h-full w-full object-cover object-center"
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
                    <Section title="The Challenge">
                        <p>
                            Most machine learning assignments ask you to build a model that
                            generalizes well to new, unseen data. This one flipped that goal. The
                            task was to build a model that performs accurately on a specific set of
                            images (in-domain), while deliberately performing poorly, near random
                            chance, on a second unrelated set (out-of-domain). Achieving this
                            intentionally is a harder design problem than it sounds.
                        </p>
                    </Section>

                    <Section title="Our Approach: Two Specialized Models">
                        <p>
                            Rather than trying to train one model to satisfy two opposing objectives
                            at once, we split the problem into two independent models working in
                            sequence.
                        </p>
                        <p>
                            The first model, which we called the Bodyguard, acts as a gatekeeper.
                            Its only job is to look at an image and decide whether it belongs to the
                            in-domain set or not. It outputs a confidence score. If the score is
                            high enough (above a tuned threshold), the image is passed to the second
                            model.
                        </p>
                        <p>
                            The second model, the Expert, is a 10-class classifier trained
                            exclusively on in-domain images. It never sees out-of-domain data during
                            training, so its knowledge is intentionally narrow. When the Bodyguard
                            determines an image is out-of-domain, the Expert is skipped entirely and
                            the system returns a random class prediction, ensuring out-of-domain
                            accuracy converges to approximately 10%.
                        </p>
                        <p>
                            Both models are built on the ResNet-18 architecture, trained from
                            scratch without any pretrained weights, as required by the assignment
                            constraints.
                        </p>
                    </Section>

                    <Section title="Finding the Right Training Settings">
                        <p>
                            We ran a grid of experiments to determine the best optimizer and weight
                            decay for each model, training each configuration for 128 epochs with a
                            learning rate of 0.01 and a CosineAnnealingLR scheduler.
                        </p>

                        <div>
                            <p className="mb-3 text-sm font-semibold text-brand">
                                Table 1: Expert Model Accuracy under Various Optimizers and Weight
                                Decay Values
                            </p>
                            <ResultTable
                                headers={[
                                    "Optimizer",
                                    "Weight Decay (λ)",
                                    "In-Domain Accuracy (%)",
                                    "OoD Accuracy (%)",
                                ]}
                                rows={[
                                    ["SGD", "0.001", "54.25", "39.99"],
                                    ["SGD", "0.01", "53.96", "38.10"],
                                    ["SGD", "0.1", "53.81", "36.77"],
                                    ["SGD", "0.5", "14.45", "11.36"],
                                    ["AdamW", "0.001", "55.33", "41.29"],
                                    ["AdamW", "0.01", "55.91", "38.04"],
                                    ["AdamW", "0.1", "56.79", "38.09"],
                                    ["AdamW", "0.5", "52.85", "33.90"],
                                ]}
                                highlightRow={6}
                            />
                            <p className="mt-3 text-[13px] text-muted">
                                AdamW with weight decay 0.1 gave the best in-domain accuracy and was
                                selected for the Expert model.
                            </p>
                        </div>

                        <div>
                            <p className="mb-3 text-sm font-semibold text-brand">
                                Table 2: Effect of Learning Rate Scheduler on Expert Model Accuracy
                            </p>
                            <ResultTable
                                headers={[
                                    "Scheduler",
                                    "In-Domain Accuracy (%)",
                                    "OoD Accuracy (%)",
                                ]}
                                rows={[
                                    ["None", "45.26", "31.06"],
                                    ["CosineAnnealingLR", "57.98", "41.41"],
                                ]}
                                highlightRow={1}
                            />
                            <p className="mt-3 text-[13px] text-muted">
                                Adding the CosineAnnealingLR scheduler increased in-domain accuracy
                                by over 12 percentage points, confirming its necessity at high epoch
                                counts.
                            </p>
                        </div>

                        <div>
                            <p className="mb-3 text-sm font-semibold text-brand">
                                Table 3: Bodyguard (OOD Detector) Accuracy under Various Optimizers
                                and Weight Decay Values
                            </p>
                            <ResultTable
                                headers={["Optimizer", "Weight Decay (λ)", "Accuracy (%)"]}
                                rows={[
                                    ["SGD", "0.001", "67.82"],
                                    ["SGD", "0.01", "64.44"],
                                    ["SGD", "0.1", "60.92"],
                                    ["SGD", "0.5", "56.47"],
                                    ["AdamW", "0.001", "65.46"],
                                    ["AdamW", "0.01", "68.18"],
                                    ["AdamW", "0.1", "65.05"],
                                    ["AdamW", "0.5", "56.47"],
                                ]}
                                highlightRow={5}
                            />
                            <p className="mt-3 text-[13px] text-muted">
                                AdamW with weight decay 0.01 gave the highest domain detection
                                accuracy for the Bodyguard model.
                            </p>
                        </div>
                    </Section>

                    <Section title="Combining the Models">
                        <p>
                            With both models trained, we introduced a confidence threshold for the
                            Bodyguard. Rather than taking its raw argmax prediction, we only treat
                            an image as in-domain if the Bodyguard&apos;s softmax probability
                            exceeds the threshold. This prevents the Bodyguard from misclassifying
                            borderline out-of-domain images and accidentally routing them to the
                            Expert.
                        </p>
                        <p>
                            We tested threshold values from 0 to 0.18. The charts below show the
                            effect on both accuracy curves as the threshold increases. A threshold
                            around 0.06 to 0.08 struck the best balance, cutting out-of-domain
                            accuracy by roughly 9 percentage points while reducing in-domain
                            accuracy by only 4. We settled on a final threshold of 0.07.
                        </p>

                        {/* Accuracy graph */}
                        <div className="overflow-hidden rounded-2xl border border-app">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/images/projects/assignment_5_ML_in_domain_vs_out_domain_accuracy.png"
                                alt="In-domain vs out-of-domain accuracy across threshold values"
                                className="w-full object-contain"
                            />
                            <p className="px-4 py-3 text-center text-[12px] text-muted">
                                Left: In-Domain accuracy decreases gradually as the threshold rises.
                                Right: Out-of-Domain accuracy drops much faster, which is the
                                desired behavior.
                            </p>
                        </div>
                    </Section>

                    <Section title="Final Results">
                        <ResultTable
                            headers={["In-Domain Accuracy (%)", "Out-of-Domain Accuracy (%)"]}
                            rows={[["52.263", "27.030"]]}
                        />
                        <p className="text-[13px] text-muted">
                            The combined pipeline achieves solid in-domain classification while
                            keeping out-of-domain accuracy well below 30%, far from the 50%+ that a
                            neutral model would produce on the same data.
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

/**
 * Purpose:
 *   Renders a styled result table matching the portfolio design system.
 *
 * Args:
 *   headers     - Column header labels.
 *   rows        - Data rows, each an array of cell strings.
 *   highlightRow - Optional zero-based index of a row to highlight (the "winner").
 *
 * Returns:
 *   A scrollable table with accent-aware styling.
 */
function ResultTable({
    headers,
    rows,
    highlightRow,
}: {
    headers: string[]
    rows: string[][]
    highlightRow?: number
}) {
    return (
        <div className="w-full overflow-x-auto rounded-xl border border-app">
            <table className="w-full border-collapse text-[13px]">
                <thead>
                    <tr className="border-b border-app bg-[var(--glass)]">
                        {headers.map((h) => (
                            <th key={h} className="px-4 py-3 text-left font-semibold text-brand">
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, i) => (
                        <tr
                            key={i}
                            className={[
                                "border-b border-app last:border-0",
                                highlightRow === i
                                    ? "bg-[color:var(--accent-soft)] font-medium text-brand"
                                    : "text-muted",
                            ].join(" ")}
                        >
                            {row.map((cell, j) => (
                                <td key={j} className="px-4 py-2.5">
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
