"use client";

const topDishes = [
  {
    name: "Butter Chicken",
    orders: 284,
    revenue: "₹85,200",
    progress: 90,
    color: "bg-primary",
  },
  {
    name: "Hyderabadi Biryani",
    orders: 236,
    revenue: "₹70,800",
    progress: 75,
    color: "bg-emerald-500",
  },
  {
    name: "Paneer Tikka Masala",
    orders: 198,
    revenue: "₹49,500",
    progress: 58,
    color: "bg-amber-500",
  },
  {
    name: "Dal Makhani",
    orders: 165,
    revenue: "₹33,000",
    progress: 42,
    color: "bg-sky-500",
  },
  {
    name: "Gulab Jamun",
    orders: 142,
    revenue: "₹21,300",
    progress: 30,
    color: "bg-rose-500",
  },
];

export default function TopProducts() {
  return (
    <div className="animate-fade-in stagger-6 rounded-2xl border border-border bg-card p-6 shadow-sm transition-colors">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            Top Dishes
          </h3>
          <p className="text-sm text-muted-foreground">
            Best sellers this month
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {topDishes.map((dish, index) => (
          <div key={dish.name} className="group">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-secondary text-xs font-bold text-secondary-foreground">
                  {index + 1}
                </span>
                <span className="text-sm font-medium text-foreground">
                  {dish.name}
                </span>
              </div>
              <div className="text-right">
                <span className="text-sm font-semibold text-foreground">
                  {dish.revenue}
                </span>
                <span className="ml-2 text-xs text-muted-foreground">
                  {dish.orders} orders
                </span>
              </div>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className={`h-full rounded-full ${dish.color} transition-all duration-700 ease-out`}
                style={{ width: `${dish.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
