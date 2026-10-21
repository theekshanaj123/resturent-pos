import { Icon } from "../components/Icon";

const orders = [
  ["#ORD-1042", "May 20, 2025 · 10:24 AM", "Table 05", "$30.18", "Completed"],
  ["#ORD-1041", "May 20, 2025 · 10:02 AM", "Table 02", "$48.50", "Preparing"],
  ["#ORD-1040", "May 20, 2025 · 09:45 AM", "Takeaway", "$16.99", "Completed"],
  ["#ORD-1039", "May 20, 2025 · 09:22 AM", "Table 08", "$72.40", "Pending"],
  ["#ORD-1038", "May 20, 2025 · 08:56 AM", "Table 01", "$25.75", "Completed"],
];

export default function OrdersPage() {
  return <PageLayout title="Orders" description="Track and manage all restaurant orders.">
    <div className="grid gap-3 sm:grid-cols-3">
      {["Today's Orders", "Completed", "Pending"].map((label, index) => <div className="rounded-lg border border-[#e9ebf1] bg-white p-4" key={label}><p className="text-[11px] text-[#858896]">{label}</p><strong className="mt-2 block text-xl text-[#292a3a]">{[32, 24, 8][index]}</strong></div>)}
    </div>
    <section className="overflow-hidden rounded-lg border border-[#e9ebf1] bg-white">
      <div className="flex items-center justify-between border-b border-[#eff0f4] p-4"><h2 className="text-sm font-semibold">Recent orders</h2><button className="flex items-center gap-1.5 rounded-md border border-[#e1e3ea] px-3 py-1.5 text-[10px] text-[#565867]"><Icon name="filter" size={13} /> Filter</button></div>
      <div className="overflow-x-auto"><table className="w-full min-w-[650px] text-left text-[10px]"><thead className="bg-[#fafbfc] text-[#858896]"><tr><th className="px-4 py-3 font-medium">Order ID</th><th className="px-4 py-3 font-medium">Date</th><th className="px-4 py-3 font-medium">Type</th><th className="px-4 py-3 font-medium">Amount</th><th className="px-4 py-3 font-medium">Status</th></tr></thead><tbody>{orders.map((order) => <tr className="border-t border-[#eff0f4] text-[#444654]" key={order[0]}>{order.map((cell, index) => <td className="px-4 py-3" key={`${order[0]}-${index}`}><span className={index === 4 ? `rounded-full px-2 py-1 text-[9px] ${cell === "Completed" ? "bg-[#eaf9f0] text-[#34a965]" : cell === "Preparing" ? "bg-[#fff5df] text-[#bc7b13]" : "bg-[#f0efff] text-[#5040d5]"}` : ""}>{cell}</span></td>)}</tr>)}</tbody></table></div>
    </section>
  </PageLayout>;
}

export function PageLayout({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return <div className="flex h-full min-h-0 flex-col gap-5 overflow-y-auto pr-1"><div><h1 className="text-xl font-semibold text-[#292a3a]">{title}</h1><p className="mt-1 text-[11px] text-[#858896]">{description}</p></div>{children}</div>;
}
