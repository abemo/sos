"use client"

import React from "react"
import { usePathname } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link"

export function DynamicBreadcrumb() {
  const pathname = usePathname()
  
  // Process the pathname into capitalized segments
  const pathSegments = pathname
    .split("/")
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
  
  return (
    <Breadcrumb className="hidden sm:block">
      <BreadcrumbList>
        <BreadcrumbItem>
          <Link href="/">
            {/* <span className="text-primary">Home</span> */}
          </Link>
        </BreadcrumbItem>
        
        {pathSegments.map((segment, index) => {
          const isLast = index === pathSegments.length - 1
          const href = `/${pathSegments.slice(0, index + 1).map(seg => seg.toLowerCase()).join('/')}`
          
          return (
            <React.Fragment key={segment}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{segment}</BreadcrumbPage>
                ) : (
                  <Link href={href}>
                    <span className="text-primary">{segment}</span>
                  </Link>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}