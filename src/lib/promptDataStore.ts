// Unified Shared State for Prompt-Driven Enterprise Agent Platform

export interface PlatformCardDomain {
  id: string;
  category: "dispatch" | "crm" | "retail" | "agriculture" | "enterprise" | "custom";
  prompt: string;
  solutionTitle: string;
  badge: string;
  card1: {
    promptBubble: string;
    agentTag: string;
    description: string;
  };
  card2: {
    capsules: string[];
    description: string;
  };
  card3: {
    badges: { text: string; posClass: string }[];
    description: string;
  };
  card4: {
    ruleTitle: string;
    description: string;
  };
  steps: {
    num: string;
    label: string;
    desc: string;
    latency: string;
  }[];
  metrics: {
    latency: string;
    costReduction: string;
    accuracy: string;
    roi: string;
  };
  liveLogs: string[];
}

export const DOMAIN_PLATFORM_DATA: Record<string, PlatformCardDomain> = {
  dispatch: {
    id: "dispatch",
    category: "dispatch",
    prompt: "Deploy an autonomous dispatch agent to optimize 12-stop freight routes across Sydney & Melbourne.",
    solutionTitle: "Autonomous Fleet Dispatch & 12-Stop Route Optimizer",
    badge: "FLEET & LOGISTICS",
    card1: {
      promptBubble: "Optimize 12-stop interstate route |",
      agentTag: "🤖 Dispatch #04",
      description: "Describe your freight goal in plain English. The GrowthMates AI runtime assigns trucks and optimizes 12 stops in milliseconds.",
    },
    card2: {
      capsules: [
        "12-Stop Route Optimizer",
        "Driver HOS Memory Window",
        "TruckMate & SAP ERP Gateway",
        "Immutable Audit Logs",
      ],
      description: "Built-in transport services with zero setup — SAP, TruckMate, and telematics integration for fully autonomous dispatch.",
    },
    card3: {
      badges: [
        { text: "🚛 TruckMate", posClass: "top-3 left-2" },
        { text: "🗺️ Maps API", posClass: "top-3 right-2" },
        { text: "📊 SAP ERP", posClass: "bottom-2 left-1/2 -translate-x-1/2" },
      ],
      description: "Model Context Protocol connects live GPS telematics, driver ELDs, and spot rate pricing directly to your ERP.",
    },
    card4: {
      ruleTitle: "Heavy Vehicle Safety Locks",
      description: "Enterprise heavy vehicle compliance: Automated National Heavy Vehicle rules, legal driver rest enforcement, and SOC2 audit logs.",
    },
    steps: [
      { num: "01", label: "Payload Ingest", desc: "TMS webhook parsed 22.4t semi-trailer load requirements", latency: "12ms" },
      { num: "02", label: "Multi-Drop Optimization", desc: "Calculated fastest sequence across 12 delivery stops saving 38L fuel", latency: "48ms" },
      { num: "03", label: "Compliance & Safety Gate", desc: "Verified driver HOS rest hours & vehicle axle weight limits", latency: "22ms" },
      { num: "04", label: "Autonomous Execution", desc: "Dispatched driver with turnaround confirmation & ERP sync", latency: "18ms" },
    ],
    metrics: {
      latency: "100ms",
      costReduction: "85%",
      accuracy: "99.4%",
      roi: "3.8x in 30 days",
    },
    liveLogs: [
      "[00:12ms] Webhook verified from SAP S/4HANA (Payload: #LD-8920, 22.4t)",
      "[00:60ms] Computed 12-stop matrix: Route B-31 selected (878 km, -38L fuel)",
      "[00:82ms] Guardrail passed: Driver DRV-1187 has 7.4h legal HOS (> 5h requirement)",
      "[01:00ms] Automated Dispatch sent via SMS; ERP financial ledger updated ✓",
    ],
  },
  crm: {
    id: "crm",
    category: "crm",
    prompt: "Build an autonomous CRM lead qualification and meeting booking agent for enterprise sales.",
    solutionTitle: "Autonomous CRM Lifecycle & Inbound Lead Scoring Agent",
    badge: "CRM & SALES OPERATIONS",
    card1: {
      promptBubble: "Qualify inbound CRM leads |",
      agentTag: "🤖 Sales CRM #02",
      description: "Describe your sales qualification rule in plain English. The AI runtime enriches firmographics and books meetings automatically.",
    },
    card2: {
      capsules: [
        "Clearbit Firmographic Scorer",
        "Buyer Intent Engine (96/100)",
        "Salesforce Pipeline Gateway",
        "Automated AE Booking Engine",
      ],
      description: "Pre-built CRM pipeline tools with zero friction — HubSpot, Salesforce, and Apollo sync to convert leads 4x faster.",
    },
    card3: {
      badges: [
        { text: "💼 HubSpot", posClass: "top-3 left-2" },
        { text: "☁️ Salesforce", posClass: "top-3 right-2" },
        { text: "📅 Calendly", posClass: "bottom-2 left-1/2 -translate-x-1/2" },
      ],
      description: "Links your inbound form webhooks, CRM opportunity stages, and executive calendars with zero-trust token isolation.",
    },
    card4: {
      ruleTitle: "Zero-Trust Lead Protection",
      description: "Enterprise CRM governance: SOC2 Type II certified, GDPR & CCPA compliant data masking, and granular sales role permissions.",
    },
    steps: [
      { num: "01", label: "Inbound Lead Ingest", desc: "Captured contact info from enterprise demo request form", latency: "8ms" },
      { num: "02", label: "Firmographic Enrichment", desc: "Appended tech stack, headcount (120 employees), and funding data", latency: "38ms" },
      { num: "03", label: "Intent Scoring Gate", desc: "Scored Tier-1 enterprise match (ICP match: 96%)", latency: "16ms" },
      { num: "04", label: "Automated Hand-off", desc: "Booked AE calendar slot & sent personalized welcome dossier", latency: "14ms" },
    ],
    metrics: {
      latency: "76ms",
      costReduction: "90% SDR Admin Cut",
      accuracy: "99.7%",
      roi: "4.5x Pipeline Acceleration",
    },
    liveLogs: [
      "[00:08ms] Webhook received from HubSpot: New demo request from Acme Corp",
      "[00:46ms] Clearbit enriched firmographics: $40M ARR, 140 staff, SAP ERP user",
      "[00:62ms] Lead qualification score: 96/100 (High-priority enterprise opportunity)",
      "[00:76ms] Assigned to Senior AE; Calendar invite & personalized deck sent ✓",
    ],
  },
  retail: {
    id: "retail",
    category: "retail",
    prompt: "Verify return tracking status and auto-process $185 RMA refund for order #GM-8821 with zero human intervention.",
    solutionTitle: "Autonomous RMA Returns & Fraud Verification Engine",
    badge: "E-COMMERCE & RETAIL",
    card1: {
      promptBubble: "Auto-refund verified RMA #8821 |",
      agentTag: "🤖 RMA Refund #01",
      description: "Describe your returns policy in plain English. The AI verifies carrier parcel telemetry and disburses customer payouts instantly.",
    },
    card2: {
      capsules: [
        "AusPost Barcode Scanner",
        "Zero-Dispute Risk Buffer",
        "Shopify & WooCommerce Gateway",
        "Stripe Instant Payout Engine",
      ],
      description: "E-commerce reverse logistics automation — Shopify, Stripe, and carrier APIs synchronized with zero human intervention.",
    },
    card3: {
      badges: [
        { text: "🛍️ Shopify", posClass: "top-3 left-2" },
        { text: "💳 Stripe", posClass: "top-3 right-2" },
        { text: "📦 AusPost", posClass: "bottom-2 left-1/2 -translate-x-1/2" },
      ],
      description: "Connect warehouse barcode scanners and payment gateways to eliminate 92% of manual customer service inquiries.",
    },
    card4: {
      ruleTitle: "PCI-DSS Fraud Protection",
      description: "Enterprise financial controls: Real-time refund velocity limits, automated chargeback protection, and cryptographic ledger hashing.",
    },
    steps: [
      { num: "01", label: "Carrier Event Ingest", desc: "Scanned warehouse barcode arrival event from logistics carrier", latency: "9ms" },
      { num: "02", label: "Fraud & Trust Analysis", desc: "Scored buyer account history & zero prior dispute records", latency: "34ms" },
      { num: "03", label: "Ledger Validation", desc: "Cross-referenced item SKU #8821 with original merchant inventory", latency: "14ms" },
      { num: "04", label: "Automated Payout", desc: "Disbursed $185 via Stripe webhook and updated Xero accounting", latency: "16ms" },
    ],
    metrics: {
      latency: "73ms",
      costReduction: "92%",
      accuracy: "99.8%",
      roi: "4.2x in 30 days",
    },
    liveLogs: [
      "[00:09ms] Courier barcode scan verified: Delivered to Distribution Center",
      "[00:43ms] Risk assessment score: 98/100 (Zero chargeback history in 24 months)",
      "[00:57ms] Inventory system adjusted: SKU #8821 returned to available stock",
      "[00:73ms] Stripe refund disbursed ($185 AUD) & receipt issued to buyer ✓",
    ],
  },
  agriculture: {
    id: "agriculture",
    category: "agriculture",
    prompt: "Analyze soil moisture sensors & weather telemetry to forecast crop water demands and auto-generate supplier PO for fertilizer.",
    solutionTitle: "AgTech IoT Soil Telemetry & Crop Irrigation Agent",
    badge: "AGRICULTURE & AGTECH",
    card1: {
      promptBubble: "Irrigate sector 4 & order N2 |",
      agentTag: "🤖 Ag Telemetry #03",
      description: "Describe your agronomy rules in plain English. The AI ingests soil IoT probes and triggers smart irrigation relays autonomously.",
    },
    card2: {
      capsules: [
        "LoRaWAN Soil Sensor Array",
        "BOM Meteorology Predictor",
        "Smart Relay Controller",
        "Supplier PDF PO Generator",
      ],
      description: "AgTech infrastructure ready for the field — IoT sensor gateways, weather radars, and supplier ERPs connected seamlessly.",
    },
    card3: {
      badges: [
        { text: "🌱 LoRaWAN", posClass: "top-3 left-2" },
        { text: "🌦️ BOM Weather", posClass: "top-3 right-2" },
        { text: "📑 Supplier PO", posClass: "bottom-2 left-1/2 -translate-x-1/2" },
      ],
      description: "Stream microclimate telemetry from 100+ field sensors into agricultural decision engines automatically.",
    },
    card4: {
      ruleTitle: "Field Hardware Fail-Safes",
      description: "Physical automation security: Pressure-drop safety triggers, offline hardware relay caching, and environmental compliance logs.",
    },
    steps: [
      { num: "01", label: "Sensor Stream Ingest", desc: "Aggregated 48 IoT sensor probe readings across 120 hectares", latency: "15ms" },
      { num: "02", label: "Microclimate Modeling", desc: "Correlated evapotranspiration index with 5-day heatwave forecast", latency: "52ms" },
      { num: "03", label: "Water & Input Allocation", desc: "Calculated exact minimum water and nitrogen volume needed", latency: "28ms" },
      { num: "04", label: "Field Hardware Execution", desc: "Pulsed relay controllers and sent PDF PO to agricultural supplier", latency: "24ms" },
    ],
    metrics: {
      latency: "119ms",
      costReduction: "34% Water Saved",
      accuracy: "99.1%",
      roi: "5.1x in harvest season",
    },
    liveLogs: [
      "[00:15ms] 48 LoRaWAN sensor probes ingested: Sector 4 moisture at 24.2%",
      "[00:67ms] BOM meteorology feed checked: 0mm precipitation forecast next 72 hours",
      "[00:95ms] Crop stage: Flowering — recommended irrigation 4,200L + 500kg Nitrogen",
      "[01:19ms] Relay valve #4 engaged; Supplier PO sent for morning fulfillment ✓",
    ],
  },
  enterprise: {
    id: "enterprise",
    category: "enterprise",
    prompt: "Audit electronic logging device (ELD) logs across 45 active drivers for HOS compliance and flag potential rest breaks required.",
    solutionTitle: "Autonomous 24/7 Driver HOS & Safety Compliance Auditor",
    badge: "COMPLIANCE & SAFETY",
    card1: {
      promptBubble: "Audit driver HOS rest hours |",
      agentTag: "🤖 Safety Audit #05",
      description: "Describe compliance requirements in plain English. The AI tracks continuous vehicle telemetry and flags rest stops proactively.",
    },
    card2: {
      capsules: [
        "Samsara ELD Gateway",
        "National Heavy Vehicle Rules",
        "Fatigue Risk Predictor",
        "Cryptographic Audit Trace",
      ],
      description: "Autonomous compliance engine — electronic driver logs, statutory rules, and dispatch escalation desks linked end-to-end.",
    },
    card3: {
      badges: [
        { text: "🛰️ Samsara ELD", posClass: "top-3 left-2" },
        { text: "⚖️ Heavy Vehicle", posClass: "top-3 right-2" },
        { text: "🔒 Audit Trace", posClass: "bottom-2 left-1/2 -translate-x-1/2" },
      ],
      description: "Continuous telemetry compliance checks across active fleet vehicles with automatic violation alerts and logging.",
    },
    card4: {
      ruleTitle: "Statutory Rule Enforcement",
      description: "Continuous legal safety rules: Driver fatigue buffers, automated rest-bay recommendations, and immutable regulatory logs.",
    },
    steps: [
      { num: "01", label: "Telematics Telemetry Ingest", desc: "Parsed continuous GPS & engine runtime across 45 interstate vehicles", latency: "18ms" },
      { num: "02", label: "Rule Verification", desc: "Checked driving logs against Standard Hours Regulation limits", latency: "36ms" },
      { num: "03", label: "Route Rest Stop Search", desc: "Located nearest high-capacity heavy vehicle rest bay with diesel", latency: "42ms" },
      { num: "04", label: "Driver & Desk Notification", desc: "Pushed turn-by-turn stop recommendation to tablet & safety log", latency: "19ms" },
    ],
    metrics: {
      latency: "115ms",
      costReduction: "100% Fine Prevention",
      accuracy: "99.9%",
      roi: "Zero Infringements",
    },
    liveLogs: [
      "[00:18ms] Streamed 45 ELD vehicle records via Samsara Telematics webhook",
      "[00:54ms] National Heavy Vehicle Regulation rule evaluated: Driver #14 at 5.2h",
      "[00:96ms] Nearest verified rest area located: Goulburn Hume Hwy Bay (14km away)",
      "[01:15ms] In-cab alert pushed; Safety audit entry logged to compliance database ✓",
    ],
  },
};

