"use client"

import React, { createContext, useContext, useState, useCallback } from "react"
import productsData from "../../data/products.json"

type SortOption = "featured" | "newest" | "price-asc" | "price-desc"

interface ProductContextType {
  products: typeof productsData.products
  sortBy: SortOption
  setSortBy: (option: SortOption) => void
  selectedCategories: string[]
  setSelectedCategories: (categories: string[]) => void
  selectedColors: string[]
  setSelectedColors: (colors: string[]) => void
  selectedSizes: string[]
  setSelectedSizes: (sizes: string[]) => void
  filteredProducts: typeof productsData.products
  clearFilters: () => void
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [sortBy, setSortBy] = useState<SortOption>("featured")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])

  const clearFilters = useCallback(() => {
    setSelectedCategories([])
    setSelectedColors([])
    setSelectedSizes([])
    setSortBy("featured")
  }, [])

  const filteredProducts = React.useMemo(() => {
    return productsData.products
      .filter((product) => {
        if (selectedCategories.length === 0) return true
        return selectedCategories.includes(product.category)
      })

      .sort((a, b) => {
        switch (sortBy) {
          case "newest":
            return b.id - a.id
          case "price-asc":
            return a.price - b.price
          case "price-desc":
            return b.price - a.price
          default:
            return 0
        }
      })
  }, [selectedCategories, selectedColors, selectedSizes, sortBy])

  return (
    <ProductContext.Provider
      value={{
        products: productsData.products,
        sortBy,
        setSortBy,
        selectedCategories,
        setSelectedCategories,
        selectedColors,
        setSelectedColors,
        selectedSizes,
        setSelectedSizes,
        filteredProducts,
        clearFilters,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export function useProducts() {
  const context = useContext(ProductContext)
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider")
  }
  return context
}

