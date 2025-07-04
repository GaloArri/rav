"use client"

import { useProducts } from "./ProductContext"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ProductSort() {
  const { sortBy, setSortBy } = useProducts()

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-muted-foreground">Sort by:</span>
      <Select
        value={sortBy}
        onValueChange={(value) => {
          setSortBy(value as any)
        }}
      >
        <SelectTrigger className="w-[180px]" onClick={(e) => e.preventDefault()}>
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="featured">Featured</SelectItem>
          <SelectItem value="newest">Newest Arrivals</SelectItem>
          <SelectItem value="price-asc">Price: Low to High</SelectItem>
          <SelectItem value="price-desc">Price: High to Low</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

