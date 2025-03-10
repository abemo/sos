import { Menu, Home, Apple, Settings, Handshake, HandCoins, Heart} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { title } from "process"
import { url } from "inspector"

const sideHeader = {
    title: "Home",
    url: "/",
    icon: Menu,
}

// Maybe use a pop up instead?
const sideFooter = {
    title: "Settings",
    url: "/settings",
    icon: Settings,
}



// Menu items.
const aidItems = [
  {
    title: "Housing",
    url: "example-resource",
    icon: Home,
  },
  {
    title: "Food",
    url: "example-resource",
    icon: Apple,
  },
  {
    title: "Wellness",
    url: "example-resource",
    icon: Heart,
  },
]

const giveItems = [
    {
        title: "Donate",
        url: "example-resource",
        icon: HandCoins,
      },
      {
        title: "Volunteer",
        url: "example-resource",
        icon: Handshake,
      },  
]

export function AppSidebar() {
  return (
    <Sidebar>
        <SidebarHeader>
            <SidebarMenuButton asChild>
                <a href={sideHeader.url}>
                <sideHeader.icon />
                <span>{sideHeader.title}</span>
                </a>
            </SidebarMenuButton>
        </SidebarHeader>
        <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Find</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {aidItems.map((item) => (
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
        <SidebarGroup>
        <SidebarGroupLabel>Give</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                {giveItems.map((item) => (
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
        {/* Footer: This can be changed to SidebarFooter, but it overlaps with supabase icon */}
        <SidebarGroup>
            <SidebarMenuButton asChild>
                <a href={sideFooter.url}>
                    <sideFooter.icon />
                    <span>{sideFooter.title}</span>
                    </a>
                </SidebarMenuButton>
            </SidebarGroup>
      </SidebarContent>

    </Sidebar>
  )
}
