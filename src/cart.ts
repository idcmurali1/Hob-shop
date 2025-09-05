import type { Product } from './catalog';

export type CartLine = { id: string; qty: number };
export type EnrichedLine = Product & { qty: number; lineTotal: number };

export const formatUSD = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

export function enrich(cart: CartLine[], catalog: Product[]): EnrichedLine[] {
  return cart.map(l => {
    const p = catalog.find(x => x.id === l.id)!;
    return { ...p, qty: l.qty, lineTotal: p.price * l.qty };
  }).sort((a,b)=> a.title.localeCompare(b.title));
}

export function totals(lines: EnrichedLine[]) {
  const subtotal = lines.reduce((s, x) => s + x.lineTotal, 0);
  const tax = Math.round(subtotal * 0.095 * 100) / 100; // 9.5% example tax
  const total = subtotal + tax;
  return { subtotal, tax, total };
}
