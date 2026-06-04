"use client";

import { useState, useEffect } from "react";
import { Lock, ArrowLeft, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/api/hooks/useAuth";
import OrderService from "@/services/OrderService";

interface ProductPaymentProps {
  initialOrderData: any;
}

const ProductPaymentView: React.FC<ProductPaymentProps> = ({
  initialOrderData,
}) => {
  const { user, token } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPaymentType, setSelectedPaymentType] = useState<
    "upfront" | "remaining" | "full"
  >("full");
  const [orderData, setOrderData] = useState<any>(null);
  const [bookingLocation, setBookingLocation] = useState<any>(null);

  // Load product data passed from parent router state hook
  console.log("data", initialOrderData)
  const {
    originalPrice,
    platformChargeAmount,
    priceAfterDiscount,
    finalPrice,
    upfrontPaymentAmount,
    upfrontPaymentPercentage,
    remainingBalance,
  } = initialOrderData.product.pricing;
  useEffect(() => {
    if (initialOrderData) {
      setOrderData({
        productId: initialOrderData.productId,
        productName: initialOrderData.productName || initialOrderData.name,
        productPrice: initialOrderData.productPrice || initialOrderData.price,
        upfrontPayment:
          initialOrderData.upfrontPayment || initialOrderData.price * 0.1,
        organizationId: initialOrderData.organizationId || "",
        organizationName:
          initialOrderData.organizationName || "Service Provider",
        customerEmail: "",
        customerName: "",
        customerPhone: "",
        upfrontPercentage: initialOrderData.upfrontPercentage || 10,
        itemType: "product",
      });
      if (initialOrderData.bookingLocation) {
        setBookingLocation(initialOrderData.bookingLocation);
      }
    }
  }, [initialOrderData]);

  // Fill customer info from user once profile authentication loads
  useEffect(() => {
    if (user && orderData) {
      setOrderData((prev: any) => ({
        ...prev,
        customerEmail: (user as any).email || "",
        customerName: (user as any).fullName || "",
        customerPhone: (user as any).phoneNumber || "",
      }));
    }
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5d2a8b] mx-auto mb-4"></div>
          <p className="text-gray-600">
            {error || "Loading payment information..."}
          </p>
          {error && (
            <button
              onClick={() => router.back()}
              className="mt-4 text-[#5d2a8b] underline text-sm"
            >
              Go back
            </button>
          )}
        </div>
      </div>
    );
  }

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(n);

  const handleInitiatePayment = async () => {
    setLoading(true);
    setError(null);
    try {
      if (
        !orderData.productId ||
        !orderData.organizationId ||
        !orderData.customerEmail ||
        !orderData.customerName
      ) {
        setError(
          "Missing required information. Please ensure you are logged in.",
        );
        return;
      }

      const paymentData = {
        productId: orderData.productId,
        productName: orderData.productName,
        organizationId: orderData.organizationId,
        organizationName: orderData.organizationName,
        productPrice: orderData.productPrice,
        upfrontPercentage: orderData.upfrontPercentage,
        userId: (user as any)?.id,
        customerEmail: orderData.customerEmail,
        customerName: orderData.customerName,
        customerPhone: orderData.customerPhone || "",
        paymentType: selectedPaymentType,
        itemType: "product" as const,
        platform: "web" as const,
        bookingLocation: bookingLocation || { type: "merchant_location" },
        redirectUrl: `${window.location.origin}/user/payment/callback`,
      };

      const response = await OrderService.initiatePayment(
        paymentData,
        token || undefined,
      );
      if (response.success) {
        window.location.href = response.data.link;
      } else {
        setError(response.message || "Failed to initiate payment");
      }
    } catch (err: any) {
      setError(err.message || "Failed to process payment");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="ml-0 md:ml-[350px] pt-8 p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border-2 border-[#5d2a8b]">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#5d2a8b] to-[#7a3aa3] p-6 text-white flex items-center justify-between">
              <button
                onClick={() => router.back()}
                className="flex items-center text-white hover:text-gray-300 transition-colors hover:cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5 mr-2" /> Back
              </button>
              <h1 className="text-2xl font-bold">Payment</h1>
              <div className="w-16" />
            </div>

            <div className="p-6 space-y-6">
              {/* ── Payment type options array list ── */}
              <div className="border-2 border-gray-100 rounded-xl p-5">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-7 h-7 bg-[#5d2a8b] text-white rounded-full flex items-center justify-center text-xs">
                    1
                  </span>
                  Choose payment option
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      value: "upfront" as const,
                      label: "Upfront Payment",
                      desc: `Pay ${upfrontPaymentPercentage}% upfront (${fmt(orderData.upfrontPayment)})`,
                    },
                    {
                      value: "remaining" as const,
                      label: "Remaining Balance",
                      desc: `Pay remaining balance (${fmt(orderData.productPrice - orderData.upfrontPayment)})`,
                    },
                    {
                      value: "full" as const,
                      label: "Full Payment",
                      desc: `Pay full amount (${fmt(orderData.productPrice)})`,
                    },
                  ].map((opt) => (
                    <label
                      key={opt.value}
                      className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        selectedPaymentType === opt.value
                          ? "border-[#5d2a8b] bg-purple-50"
                          : "border-gray-200 hover:border-[#5d2a8b]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentType"
                        value={opt.value}
                        checked={selectedPaymentType === opt.value}
                        onChange={(e) =>
                          setSelectedPaymentType(e.target.value as any)
                        }
                        className="h-4 w-4 text-[#5d2a8b] focus:ring-[#5d2a8b]"
                      />
                      <div className="ml-3">
                        <div className="font-medium text-gray-900 text-sm">
                          {opt.label}
                        </div>
                        <div className="text-xs text-gray-500">{opt.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* ── Error Display ── */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-red-700">
                    <p className="font-medium">Error</p>
                    <p>{error}</p>
                  </div>
                </div>
              )}

              {/* ── Secure transaction fallback validation notice ── */}
              <div className="p-4 bg-gray-50 rounded-lg flex items-start gap-3">
                <Lock className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900 text-sm">
                    Secure Payment via Flutterwave
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    You will be redirected to complete payment securely.
                  </p>
                </div>
              </div>

              {/* ── Submit Execution Link Action ── */}
              <button
                onClick={handleInitiatePayment}
                disabled={loading || !orderData}
                className={`w-full py-3 rounded-lg font-semibold transition-colors text-sm ${
                  loading
                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                    : "bg-[#5d2a8b] text-white hover:bg-[#7a3aa3]"
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                    Processing...
                  </span>
                ) : (
                  `Pay ${selectedPaymentType === "upfront" ? "Upfront" : selectedPaymentType === "remaining" ? "Remaining" : "Full"} Amount`
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPaymentView;
