"use client"

import { useEffect, useState } from "react"
import { useSidebar } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { SidebarIcon } from "lucide-react"
import { createClient } from "@/utils/supabase/client"
import Link from "next/link"
import { DynamicBreadcrumb } from "./ui/dynamicbreadcrumb"

export function SiteHeader() {
  const { toggleSidebar } = useSidebar()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [pathSegments, setPathSegments] = useState<string[]>([])

  // Is this necessary? -Toby
  useEffect(() => {
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

        <DynamicBreadcrumb/>


        {/* <SearchForm className="w-full sm:ml-auto sm:w-auto" /> */}

        <Button asChild className="w-full sm:ml-auto sm:w-auto">
          <Link href={isLoggedIn ? "/account" : "/login"}>
            {isLoggedIn ? "Account" : "Log in"}
          </Link>
        </Button>
      </div>
    </header>
  )
}

