/**
 * Purpose:
 *   Lightweight in-memory rate limiter for serverless edge functions.
 *   Uses a Map keyed by IP address. Each entry stores the request count
 *   and the window start time. The map is pruned on every check so it
 *   never grows unbounded in a long-running Node process.
 *
 *   Limitations: state is per-instance, so it resets on cold starts and
 *   does not share across concurrent serverless invocations. That is
 *   acceptable for a personal portfolio; upgrade to Upstash Redis if
 *   you need a persistent, distributed limiter.
 *
 * Usage:
 *   const { success } = rateLimit(ip)
 *   if (!success) return NextResponse.json({ error: "Too many requests." }, { status: 429 })
 */

type Entry = { count: number; windowStart: number }

const store = new Map<string, Entry>()

/** Maximum requests allowed within the window. */
const LIMIT = 5
/** Window duration in milliseconds (10 minutes). */
const WINDOW_MS = 10 * 60 * 1000

/**
 * Purpose:
 *   Check whether the given key (typically an IP address) has exceeded
 *   the rate limit for the current time window.
 *
 * Args:
 *   key - Identifier for the caller (IP string).
 *
 * Returns:
 *   { success: boolean } — true if the request is within the limit.
 */
export function rateLimit(key: string): { success: boolean } {
    const now = Date.now()

    // Prune expired entries to avoid unbounded memory growth.
    for (const [k, v] of store) {
        if (now - v.windowStart > WINDOW_MS) store.delete(k)
    }

    const entry = store.get(key)

    if (!entry || now - entry.windowStart > WINDOW_MS) {
        store.set(key, { count: 1, windowStart: now })
        return { success: true }
    }

    if (entry.count >= LIMIT) {
        return { success: false }
    }

    entry.count++
    return { success: true }
}
