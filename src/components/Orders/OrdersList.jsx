import { FaCheck } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { HiClock } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { formattedDate } from "../../utils/dateFormatter";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OrdersList = ({ orders }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(orders);

  return (
    <>
      <table className="w-full">
        <thead>
          <tr className="grid grid-cols-7 gap-x-6 rounded-t-md border-b px-6 py-2">
            <th className="text-left text-sm font-medium uppercase">Date</th>
            <th className="text-left text-sm font-medium uppercase">Orders</th>
            <th className="text-left text-sm font-medium uppercase">
              Partners
            </th>
            <th className="text-left text-sm font-medium uppercase">
             Total Price
            </th>
            <th className="text-left text-sm font-medium uppercase">
              Quantity
            </th>
            <th className="text-left text-sm font-medium uppercase">Payment</th>
            <th className="text-left text-sm font-medium uppercase">
              Delivery
            </th>
          </tr>
        </thead>
        <tbody className="flex flex-col w-full">
          {orders.map((order) => {
            const { _id, service, status, createdAt, paymentId } = order;

            // Calculate total price
            // const totalPrice = service.reduce(
            //   (acc, item) => acc + item.qty * item.price,
            //   0
            // );

            return service.map((item, index) => (
              <tr
                key={item._id}
                className={`grid grid-cols-7 gap-x-6 border-b px-6 py-4 ${
                  index === 0 ? "mt-2" : ""
                }`}
              >
                <td rowSpan={service.length} className="text-sm">
                  {formattedDate(createdAt)}
                </td>

                <td className="text-sm">
                  <span>{item.serviceId.serviceName}</span>
                  <span className="block text-xs text-gray-500">
                    ID: {item.serviceId._id}
                  </span>
                </td>
                <td className="text-sm">{item.serviceId.serviceName}</td>

                <td rowSpan={service.length} className="text-sm font-medium">
                  ₹ {item.qty * item.price}
                </td>
                <td rowSpan={service.length} className="text-sm font-medium">
                  {item.qty}
                </td>
                <td rowSpan={service.length} className="text-sm font-medium">
                  {paymentId ? "Paid" : "Unpaid"}
                </td>
                <td rowSpan={service.length} className="text-sm font-medium">
                  {status.status}
                </td>
              </tr>
            ));
          })}
        </tbody>
      </table>
    </>
  );
};

export default OrdersList;
