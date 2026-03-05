import { AppLayout } from "@/components/AppLayout";
import { monthlyData } from "@/data/mockData";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const pieData = [
  { name: "Pagos", value: 45, color: "hsl(var(--chart-paid))" },
  { name: "Pendentes", value: 35, color: "hsl(var(--chart-pending))" },
  { name: "Vencidos", value: 20, color: "hsl(var(--chart-overdue))" },
];

export default function Reports() {
  return (
    <AppLayout title="Relatórios">
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-card rounded-xl p-5">
            <h2 className="text-sm font-semibold mb-4">Evolução de Recebimentos</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  formatter={(value: number) => `R$ ${value.toLocaleString("pt-BR")}`}
                />
                <Line type="monotone" dataKey="recebido" stroke="hsl(var(--chart-paid))" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="pendente" stroke="hsl(var(--chart-pending))" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="glass-card rounded-xl p-5">
            <h2 className="text-sm font-semibold mb-4">Distribuição de Status</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 mt-2">
              {pieData.map((entry) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: entry.color }} />
                  <span className="text-xs text-muted-foreground">{entry.name} ({entry.value}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
