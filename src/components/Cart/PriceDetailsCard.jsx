import { useSelector } from "react-redux";

const PriceDetailsCard = () => {
  const { totalQty, totalCost } = useSelector((state) => state.cart);

  return (
    <div className="flex flex-col w-[40%] max-lg:w-full sticky top-10 max-h-96">
      <div className="max-lg:w-full shadow-custom-shadow p-4 rounded-lg h-fit">
        <h1 className="text-gray-500 border-b">PRICE DETAILS</h1>

        <div className="flex w-full justify-between">
          <span>Price ({totalQty} item)</span>
          <span>₹ {totalCost}</span>
        </div>

        {/* <div className="flex w-full justify-between">
              <span>Discount</span>
              <span>₹ 2000</span>
            </div> */}

        {/* <div className="flex w-full justify-between">
              <span>Delivery Charges</span>
              <span>₹ 2000</span>
            </div> */}

        <div className="flex w-full justify-between mt-2 border-t">
          <span className="text-xl font-bold">Total Amount</span>
          <span className="text-xl font-bold">₹ {totalCost.toFixed(2)}</span>
        </div>
      </div>

      <span className="my-4 p-4 text-gray-600">
        Safe and Secure Payments. Easy returns. 100% Authentic products.
      </span>
    </div>
  );
};

export default PriceDetailsCard;
