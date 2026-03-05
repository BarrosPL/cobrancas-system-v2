import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getClients, createClient } from "@/services/clientService";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Plus, Search, Phone, Mail, MoreHorizontal } from "lucide-react";
import { useState, useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";

export default function Clients() {
  const [clients, setClients] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    loadClients();
  }, []);

  async function loadClients() {
    try {
      const data = await getClients();
      setClients(data);
    } catch (error) {
      console.error("Erro ao carregar clientes:", error);
    }
  }

  async function handleCreateClient() {
    try {
      const newClient = await createClient({
        nome,
        telefone,
        email,
      });

      setClients((prev) => [...prev, newClient]);

      setNome("");
      setTelefone("");
      setEmail("");
    } catch (error) {
      console.error("Erro ao criar cliente:", error);
    }
  }

  const filtered = clients.filter((c) =>
    c.nome?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppLayout title="Clientes">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar cliente..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Novo Cliente
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Cadastrar Novo Cliente</DialogTitle>
              </DialogHeader>

              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <Label>Nome completo</Label>
                  <Input
                    placeholder="Ex: Maria Silva"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Telefone (WhatsApp)</Label>
                  <Input
                    placeholder="(83) 99999-9999"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>E-mail</Label>
                  <Input
                    placeholder="email@exemplo.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <Button className="w-full" onClick={handleCreateClient}>
                  Cadastrar
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="glass-card rounded-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead className="text-right">Cobranças</TableHead>
                <TableHead className="text-right">Pendente</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>

            <TableBody>
              {filtered.map((client) => (
                <TableRow key={client.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium">
                    {client.nome}
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-col gap-0.5">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        {client.telefone || "-"}
                      </span>

                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        {client.email}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="text-right font-mono">
                    0
                  </TableCell>

                  <TableCell className="text-right font-mono">
                    <span className="text-green-600">Em dia</span>
                  </TableCell>

                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
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