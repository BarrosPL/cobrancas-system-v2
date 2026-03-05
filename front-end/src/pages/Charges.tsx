import { AppLayout } from "@/components/AppLayout";
import { charges } from "@/data/mockData";
import { ChargeStatusBadge, ChargeStatus } from "@/components/ChargeStatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Plus,
  Search,
  CheckCircle2,
  Send,
  FileImage,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Charges() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = charges.filter((c) => {
    const matchSearch = c.clientName
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <AppLayout title="Cobranças">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <div className="flex gap-3 flex-1">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por cliente..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="sent">Enviado</SelectItem>
                <SelectItem value="overdue">Vencido</SelectItem>
                <SelectItem value="paid">Pago</SelectItem>
                <SelectItem value="confirmed">Confirmado</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nova Cobrança
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar Nova Cobrança</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <Label>Cliente</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o cliente" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Maria Silva</SelectItem>
                      <SelectItem value="3">Ana Costa</SelectItem>
                      <SelectItem value="4">Carlos Mendes</SelectItem>
                      <SelectItem value="5">Fernanda Lima</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Valor (R$)</Label>
                  <Input placeholder="0,00" type="number" />
                </div>
                <div className="space-y-2">
                  <Label>Data de Vencimento</Label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <Label>Descrição (opcional)</Label>
                  <Input placeholder="Ex: Mensalidade março" />
                </div>
                <Button className="w-full">Criar Cobrança</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="glass-card rounded-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead className="text-right">Valor</TableHead>
                <TableHead>Vencimento</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Lembretes</TableHead>
                <TableHead>Resposta</TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((charge) => (
                <TableRow key={charge.id} className="hover:bg-muted/30">
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {charge.id}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm font-medium">{charge.clientName}</p>
                      <p className="text-xs text-muted-foreground">
                        {charge.clientPhone}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono font-semibold">
                    R$ {charge.amount.toLocaleString("pt-BR")}
                  </TableCell>
                  <TableCell className="text-sm">
                    {new Date(charge.dueDate).toLocaleDateString("pt-BR")}
                  </TableCell>
                  <TableCell>
                    <ChargeStatusBadge status={charge.status} />
                  </TableCell>
                  <TableCell className="text-center font-mono">
                    {charge.remindersSent}
                  </TableCell>
                  <TableCell>
                    {charge.lastResponse ? (
                      <div className="flex items-center gap-1.5">
                        <MessageCircle className="h-3 w-3 text-primary" />
                        <span className="text-xs max-w-[120px] truncate">
                          {charge.lastResponse}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-1">
                      {charge.status !== "paid" &&
                        charge.status !== "confirmed" && (
                          <>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7"
                                >
                                  <Send className="h-3.5 w-3.5" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Enviar lembrete</TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7"
                                >
                                  <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                Confirmar pagamento
                              </TooltipContent>
                            </Tooltip>
                          </>
                        )}
                      {charge.hasReceipt && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                            >
                              <FileImage className="h-3.5 w-3.5 text-primary" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Ver comprovante</TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AppLayout>
  );
}
