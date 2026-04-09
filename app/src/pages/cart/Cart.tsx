import { Link } from "react-router-dom";
import {
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
  ArrowLeft,
  BookOpen,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/lib/store/cart";
import { formatPrice } from "@/utils/helper";

export default function Cart() {
  const {
    items,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    getTotalItems,
    getTotalPrice,
  } = useCartStore();

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
  const cartCurrency = items[0]?.book.currency_code || "ZAR";

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <div className="flex-col px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-0">
            <Link
              to="/books"
              className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Continue shopping
            </Link>
          </div>

          <div className="flex min-h-[65vh] items-center justify-center">
            <Card className="w-full border-border/70 shadow-sm">
              <CardContent className="flex flex-col items-center justify-center px-6 py-14 text-center">
                <div className="bg-muted mb-5 rounded-full p-4">
                  <ShoppingCart className="text-muted-foreground h-8 w-8" />
                </div>

                <h1 className="mb-2 text-2xl font-semibold tracking-tight">
                  Your cart is empty
                </h1>
                <p className="text-muted-foreground mb-6 max-w-md text-sm sm:text-base">
                  Looks like you have not added any books yet. Browse the
                  collection and add something you would like to read.
                </p>

                <Button asChild size="lg" className="rounded-xl px-6 mt-4">
                  <Link to="/books">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Browse books
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Button asChild variant="ghost" className="mb-3">
              <Link to="/books" className="inline-flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Continue shopping
              </Link>
            </Button>

            <h1 className="text-3xl font-semibold tracking-tight">Your cart</h1>
            <p className="text-muted-foreground mt-2">
              {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
            </p>
          </div>

          <Button
            variant="outline"
            onClick={clearCart}
            className="rounded-xl sm:w-auto"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Clear cart
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_400px]">
          <div className="space-y-4">
            {items.map((item) => {
              const { book, quantity } = item;
              const unitPrice = book.price ?? 0;
              const subtotal = unitPrice * quantity;

              return (
                <Card
                  key={book.ID}
                  className="overflow-hidden rounded-2xl border-border/70 shadow-sm"
                >
                  <CardContent className="p-4 sm:p-5">
                    <div className="flex flex-col gap-4 sm:flex-row">
                      <div className="bg-muted flex h-32 w-full shrink-0 items-center justify-center overflow-hidden rounded-xl sm:w-24">
                        {book.imageUrl ? (
                          <img
                            src={book.imageUrl}
                            alt={book.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <BookOpen className="text-muted-foreground h-8 w-8" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div className="min-w-0">
                            <h2 className="truncate text-lg font-semibold">
                              {book.title}
                            </h2>

                            <div className="text-muted-foreground mt-1 flex flex-wrap items-center gap-2 text-sm">
                              <span>{book.author}</span>
                              {book.genre ? (
                                <>
                                  <span>•</span>
                                  <span>{book.genre}</span>
                                </>
                              ) : null}
                            </div>

                            <div className="mt-3 flex flex-wrap items-center gap-2">
                              {book.type ? (
                                <Badge
                                  variant="secondary"
                                  className="rounded-md"
                                >
                                  {book.type}
                                </Badge>
                              ) : null}

                              <Badge
                                variant={
                                  book.stock > 0 ? "outline" : "destructive"
                                }
                                className="rounded-md"
                              >
                                {book.stock > 0
                                  ? `${book.stock} in stock`
                                  : "Out of stock"}
                              </Badge>
                            </div>
                          </div>

                          <div className="text-left sm:text-right">
                            <p className="text-base font-semibold">
                              {formatPrice(subtotal, book.currency_code)}
                            </p>
                            <p className="text-muted-foreground text-sm">
                              {formatPrice(unitPrice, book.currency_code)} each
                            </p>
                          </div>
                        </div>

                        <Separator className="my-4" />

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex w-fit items-center rounded-xl border">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="rounded-r-none"
                              onClick={() => decreaseQuantity(book.ID)}
                              aria-label={`Decrease quantity of ${book.title}`}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>

                            <div className="flex h-10 min-w-12 items-center justify-center px-3 text-sm font-medium">
                              {quantity}
                            </div>

                            <Button
                              variant="ghost"
                              size="icon"
                              className="rounded-l-none"
                              onClick={() => increaseQuantity(book.ID)}
                              disabled={quantity >= book.stock}
                              aria-label={`Increase quantity of ${book.title}`}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>

                          <Button
                            variant="ghost"
                            onClick={() => removeFromCart(book.ID)}
                            className="text-muted-foreground hover:text-destructive w-fit px-0 sm:px-3"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="lg:sticky lg:top-6 lg:self-start">
            <Card className="rounded-2xl border-border/70 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">Order summary</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Items</span>
                  <span>{totalItems}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(totalPrice, cartCurrency)}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Delivery</span>
                  <span>Calculated at checkout</span>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <span className="text-base font-medium">Total</span>
                  <span className="text-xl font-semibold">
                    {formatPrice(totalPrice, cartCurrency)}
                  </span>
                </div>

                <p className="text-muted-foreground text-xs leading-relaxed">
                  Taxes, shipping fees, and any discounts will be applied during
                  checkout.
                </p>
              </CardContent>

              <CardFooter className="flex flex-col gap-3">
                <Button className="w-full rounded-xl" size="lg">
                  Buy Now
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-xl"
                  size="lg"
                >
                  <Link to="/books">Continue shopping</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
