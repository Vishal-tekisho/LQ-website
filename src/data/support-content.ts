export interface SupportArticle {
  id: string;
  category: SupportCategory;
  title: string;
  content: string;
  tags: string[];
}

export type SupportCategory =
  | 'Getting Started'
  | 'Account & Billing'
  | 'Lead Capture'
  | 'AI Agents'
  | 'Troubleshooting';

export const supportCategories: SupportCategory[] = [
  'Getting Started',
  'Account & Billing',
  'Lead Capture',
  'AI Agents',
  'Troubleshooting',
];

export const supportArticles: SupportArticle[] = [
  // ── Getting Started ──────────────────────────────────────────────
  {
    id: 'gs-001',
    category: 'Getting Started',
    title: 'Quick-start guide: Your first 10 minutes with LeadQ.AI',
    content:
      'Sign up at leadq.ai, verify your email, and log in. You\'ll land on the Dashboard where KPI cards show Contacts Touched, Emails Drafted, Conversion Rate, and Meetings Completed. Tap the "+" button to capture your first business card using your phone camera; the OCR scanner extracts both sides automatically. Review the parsed contact, assign a status (HOT / WARM / COLD), and save. From there you can record a meeting, generate an AI summary, and draft a follow-up email, all without leaving the app.',
    tags: ['setup', 'onboarding', 'first steps', 'dashboard', 'quick start'],
  },
  {
    id: 'gs-002',
    category: 'Getting Started',
    title: 'System requirements and supported browsers',
    content:
      'LeadQ.AI runs in any modern browser: Chrome, Firefox, Safari, and Edge. The mobile app is available on iOS and Android. For the best experience with meeting recording and real-time transcription, we recommend using Chrome on desktop or the native mobile app. A stable internet connection (5 Mbps+) is required for real-time AI features.',
    tags: ['browser', 'mobile', 'requirements', 'compatibility', 'ios', 'android'],
  },
  {
    id: 'gs-003',
    category: 'Getting Started',
    title: 'Navigating the LeadQ.AI dashboard',
    content:
      'The dashboard is your command center. At the top you\'ll find KPI cards (filterable by day, week, or month). The left sidebar provides quick access to Contacts, Meetings, Emails, and Settings. The contact list supports search, sort by status, and bulk actions. Click any contact to open their full profile, including meeting history, AI-generated company research, and email threads.',
    tags: ['dashboard', 'navigation', 'ui', 'contacts', 'sidebar'],
  },

  // ── Account & Billing ────────────────────────────────────────────
  {
    id: 'ab-001',
    category: 'Account & Billing',
    title: 'Understanding credits and how they are consumed',
    content:
      'Credits power premium features: voice call minutes, email campaigns, and business card scans. Each plan includes a monthly credit allocation visible under Settings → Billing → Credits Usage. A single business card scan uses 1 credit, each outbound email uses 1 credit, and voice calls consume 1 credit per minute. Credits reset at the start of each billing cycle. You can upgrade your plan at any time to get more credits.',
    tags: ['credits', 'billing', 'usage', 'plan', 'subscription'],
  },
  {
    id: 'ab-002',
    category: 'Account & Billing',
    title: 'How to upgrade, downgrade, or cancel your plan',
    content:
      'Go to Settings → Billing → Plans and Billing. You\'ll see your current plan and available options. Upgrading takes effect immediately and credits are prorated. Downgrading takes effect at the end of the current billing cycle. To cancel, click "Cancel Subscription"; you\'ll retain access until the end of your paid period. You can reactivate at any time.',
    tags: ['upgrade', 'downgrade', 'cancel', 'subscription', 'plan'],
  },
  {
    id: 'ab-003',
    category: 'Account & Billing',
    title: 'Exporting your data and contacts',
    content:
      'You own your data. Individual contacts can be downloaded as VCF (vCard) files, compatible with virtually every phone, CRM, or contact manager. To export, open a contact profile and tap the download icon. Bulk export is available under Settings → Data → Export All Contacts. Meeting transcripts and summaries can also be exported as PDF.',
    tags: ['export', 'data', 'vcard', 'download', 'backup', 'portability'],
  },

  // ── Lead Capture ─────────────────────────────────────────────────
  {
    id: 'lc-001',
    category: 'Lead Capture',
    title: 'Scanning business cards with the OCR reader',
    content:
      'On the mobile app, open the camera scanner from the "+" button or the Contacts screen. On the web app, use the dedicated Capture button. Hold your phone steady over the card; good lighting helps accuracy. LeadQ.AI captures both the front and back automatically. After scanning, you\'ll see the extracted fields (name, title, company, phone, email, address). Review and correct any errors, assign a lead status (HOT / WARM / COLD), and save. Unusual fonts or low-contrast designs may need manual correction.',
    tags: ['business card', 'scanner', 'ocr', 'camera', 'contact capture'],
  },
  {
    id: 'lc-003',
    category: 'Lead Capture',
    title: 'Lead scoring and status management',
    content:
      'Every contact has a status: HOT (very interested), WARM (interested), or COLD (not yet engaged). You can change status at any time from the contact profile or the dashboard list view. The dashboard KPI cards update in real time as statuses change. Use filters to view only HOT leads, or sort by last interaction date to identify contacts that need follow-up.',
    tags: ['lead scoring', 'status', 'hot', 'warm', 'cold', 'pipeline', 'filter'],
  },

  // ── AI Agents ────────────────────────────────────────────────────
  {
    id: 'ai-001',
    category: 'AI Agents',
    title: 'AI meeting transcription and summary generation',
    content:
      'Start a meeting recording from the contact profile or the Meetings tab. For in-person meetings, LeadQ.AI records audio and transcribes in real time. For Zoom or similar platforms, fetch the transcript and upload it. When the meeting ends, tap "Generate Summary"; the AI creates a structured recap with key points and action items. Review, edit if needed, and save it to the contact record.',
    tags: ['meeting', 'transcription', 'summary', 'recording', 'ai', 'notes'],
  },
  {
    id: 'ai-002',
    category: 'AI Agents',
    title: 'AI-powered follow-up email drafting',
    content:
      'After a meeting, tap "Draft Follow-Up Email." LeadQ.AI reads your meeting context (notes, transcript, and summary) and generates a professional email with a tailored subject line and body. Choose what to include (meeting summary, action items, your profile), regenerate any section you don\'t like, attach files or a meeting photo, and send.',
    tags: ['email', 'follow-up', 'draft', 'ai writing', 'compose', 'send'],
  },
  {
    id: 'ai-003',
    category: 'AI Agents',
    title: 'Company research and contact intelligence',
    content:
      'LeadQ.AI\'s Company Research feature generates an AI profile of your contact\'s background and a summary of their company, including what they do, key business insights, and conversation starters. This loads automatically when you view a contact profile. Use it to prepare for meetings, personalize outreach, and demonstrate that you\'ve done your homework.',
    tags: ['company research', 'intelligence', 'profile', 'preparation', 'insights'],
  },
  {
    id: 'ai-004',
    category: 'AI Agents',
    title: 'Outbound voice agent and call automation',
    content:
      'The outbound voice agent can initiate calls on your behalf using AI-generated scripts. Configure call campaigns under AI Agents → Voice Agent. Set your target list, customize the script template, and schedule calls. The agent handles initial outreach, qualifies leads based on responses, and logs call outcomes back to the contact record. Voice calls consume 1 credit per minute.',
    tags: ['voice', 'call', 'outbound', 'agent', 'automation', 'campaign'],
  },

  // ── Troubleshooting ──────────────────────────────────────────────
  {
    id: 'ts-001',
    category: 'Troubleshooting',
    title: 'Business card scanner not recognizing text',
    content:
      'If the OCR scanner struggles to read a card, try these steps: (1) Ensure good, even lighting; avoid shadows and glare. (2) Hold your phone steady and parallel to the card. (3) Make sure the entire card is within the camera frame. (4) Clean your camera lens. (5) For cards with unusual fonts, metallic finishes, or very low contrast, manual entry may be more reliable. If issues persist, contact support.',
    tags: ['scanner', 'ocr', 'not working', 'error', 'camera', 'troubleshoot'],
  },
  {
    id: 'ts-002',
    category: 'Troubleshooting',
    title: 'Meeting recording or transcription issues',
    content:
      'If real-time transcription is inaccurate or recording fails: (1) Check your microphone permissions; the app needs audio access. (2) Ensure you\'re in a reasonably quiet environment. (3) Speak clearly and at a moderate pace. (4) Check your internet connection; transcription requires a stable connection. (5) On mobile, make sure the app is in the foreground during recording. If problems continue, try the web version on Chrome desktop.',
    tags: ['recording', 'transcription', 'microphone', 'audio', 'not working'],
  },
  {
    id: 'ts-003',
    category: 'Troubleshooting',
    title: 'Emails not sending or landing in spam',
    content:
      'If AI-drafted emails aren\'t being delivered: (1) Verify your email integration is connected under Settings → Integrations → Email. (2) Check that your email provider hasn\'t flagged the connection; re-authorize if needed. (3) If emails land in recipients\' spam, ensure your domain has proper SPF, DKIM, and DMARC records. (4) Avoid spammy language in email content. (5) For bulk campaigns, stay within your provider\'s daily send limits.',
    tags: ['email', 'spam', 'not sending', 'delivery', 'spf', 'dkim'],
  },
  {
    id: 'ts-004',
    category: 'Troubleshooting',
    title: 'App running slowly or not loading',
    content:
      'Performance issues can usually be resolved by: (1) Clearing your browser cache and cookies. (2) Disabling browser extensions that might interfere. (3) Ensuring you\'re on a supported browser version (Chrome, Firefox, Safari, Edge). (4) Checking your internet speed: 5 Mbps+ recommended. (5) On mobile, force-close and reopen the app. If the issue persists, try an incognito/private window to rule out extensions.',
    tags: ['slow', 'loading', 'performance', 'cache', 'browser', 'lag'],
  },
];
