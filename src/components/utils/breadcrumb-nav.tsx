"use client"

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLocation } from "react-router-dom"

export type BreadcrumbItemData = {
  label: string
  href?: string
}

type BreadcrumbProps = {
  items: BreadcrumbItemData[]
  maxItems?: number
}

export function BreadcrumbNav({ items, maxItems = 4 }: BreadcrumbProps) {
  const shouldCollapse = items.length > maxItems

  const visibleItems = shouldCollapse
    ? [items[0], ...items.slice(-(maxItems - 2))]
    : items

  const hiddenItems = shouldCollapse
    ? items.slice(1, items.length - (maxItems - 2))
    : []

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {visibleItems.map((item, index) => {
          const isLast = index === visibleItems.length - 1
          const isEllipsis =
            shouldCollapse && index === 1 && hiddenItems.length > 0

          return (
            <div key={index} className="flex items-center gap-0">
              {isEllipsis ? (
                <>
                  <BreadcrumbItem>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="flex items-center justify-center hover:text-foreground">
                        <BreadcrumbEllipsis className="h-4 w-4" />
                        <span className="sr-only">Afficher le menu</span>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        {hiddenItems.map((hiddenItem, hiddenIndex) => (
                          <DropdownMenuItem key={hiddenIndex} asChild>
                            <a href={hiddenItem.href || "#"}>
                              {hiddenItem.label}
                            </a>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </BreadcrumbItem>
                  {index < visibleItems.length - 1 && (
                    <BreadcrumbSeparator />
                  )}
                </>
              ) : isLast ? (
                <BreadcrumbItem>
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                </BreadcrumbItem>
              ) : (
                <>
                  <BreadcrumbItem>
                    <BreadcrumbLink href={item.href || "#"}>
                      {item.label}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {index < visibleItems.length - 1 && (
                    <BreadcrumbSeparator />
                  )}
                </>
              )}
            </div>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
