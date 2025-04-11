"use client";
import { useEffect, useState } from "react";
import type React from "react";

import Image from "next/image";
import Link from "next/link";
import {
  Minus,
  Plus,
  Heart,
  Package,
  RefreshCw,
  HeadphonesIcon,
  CreditCard,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/context/cart-context";
import Navbar from "@/components/navbar";
import SiteFooter from "@/components/site-footer";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { productApi } from "@/lib/api/productdetails";
import { Products } from "./admin/products-table";

export default function ProductDetails({slug} : {slug: string}) {
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState("orange");
  const [selectedSize, setSelectedSize] = useState("40");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("descriptions");
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewName, setReviewName] = useState("");
  const [reviewEmail, setReviewEmail] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [product, setProduct] = useState<Products | null>(null);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle review submission
    console.log({ reviewRating, reviewName, reviewEmail, reviewText });
    // Reset form
    setReviewRating(0);
    setReviewName("");
    setReviewEmail("");
    setReviewText("");
  };

  const handleAddToCart = () => {

    if(!product){
      return;
    }
    // Add item to cart
    addToCart({
      id : product.id,
      name: product.name,
      price: product.discountPrice ?? product.price,
      originalPrice: product.price,
      quantity: quantity,
      color: selectedColor,
      size: selectedSize,
      image: product?.assets[0].asset_url,
    });

    // Show success toast
    toast({
      title: "Added to cart",
      description: `${product?.name} has been added to your cart.`,
    });
  };

  // Mock customer reviews
  const customerReviews = [
    {
      id: 1,
      name: "Sakhi Sharma",
      avatar: "/placeholder.svg?height=50&width=50",
      rating: 5,
      date: "May 29, 2024",
      verified: true,
      text: "Love this product, the fabric is soft & good ❤️❤️",
      details:
        "I love this product! The fabric is soft, high-quality, and extremely comfortable. The craftsmanship is impressive, making it both durable and stylish. Highly recommended!",
    },
    {
      id: 2,
      name: "Tanya Kapoor",
      avatar: "/placeholder.svg?height=50&width=50",
      rating: 5,
      date: "May 29, 2024",
      verified: true,
      text: "Love this product, the fabric is soft & good ❤️❤️",
      details:
        "I love this product! The fabric is soft, high-quality, and extremely comfortable. The craftsmanship is impressive, making it both durable and stylish. Highly recommended!",
    },
  ];

  const relatedProducts = [
    {
      id: "1",
      name: "Raas Scarlet Red Ikkat Print Suit Set",
      price: 3490.0,
      image: "/lot_0005__PUN0762.png?height=300&width=250",
    },
    {
      id: "2",
      name: "Raas Scarlet Red Ikkat Print Suit Set",
      price: 3490.0,
      image: "/lot_0009__PUN0747.png?height=300&width=250",
    },
    {
      id: "3",
      name: "Raas Scarlet Red Ikkat Print Suit Set",
      price: 3490.0,
      image: "/image.png?height=300&width=250",
    },
    {
      id: "4",
      name: "Raas Scarlet Red Ikkat Print Suit Set",
      price: 3490.0,
      image: "/image 100.png?height=300&width=250",
    },
  ];
  
  const { data, isLoading, error } = useQuery({
    queryKey: ["product", slug],
    queryFn: async () => {
      try {
        const res = await productApi.getBySlug(slug);
        return res;
      } catch (err) {
        throw new Error("Failed to fetch product");
      }
    },
  });
  
  useEffect(() => {
    if (data) {
      setProduct(data);
    }
  }, [data]);
  if(error) {
    return <div>Error loading product</div>;
  }

  if(isLoading){
    return <div>Loading...</div>;
  }

  if(!data){
    return <div>Product not found</div>;
  }


  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Product Detail Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Product Images */}
          <div>
            <div className="mb-4 aspect-[3/4] relative">
              <Image
                src={product?.assets[0].asset_url || "/placeholder.svg"}
                alt={product?.name?product.name:"image"}
                fill
                className="object-cover rounded-md"
                priority
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product?.assets.map((image, index) => (
                <div
                  key={index}
                  className="aspect-square relative border rounded-md overflow-hidden"
                >
                  <Image
                    src={image.asset_url || "/placeholder.svg"}
                    alt={`${product?.name?product?.name:"image"} view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-2xl font-medium mb-2">{product?.name}</h1>
            <p className="text-gray-600 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            </p>

            {/* Rating */}
            {/* <div className="flex items-center mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-5 h-5 ${
                      star <= Math.floor(product.rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                {product.rating} ({product.reviews} Reviews)
              </span>
            </div> */}

            {/* Price */}
            <div className="flex items-center mb-6">
              <span className="text-xl font-medium">
                ₹{product?.discountPrice?.toFixed(2)}
              </span>
              <span className="ml-2 text-gray-500 line-through">
                ₹{product?.price.toFixed(2)}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-700 mb-6">{product?.description}</p>

            {/* Stock Status */}
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                In Stock
              </span>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Size</h3>
              {/* <div className="flex flex-wrap gap-2">
                {product?.sizes.map((size) => (
                  <button
                    key={size}
                    className={`w-10 h-10 flex items-center justify-center border rounded-md ${
                      selectedSize === size
                        ? "bg-[#a08452] text-white border-[#a08452]"
                        : "border-gray-300 text-gray-700 hover:border-[#a08452]"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div> */}
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                  onClick={decreaseQuantity}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center">{quantity}</span>
                <button
                  className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                  onClick={increaseQuantity}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <Button
                className="flex-1 bg-[#a08452] hover:bg-[#8c703d] text-white transition-colors h-auto py-2"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>

              <Button
                variant="outline"
                className="border-gray-300 hover:bg-gray-50 transition-colors w-8 h-8 p-0 flex items-center justify-center"
              >
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mb-16">
          <Tabs defaultValue="reviews" className="w-full">
            <TabsList className="border-b w-full justify-start rounded-none bg-transparent mb-6">
              <TabsTrigger
                value="descriptions"
                className={`pb-2 rounded-none ${
                  activeTab === "descriptions"
                    ? "border-b-2 border-[#a08452] text-[#a08452]"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab("descriptions")}
              >
                Descriptions
              </TabsTrigger>
              <TabsTrigger
                value="additional"
                className={`pb-2 rounded-none ${
                  activeTab === "additional"
                    ? "border-b-2 border-[#a08452] text-[#a08452]"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab("additional")}
              >
                Additional Information
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className={`pb-2 rounded-none ${
                  activeTab === "reviews"
                    ? "border-b-2 border-[#a08452] text-[#a08452]"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab("reviews")}
              >
                Reviews
              </TabsTrigger>
            </TabsList>

            <TabsContent value="descriptions" className="mt-0">
              <div className="prose max-w-none">
                <p>
                  Discover our mid cotton anarkali set with pillan work yok
                  paired with pant and back print dupatta. This outfit exudes a
                  charming and delicate appeal, making it perfect for festive
                  event, pooja, light gathering, day to day life.
                </p>
                <p>
                  <strong>Features:</strong>
                </p>
                <ul>
                  <li>Premium quality cotton fabric</li>
                  <li>Intricate embroidery work</li>
                  <li>Comfortable fit for all-day wear</li>
                  <li>Includes kurta, pants, and dupatta</li>
                  <li>Perfect for festive occasions</li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="additional" className="mt-0">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Size</h3>
                  {/* <div className="flex flex-wrap gap-2">
                    {product?.sizes.map((size) => (
                      <div
                        key={size}
                        className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md"
                      >
                        {size}
                      </div>
                    ))}
                  </div> */}
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">
                    Care Instructions
                  </h3>
                  <p>Dry clean only</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-0">
              <div>
                <h2 className="text-xl font-medium mb-6">Customer Reviews</h2>

                {/* Customer Reviews List */}
                <div className="space-y-8 mb-12">
                  {customerReviews.map((review) => (
                    <div key={review.id} className="border-b pb-8">
                      <div className="flex items-start">
                        <div className="mr-4">
                          <div className="w-12 h-12 rounded-full overflow-hidden">
                            <Image
                              src={review.avatar || "/placeholder.svg"}
                              alt={review.name}
                              width={48}
                              height={48}
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium">{review.name}</h3>
                          <div className="flex my-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg
                                key={star}
                                className="w-4 h-4 text-yellow-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <p className="font-medium mb-2">{review.text}</p>
                          <p className="text-gray-600 text-sm mb-2">
                            {review.details}
                          </p>
                          <p className="text-xs text-gray-500">
                            Verified by{" "}
                            <span className="font-medium">Raas</span> (verified
                            purchase) on {review.date}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Review Form */}
                <div>
                  <h2 className="text-xl font-medium mb-6">Add your Review</h2>

                  <form onSubmit={handleReviewSubmit}>
                    <div className="space-y-6">
                      <div>
                        <p className="text-sm font-medium mb-2">Your Rating</p>
                        <div className="flex space-x-2">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                              key={rating}
                              type="button"
                              className="p-1"
                              onClick={() => setReviewRating(rating)}
                            >
                              <Star
                                className={`h-5 w-5 ${
                                  rating <= reviewRating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="review-name"
                          className="block text-sm font-medium mb-1"
                        >
                          Name
                        </label>
                        <input
                          id="review-name"
                          type="text"
                          value={reviewName}
                          onChange={(e) => setReviewName(e.target.value)}
                          placeholder="Enter Your Name"
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a08452]"
                          required
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="review-email"
                          className="block text-sm font-medium mb-1"
                        >
                          Email Address
                        </label>
                        <input
                          id="review-email"
                          type="email"
                          value={reviewEmail}
                          onChange={(e) => setReviewEmail(e.target.value)}
                          placeholder="Enter Your Email"
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a08452]"
                          required
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="review-text"
                          className="block text-sm font-medium mb-1"
                        >
                          Your Review
                        </label>
                        <textarea
                          id="review-text"
                          value={reviewText}
                          onChange={(e) => setReviewText(e.target.value)}
                          placeholder="Enter Your Review"
                          rows={5}
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a08452]"
                          required
                        />
                      </div>

                      <div>
                        <Button
                          type="submit"
                          className="bg-[#a08452] hover:bg-[#8c703d] text-white px-8"
                        >
                          Submit
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mb-16">
          <h2 className="text-2xl font-medium mb-8">Related Products</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <div key={product.id} className="group">
                <Link href={`/shop/product/${product.id}`}>
                  <div className="aspect-[3/4] relative overflow-hidden bg-gray-100 rounded-md mb-3">
                    <Image
                      src={product?.image || "/placeholder.svg"}
                      alt={product?.name ? product.name :"image"}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-sm font-medium">{product.name}</h3>
                  <p className="text-[#a08452] text-sm font-medium mt-1">
                    ₹{product.price.toFixed(2)}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="py-10 border-t border-b">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <Package className="h-10 w-10 mb-3 text-[#a08452]" />
              <h3 className="font-medium text-base mb-1">Free Shipping</h3>
              <p className="text-sm text-gray-600">
                Free shipping for order above $150
              </p>
            </div>
            <div className="flex flex-col items-center">
              <RefreshCw className="h-10 w-10 mb-3 text-[#a08452]" />
              <h3 className="font-medium text-base mb-1">Money Guarantee</h3>
              <p className="text-sm text-gray-600">
                Within 30 days for an exchange
              </p>
            </div>
            <div className="flex flex-col items-center">
              <HeadphonesIcon className="h-10 w-10 mb-3 text-[#a08452]" />
              <h3 className="font-medium text-base mb-1">Online Support</h3>
              <p className="text-sm text-gray-600">
                24 hours a day, 7 days a week
              </p>
            </div>
            <div className="flex flex-col items-center">
              <CreditCard className="h-10 w-10 mb-3 text-[#a08452]" />
              <h3 className="font-medium text-base mb-1">Flexible Payment</h3>
              <p className="text-sm text-gray-600">
                Pay with multiple credit cards
              </p>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}
