"use client"

import { useEffect, useState } from "react"
import { SidebarIcon } from "lucide-react"

import { SearchForm } from "@/components/search-form"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useSidebar } from "@/components/ui/sidebar"

export function SiteHeader() {
  const { toggleSidebar } = useSidebar()

  const [path, setPath] = useState<string[]>([])
  
  useEffect(() => {
    const pathname = window.location.pathname
      .split("/")
      .filter(Boolean)
      .map((part) => part[0].toUpperCase() + part.slice(1))

    setPath(pathname)
  }, []) 

  const atHome = path.length === 0

  return (
    <header className="fle sticky top-0 z-50 w-full items-center border-b bg-background">
      <div className="flex h-[--header-height] w-full items-center gap-2 px-4">
        <Button
          className="h-8 w-8"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <SidebarIcon />
        </Button>
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb className="hidden sm:block">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <span className="text-primary">Home</span>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {!atHome && <BreadcrumbSeparator /> } {/* Hide separator when at home */}
            <BreadcrumbItem>
              <BreadcrumbPage>{path}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <SearchForm className="w-full sm:ml-auto sm:w-auto" />
        {/* Check ui/button.tsx for styling options 'variants' */}
        <Button asChild>
          <a href="login">Log in</a>
        </Button>
      </div>
    </header>
  )
}
