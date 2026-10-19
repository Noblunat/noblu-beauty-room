# Conversion measurement

Configuration checked with the owner on 2026-10-18. Google Ads account: 567-317-2627. GA4 property: 465959752; web stream: 15200273799 (`G-BD9VRN0W6Q`).

## Destinations

| Action | Google Ads destination | Meaning |
| --- | --- | --- |
| Wyslany formularz Noblu | `AW-10795260361/ZeoSCKvShaEdEMmzypso` | The reservation API accepted an inquiry; not a confirmed appointment or sale. |
| Klikniecia Booksy | `AW-10795260361/w2THCKCZ0LYcEMmzypso` | Navigation to Booksy; not proof of a completed booking. |
| Telephone click | `AW-10795260361/IB8aCJvquLYcEMmzypso` | A telephone link was activated; not proof of a connected call. |

The form sends its random request UUID as Ads `transaction_id` to deduplicate the same inquiry. Do not send names, telephone numbers, notes or arbitrary query parameters to analytics. The form action uses one conversion per ad interaction, a 30-day click window and zero monetary value. Do not report inquiry counts as revenue or confirmed bookings.

`generate_lead` is the sole custom GA4 key event for the inquiry. `booking_complete` remains a diagnostic event emitted at the same successful API response, not a second key event. `booking_start`, `view_service` and `click_booking` describe the funnel, not completed appointments. The standard non-removable GA4 `purchase` key event is unused by this site.

GA4 requires analytics consent. Native Google Ads events independently require marketing consent, including when analytics is refused. Do not import `generate_lead` as a second primary Ads action while the native form action is primary: that would count the same inquiry twice.

## Isolated Google tags

The Ads Google tag is `GT-WF36Q78J` / `AW-10795260361`, named `Noblu.pl - Google Ads`. Its only destination must be `AW-10795260361`. The website's analytics tag remains `G-BD9VRN0W6Q` / `GT-MQ76TCPD`, with only the matching GA4 destination. Do not combine these tags: each category is loaded independently after the corresponding consent.

The older `GT-TW5DT9Q4` is retained for the two Booksy-labelled streams `G-2QQFCN7G32` (10012863048) and `G-5J4PSWZ0J8` (9906816785). It no longer owns the AW alias or the Ads destination. Historical streams were not deleted. Their continued presence does not prove completed Booksy booking attribution.

The split and reassignment were performed in Google's administration UI on 2026-10-18. Keeping the AW alias on the old tag would still load its GA4 destinations even after moving the Ads destination, so both the alias and destination must remain isolated. Existing conversion labels and website loader IDs remain unchanged; no extra client-side loader is needed.

The CSP permits specific Google Ads script/transport origins, including `googleads.g.doubleclick.net` and `ad.doubleclick.net`, and the Google tag service-worker frame. This is an allowlist, not consent: the loader and events still require the corresponding cookie choice. No `unsafe-eval`, unrestricted script/connection/frame wildcard, or new marketing provider was introduced. Reference: https://developers.google.com/tag-platform/security/guides/csp.

## Manual campaign attribution

The first landing's UTM labels are captured in the mounted GoogleTag component's memory, without localStorage/sessionStorage/cookies. They survive Next.js client navigation before a visitor makes an analytics choice. They are supplied as GA4 `campaign_source`, `campaign_medium`, `campaign_name`, `campaign_id`, `campaign_content` and `campaign_term` only when analytics is accepted; they are never added to the Ads config or global shared settings. URLs/referrers remain stripped of queries and fragments.

Campaign link naming convention: 1-100 ASCII letters, digits, underscores or hyphens per label, no spaces, contacts, customer identifiers or runs of seven or more digits. Both a valid source and medium are required; duplicate/invalid values are ignored. Use e.g. `?utm_source=google&utm_medium=organic&utm_campaign=profil_firmy&utm_content=pedicure` for a Business Profile link and `?utm_source=instagram&utm_medium=social&utm_campaign=manicure` for an organic social link. Never put customer data in campaign URLs. This validation is a defensive naming restriction, not a guarantee against intentional PII in a valid-looking label.

The in-memory labels do not survive a full page reload before consent; no pre-consent attribution storage is introduced. After analytics consent, ordinary GA4 session attribution handles subsequent pages. Native Ads auto-tagging remains enabled and its click identifiers are neither forged nor converted to manual campaign labels. A genuine paid click is still needed to prove paid attribution. Reference: https://developers.google.com/analytics/devguides/collection/ga4/reference/config.

## Account default goals checked on 2026-10-19

Only Submit lead form remains an account-default goal, with Website selected as its source and `Wyslany formularz Noblu` primary. The automatically managed Business Profile form action remains in Google's history but its Other source is not included. Outbound click (Booksy), Contact and Phone call lead were removed from account defaults, without deleting actions, changing historical counts or stopping their measurement. Actual call actions retain their existing optimization settings; they can be explicitly selected for a future call-focused campaign after testing. Booksy and the imported contact-page view remain secondary. No campaign was activated and no budget was changed.

Google can continue to show a zero-primary-action warning on the unused Outbound click category. Do not make Booksy primary just to clear that message: a click is not a completed booking. Account defaults apply only to campaigns using account defaults, not custom/campaign-specific goals. Reference: https://support.google.com/google-ads/answer/10993988.

## Verification commands

Run `npm run check`. Regression tests exercise successful and rejected requests, distinct Booksy/form destinations, marketing-only consent, random deduplication IDs and duplicate submissions. A real ad-attributed conversion additionally requires a genuine ad interaction, marketing consent and a successful inquiry; neither a unit test nor an organic visit proves Ads attribution. Reporting and tag diagnostics can be delayed.

Campaign activation and budget decisions remain with the owner. A primary action influences bidding only for campaigns that actually use its goal. Audit campaign-specific goals before resuming any campaign.
