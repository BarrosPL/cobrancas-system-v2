import {
  LayoutDashboard,
  Users,
  FileText,
  MessageSquare,
  Settings,
  Zap,
  TrendingUp,
  LogOut,
} from "lucide-react";

import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import { logout } from "@/services/auth";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

const mainItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Clientes", url: "/clientes", icon: Users },
  { title: "Cobranças", url: "/cobrancas", icon: FileText },
  { title: "Mensagens", url: "/mensagens", icon: MessageSquare },
];

const configItems = [
  { title: "Relatórios", url: "/relatorios", icon: TrendingUp },
  { title: "Configurações", url: "/configuracoes", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon">
      {/* HEADER */}
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary">
            <Zap className="h-5 w-5 text-sidebar-primary-foreground" />
          </div>

          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-bold text-sidebar-accent-foreground">
                CobrançaAI
              </span>
              <span className="text-[11px] text-sidebar-foreground/60">
                Sistema de Cobrança
              </span>
            </div>
          )}
        </div>
      </SidebarHeader>

      {/* MENU */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Principal</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="hover:bg-sidebar-accent/50"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Sistema</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {configItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className="hover:bg-sidebar-accent/50"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter className="p-4 space-y-3">

        {/* STATUS WHATSAPP
        {!collapsed && (
          <div className="rounded-lg bg-sidebar-accent/50 p-3">
            <p className="text-xs text-sidebar-foreground/70">
              WhatsApp conectado
            </p>

            <div className="mt-1 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-sidebar-primary animate-pulse" />

              <span className="text-xs font-medium text-sidebar-accent-foreground">
                Online
              </span>
            </div>
          </div>
        )} */}

        {/* BOTÃO LOGOUT */}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={logout}
              className={`hover:bg-red-500/10 text-red-500 ${
            collapsed ? "justify-center" : ""
           }`}
            >
              <LogOut className="h-4 w-4" />
              {!collapsed && <span className="ml-2">Sair</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

      </SidebarFooter>
    </Sidebar>
  );
}