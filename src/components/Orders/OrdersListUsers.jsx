import { FaCheck } from "react-icons/fa";
import { formattedDate } from "../../utils/dateFormatter";
import { HiClock } from "react-icons/hi";

const OrdersListUsers = ({ orders }) => {
  console.log(orders);

  return (
    <>
      <table className="w-full">
        <thead>
          <tr className="flex gap-x-10 rounded-t-md border-b px-6 py-2">
            <th className="flex-1 text-left text-sm font-medium uppercase ">
              orders
            </th>
            <th className="text-left text-sm font-medium uppercase ">
              Total Price
            </th>
          </tr>
        </thead>

        <tbody className="flex flex-col w-full">
          {orders.map((order) => {
            const { _id, services, status, createdAt, paymentId } = order;

            return services.map((item, index) => (
              <tr key={item._id} className="flex gap-x-10 border-b px-6 py-2">
                <td className="flex flex-1 gap-x-4">
                  <img
                    src={item.thumbnail}
                    alt="thumbnail"
                    className="h-20 w-20 rounded-lg object-cover"
                  />
                  <div className="flex flex-col justify-between">
                    <p className="text-lg font-semibold">{item.serviceName}</p>
                    {/* <p className="text-xs"> | {item.serviceDescription}</p>
                    <p className="text-xs"> | Price: ₹{item.price}</p>
                    <p className="text-xs"> | Quantity: {item.qty}</p> */}
                    <p className="text-[12px]">
                      Placed on: {formattedDate(createdAt)}
                    </p>
                    {status.status === "placed" ? (
                      <p className="flex w-fit flex-row items-center gap-2 rounded-full px-2 py-[2px] text-[12px] font-medium text-green-500">
                        <FaCheck size={8} />
                        {status.status}
                      </p>
                    ) : (
                      <p className="flex w-fit flex-row items-center gap-2 rounded-full-700 px-2 py-[2px] text-[12px] font-medium text-[#0C7FDA]">
                        <div className="flex h-3 w-3 items-center justify-center rounded-full bg-[#E9F5FE]">
                          <FaCheck size={8} />
                        </div>
                        Published
                      </p>
                    )}
                  </div>
                </td>
                <td className="text-sm font-medium">
                  ₹ {item.qty * item.price}
                </td>
              </tr>
            ));
          })}
        </tbody>
      </table>
    </>
  );
};

export default OrdersListUsers;
