"use client"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

type TabItem = {
  value: string
  label: string
  content: React.ReactNode
}

type TabsSectionProps = {
  defaultValue: string
  items: TabItem[]
  className?: string
  listClassName?: string
}

export function TabsSection({
  defaultValue,
  items,
  className,
  listClassName,
}: TabsSectionProps) {
  return (
    <Tabs defaultValue={defaultValue} className={"w-full>"}>
      <TabsList className={className}>
        {items.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value} className={listClassName}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {items.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  )
}
