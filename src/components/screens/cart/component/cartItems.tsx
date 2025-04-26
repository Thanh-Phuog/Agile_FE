import { Button, InputNumber } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { BookModel } from "@/api/features/authenticate/book/BookModel";

interface CartItemProps {
  item: BookModel & { quantity: number };
  onRemove: (id: string) => void;
  onChangeQuantity: (id: string, qty: number) => void;
}

const CartItem = ({ item, onRemove, onChangeQuantity }: CartItemProps) => {
  return (
    <div className="flex items-center p-4 border-b">
      <img
        src={item.imageUrl}
        alt={item.title}
        className="w-24 h-32 object-cover rounded-md"
      />
      <div className="ml-4 flex-1">
        <h3 className="text-lg font-semibold">{item.title}</h3>
        <p className="text-gray-600 text-sm">{item.author}</p>
        <p className="text-indigo-600 font-bold">${item.price}</p>
        <div className="flex items-center mt-2">
  <span className="mr-2">Số lượng:</span>
  <InputNumber
    min={1}
    value={item.quantity}
    controls={true}
    onChange={(value) => onChangeQuantity(item.id!, value as number)}
    className="w-24"
  />
</div>

      </div>
      <Button
        type="text"
        icon={<DeleteOutlined />}
        danger
        onClick={() => onRemove(item.id!)}
      />
    </div>
  );
};

export default CartItem;
