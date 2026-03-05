import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

export default function SettingsPage() {
  return (
    <AppLayout title="Configurações">
      <div className="max-w-2xl space-y-8">
        {/* Company */}
        <div className="glass-card rounded-xl p-6 space-y-4">
          <h2 className="text-sm font-semibold">Dados da Empresa</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nome da empresa</Label>
              <Input defaultValue="Minha Empresa LTDA" />
            </div>
            <div className="space-y-2">
              <Label>CNPJ</Label>
              <Input defaultValue="12.345.678/0001-90" />
            </div>
          </div>
        </div>

        {/* WhatsApp */}
        <div className="glass-card rounded-xl p-6 space-y-4">
          <h2 className="text-sm font-semibold">Integração WhatsApp</h2>
          <div className="space-y-2">
            <Label>Número conectado</Label>
            <Input defaultValue="+55 11 91234-5678" disabled />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Envio automático de lembretes</p>
              <p className="text-xs text-muted-foreground">Enviar lembretes antes e após vencimento</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="space-y-2">
            <Label>Mensagem de lembrete (antes do vencimento)</Label>
            <Textarea
              defaultValue="Olá {nome}, sua cobrança de R$ {valor} vence em {data}. Pague via Pix: {chave_pix}. Responda PAGUEI após o pagamento."
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label>Mensagem de lembrete (após vencimento)</Label>
            <Textarea
              defaultValue="Olá {nome}, sua cobrança de R$ {valor} venceu em {data}. Regularize o pagamento via Pix: {chave_pix}. Responda PAGUEI e envie o comprovante."
              rows={3}
            />
          </div>
        </div>

        {/* Pix */}
        <div className="glass-card rounded-xl p-6 space-y-4">
          <h2 className="text-sm font-semibold">Dados de Pagamento</h2>
          <div className="space-y-2">
            <Label>Chave Pix</Label>
            <Input defaultValue="12345678000190" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Confirmação manual obrigatória</p>
              <p className="text-xs text-muted-foreground">Gestor precisa confirmar o pagamento</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>

        <Button>Salvar Configurações</Button>
      </div>
    </AppLayout>
  );
}
