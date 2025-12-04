import { DeliveryAddress } from "@/features/checkout/DeliveryAddress";
import { ShippingMethod } from "@/features/checkout/ShippingMethod";
import { OrderSummary } from "@/features/checkout/OrderSummary";
import { PaymentMethods } from "@/features/checkout/PaymentMethods";
import { AutoBreadcrumb } from "@/components/AutoBreadcrumb";

export default function CheckoutPage() {
  return (
    <div className="w-screen relative left-1/2 right-1/2 top-0 -mx-[50vw]">
      <div className="flex items-start -mt-4 -mb-4 h-full ">
        <div className="w-1/2 space-y-6 bg-white p-10 px-[7vw]">
          <AutoBreadcrumb />
          <DeliveryAddress />
          <ShippingMethod />
          <PaymentMethods />
        </div>
        <div className="w-1/2 space-y-2 p-10 px-[7vw] md:sticky md:top-6">
        <OrderSummary />          
        </div>
      </div>
    </div>
  );
}
