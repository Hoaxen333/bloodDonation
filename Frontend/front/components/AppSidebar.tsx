'use client'
import React from 'react'
import { Sidebar, SidebarProvider } from './ui/sidebar'
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
 
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const items = [
    {
      title: "Doação",
      url: "/doacao",
      icon: Home,
    },
    {
      title: "Doadores",
      url: "/doador",
      icon: Inbox,
    },
    {
      title: "Hospitais",
      url: "/hospital",
      icon: Calendar,
    },
    {
      title: "Inventário",
      url: "/inventario",
      icon: Search,
    },
    {
      title: "Responsáveis",
      url: "#",
      icon: Settings,
    },
  ]
export function AppSidebar() {
    return (
    <Sidebar>
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel className='font-bold'>Plataforma de Gestão de doações</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                            <a href={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                            </a>
                        </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
    </Sidebar>
    )
  }
