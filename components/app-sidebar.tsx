"use client"

import { useFilterContext } from "@/components/filter-context"

import { Menu, Home, Apple, Settings, Handshake, HandCoins, Heart} from "lucide-react"

import Link from "next/link"
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
import { it } from "node:test"

const homeGroup = {
    title: "Home",
    url: "/",
    icon: Menu,
}

// Maybe use a pop up instead? its called a popover. I'd like to use it for the settings button.
const settingsGroup = {
    title: "Settings",
    url: "/pages/settings",
    icon: Settings,
}



// Menu items.
const aidItems = [
  {
    title: "Housing",
    url: "/pages/housing",
    icon: Home,
    filterValue: "Housing",
  },
  {
    title: "Food",
    url: "/pages/food",
    icon: Apple,
    filterValue: "Food",
  },
  {
    title: "Wellness",
    url: "/pages/wellness",
    icon: Heart,
    filterValue: "Wellness",
  },
]

const giveItems = [
    {
        title: "Donate",
        url: "/pages/donate",
        icon: HandCoins,
      },
      {
        title: "Volunteer",
        url: "/pages/volunteer",
        icon: Handshake,
      },  
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {  
  const { setFilterSidebar } = useFilterContext();


  return (
    <Sidebar
      className="top-[--header-height] !h-[calc(100svh-var(--header-height))]"
      {...props}
    >
      <SidebarHeader>
          <SidebarMenuButton asChild>
              <a href={homeGroup.url}>
              <homeGroup.icon />
              <span>{homeGroup.title}</span>
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
                  <SidebarMenuButton asChild
                    >
                    <Link href={"/pages/food"} onClick={() => setFilterSidebar([{id: "category", value: item.filterValue}])}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
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
                <a href={settingsGroup.url}>
                    <settingsGroup.icon />
                    <span>{settingsGroup.title}</span>
                    </a>
                </SidebarMenuButton>
            </SidebarGroup>
      </SidebarContent>

    </Sidebar>
  )
}
