/* ----------------------------------------------------------------------------
 * integrations-catalog.ts - the connector roster behind every product page's
 * Integrations section, mirrored by hand from the Notion "Website Integrations"
 * DB (Website 3.0 > Website Integrations, collection e2c6bb33-3047-4ea1-9eb5-
 * 725d53ca357c). Only rows with Status = Live are mirrored; the DB says the
 * site may only show Live rows (PowerBI is Decision pending, so it is absent).
 *
 * `standard` mirrors the DB's "Standard Integration" checkbox: checked means
 * pre-built plug-and-play, unchecked means custom-built per project.
 *
 * Logos: the integration cards render every mark as a white silhouette
 * (grayscale + invert in dms-redesign.css), so each entry picks the asset that
 * silhouettes cleanly - a monochrome iconify glyph where one exists, otherwise
 * the wordmark lockup from the DB's own Logo field (Webflow CDN). The DB's
 * "Logo Icon" tiles are filled squares and would silhouette into blobs, so
 * they are deliberately not used here.
 *
 * When the Notion DB changes (a row goes Live, a name or logo changes), update
 * this file and the per-product selections below.
 * -------------------------------------------------------------------------- */

export type IntegrationType =
  | "ERP"
  | "CRM"
  | "CAD"
  | "Communication"
  | "Automation"
  | "Data Integration"
  | "Project/Issue Management";

export type CatalogIntegration = {
  /** Slug from the Notion row, the stable key. */
  slug: string;
  name: string;
  type: IntegrationType;
  /** True = pre-built plug-and-play; false = custom-built per project. */
  standard: boolean;
  logo: string;
};

const WEBFLOW = "https://cdn.prod.website-files.com/6475b503eba1a8c129c44339";

/* All Live rows of the Website Integrations DB, in Notion ID order. */
export const INTEGRATIONS_CATALOG: CatalogIntegration[] = [
  { slug: "sap-business-one", name: "SAP Business One", type: "ERP", standard: false, logo: `${WEBFLOW}/67ac72ac586aac57f2aeae55_Frame%20633192-3.png` },
  { slug: "sage-100cloud", name: "Sage 100cloud", type: "ERP", standard: false, logo: `${WEBFLOW}/67ac84f602a187b1dd476426_Frame%20633192-9.png` },
  { slug: "epicor-kinetic", name: "Epicor Kinetic", type: "ERP", standard: false, logo: `${WEBFLOW}/67ac73ca9496ffbaf35ede0d_Frame%20633192-5.png` },
  { slug: "salesforce", name: "Salesforce", type: "CRM", standard: false, logo: "https://api.iconify.design/simple-icons:salesforce.svg" },
  { slug: "sage-300cloud", name: "Sage 300cloud", type: "ERP", standard: false, logo: `${WEBFLOW}/67ac850ff043cf48b1986c4e_Frame%20633192-10.png` },
  { slug: "microsoft-dynamics-365", name: "Microsoft Dynamics 365", type: "CRM", standard: false, logo: "https://api.iconify.design/simple-icons:dynamics365.svg" },
  { slug: "solidworks", name: "Solidworks", type: "CAD", standard: false, logo: `${WEBFLOW}/67ac719b470a92fea21fb942_Frame%20633193-1.png` },
  { slug: "oracle-netsuite", name: "Oracle NetSuite", type: "ERP", standard: false, logo: "https://api.iconify.design/cib:oracle-netsuite.svg" },
  { slug: "sage-x3", name: "Sage X3", type: "ERP", standard: false, logo: `${WEBFLOW}/67ac83cb38bc7ea39e548729_Frame%20633192-8.png` },
  { slug: "infor-cloudsuite-industrial", name: "Infor CloudSuite Industrial", type: "ERP", standard: false, logo: `${WEBFLOW}/67ac86b8aee7ab87cd608286_Frame%20633192-14.png` },
  { slug: "jira", name: "Jira", type: "Project/Issue Management", standard: false, logo: "https://api.iconify.design/simple-icons:jira.svg" },
  { slug: "microsoft-business-central", name: "Microsoft Business Central", type: "ERP", standard: false, logo: `${WEBFLOW}/67ac85303820b36e4d5c806e_Frame%20633192-11.png` },
  { slug: "epicor-prophet-21", name: "Epicor Prophet 21", type: "ERP", standard: false, logo: `${WEBFLOW}/67ac7456f1c45e07ffd80655_Frame%20633192-6.png` },
  { slug: "syspro", name: "SYSPRO", type: "ERP", standard: false, logo: `${WEBFLOW}/67ac83a353315213e777341d_Frame%20633192-7.png` },
  { slug: "microsoft-dynamics-nav", name: "Microsoft Dynamics NAV", type: "ERP", standard: false, logo: `${WEBFLOW}/67ac86478b0bba6971281748_Frame%20633192-12.png` },
  { slug: "sap", name: "SAP", type: "ERP", standard: false, logo: "https://api.iconify.design/logos:sap.svg" },
  { slug: "sap-s-4hana", name: "SAP S/4HANA", type: "ERP", standard: false, logo: `${WEBFLOW}/67ac733d70f0afde8297ac81_Frame%20633192-4.png` },
  { slug: "autocad", name: "AutoCAD", type: "CAD", standard: false, logo: `${WEBFLOW}/67ac726270f0afde8296cf4e_Frame%20633192-2.png` },
  { slug: "microsoft-dynamics-gp", name: "Microsoft Dynamics GP", type: "ERP", standard: false, logo: `${WEBFLOW}/67ac855d17744985aab1cd3e_Frame%20633193-2.png` },
  { slug: "slack", name: "Slack", type: "Communication", standard: true, logo: "https://api.iconify.design/simple-icons:slack.svg" },
  { slug: "scheduled-csv-import", name: "Scheduled CSV Import", type: "Automation", standard: true, logo: "https://api.iconify.design/mdi:file-delimited-outline.svg" },
  { slug: "email", name: "Email", type: "Communication", standard: true, logo: "https://api.iconify.design/mdi:email-outline.svg" },
  { slug: "sharepoint", name: "SharePoint", type: "Automation", standard: true, logo: "https://api.iconify.design/streamline-logos:microsoft-sharepoint-logo-block.svg" },
  { slug: "sso-saml", name: "SSO/SAML", type: "Automation", standard: true, logo: "https://api.iconify.design/mdi:shield-key-outline.svg" },
];

