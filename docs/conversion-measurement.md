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

## Verification

Run `npm run check`. Regression tests exercise successful and rejected requests, distinct Booksy/form destinations, marketing-only consent, random deduplication IDs and duplicate submissions. A real ad-attributed conversion additionally requires a genuine ad interaction, marketing consent and a successful inquiry; neither a unit test nor an organic visit proves Ads attribution. Reporting and tag diagnostics can be delayed.

Campaign activation and budget decisions remain with the owner. A primary action influences bidding only for campaigns that actually use its goal. Audit campaign-specific goals before resuming any campaign.
