import { useState } from "react";
import { PageLayout } from "./OrdersPage";

type Product = {
  name: string;
  category: string;
  price: string;
  stock: string;
  image: string;
  variants?: ProductVariant[];
};

type ProductVariant = {
  type: string;
  value: string;
  price: string;
  stock: string;
};

const POS_PRODUCTS_STORAGE_KEY = "restodash-pos-products";

function readStoredProducts(): Product[] {
  try {
    const stored = JSON.parse(localStorage.getItem(POS_PRODUCTS_STORAGE_KEY) || "[]");
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
}

const initialProducts: Product[] = [
  { name: "Grilled Chicken", category: "Main Course", price: "$12.99", stock: "28 in stock", image: "1532550907401-a500c9a57435", variants: [{ type: "Size", value: "Regular", price: "$12.99", stock: "18" }, { type: "Size", value: "Large", price: "$16.99", stock: "10" }] },
  { name: "Beef Burger", category: "Main Course", price: "$9.99", stock: "42 in stock", image: "1568901346375-23c9450c58cd" },
  { name: "Margherita Pizza", category: "Main Course", price: "$11.99", stock: "16 in stock", image: "1574071318508-1cdbab80d002" },
  { name: "Caesar Salad", category: "Starters", price: "$7.99", stock: "35 in stock", image: "1546793665-c74683f339c1" },
  { name: "French Fries", category: "Starters", price: "$3.99", stock: "50 in stock", image: "1573080496219-bb080dd4f877" },
  { name: "Chicken Pasta", category: "Main Course", price: "$10.99", stock: "21 in stock", image: "1551183053-bf91a1d81141" },
];

const imageIds = initialProducts.map((product) => product.image);

export default function ProductsPage() {
  const [products, setProducts] = useState(initialProducts);
  const [showAdd, setShowAdd] = useState(false);
  const [categories, setCategories] = useState(["Main Course", "Starters", "Beverages", "Desserts"]);
  const [category, setCategory] = useState("All Products");
  const [query, setQuery] = useState("");
  const [variantRows, setVariantRows] = useState([0]);

  const visibleProducts = products.filter((product) =>
    (category === "All Products" || product.category === category) &&
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  function addProduct(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    if (!name) return;
    const newProduct = {
      name,
      category: String(form.get("category") || categories[0]),
      price: `$${Number(form.get("price") || 0).toFixed(2)}`,
      stock: `${form.get("stock") || 0} in stock`,
      image: imageIds[products.length % imageIds.length],
      variants: String(form.getAll("variantValue[]")[0] || "").trim()
        ? form.getAll("variantType[]").map((type, index) => ({
          type: String(type),
          value: String(form.getAll("variantValue[]")[index] || ""),
          price: `$${Number(form.getAll("variantPrice[]")[index] || 0).toFixed(2)}`,
          stock: String(form.getAll("variantStock[]")[index] || 0),
        })).filter((variant) => variant.value.trim())
        : [],
    };
    setProducts((current) => [...current, newProduct]);
    const storedProducts = readStoredProducts();
    localStorage.setItem(POS_PRODUCTS_STORAGE_KEY, JSON.stringify([...storedProducts, newProduct]));
    window.dispatchEvent(new Event("pos-products-updated"));
    event.currentTarget.reset();
    setVariantRows([0]);
    setShowAdd(false);
  }

  function addCategory() {
    const name = window.prompt("Enter a category name");
    if (name?.trim() && !categories.includes(name.trim())) setCategories((current) => [...current, name.trim()]);
  }

  return <PageLayout title="Products" description="Manage products, categories, prices, and stock.">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap gap-2">
        {["All Products", ...categories].map((item) => <button className={`rounded-md px-3 py-2 text-[10px] ${category === item ? "bg-[#5745d9] text-white" : "border border-[#e1e3ea] bg-white text-[#666877]"}`} onClick={() => setCategory(item)} key={item}>{item}</button>)}
      </div>
      <div className="flex gap-2">
        <button className="rounded-md border border-[#e1e3ea] bg-white px-3 py-2 text-[10px] text-[#565867]" onClick={addCategory}>+ Add category</button>
        <button className="rounded-md bg-[#5745d9] px-3 py-2 text-[10px] text-white" onClick={() => setShowAdd(true)}>+ Create product</button>
      </div>
    </div>
    <div className="flex h-[35px] max-w-sm items-center rounded-md border border-[#e1e3ea] bg-white px-3">
      <input className="w-full border-0 bg-transparent text-[10px] outline-none" placeholder="Search products..." value={query} onChange={(event) => setQuery(event.target.value)} />
    </div>
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {visibleProducts.map((product) => <article className="overflow-hidden rounded-lg border border-[#e9ebf1] bg-white" key={`${product.name}-${product.price}`}>
        <img className="h-32 w-full object-cover" src={`https://images.unsplash.com/photo-${product.image}?w=500&q=80`} alt="" />
        <div className="p-3"><div className="flex items-start justify-between gap-2"><div><h2 className="text-xs font-semibold text-[#393b49]">{product.name}</h2><p className="mt-1 text-[10px] text-[#858896]">{product.category}</p></div><strong className="text-xs text-[#5745d9]">{product.price}</strong></div>
          {product.variants && product.variants.length > 0 && <div className="mt-3 border-t border-[#eff0f4] pt-2"><p className="mb-1.5 text-[9px] font-semibold text-[#565867]">Variants</p><div className="flex flex-wrap gap-1.5">{product.variants.map((variant) => <span className="rounded-md bg-[#f6f5ff] px-2 py-1 text-[9px] text-[#5040d5]" key={`${variant.type}-${variant.value}`}>{variant.value} · {variant.price}</span>)}</div></div>}
          <div className="mt-3 flex items-center justify-between border-t border-[#eff0f4] pt-2"><span className="text-[9px] text-[#34a965]">{product.stock}</span><button className="rounded-md bg-[#f0efff] px-3 py-1.5 text-[10px] text-[#5040d5]">Edit</button></div></div>
      </article>)}
    </div>
    {visibleProducts.length === 0 && <div className="rounded-lg border border-dashed border-[#d9dbe5] bg-white p-8 text-center text-[11px] text-[#858896]">No products found.</div>}
    {showAdd &&
      <div className="fixed inset-0 z-10 flex items-start justify-center overflow-y-auto bg-[#1f2030]/30 p-4 sm:items-center sm:py-6">
        <form onSubmit={addProduct} className="flex max-h-[200px] w-full max-w-lg flex-col overflow-hidden rounded-xl bg-white shadow-xl sm:max-h-[calc(100vh-3rem)]">
          <div className="flex shrink-0 items-center justify-between border-b border-[#eff0f4] p-5"><div>
            <h2 className="text-base font-semibold text-[#292a3a]">Create product</h2>
            <p className="mt-1 text-[10px] text-[#858896]">Add product details to your menu and POS.</p>
          </div>
            <button type="button" className="text-lg text-[#777985]" onClick={() => setShowAdd(false)}>×</button>
          </div>
          <div className="min-h-0 overflow-y-auto p-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="sm:col-span-2">
                <span className="mb-1.5 block text-[10px] font-medium text-[#565867]">Product name</span>
                <input name="name" required className="w-full rounded-md border border-[#e1e3ea] px-3 py-2 text-[11px] outline-none focus:border-[#5745d9]" placeholder="e.g. Grilled Chicken" /></label>
              <label>
                <span className="mb-1.5 block text-[10px] font-medium text-[#565867]">Category</span>
                <select name="category" className="w-full rounded-md border border-[#e1e3ea] bg-white px-3 py-2 text-[11px] outline-none">{categories.map((item) => <option key={item}>{item}</option>)}</select>
              </label>
              <label>
                <span className="mb-1.5 block text-[10px] font-medium text-[#565867]">Price</span>
                <input name="price" type="number" min="0" step="0.01" required className="w-full rounded-md border border-[#e1e3ea] px-3 py-2 text-[11px] outline-none" placeholder="0.00" />
              </label>
              <label>
                <span className="mb-1.5 block text-[10px] font-medium text-[#565867]">Stock quantity</span>
                <input name="stock" type="number" min="0" required className="w-full rounded-md border border-[#e1e3ea] px-3 py-2 text-[11px] outline-none" placeholder="0" /></label>
              <label>
                <span className="mb-1.5 block text-[10px] font-medium text-[#565867]">SKU</span>
                <input name="sku" className="w-full rounded-md border border-[#e1e3ea] px-3 py-2 text-[11px] outline-none" placeholder="Optional SKU" /></label>
              <label className="sm:col-span-2">
                <span className="mb-1.5 block text-[10px] font-medium text-[#565867]">Product details</span>
                <textarea name="details" rows={3} className="w-full resize-none rounded-md border border-[#e1e3ea] px-3 py-2 text-[11px] outline-none" placeholder="Describe ingredients, serving size, or notes..." /></label>
              <div className="sm:col-span-2 rounded-lg border border-[#e9ebf1] bg-[#fafbfc] p-3">
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <h3 className="text-[11px] font-semibold text-[#393b49]">Product Variants</h3>
                    <p className="mt-1 text-[9px] text-[#858896]">Add different sizes, colors, or versions of this product.</p>
                  </div>
                  <button type="button" className="rounded-md bg-[#f0efff] px-2.5 py-1.5 text-[9px] text-[#5040d5]" onClick={() => setVariantRows((rows) => [...rows, rows.length])}>+ Add variant</button>
                </div>
                <div className="space-y-2">{variantRows.map((row, index) => 
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-[.8fr_1.3fr_1fr_1fr_auto]" key={row}>
                  <select name="variantType[]" defaultValue="Size" className="rounded-md border border-[#e1e3ea] bg-white px-2 py-2 text-[10px]"><option>Size</option><option>Color</option><option>Version</option><option>Style</option></select>
                  <input name="variantValue[]" className="rounded-md border border-[#e1e3ea] px-2 py-2 text-[10px] outline-none" placeholder="Option (e.g. Large)" />
                  <input name="variantPrice[]" type="number" min="0" step="0.01" className="rounded-md border border-[#e1e3ea] px-2 py-2 text-[10px] outline-none" placeholder="Price" />
                  <input name="variantStock[]" type="number" min="0" className="rounded-md border border-[#e1e3ea] px-2 py-2 text-[10px] outline-none" placeholder="Stock" />
                  <button type="button" disabled={variantRows.length === 1} className="rounded-md border border-[#f0d5d5] px-2 text-[#db6b6b] disabled:cursor-not-allowed disabled:opacity-40" onClick={() => setVariantRows((rows) => rows.filter((item) => item !== row))}>×</button>
                </div>)}</div>
              </div>
            </div>
          </div>
          <div className="flex shrink-0 justify-end gap-2 border-t border-[#eff0f4] bg-white p-5"><button type="button" className="rounded-md border border-[#e1e3ea] px-4 py-2 text-[10px] text-[#565867]" onClick={() => setShowAdd(false)}>Cancel</button><button className="rounded-md bg-[#5745d9] px-4 py-2 text-[10px] text-white">Create product</button></div>
        </form>
      </div>}
  </PageLayout>;
}
