import { AppLayout } from "@/components/AppLayout";
import { StatCard } from "@/components/StatCard";
import { ChargeStatusBadge } from "@/components/ChargeStatusBadge";
import {
  DollarSign,
  Users,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRight,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useEffect, useState } from "react";
import {
  getDashboardStats,
  getFinancialFlow,
  getRecentCharges,
} from "@/services/dashboard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Dashboard() {

  const [stats, setStats] = useState<any>(null);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [recentCharges, setRecentCharges] = useState<any[]>([]);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const statsData = await getDashboardStats();
        const flowData = await getFinancialFlow();
        const chargesData = await getRecentCharges();

        setStats(statsData);
        setMonthlyData(flowData);
        setRecentCharges(chargesData);

      } catch (error) {
        console.error("Erro ao carregar dashboard:", error);
      }
    }

    loadDashboard();
  }, []);

  const totalReceived = stats?.total_recebido || 0;
  const totalPending = stats?.total_pendente || 0;
  const totalOverdue = stats?.total_vencido || 0;
  const clientCount = stats?.clientes_ativos || 0;

  return (
    <AppLayout title="Dashboard">
      <div className="space-y-6">

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          <StatCard
            title="Recebido (mês)"
            value={`R$ ${totalReceived.toLocaleString("pt-BR")}`}
            change=""
            changeType="positive"
            icon={DollarSign}
            iconClassName="bg-success/10 text-success"
          />

          <StatCard
            title="Pendente"
            value={`R$ ${totalPending.toLocaleString("pt-BR")}`}
            change=""
            changeType="neutral"
            icon={Clock}
            iconClassName="bg-warning/10 text-warning"
          />

          <StatCard
            title="Vencido"
            value={`R$ ${totalOverdue.toLocaleString("pt-BR")}`}
            change=""
            changeType="negative"
            icon={AlertTriangle}
            iconClassName="bg-destructive/10 text-destructive"
          />

          <StatCard
            title="Clientes Ativos"
            value={clientCount.toString()}
            change=""
            changeType="positive"
            icon={Users}
            iconClassName="bg-accent text-accent-foreground"
          />

        </div>

        {/* Chart + Recent */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* Chart */}
          <div className="lg:col-span-3 glass-card rounded-xl p-5">

            <h2 className="text-sm font-semibold mb-4">
              Fluxo Financeiro — Últimos 6 meses
            </h2>

            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={monthlyData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />

                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                />

                <YAxis
                  tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  formatter={(value: number) =>
                    `R$ ${value.toLocaleString("pt-BR")}`
                  }
                />

                <Legend />

                <Bar
                  dataKey="recebido"
                  name="Recebido"
                  fill="hsl(var(--chart-paid))"
                  radius={[4, 4, 0, 0]}
                />

                <Bar
                  dataKey="pendente"
                  name="Pendente"
                  fill="hsl(var(--chart-pending))"
                  radius={[4, 4, 0, 0]}
                />

                <Bar
                  dataKey="vencido"
                  name="Vencido"
                  fill="hsl(var(--chart-overdue))"
                  radius={[4, 4, 0, 0]}
                />

              </BarChart>
            </ResponsiveContainer>

          </div>

          {/* Recent charges */}
          <div className="lg:col-span-2 glass-card rounded-xl p-5">

            <div className="flex items-center justify-between mb-4">

              <h2 className="text-sm font-semibold">
                Cobranças Recentes
              </h2>

              <Button variant="ghost" size="sm" asChild>
                <Link to="/cobrancas" className="text-xs text-primary">
                  Ver todas
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>

            </div>

            <div className="space-y-3">

              {recentCharges.slice(0, 5).map((charge: any) => (

                <div
                  key={charge.id}
                  className="flex items-center justify-between rounded-lg border bg-card p-3 transition-colors hover:bg-muted/30"
                >

                  <div className="min-w-0">

                    <p className="text-sm font-medium truncate">
                      {charge.cliente_nome}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      Venc: {new Date(charge.data_vencimento).toLocaleDateString("pt-BR")}
                    </p>

                  </div>

                  <div className="flex items-center gap-3">

                    <span className="text-sm font-semibold font-mono">
                      R$ {charge.valor.toLocaleString("pt-BR")}
                    </span>

                    <ChargeStatusBadge status={charge.status} />

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* Quick Actions */}
        <div className="glass-card rounded-xl p-5">

          <h2 className="text-sm font-semibold mb-3">
            Ações Rápidas
          </h2>

          <div className="flex flex-wrap gap-3">

            <Button asChild>
              <Link to="/cobrancas">
                <DollarSign className="mr-2 h-4 w-4" />
                Nova Cobrança
              </Link>
            </Button>

            <Button variant="outline" asChild>
              <Link to="/clientes">
                <Users className="mr-2 h-4 w-4" />
                Cadastrar Cliente
              </Link>
            </Button>

            <Button variant="outline">
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Confirmar Pagamentos
            </Button>

          </div>

        </div>

      </div>
    </AppLayout>
  );
}