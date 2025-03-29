"use client"

import { useFilterContext } from "@/components/filter-context"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Menu, Home, Apple, Settings, Handshake, HandCoins, Heart, Search} from "lucide-react"
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

const homeGroup = {
    title: "Home",
    url: "/",
    icon: Menu,
}

const settingsGroup = {
    title: "Settings",
    url: "/pages/settings",
    icon: Settings,
}

// Menu items.
const aidItems = [
  {
    title: "All Resources",
    url: "/pages/resources",
    icon: Search,
    filterValue: "",
  },
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
  const router = useRouter();
  const pathname = usePathname();
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
      params.delete("filter");
    } else {
      // Set the filter parameter to the selected category
      params.set("filter", item.filterValue.toLowerCase());
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