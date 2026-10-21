import { useState } from "react";
import { Icon } from "../components/Icon";
import { PageLayout } from "./OrdersPage";

const periods = ["Today", "This week", "This month", "This year"];
const salesByMonth = [35, 52, 44, 70, 58, 83, 67, 92, 76, 88, 73, 100];
const topProducts = [
  ["Grilled Chicken", "126 sold", "$1,636.74", 82],
  ["Beef Burger", "98 sold", "$979.02", 67],
  ["Margherita Pizza", "76 sold", "$911.24", 51],
  ["Chicken Pasta", "63 sold", "$692.37", 42],
];

export default function ReportsPage() {
  const [period, setPeriod] = useState("This month");

  return <PageLayout title="Reports" description="Understand your restaurant performance at a glance.">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h2 className="text-sm font-semibold text-[#292a3a]">Performance overview</h2>
        <p className="mt-1 text-[10px] text-[#858896]">Review sales, orders, and customer activity.</p>
      </div>
      <div className="flex rounded-md border border-[#e1e3ea] bg-white p-1">
        {periods.map((item) => <button className={`rounded px-3 py-1.5 text-[9px] ${period === item ? "bg-[#5745d9] text-white" : "text-[#666877]"}`} onClick={() => setPeriod(item)} key={item}>{item}</button>)}
      </div>
    </div>

    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {[
        ["Total revenue", "$12,580.00", "+12.5%", "wallet"],
        ["Total orders", "482", "+8.2%", "cart"],
        ["Average order", "$26.10", "+4.6%", "chart"],
        ["New customers", "86", "+15.4%", "users"],
      ].map(([label, value, change, icon]) => <div className="flex items-center gap-3 rounded-lg border border-[#e9ebf1] bg-white p-4" key={label}>
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-[#f0efff] text-[#5745d9]"><Icon name={icon as "wallet" | "cart" | "chart" | "users"} size={17} /></div>
        <div><p className="text-[10px] text-[#858896]">{label}</p><strong className="mt-1 block text-base text-[#292a3a]">{value}</strong><span className="mt-1 block text-[9px] text-[#34a965]">▲ {change}</span></div>
      </div>)}
    </div>

    <div className="grid gap-5 xl:grid-cols-[minmax(0,1.5fr)_minmax(280px,1fr)]">
      <section className="rounded-lg border border-[#e9ebf1] bg-white p-5">
        <div className="flex items-start justify-between"><div><h2 className="text-sm font-semibold">Revenue overview</h2><p className="mt-1 text-[10px] text-[#858896]">{period} revenue performance</p></div><button className="flex items-center gap-1.5 rounded-md border border-[#e1e3ea] px-3 py-1.5 text-[9px] text-[#565867]"><Icon name="arrow" size={12} /> Export</button></div>
        <div className="mt-8 flex h-52 items-end gap-2 border-b border-l border-[#e9ebf1] px-3 sm:gap-3">{salesByMonth.map((height, index) => <div className="group relative flex h-full flex-1 items-end" key={index}><div className="w-full rounded-t bg-[#a69cf0] transition-colors group-hover:bg-[#5745d9]" style={{ height: `${height}%` }} /><span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[8px] text-[#858896]">{["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"][index]}</span></div>)}</div>
        <div className="mt-8 flex justify-between text-[9px] text-[#858896]"><span>$0</span><span>$5k</span><span>$10k</span><span>$15k</span></div>
      </section>

      <section className="rounded-lg border border-[#e9ebf1] bg-white p-5">
        <h2 className="text-sm font-semibold">Order status</h2><p className="mt-1 text-[10px] text-[#858896]">Orders by current status</p>
        <div className="mx-auto mt-6 grid h-36 w-36 place-items-center rounded-full bg-[conic-gradient(#5745d9_0_62%,#a69cf0_62%_82%,#f3bf65_82%_94%,#e5e7ef_94%_100%)]"><div className="grid h-24 w-24 place-items-center rounded-full bg-white text-center"><strong className="text-xl">482</strong><span className="text-[9px] text-[#858896]">total orders</span></div></div>
        <div className="mt-5 space-y-3">{[["Completed", "298", "bg-[#5745d9]"], ["Preparing", "96", "bg-[#a69cf0]"], ["Pending", "58", "bg-[#f3bf65]"], ["Cancelled", "30", "bg-[#e5e7ef]"]].map(([label, value, color]) => <div className="flex items-center justify-between text-[10px]" key={label}><span className="flex items-center gap-2 text-[#666877]"><i className={`h-2 w-2 rounded-full ${color}`} />{label}</span><strong>{value}</strong></div>)}</div>
      </section>
    </div>

    <div className="grid gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(280px,1fr)]">
      <section className="rounded-lg border border-[#e9ebf1] bg-white p-5">
        <div className="flex items-center justify-between"><div><h2 className="text-sm font-semibold">Top selling products</h2><p className="mt-1 text-[10px] text-[#858896]">Best performers for {period.toLowerCase()}</p></div><button className="text-[10px] text-[#5745d9]">View all</button></div>
        <div className="mt-4 space-y-4">{topProducts.map(([name, sold, revenue, progress]) => <div key={name}><div className="flex justify-between text-[10px]"><span className="font-medium text-[#393b49]">{name}</span><span className="text-[#858896]">{sold} · {revenue}</span></div><div className="mt-2 h-1.5 rounded-full bg-[#f0efff]"><div className="h-1.5 rounded-full bg-[#7c70e5]" style={{ width: `${progress}%` }} /></div></div>)}</div>
      </section>
      <section className="rounded-lg border border-[#e9ebf1] bg-white p-5">
        <h2 className="text-sm font-semibold">Payment methods</h2><p className="mt-1 text-[10px] text-[#858896]">Revenue by payment type</p>
        <div className="mt-5 space-y-4">{[["Cash", "$5,358.00", "43%"], ["Card", "$4,782.40", "38%"], ["Digital wallet", "$2,439.60", "19%"]].map(([label, value, percentage], index) => <div key={label}><div className="flex justify-between text-[10px]"><span className="text-[#666877]">{label}</span><strong>{value}</strong></div><div className="mt-2 h-1.5 rounded-full bg-[#f0efff]"><div className={`h-1.5 rounded-full ${index === 0 ? "bg-[#5745d9]" : index === 1 ? "bg-[#a69cf0]" : "bg-[#f3bf65]"}`} style={{ width: percentage }} /></div><span className="mt-1 block text-right text-[9px] text-[#858896]">{percentage}</span></div>)}</div>
      </section>
    </div>
  </PageLayout>;
}
