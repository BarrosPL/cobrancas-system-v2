import { AppLayout } from "@/components/AppLayout";
import { MessageSquare, Send, CheckCheck, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const conversations = [
  {
    id: "1",
    name: "Maria Silva",
    phone: "(11) 99876-5432",
    lastMessage: "Vou verificar e retorno",
    time: "10:32",
    unread: 2,
  },
  {
    id: "2",
    name: "Carlos Mendes",
    phone: "(31) 98543-2109",
    lastMessage: "Vou pagar amanhã",
    time: "09:15",
    unread: 0,
  },
  {
    id: "3",
    name: "Fernanda Lima",
    phone: "(41) 97432-1098",
    lastMessage: "PAGUEI",
    time: "Ontem",
    unread: 0,
  },
  {
    id: "4",
    name: "Bruno Almeida",
    phone: "(71) 94109-8765",
    lastMessage: "Preciso de mais prazo",
    time: "Ontem",
    unread: 1,
  },
  {
    id: "5",
    name: "Ricardo Santos",
    phone: "(51) 96321-0987",
    lastMessage: "Lembrete enviado automaticamente",
    time: "02/03",
    unread: 0,
  },
];

const chatMessages = [
  { id: "1", from: "system", text: "🔔 Lembrete automático enviado: Cobrança R$ 750,00 vence em 01/03/2026", time: "28/02 09:00", type: "reminder" },
  { id: "2", from: "system", text: "🔔 Lembrete: Sua cobrança de R$ 750,00 venceu ontem. Pague via Pix.", time: "02/03 09:00", type: "reminder" },
  { id: "3", from: "client", text: "Vou verificar e retorno", time: "02/03 10:32" },
  { id: "4", from: "system", text: "🔔 2º lembrete: Cobrança de R$ 750,00 em atraso. Regularize para evitar encargos.", time: "04/03 09:00", type: "reminder" },
];

export default function Messages() {
  return (
    <AppLayout title="Mensagens">
      <div className="glass-card rounded-xl overflow-hidden h-[calc(100vh-8rem)]">
        <div className="grid grid-cols-1 md:grid-cols-3 h-full">
          {/* Conversation list */}
          <div className="border-r">
            <div className="p-3 border-b">
              <Input placeholder="Buscar conversa..." className="h-9" />
            </div>
            <ScrollArea className="h-[calc(100%-52px)]">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  className={cn(
                    "w-full flex items-start gap-3 p-3 text-left hover:bg-muted/50 transition-colors border-b border-border/50",
                    conv.id === "1" && "bg-muted/50"
                  )}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
                    {conv.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium truncate">{conv.name}</p>
                      <span className="text-[10px] text-muted-foreground">{conv.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{conv.lastMessage}</p>
                  </div>
                  {conv.unread > 0 && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                      {conv.unread}
                    </span>
                  )}
                </button>
              ))}
            </ScrollArea>
          </div>

          {/* Chat area */}
          <div className="col-span-2 flex flex-col">
            <div className="flex items-center gap-3 p-3 border-b">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
                M
              </div>
              <div>
                <p className="text-sm font-semibold">Maria Silva</p>
                <p className="text-xs text-muted-foreground">(11) 99876-5432 · Cobrança C001</p>
              </div>
            </div>
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-3">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "max-w-[80%] rounded-xl px-4 py-2.5",
                      msg.from === "system" &&
                        "bg-muted border border-border/50 text-sm",
                      msg.from === "client" &&
                        "ml-auto bg-primary/10 text-sm"
                    )}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <div className="flex items-center justify-end gap-1 mt-1">
                      <span className="text-[10px] text-muted-foreground">{msg.time}</span>
                      {msg.from === "system" && (
                        <CheckCheck className="h-3 w-3 text-primary" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="p-3 border-t flex gap-2">
              <Input placeholder="Enviar mensagem manual..." className="flex-1" />
              <Button size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
