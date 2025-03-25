"use client"

import { useEffect, useState } from "react"
import { useSidebar } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { SidebarIcon } from "lucide-react"
import { createClient } from "@/utils/supabase/client"
import Link from "next/link"
import { SearchForm } from "@/components/search-form"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function SiteHeader() {
  const { toggleSidebar } = useSidebar()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [pathSegments, setPathSegments] = useState<string[]>([])

  useEffect(() => {
    // Client-safe pathname logic
    const currentPath = window.location.pathname
      .split("/")
      .filter(Boolean)
      .map((part) => part[0].toUpperCase() + part.slice(1))
    setPathSegments(currentPath)

    // Supabase user check
    const checkUser = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      setIsLoggedIn(!!user)
    }

    checkUser()
  }, [])

  const atHome = pathSegments.length === 0

  return (
    <header className="sticky top-0 z-50 w-full items-center border-b bg-background">
      <div className="flex h-[--header-height] w-full items-center gap-2 px-4">
        <Button
          className="h-8 w-8"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <SidebarIcon />
        </Button>

        <Breadcrumb className="hidden sm:block">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <span className="text-primary">Home</span>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {!atHome && <BreadcrumbSeparator />}
            {!atHome && (
              <BreadcrumbItem>
                <BreadcrumbPage>{pathSegments.join(" / ")}</BreadcrumbPage>
              </BreadcrumbItem>
            )}
          </BreadcrumbList>
        </Breadcrumb>

        <SearchForm className="w-full sm:ml-auto sm:w-auto" />

        <Button asChild>
          <Link href={isLoggedIn ? "/account" : "/login"}>
            {isLoggedIn ? "Account" : "Log in"}
          </Link>
        </Button>
      </div>
    </header>
  )
}
