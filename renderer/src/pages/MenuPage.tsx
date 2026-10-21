import { PageLayout } from "./OrdersPage";

const categories = ["All Items", "Popular", "Beverages", "Starters", "Main Course", "Desserts"];
const items = ["Grilled Chicken", "Beef Burger", "Margherita Pizza", "Caesar Salad", "French Fries", "Chicken Pasta"];

export default function MenuPage() {
  return <PageLayout title="Menu" description="Manage your menu items, categories, and pricing.">
    <div className="flex flex-wrap gap-2">
      {categories.map((category, index) =>
        <button className={`rounded-xl px-3 py-2 text-[10px] ${index === 0 ? "bg-[#5745d9] text-white" : "border border-[#e1e3ea] border-lg bg-white text-[#666877]"}`} key={category}>{category}
        </button>)}
    </div>
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) =>
        <div className="rounded-lg border border-[#e9ebf1] bg-white p-3" key={item}>
          <div className="h-28 rounded-md bg-[#f1f2f6]">
            <img className="h-full w-full rounded-md object-cover" src={`https://images.unsplash.com/photo-${["1532550907401-a500c9a57435", "1568901346375-23c9450c58cd", "1574071318508-1cdbab80d002", "1546793665-c74683f339c1", "1573080496219-bb080dd4f877", "1551183053-bf91a1d81141"][index]}?w=400&q=80`} alt="" />
          </div>
          <div className="mt-3 flex justify-between"><div>

            <strong className="block text-xs text-[#393b49]">{item}</strong>
            <span className="mt-1 block text-[10px] text-[#5745d9]">
              ${[12.99, 9.99, 11.99, 7.99, 3.99, 10.99][index]}
            </span>
          </div>
            <button className="h-7 rounded-md bg-[#f0efff] px-3 text-[10px] text-[#5040d5]">Edit</button>
          </div>
        </div>
      )}
    </div>  
  </PageLayout>;
}
