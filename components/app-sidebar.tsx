"use client"

import { useFilterContext } from "@/components/filter-context"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Suspense } from 'react'
import { Menu, Home, Apple, Settings, Handshake, HandCoins, Heart, Search, BookMarked} from "lucide-react"
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

const allResources = {
  title: "All Resources",
  url: "/resources",
  icon: Search,
  filterValue: "",
}

/// my resources/saved resources
const myResources = {
  title: "My Resources",
  url: "/protected",
  icon: BookMarked,
}

// Menu items.
const aidItems = [
  {
    title: "Housing",
    url: "/resources",
    icon: Home,
    filterValue: "Housing",
  },
  {
    title: "Food",
    url: "/resources",
    icon: Apple,
    filterValue: "Food",
  },
  {
    title: "Wellness",
    url: "/resources",
    icon: Heart,
    filterValue: "Wellness",
  },
]

const giveItems = [
  {
    title: "Donate",
    url: "/resources",
    icon: HandCoins,
    filterValue: "Donate",
  },
  {
    title: "Volunteer",
    url: "/resources",
    icon: Handshake,
    filterValue: "Volunteer",
  },  
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {  
  const { setFilterSidebar } = useFilterContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Function to handle category click and set query parameters
  interface AidItem {
    title: string;
    url: string;
    icon: React.ComponentType;
    filterValue: string;
  }

  const handleCategoryClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, 
    item: AidItem
  ): void => {
    // Prevent default behavior of the Link
    e.preventDefault();
    
    // Create a new URLSearchParams object based on the current params
    const params = new URLSearchParams(searchParams.toString());
    
    if (item.filterValue === "") {
      // Clear the filter parameter for "All Resources"
      params.delete("category");
    } else {
      // Set the filter parameter to the selected category
      params.set("category", item.filterValue.toLowerCase());
    }
    
    // Update the filter context as well
    setFilterSidebar([{id: "category", value: item.filterValue}]);
    
    // Navigate to the resources page with query parameters
    const queryString = params.toString();
    const url = queryString ? `/resources?${queryString}` : "/resources";
    router.push(url);
  };

  return (
    <Sidebar
      className="top-[--header-height] !h-[calc(100svh-var(--header-height))]"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenuButton asChild>
          <Link 
            href="/resources" 
            onClick={(e) => handleCategoryClick(e, allResources)}
          >
            <allResources.icon />
            <span>{allResources.title}</span>
          </Link>
        </SidebarMenuButton>
        <SidebarMenuButton asChild>
          <a href={myResources.url}>
            <myResources.icon />
            <span>{myResources.title}</span>
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
                    <Link 
                      href="/resources" 
                      onClick={(e) => handleCategoryClick(e, item)}
                    >
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
                    <Link 
                      href="/resources" 
                      onClick={(e) => handleCategoryClick(e, item)}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
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