import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type ChargeStatus = "paid" | "pending" | "overdue" | "sent" | "confirmed";

const statusConfig: Record<ChargeStatus, { label: string; className: string }> = {
  paid: {
    label: "Pago",
    className: "bg-success/10 text-success border-success/20",
  },
  pending: {
    label: "Pendente",
    className: "bg-warning/10 text-warning border-warning/20",
  },
  overdue: {
    label: "Vencido",
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
  sent: {
    label: "Enviado",
    className: "bg-primary/10 text-primary border-primary/20",
  },
  confirmed: {
    label: "Confirmado",
    className: "bg-success/10 text-success border-success/20",
  },
};

export function ChargeStatusBadge({ status }: { status: ChargeStatus }) {
  const config = statusConfig[status];
  return (
    <Badge variant="outline" className={cn("font-medium", config.className)}>
      {config.label}
    </Badge>
  );
}
