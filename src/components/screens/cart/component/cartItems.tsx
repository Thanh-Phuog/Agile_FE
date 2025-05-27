import { Button, Checkbox, InputNumber } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { BookModel } from "@/api/features/book/model/BookModel";

interface CartItemProps {
  item: BookModel & { quantity: number };
  onRemove: (id: string) => void;
  onChangeQuantity: (id: string, qty: number) => void;
  checked: boolean;
  onCheckChange: (id: string, checked: boolean) => void;
}


const CartItem = ({ item, onRemove, onChangeQuantity, checked, onCheckChange }: CartItemProps) => {
  return (
    <div className="flex items-center p-4 border-b">
      <Checkbox
        checked={checked}
        onChange={e => onCheckChange(item.id!, e.target.checked)}
        className="mr-4"
      />
      <img
        src={item.images[0]}
        alt={item.name}
        className="w-24 h-32 object-cover rounded-md"
      />
      <div className="ml-4 flex-1">
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <p className="text-gray-600 text-sm">{item.author}</p>
        <p className="text-indigo-600 font-bold">{item.price.toLocaleString()} đ</p>
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
