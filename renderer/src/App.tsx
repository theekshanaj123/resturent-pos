import { useEffect, useState } from "react";
import OrdersPage from "./pages/OrdersPage";
import ProductsPage from "./pages/ProductsPage";
import CustomersPage from "./pages/CustomersPage";
import ReportsPage from "./pages/ReportsPage";
import StaffPage from "./pages/StaffPage";
import SettingsPage from "./pages/SettingsPage";

type IconName =
  | "grid"
  | "cart"
  | "table"
  | "calendar"
  | "menu"
  | "users"
  | "chart"
  | "wallet"
  | "settings"
  | "search"
  | "bell"
  | "plus"
  | "trash"
  | "filter"
  | "arrow";

function Icon({ name, size = 16 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    cart: <><path d="M3 4h2l2.1 10.1a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.5L20.5 8H6" /><circle cx="9" cy="20" r="1.2" /><circle cx="17" cy="20" r="1.2" /></>,
    table: <><rect x="4" y="5" width="16" height="14" rx="2" /><path d="M4 10h16M9 5v14M15 5v14" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4M17 3v4M3 10h18" /></>,
    menu: <><path d="M5 5h14M5 12h14M5 19h14" /></>,
    users: <><circle cx="9" cy="8" r="3" /><path d="M3 20c.5-3.3 2.5-5 6-5s5.5 1.7 6 5M16 4.5a3 3 0 0 1 0 6M17 15c2.2.4 3.4 2 3.8 4" /></>,
    chart: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></>,
    wallet: <><path d="M4 6.5A2.5 2.5 0 0 1 6.5 4H19a2 2 0 0 1 2 2v14H5a2 2 0 0 1-2-2V6.5Z" /><path d="M3 8h18v5h-5a2.5 2.5 0 0 1 0-5" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="m19.4 15 .1.1a2 2 0 1 1-2.8 2.8l-.1-.1a2 2 0 0 0-3.4 1.4v.2a2 2 0 1 1-4 0v-.2a2 2 0 0 0-3.4-1.4l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A2 2 0 0 0 1.6 12a2 2 0 0 1 0-4h.2a2 2 0 0 0 1.4-3.4l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A2 2 0 0 0 9.4.4h.2a2 2 0 1 1 4 0h.2a2 2 0 0 0 3.4 1.4l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1A2 2 0 0 0 21.4 8h.2a2 2 0 1 1 0 4h-.2a2 2 0 0 0-2 3Z" /></>,
    search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 5 5" /></>,
    bell: <><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    trash: <><path d="M4 7h16M10 11v6M14 11v6M6 7l1 14h10l1-14M9 7V4h6v3" /></>,
    filter: <path d="M4 5h16l-6.5 7.5V19l-3 1v-7.5L4 5Z" />,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

type ProductVariant = { type: string; value: string; price: string };
type MenuItem = [name: string, price: string, image: string, tone: string, variants?: ProductVariant[]];
type OrderItem = { 0: string; 1: string; 2: string; 3: string; 4?: ProductVariant[]; count: number; variant?: ProductVariant };

const menuItems: MenuItem[] = [
  ["Grilled Chicken", "$12.99", "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&q=80", "orange", [{ type: "Size", value: "Regular", price: "$12.99" }, { type: "Size", value: "Large", price: "$16.99" }]],
  ["Beef Burger", "$9.99", "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80", "yellow"],
  ["Margherita Pizza", "$11.99", "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80", "orange"],
  ["Caesar Salad", "$7.99", "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&q=80", "green"],
  ["French Fries", "$3.99", "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80", "yellow"],
  ["Chicken Pasta", "$10.99", "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&q=80", "orange"],
  ["Chocolate Cake", "$5.99", "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80", "brown"],
  ["Lemonade", "$2.99", "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&q=80", "green"],
  ["Hot Coffee", "$2.49", "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80", "brown"],
  ["Veg Sandwich", "$6.49", "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&q=80", "yellow"],
  ["Garlic Bread", "$4.49", "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80", "orange"],
  ["Ice Cream", "$3.49", "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80", "brown"],
  ["Chocolate Cake", "$5.99", "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80", "brown"],
  ["Lemonade", "$2.99", "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&q=80", "green"],
  ["Hot Coffee", "$2.49", "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80", "brown"],
  ["Veg Sandwich", "$6.49", "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&q=80", "yellow"],
  ["Garlic Bread", "$4.49", "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80", "orange"],
  ["Ice Cream", "$3.49", "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80", "brown"],
];

const POS_PRODUCTS_STORAGE_KEY = "restodash-pos-products";

function loadCreatedMenuItems(): MenuItem[] {
  const stored = localStorage.getItem(POS_PRODUCTS_STORAGE_KEY);
  if (!stored) return [];
  try {
    const products = JSON.parse(stored) as Array<{ name?: string; price?: string; image?: string; variants?: Array<{ type?: string; value?: string; price?: string }> }>;
    return products
      .filter((product) => product.name && product.price && product.image)
      .map((product) => [
        product.name as string,
        product.price as string,
        `https://images.unsplash.com/photo-${product.image}?w=400&q=80`,
        "orange",
        product.variants?.filter((variant) => variant.type && variant.value && variant.price).map((variant) => ({
          type: variant.type as string,
          value: variant.value as string,
          price: variant.price as string,
        })),
      ] as MenuItem);
  } catch {
    return [];
  }
}

const navItems: [string, IconName][] = [["Overview", "grid"], ["Orders", "cart"], ["Menu", "menu"], ["Customers", "users"], ["Reports", "chart"], ["Staff", "users"], ["Settings", "settings"]];

function App() {
  const [active, setActive] = useState("Overview");
  const [category, setCategory] = useState("All Items");
  const [posMenuItems, setPosMenuItems] = useState<MenuItem[]>(() => [...menuItems, ...loadCreatedMenuItems()]);
  const [order, setOrder] = useState<OrderItem[]>(() => menuItems.slice(0, 4).map((item, index) => ({ ...item, count: index === 2 ? 2 : 1 })) as OrderItem[]);
  const [variantProduct, setVariantProduct] = useState<MenuItem | null>(null);

  useEffect(() => {
    const updateProducts = () => setPosMenuItems([...menuItems, ...loadCreatedMenuItems()]);
    window.addEventListener("pos-products-updated", updateProducts);
    return () => window.removeEventListener("pos-products-updated", updateProducts);
  }, []);

  function addItem(item: typeof menuItems[number], variant?: ProductVariant) {
    setOrder((current) => {
      const orderKey = `${item[0]}-${variant?.value || "default"}`;
      const existing = current.find((entry) => `${entry[0]}-${entry.variant?.value || "default"}` === orderKey);
      if (existing) return current.map((entry) => `${entry[0]}-${entry.variant?.value || "default"}` === orderKey ? { ...entry, count: entry.count + 1 } : entry);
      return [...current, { ...item, count: 1, variant }];
    });
    setVariantProduct(null);
  }

  function changeCount(name: string, amount: number) {
    setOrder((current) => current.map((entry) => entry[0] === name ? { ...entry, count: entry.count + amount } : entry).filter((entry) => entry.count > 0));
  }

  function renderPage() {
    switch (active) {
      case "Orders": return <OrdersPage />;
      case "Menu": return <ProductsPage />;
      case "Customers": return <CustomersPage />;
      case "Reports": return <ReportsPage />;
      case "Staff": return <StaffPage />;
      case "Settings": return <SettingsPage />;
      default: return null;
    }
  }

  return (
    <div className="flex h-screen min-h-0 overflow-hidden bg-[#f8f9fc] font-sans">
      <aside className="flex h-full w-[137px] shrink-0 flex-col border-r border-[#edf0f5] bg-white p-[16px_10px_12px]">
        <div className="flex items-center gap-2 border-b border-[#f0f1f5] px-[5px] pb-5">
          <div className="grid h-[25px] w-[25px] place-items-center rounded-[7px] bg-[#5141d7] text-[13px] font-bold text-white shadow-[0_4px_10px_#5544d54d]">R</div>
          <div>
            <strong className="block text-[10px] leading-[13px]">RestoDash</strong>
            <span className="block text-[8px] text-[#999cab]">POS System</span>
          </div>
        </div>
        <nav className="flex flex-col gap-3 pt-[13px]">
          {navItems.map(([label, icon]) =>
            <button className={`flex h-[31px] items-center gap-2.5 rounded-[7px] border-0 px-[9px] text-left text-[10px] ${active === label ? "bg-[#f0efff] font-semibold text-[#5040d5]" : "bg-transparent text-[#444654]"}`} onClick={() => setActive(label)} key={label}>
              <Icon name={icon} size={15} />
              {label}
            </button>)}
        </nav>
      </aside>
      <main className="flex h-full min-w-0 flex-1 flex-col overflow-hidden">
        {active === "Overview" ? <div className="flex h-full min-h-0 w-full max-w-[1400px] flex-1 flex-col overflow-hidden px-5 py-[22px]">
          <div className="grid min-h-0 flex-1 grid-cols-1 items-stretch gap-3 lg:grid-cols-[minmax(0,1fr)_350px]">
            <section className="flex min-h-0 min-w-0 flex-col overflow-hidden rounded-lg border border-[#e9ebf1] bg-white p-[15px_11px_11px]">
              <div className="flex shrink-0 items-start justify-between">
                <div>
                  <h2 className="m-0 mb-1 text-xs">Menu Items</h2>
                  <p className="m-0 text-[10px] text-[#858896]">Choose from our delicious menu</p>
                </div>

              </div>
              <div className="my-[14px_9px] flex shrink-0 gap-[19px] border-b border-[#eff0f4]">{["All Items", "Popular", "Beverages", "Starters", "Main Course", "Desserts"].map((item) => <button className={`border-0 bg-transparent pb-[9px] text-[8px] ${category === item ? "border-b-2 border-[#5848db] font-semibold text-[#4f3fd1]" : "text-[#666877]"}`} onClick={() => setCategory(item)} key={item}>{item}</button>)}</div>
              <div className="mb-[9px] flex shrink-0 gap-1.5">
                <div className="flex h-[35px] flex-1 items-center gap-1.5 rounded-md border border-[#e4e6ec] px-2 text-[#a8abb6]">
                  <Icon name="search" size={14} />
                  <input className="w-full border-0 bg-transparent text-[9px] text-[#454755] outline-0" placeholder="Search menu items..." />
                </div>
                {/* <button className="flex h-[25px] w-[125px] items-center justify-between rounded-md border border-[#e1e3ea] bg-white px-2 text-[8px] text-[#565867]">All Categories
                <span>⌄</span>
              </button> */}
              </div>
              <div className="grid min-h-0 flex-1 grid-cols-4 gap-2 overflow-y-auto pr-1 [scrollbar-color:#d7d5ed_transparent] [scrollbar-width:thin]">
                {posMenuItems.map((item) =>
                  <article className="min-w-0 cursor-pointer rounded-[7px] border border-[#ebedf2] p-[5px]" key={item[0]} onClick={(event) => { event.stopPropagation(); item[4]?.length ? setVariantProduct(item) : addItem(item); }}>
                    <div className="relative h-[82px] overflow-hidden rounded-[5px] bg-[#f4f2f1]">
                      <img className="h-full w-full object-cover" src={item[2]} alt="" />
                      <button type="button" aria-label={item[4]?.length ? `Choose ${item[0]} variant` : `Add ${item[0]}`} className="absolute bottom-1 right-1 grid h-6 w-6 place-items-center rounded-lg border-0 bg-[#f1efff] p-0 text-[#5747d8]" onClick={(event) => { event.stopPropagation(); item[4]?.length ? setVariantProduct(item) : addItem(item); }}>
                        <Icon name="plus" size={16} />
                      </button>
                    </div>
                    <div className="px-px pb-0.5 pt-[5px]">
                      <strong className="block overflow-hidden text-ellipsis whitespace-nowrap text-[14px] text-[#393b49]">
                        {item[0]}
                      </strong>
                      <span className="mt-0.5 block text-[12px] font-semibold text-[#4e3cd0]">
                        {item[1]}
                      </span>
                      {item[4]?.length && <span className="mt-1 inline-block rounded bg-[#f0efff] px-1.5 py-0.5 text-[8px] font-medium text-[#5040d5]">Choose variant</span>}
                    </div>
                  </article>)}
              </div>
            </section>
            {/* current order */}
            <aside className="flex h-full min-h-0 w-full max-w-[350px] flex-col justify-self-end overflow-hidden rounded-lg border border-[#e9ebf1] bg-white p-[1px_10px_10px] lg:w-[350px]">
              <div className="flex min-h-0 flex-1 flex-col">
                <div className="mb-2 flex shrink-0 items-center justify-between">
                  <div>
                    <h2 className="m-0  inline-block text-s">Current Order</h2>
                  </div>
                  <button className="border-0 bg-transparent text-base text-[#767886]">⋮</button>
                </div>
                <div className="min-h-0 flex-1 overflow-y-auto border-b border-[#eceef2] pr-1 [scrollbar-color:#d7d5ed_transparent] [scrollbar-width:thin]">
                  {order.map((item) =>
                    <div className="flex items-center gap-1.5 py-1.5" key={`${item[0]}-${item.variant?.value || "default"}`}>
                      <img className="h-15 w-15 rounded-md object-cover" src={item[2]} alt="" />
                      <div className="min-w-0 flex-1">
                        <strong className="block   overflow-hidden  text-[12px]">
                          {item[0]}{item.variant && <span className="ml-1 text-[#5745d9]">({item.variant.value})</span>}
                        </strong>
                        <span className="mt-0.5 block text-[12px] text-[#666875]">{item.variant?.price || item[1]}</span>
                      </div>
                      <div className="flex h-[18px] items-center rounded border border-[#e5e6eb]">
                        <button className="w-[17px] border-0 bg-white text-[11px] text-[#555766]" onClick={() => changeCount(item[0], -1)}>−</button>
                        <span className="min-w-[10px] text-center text-[14px]">{item.count}</span>
                        <button className="w-[17px] border-0 bg-white text-[11px] text-[#555766]" onClick={() => changeCount(item[0], 1)}>＋</button>
                      </div>
                      <button className="border-0 bg-transparent p-px text-[#ed756d]" onClick={() => changeCount(item[0], -item.count)}>
                        <Icon name="trash" size={13} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="shrink-0">
                <button className="border-0 bg-transparent px-px py-2 text-[8px] text-[#555766]">＋ &nbsp;Add Note</button>
                <div className="border-t border-[#eceef2] pt-1.5">
                  <div className="flex justify-between py-1 text-[12px] text-[#777985]">
                    <span>Subtotal</span>
                    <b className="font-medium text-[#41424e]">$29.94</b>
                  </div>
                  <div className="flex justify-between py-1 text-[12px] text-[#777985]">
                    <span>Discount</span>
                    <b className="font-medium text-[#39b56b]">$2.00</b>
                  </div>
                  <div className="flex justify-between py-1 text-[12px] text-[#777985]">
                    <span>Tax (8%)</span>
                    <b className="font-medium text-[#41424e]">$2.24</b>
                  </div>
                  <div className="mt-1 flex justify-between border-t border-[#eceef2] pt-2 text-[#272936]">
                    <strong className="text-[16px]">Total</strong>
                    <strong className="text-[16px]">$30.18</strong>
                  </div>
                </div>
                <button className="mt-2 flex h-[32px] w-full items-center justify-center rounded-lg border-0 bg-[#5745d9] text-[12px] text-white">Process
                </button>
                <button className="mt-2 flex h-[32px] w-full items-center justify-center rounded-lg border border-[#ddd9fb] bg-white px-2.5 text-[9px] text-[#5040ca]">♡ &nbsp; Save as Draft</button>
              </div>
            </aside>
            {variantProduct && <div className="fixed inset-0 z-20 flex items-center justify-center bg-[#1f2030]/30 p-4">
              <div className="w-full max-w-sm rounded-xl bg-white p-5 shadow-xl">
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h2 className="text-base font-semibold text-[#292a3a]">Select a variant</h2>
                    <p className="mt-1 text-[10px] text-[#858896]">{variantProduct[0]} has different options.</p>
                  </div>
                  <button className="border-0 bg-transparent text-lg text-[#777985]" onClick={() => setVariantProduct(null)}>×</button>
                </div>
                <div className="space-y-2">
                  {variantProduct[4]?.map((variant) => <button className="flex w-full items-center justify-between rounded-lg border border-[#e1e3ea] bg-white px-3 py-3 text-left hover:border-[#5745d9] hover:bg-[#f8f7ff]" onClick={() => addItem(variantProduct, variant)} key={`${variant.type}-${variant.value}`}>
                    <span><strong className="block text-[11px] text-[#393b49]">{variant.value}</strong><span className="mt-1 block text-[9px] text-[#858896]">{variant.type}</span></span>
                    <strong className="text-[11px] text-[#5745d9]">{variant.price}</strong>
                  </button>)}
                </div>
              </div>
            </div>}
          </div>
        </div> :
          <div className="h-full min-h-0 w-full max-w-[1400px] flex-1 overflow-hidden px-5 py-[22px]">{renderPage()}</div>}
      </main>
    </div>
  );
}

export default App;
