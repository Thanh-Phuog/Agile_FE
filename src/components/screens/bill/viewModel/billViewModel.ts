import { useState, useEffect } from 'react';
import { message } from 'antd';
import { BillRepo } from '@/api/features/bill/BillRepo';
import { Bill, CreateBillRequest } from '@/api/features/bill/model/BillModel';

const useBillViewModel = () => {
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(false);

  const billRepo = new BillRepo();

  const fetchUserBills = async () => {
    setLoading(true);
    try {
      const response = await billRepo.getUserBills();
      setBills(response.data || []);
    } catch (error) {
      message.error('Không thể tải danh sách đơn hàng!');
    } finally {
      setLoading(false);
    }
  };


  const payment = async (cartItems: CreateBillRequest) => {
    setLoading(true);
    try {
      const response = await billRepo.create(cartItems);
      if (response.error) {
      message.error(response.error.message || "Không thể tạo đơn hàng!");
      return false;
    } else {
      message.success("Đơn hàng đã được tạo thành công!");
      return true;
    }
  } catch (error) {
    message.error("Lỗi hệ thống khi tạo đơn hàng!");
    return false;
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUserBills();
  }, []);

  return {
    bills,
    loading,
    fetchUserBills,
    payment,
  };
};

export default useBillViewModel;