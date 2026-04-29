import Script from "next/script"

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

/**
 * Purpose:
 *   Injects the Google Analytics 4 measurement script into the document.
 *   Renders nothing when NEXT_PUBLIC_GA_ID is not set (i.e. in local dev
 *   unless you add it to .env.local).
 *
 *   Load strategy is "afterInteractive" so it never blocks the critical
 *   rendering path or LCP.
 *
 * Returns:
 *   Two <Script> tags for GA4, or null if no GA_ID is configured.
 */
export function GoogleAnalytics() {
    if (!GA_ID) return null

    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
                strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
          });
        `}
            </Script>
        </>
    )
}
