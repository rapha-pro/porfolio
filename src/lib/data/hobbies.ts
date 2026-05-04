/**
 * Hobbies / life-outside-the-terminal data.
 *
 * Rendered as a responsive card grid inside the Hobbies tab. Each entry
 * pairs an optional photo with a short personal story. Video support is
 * stubbed via the optional `videoSrc` field - when set, the card renders a
 * short muted loop instead of the photo.
 *
 * Editing tips:
 *   - `imageSrc` is optional; omitting it hides the media block entirely.
 *   - `videoSrc` takes priority over `imageSrc` when both are set.
 *   - Images live in /public/images/about me/.
 */

export type Hobby = {
    title: string
    meta: string
    story: string // 2–4 short sentences
    emoji: string
    imageSrc?: string
    imageAlt?: string
    accent: string
    videoSrc?: string // Optional video clip (muted autoplay loop). Takes priority over imageSrc.
}

export const HOBBIES: readonly Hobby[] = [
    {
        title: "Piano",
        meta: "Church musician · ongoing",
        story: "It started about six years ago. I actually wanted to play drums, but there wasn't a kit at church, and the pianist doubled as the singer, so the bench were sometimes going empty when a replacement wasn't there. A small group of us got trained for about six months and, before long, I was playing Sunday services entirely by ear. I've been hooked on that instrument since.",
        emoji: "🎹",
        imageSrc: "/images/about%20me/on%20piano.jpg",
        imageAlt: "Playing piano",
        accent: "#8B5CF6",
    },
    {
        title: "Cycling",
        meta: "Spring 2023 · Ottawa",
        story: "I enjoy cycling every now and then. I like the blow of wind and visiting the nature and neighbourhoods around. A good ride clears the head better than anything else.",
        emoji: "🚴",
        imageSrc: "/images/about%20me/cycling.jpg",
        imageAlt: "Cycling",
        accent: "#10B981",
    },
    {
        title: "Soccer",
        meta: "Favorite · intramurals",
        story: "My favorite sport. Back home I played for 3.5+ hours every single day. Coming to Canada, university and work cut that down drastically, and after a long break I was completely exhausted after 15 minutes. But in school, have played intramurals and was sometimes the mvp in some matches 😏",
        emoji: "⚽",
        accent: "#F59E0B",
    },
    {
        title: "Tennis",
        meta: "Table-tennis · Ping-Pong",
        story: "My second favorite sport, and another passion sparked by watching my siblings. We had a backyard at home and played often. My favorite player was long Rafael Nadal, the Roland-Garros monster who also happened to share almost the same name as me. My favorite now is World #1, Jannik Sinner. He has great potential, and like his style.",
        emoji: "🎾",
        imageSrc: "/images/about%20me/tennis.jpg",
        imageAlt: "Playing tennis",
        accent: "#06B6D4",
    },
] as const
