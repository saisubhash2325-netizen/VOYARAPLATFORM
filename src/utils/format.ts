export const inr = (n: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
export const nightsBetween = (a: string, b: string) => Math.max(0, Math.round((+new Date(b) - +new Date(a)) / 86_400_000));