export type IntegrationLogo = { name: string; logo: string };

const bySlug = new Map(INTEGRATIONS_CATALOG.map((i) => [i.slug, i]));

/** Resolve catalogue slugs to logo cards; throws at build time on a typo so a
 * renamed Notion slug cannot silently drop a tile. */
export function integrationLogos(slugs: string[]): IntegrationLogo[] {
  return slugs.map((slug) => {
    const hit = bySlug.get(slug);
    if (!hit) throw new Error(`Unknown integration slug "${slug}" - not in the Website Integrations catalogue.`);
    return { name: hit.name, logo: hit.logo };
  });
}

/* Per-product selections for the minimal logo grid. Seven each: the grid is
 * six columns and the CTA tile spans five, so 7 + CTA fills two rows exactly.
 * Chosen for relevance to each product's record, spanning the catalogue's
 * types rather than repeating ERP seven times. */
export const PRODUCT_INTEGRATION_LOGOS: Record<"dms" | "qms" | "plm" | "mes", IntegrationLogo[]> = {
  /* Documents sync to SharePoint, distribute over Slack/Email, gate on SSO,
   * and file against parts in the ERP and CAD systems. */
  dms: integrationLogos(["sharepoint", "sap", "oracle-netsuite", "solidworks", "slack", "email", "sso-saml"]),
  /* Quality events open against ERP lots and suppliers and CRM complaints,
   * with Jira for the engineering follow-through. */
  qms: integrationLogos(["sap", "oracle-netsuite", "microsoft-dynamics-365", "salesforce", "jira", "slack", "email"]),
  /* The product record spans CAD drawings, ERP part masters, engineering
   * issues, and the document store. */
  plm: integrationLogos(["solidworks", "autocad", "sap", "oracle-netsuite", "epicor-kinetic", "jira", "sharepoint"]),
  /* The floor runs against the ERP that released the order, so this one is
   * ERP-heavy, plus scheduled CSV for bulk lot data. */
  mes: integrationLogos(["sap", "oracle-netsuite", "epicor-kinetic", "infor-cloudsuite-industrial", "syspro", "microsoft-business-central", "scheduled-csv-import"]),
};