export const DOMAIN_KEYS = ["dispatch", "crm", "retail", "agriculture", "enterprise"];

export function matchDomainFromPrompt(promptText: string): PlatformCardDomain {
  const q = (promptText || "").toLowerCase().trim();
  if (!q) return DOMAIN_PLATFORM_DATA.dispatch;

  if (q.includes("crm") || q.includes("sales") || q.includes("lead") || q.includes("hubspot") || q.includes("salesforce") || q.includes("customer")) {
    return DOMAIN_PLATFORM_DATA.crm;
  }
  if (q.includes("retail") || q.includes("refund") || q.includes("rma") || q.includes("order") || q.includes("shopify") || q.includes("store")) {
    return DOMAIN_PLATFORM_DATA.retail;
  }
  if (q.includes("agri") || q.includes("crop") || q.includes("water") || q.includes("soil") || q.includes("farm")) {
    return DOMAIN_PLATFORM_DATA.agriculture;
  }
  if (q.includes("audit") || q.includes("hos") || q.includes("compliance") || q.includes("safety") || q.includes("driver log")) {
    return DOMAIN_PLATFORM_DATA.enterprise;
  }

  // Custom synthesized domain
  return {
    id: "custom",
    category: "custom",
    prompt: promptText,
    solutionTitle: `Autonomous ${promptText.slice(0, 36)} Agent`,
    badge: "CUSTOM ENTERPRISE PIPELINE",
    card1: {
      promptBubble: `${promptText.slice(0, 30)} |`,
      agentTag: "🤖 Custom Agent #09",
      description: `Describe your goal in plain English. The GrowthMates runtime executes "${promptText.slice(0, 42)}" in milliseconds.`,
    },
    card2: {
      capsules: [
        "Custom Workflow Engine",
        "Zero-Trust Memory Window",
        "Enterprise API Gateway",
        "Immutable Audit Logs",
      ],
      description: "Pre-configured enterprise services with zero setup — connects your proprietary APIs directly to autonomous agent runtimes.",
    },
    card3: {
      badges: [
        { text: "⚡ Custom API", posClass: "top-3 left-2" },
        { text: "🤖 AI Models", posClass: "top-3 right-2" },
        { text: "📊 Data ERP", posClass: "bottom-2 left-1/2 -translate-x-1/2" },
      ],
      description: "Model Context Protocol connects your company databases and decision engines with zero-trust token isolation.",
    },
    card4: {
      ruleTitle: "Zero-Trust Data Governance",
      description: "Enterprise-grade controls: End-to-end data encryption, granular role permissions, and cryptographic audit trails.",
    },
    steps: [
      { num: "01", label: "Ingest & Normalize", desc: `Captured parameters for: "${promptText.slice(0, 32)}..."`, latency: "12ms" },
      { num: "02", label: "Agentic Reasoning", desc: "Evaluated optimal pathway with multi-parameter verification", latency: "42ms" },
      { num: "03", label: "Policy Guardrails", desc: "Passed compliance, risk, and authorization checks", latency: "18ms" },
      { num: "04", label: "End-to-End Action", desc: "Executed targeted workflow with full audit logging", latency: "16ms" },
    ],
    metrics: {
      latency: "88ms",
      costReduction: "82%",
      accuracy: "99.5%",
      roi: "3.5x in 30 days",
    },
    liveLogs: [
      `[00:12ms] Ingested prompt parameters for: "${promptText.slice(0, 40)}..."`,
      "[00:54ms] AI synthesized custom multi-agent execution pipeline",
      "[00:72ms] MCP connectors verified with zero-trust token isolation",
      "[00:88ms] Workflow execution verified & ready for production deployment ✓",
    ],
  };
}
