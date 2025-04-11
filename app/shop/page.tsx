"use client";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  Heart,
  LayoutGrid,
  List,
  Package,
  RefreshCw,
  HeadphonesIcon,
  CreditCard,
  ChevronRight,
  Briefcase,
  Filter,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useCart } from "@/context/cart-context";
import Navbar from "@/components/navbar";
import SiteFooter from "@/components/site-footer";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { productApi } from "@/lib/api/productdetails";
import { Products } from "@/components/admin/products-table";

export default function ShopPage() {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  //  const queryClient = useQueryClient()
  
    const { data:products, isLoading } = useQuery({
      queryKey: ["products"],
      queryFn: productApi.getAll,
    })
    console.log("products", products);
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center text-sm">
          <Link href="/shop" className="text-gray-600 hover:text-[#795d2a]">
            Shop
          </Link>
          <ChevronRight className="h-4 w-4 mx-1 text-gray-400" />
          <span className="text-gray-900">All Products</span>
        </div>
      </div>

      {/* Mobile Filter Toggle Button */}
      <div className="md:hidden px-6 mb-4">
        <Button
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          className="w-full flex items-center justify-center gap-2 bg-[#795d2a] text-white"
        >
          {isMobileFilterOpen ? (
            <>
              <X className="h-5 w-5" /> Close Filters
            </>
          ) : (
            <>
              <Filter className="h-5 w-5" /> Open Filters
            </>
          )}
        </Button>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <div
            className={`
            w-full md:w-64 shrink-0 
            ${isMobileFilterOpen ? "block" : "hidden md:block"}
            absolute md:static z-20 bg-white md:bg-transparent 
            left-0 right-0 px-6 md:px-0
          `}
          >
            {/* Product Categories */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Product Categories</h3>
                <ChevronDown className="h-4 w-4" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="kurta-set" defaultChecked />
                  <label htmlFor="kurta-set" className="text-sm cursor-pointer">
                    Kurta Set
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="suit-set" />
                  <label htmlFor="suit-set" className="text-sm cursor-pointer">
                    Suit Set
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="anarkali" />
                  <label htmlFor="anarkali" className="text-sm cursor-pointer">
                    Anarkali
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="lounge-wear" />
                  <label
                    htmlFor="lounge-wear"
                    className="text-sm cursor-pointer"
                  >
                    Lounge Wear
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="kurtis-dresses" />
                  <label
                    htmlFor="kurtis-dresses"
                    className="text-sm cursor-pointer"
                  >
                    Kurtis & Dresses
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="luxe-collection" />
                  <label
                    htmlFor="luxe-collection"
                    className="text-sm cursor-pointer"
                  >
                    Luxe Collection
                  </label>
                </div>
              </div>
            </div>

            {/* Filter By Price */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Filter By Price</h3>
                <ChevronDown className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm mb-2">Price: ₹0 - ₹6000</p>
                <input
                  type="range"
                  min="0"
                  max="6000"
                  defaultValue="6000"
                  className="w-full h-1 bg-[#A08452] rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            {/* Filter By Color */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Filter By Color</h3>
                <ChevronDown className="h-4 w-4" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-600 rounded-sm"></div>
                  <span className="text-sm">Red</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-600 rounded-sm"></div>
                  <span className="text-sm">Blue</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-600 rounded-sm"></div>
                  <span className="text-sm">Green</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-cyan-500 rounded-sm"></div>
                  <span className="text-sm">Cyan</span>
                </div>
              </div>
            </div>

            {/* Size */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Size</h3>
                <ChevronDown className="h-4 w-4" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="size-36" defaultChecked />
                  <label htmlFor="size-36" className="text-sm cursor-pointer">
                    36
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="size-38" />
                  <label htmlFor="size-38" className="text-sm cursor-pointer">
                    38
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="size-40" />
                  <label htmlFor="size-40" className="text-sm cursor-pointer">
                    40
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="size-42" />
                  <label htmlFor="size-42" className="text-sm cursor-pointer">
                    42
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="size-44" />
                  <label htmlFor="size-44" className="text-sm cursor-pointer">
                    44
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="size-46" />
                  <label htmlFor="size-46" className="text-sm cursor-pointer">
                    46
                  </label>
                </div>
              </div>
            </div>

            {/* Mobile Apply Filters Button */}
            <div className="md:hidden my-4">
              <Button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full bg-[#795d2a] text-white"
              >
                Apply Filters
              </Button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <div className="flex space-x-2">
                <button className="p-2 border rounded bg-gray-100">
                  <LayoutGrid className="h-5 w-5" />
                </button>
                <button className="p-2 border rounded text-gray-400">
                  <List className="h-5 w-5" />
                </button>
              </div>
              <div>
                <div className="relative inline-block">
                  <select className="appearance-none border rounded-md px-4 py-2 pr-8 focus:outline-none text-sm">
                    <option>Sort by latest</option>
                    <option>Sort by popularity</option>
                    <option>Sort by price: low to high</option>
                    <option>Sort by price: high to low</option>
                  </select>
                  {/* <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 " /> */}
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {products?.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>

            {/* Load More Button */}
            <div className="mt-10 text-center">
              <Button
                variant="outline"
                className="border-[#795d2a] text-[#795d2a] hover:bg-[#795d2a] hover:text-white px-8 py-2 rounded-none"
              >
                Load More
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* (Rest of the component remains the same) */}
      <section className="py-10 border-t">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <Package className="h-10 w-10 mb-3 text-[#795d2a]" />
              <h3 className="font-medium text-base mb-1">Free Shipping</h3>
              <p className="text-sm text-gray-600">
                Free shipping for order above $150
              </p>
            </div>
            <div className="flex flex-col items-center">
              <RefreshCw className="h-10 w-10 mb-3 text-[#795d2a]" />
              <h3 className="font-medium text-base mb-1">Money Guarantee</h3>
              <p className="text-sm text-gray-600">
                Within 30 days for an exchange
              </p>
            </div>
            <div className="flex flex-col items-center">
              <HeadphonesIcon className="h-10 w-10 mb-3 text-[#795d2a]" />
              <h3 className="font-medium text-base mb-1">Online Support</h3>
              <p className="text-sm text-gray-600">
                24 hours a day, 7 days a week
              </p>
            </div>
            <div className="flex flex-col items-center">
              <CreditCard className="h-10 w-10 mb-3 text-[#795d2a]" />
              <h3 className="font-medium text-base mb-1">Flexible Payment</h3>
              <p className="text-sm text-gray-600">
                Pay with multiple credit cards
              </p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

// ProductCard component remains the same as in the original code
function ProductCard({ product }: { product: Products }) {
  // (Original ProductCard implementation)
  return (
    <div className="group relative">
      <div className="aspect-[3/4] relative overflow-hidden rounded-xl bg-gray-100">
        <Link href={`/product/${product.slug}`}>
          <Image
            src={product.assets[0].asset_url || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        <button
          className="absolute top-3 right-3 aspect-square w-8 bg-[#795D2A] rounded-full flex items-center justify-center 
          opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[100%] group-hover:translate-x-0"
        >
          <Heart className="aspect-square w-4 text-white hover:text-[#A08452]" />
        </button>

        <div
          className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 w-full
          transform translate-y-full group-hover:translate-y-0 
          transition-transform duration-300 ease-in-out"
        >
          <button
            className="w-full flex justify-center gap-4 items-center rounded-lg bg-[#795D2A] text-white text-lg font-normal py-2 
            opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            Add to Cart
            <Briefcase />
          </button>
        </div>
      </div>
      <div className="mt-3">
        <Link href={`/shop/product/${product.slug}`} className="block">
          <h3 className="text-sm font-medium">{product.name}</h3>
        </Link>
        <div className="flex items-center mt-1">
          <span className="text-sm font-medium">₹{product.discountPrice}</span>
          <span className="text-xs text-gray-500 line-through ml-2">
            ₹{product.price}
          </span>
        </div>
      </div>
    </div>
  );
}
