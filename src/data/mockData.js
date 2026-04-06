export const EXPENSE_CATS = ["Food & Dining","Transport","Entertainment","Shopping","Health","Utilities","Rent"];
export const INCOME_CATS  = ["Salary","Freelance","Investment"];
export const ALL_CATS     = [...EXPENSE_CATS, ...INCOME_CATS];

export const CAT_COLORS = {
  "Food & Dining":"#F97316", Transport:"#3B82F6", Entertainment:"#8B5CF6",
  Shopping:"#EC4899", Health:"#14B8A6", Utilities:"#64748B", Rent:"#EF4444",
  Salary:"#22C55E", Freelance:"#10B981", Investment:"#84CC16",
};

export const PIE_PALETTE = ["#F97316","#3B82F6","#8B5CF6","#EC4899","#14B8A6","#64748B","#EF4444"];

let _nextId = 47;
export const getNextId = () => _nextId++;

export const SEED_TRANSACTIONS = [
  { id:1,  date:"2026-03-01", amount:85000, category:"Salary",        type:"income",  description:"Monthly Salary" },
  { id:2,  date:"2026-03-02", amount:2400,  category:"Food & Dining", type:"expense", description:"Grocery Store" },
  { id:3,  date:"2026-03-03", amount:800,   category:"Transport",     type:"expense", description:"Fuel" },
  { id:4,  date:"2026-03-05", amount:1200,  category:"Entertainment", type:"expense", description:"Netflix & Spotify" },
  { id:5,  date:"2026-03-07", amount:18000, category:"Rent",          type:"expense", description:"Monthly Rent" },
  { id:6,  date:"2026-03-08", amount:3500,  category:"Shopping",      type:"expense", description:"Clothes Shopping" },
  { id:7,  date:"2026-03-10", amount:15000, category:"Freelance",     type:"income",  description:"Design Project" },
  { id:8,  date:"2026-03-11", amount:650,   category:"Health",        type:"expense", description:"Pharmacy" },
  { id:9,  date:"2026-03-12", amount:1800,  category:"Utilities",     type:"expense", description:"Electricity & Water" },
  { id:10, date:"2026-03-14", amount:900,   category:"Food & Dining", type:"expense", description:"Restaurant" },
  { id:11, date:"2026-03-15", amount:2200,  category:"Shopping",      type:"expense", description:"Electronics" },
  { id:12, date:"2026-03-17", amount:600,   category:"Transport",     type:"expense", description:"Uber" },
  { id:13, date:"2026-03-18", amount:8000,  category:"Freelance",     type:"income",  description:"Consulting Fee" },
  { id:14, date:"2026-03-20", amount:1100,  category:"Health",        type:"expense", description:"Gym Membership" },
  { id:15, date:"2026-03-22", amount:3200,  category:"Food & Dining", type:"expense", description:"Weekly Groceries" },
  { id:16, date:"2026-02-01", amount:85000, category:"Salary",        type:"income",  description:"Monthly Salary" },
  { id:17, date:"2026-02-04", amount:2100,  category:"Food & Dining", type:"expense", description:"Groceries" },
  { id:18, date:"2026-02-07", amount:18000, category:"Rent",          type:"expense", description:"Monthly Rent" },
  { id:19, date:"2026-02-10", amount:12000, category:"Freelance",     type:"income",  description:"Web Project" },
  { id:20, date:"2026-02-12", amount:4200,  category:"Shopping",      type:"expense", description:"Shopping" },
  { id:21, date:"2026-02-15", amount:750,   category:"Transport",     type:"expense", description:"Transport" },
  { id:22, date:"2026-02-18", amount:2000,  category:"Utilities",     type:"expense", description:"Utilities" },
  { id:23, date:"2026-02-20", amount:5000,  category:"Investment",    type:"income",  description:"Dividend" },
  { id:24, date:"2026-02-22", amount:1500,  category:"Entertainment", type:"expense", description:"Concerts" },
  { id:25, date:"2026-01-01", amount:85000, category:"Salary",        type:"income",  description:"Monthly Salary" },
  { id:26, date:"2026-01-07", amount:18000, category:"Rent",          type:"expense", description:"Monthly Rent" },
  { id:27, date:"2026-01-09", amount:9000,  category:"Freelance",     type:"income",  description:"App Design" },
  { id:28, date:"2026-01-14", amount:3100,  category:"Food & Dining", type:"expense", description:"Food" },
  { id:29, date:"2026-01-18", amount:900,   category:"Transport",     type:"expense", description:"Transport" },
  { id:30, date:"2026-01-22", amount:2800,  category:"Shopping",      type:"expense", description:"Shopping" },
  { id:31, date:"2026-01-25", amount:1900,  category:"Utilities",     type:"expense", description:"Utilities" },
  { id:32, date:"2025-12-01", amount:85000, category:"Salary",        type:"income",  description:"Monthly Salary" },
  { id:33, date:"2025-12-03", amount:4500,  category:"Shopping",      type:"expense", description:"Holiday Shopping" },
  { id:34, date:"2025-12-07", amount:18000, category:"Rent",          type:"expense", description:"Monthly Rent" },
  { id:35, date:"2025-12-10", amount:6000,  category:"Freelance",     type:"income",  description:"Year-end Bonus" },
  { id:36, date:"2025-12-15", amount:3800,  category:"Food & Dining", type:"expense", description:"Food" },
  { id:37, date:"2025-12-20", amount:2500,  category:"Entertainment", type:"expense", description:"Holiday Events" },
  { id:38, date:"2025-11-01", amount:85000, category:"Salary",        type:"income",  description:"Monthly Salary" },
  { id:39, date:"2025-11-05", amount:2600,  category:"Food & Dining", type:"expense", description:"Food" },
  { id:40, date:"2025-11-07", amount:18000, category:"Rent",          type:"expense", description:"Monthly Rent" },
  { id:41, date:"2025-11-12", amount:7500,  category:"Freelance",     type:"income",  description:"Freelance" },
  { id:42, date:"2025-11-18", amount:1200,  category:"Transport",     type:"expense", description:"Transport" },
  { id:43, date:"2025-10-01", amount:80000, category:"Salary",        type:"income",  description:"Monthly Salary" },
  { id:44, date:"2025-10-07", amount:18000, category:"Rent",          type:"expense", description:"Monthly Rent" },
  { id:45, date:"2025-10-14", amount:5000,  category:"Investment",    type:"income",  description:"Stock Returns" },
  { id:46, date:"2025-10-20", amount:2900,  category:"Food & Dining", type:"expense", description:"Food" },
];
