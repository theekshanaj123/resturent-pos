import { useState } from "react";
import { PageLayout } from "./OrdersPage";

type FeatureKey =
  | "tableOrders"
  | "variants"
  | "lowStock"
  | "autoPrint"
  | "sound"
  | "emailReceipts"
  | "orderNotifications"
  | "pinProtection";

type Feature = {
  key: FeatureKey;
  title: string;
  description: string;
  defaultEnabled: boolean;
};

const featureGroups: { title: string; description: string; items: Feature[] }[] = [
  {
    title: "Ordering and checkout",
    description: "Control how staff take and complete orders.",
    items: [
      { key: "tableOrders", title: "Table orders", description: "Allow staff to assign orders to restaurant tables.", defaultEnabled: true },
      { key: "variants", title: "Product variants", description: "Ask staff to select size, color, or version before adding a product.", defaultEnabled: true },
      { key: "autoPrint", title: "Auto-print receipts", description: "Print a receipt automatically after payment is completed.", defaultEnabled: false },
    ],
  },
  {
    title: "Inventory and alerts",
    description: "Keep your team informed about stock levels.",
    items: [
      { key: "lowStock", title: "Low stock alerts", description: "Show a warning when a product reaches its minimum stock level.", defaultEnabled: true },
      { key: "orderNotifications", title: "New order notifications", description: "Show a notification whenever a new order is received.", defaultEnabled: true },
    ],
  },
  {
    title: "Notifications and security",
    description: "Choose how the POS communicates and protects your workspace.",
    items: [
      { key: "sound", title: "Notification sounds", description: "Play a sound for new orders and important alerts.", defaultEnabled: true },
      { key: "emailReceipts", title: "Email receipts", description: "Allow customers to receive receipts by email.", defaultEnabled: false },
      { key: "pinProtection", title: "Manager PIN protection", description: "Require a manager PIN before refunds and settings changes.", defaultEnabled: true },
    ],
  },
];

const defaultFeatures = Object.fromEntries(
  featureGroups.flatMap((group) => group.items.map((feature) => [feature.key, feature.defaultEnabled]))
) as Record<FeatureKey, boolean>;

function readSavedFeatures(): Record<FeatureKey, boolean> {
  try {
    const saved = window.localStorage.getItem("restodash-features");
    return saved ? { ...defaultFeatures, ...JSON.parse(saved) } : defaultFeatures;
  } catch {
    return defaultFeatures;
  }
}

export default function SettingsPage() {
  const [features, setFeatures] = useState<Record<FeatureKey, boolean>>(readSavedFeatures);
  const [saved, setSaved] = useState(false);

  function toggleFeature(key: FeatureKey) {
    setFeatures((current) => ({ ...current, [key]: !current[key] }));
    setSaved(false);
  }

  function saveFeatures() {
    window.localStorage.setItem("restodash-features", JSON.stringify(features));
    setSaved(true);
  }

  return <PageLayout title="Settings" description="Configure your restaurant and POS preferences.">
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(360px,1fr)]">
      <section className="rounded-lg border border-[#e9ebf1] bg-white p-5">
        <h2 className="border-b border-[#eff0f4] pb-3 text-sm font-semibold">General settings</h2>
        <div className="space-y-4 pt-4">{[["Restaurant name", "RestoDash"], ["Currency", "USD ($)"], ["Tax rate", "8%"], ["Receipt footer", "Thank you for dining with us!"]].map(([label, value]) =>
          <label className="block" key={label}>
            <span className="mb-1.5 block text-[10px] font-medium text-[#565867]">{label}</span>
            <input className="w-full rounded-md border border-[#e1e3ea] px-3 py-2 text-[11px] text-[#444654] outline-none focus:border-[#5745d9]" defaultValue={value} />
          </label>)}
        </div>
        <button className="mt-5 rounded-md bg-[#5745d9] px-4 py-2 text-[10px] text-white">Save changes</button>
      </section>

      <div className="space-y-4">
        {featureGroups.map((group) => <section className="rounded-lg border border-[#e9ebf1] bg-white p-5" key={group.title}>
          <div className="border-b border-[#eff0f4] pb-3"><h2 className="text-sm font-semibold">{group.title}</h2><p className="mt-1 text-[10px] text-[#858896]">{group.description}</p></div>
          <div className="divide-y divide-[#eff0f4]">
            {group.items.map((feature) => <div className="flex items-center justify-between gap-4 py-3" key={feature.key}>
              <div><h3 className="text-[11px] font-medium text-[#393b49]">{feature.title}</h3><p className="mt-1 max-w-sm text-[9px] leading-4 text-[#858896]">{feature.description}</p></div>
              <button type="button" role="switch" aria-checked={features[feature.key]} aria-label={`Toggle ${feature.title}`} onClick={() => toggleFeature(feature.key)} className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${features[feature.key] ? "bg-[#5745d9]" : "bg-[#d9dbe5]"}`}>
                <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${features[feature.key] ? "translate-x-4" : "translate-x-0.5"}`} />
              </button>
            </div>)}
          </div>
        </section>)}
        <div className="flex items-center justify-end gap-3">
          {saved && <span className="text-[10px] text-[#34a965]">Settings saved</span>}
          <button onClick={saveFeatures} className="rounded-md bg-[#5745d9] px-4 py-2 text-[10px] text-white">Save feature settings</button>
        </div>
      </div>
    </div>
  </PageLayout>;
}
