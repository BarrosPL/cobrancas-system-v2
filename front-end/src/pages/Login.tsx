import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Zap, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { login } from "@/services/auth";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);

      // redireciona após login
      navigate("/dashboard");

    } catch (error: any) {
      console.error(error);
      alert(error.message || "Email ou senha inválidos");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex">
      
      {/* Left - Branding */}
      <div className="hidden lg:flex lg:flex-1 bg-sidebar flex-col justify-between p-10">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sidebar-primary">
            <Zap className="h-5 w-5 text-sidebar-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-sidebar-accent-foreground">
            CobrançaAI
          </span>
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold leading-tight text-sidebar-accent-foreground">
            Automatize suas
            <br />
            <span className="text-sidebar-primary">cobranças</span> com
            <br />
            inteligência.
          </h1>

          <p className="text-sidebar-foreground/70 max-w-md text-sm leading-relaxed">
            Reduza inadimplência, organize seu fluxo financeiro e comunique-se
            com seus clientes diretamente pelo WhatsApp.
          </p>

          <div className="flex gap-6 pt-4">
            {[
              { value: "98%", label: "Entregas" },
              { value: "-40%", label: "Inadimplência" },
              { value: "3x", label: "Mais rápido" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-sidebar-primary">
                  {stat.value}
                </p>
                <p className="text-xs text-sidebar-foreground/60">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-sidebar-foreground/40">
          © 2026 CobrançaAI. Todos os direitos reservados.
        </p>
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm space-y-8">

          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-3 justify-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold">CobrançaAI</span>
          </div>

          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-2xl font-bold">Entrar na plataforma</h2>
            <p className="text-sm text-muted-foreground">
              Acesse sua conta para gerenciar cobranças
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleLogin}>
            
            {/* EMAIL */}
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  className="pl-9"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* SENHA */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                <Link
                  to="/esqueci-senha"
                  className="text-xs text-primary hover:underline"
                >
                  Esqueceu a senha?
                </Link>
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-9 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Entrando..." : "Entrar"}
            </Button>

          </form>

          <p className="text-center text-sm text-muted-foreground">
            Não tem uma conta?{" "}
            <Link
              to="/cadastro"
              className="text-primary font-medium hover:underline"
            >
              Criar conta
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}