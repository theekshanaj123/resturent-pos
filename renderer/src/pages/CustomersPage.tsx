import { PageLayout } from "./OrdersPage";

export default function CustomersPage() {
  return <PageLayout title="Customers" description="View customer activity and relationships.">
    <section className="rounded-lg border border-[#e9ebf1] bg-white p-4">
      <div className="flex items-center justify-between border-b border-[#eff0f4] pb-3">
        <h2 className="text-sm font-semibold">Customer directory</h2>
        <button className="rounded-lg bg-[#5745d9] px-3 py-2 text-[10px] text-white">+ Add Customer</button>
      </div>
      {["Aarav Sharma", "Sophia Williams", "Michael Chen", "Emma Johnson", "Noah Brown"].map((name, index) =>
        <div className="flex items-center justify-between border-b border-[#eff0f4] py-3 last:border-0" key={name}>
          <div className="flex items-center gap-3">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-[#f0efff] text-[10px] font-semibold text-[#5040d5]">
              {name.split(" ").map((part) => part[0]).join("")}</div>
            <div>
              <strong className="block text-[11px]">{name}</strong>
              <span className="text-[9px] text-[#858896]">
                {name.toLowerCase().replace(" ", ".")}@email.com
              </span>
            </div>
          </div>
          <span className="text-[10px] text-[#666877]">{[12, 8, 6, 5, 3][index]} orders</span>
        </div>
      )}
    </section>
  </PageLayout>;
}
