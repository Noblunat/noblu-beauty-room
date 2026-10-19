const campaignParameters = {
  utm_source: "campaign_source",
  utm_medium: "campaign_medium",
  utm_campaign: "campaign_name",
  utm_id: "campaign_id",
  utm_content: "campaign_content",
  utm_term: "campaign_term",
} as const;

type CampaignField = (typeof campaignParameters)[keyof typeof campaignParameters];
export type LandingCampaign = Partial<Record<CampaignField, string>>;

export function readLandingCampaign(href: string): LandingCampaign {
  try {
    const params = new URL(href).searchParams;
    const result: LandingCampaign = {};
    for (const [parameter, field] of Object.entries(campaignParameters)) {
      const values = params.getAll(parameter);
      // Campaign links use short slugs, not free text, contacts or client IDs.
      const value = values[0] ?? "";
      if (values.length !== 1 || !/^[a-zA-Z0-9_-]{1,100}$/.test(value) || /\d{7,}/.test(value)) continue;
      result[field] = value;
    }
    return result.campaign_source && result.campaign_medium ? result : {};
  } catch {
    return {};
  }
}
