import { useState, useEffect } from 'react';
import { message } from 'antd';
import { BillRepo } from '@/api/features/bill/BillRepo';
import { Bill } from '@/api/features/bill/model/BillModel';

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

  useEffect(() => {
    fetchUserBills();
  }, []);

  return {
    bills,
    loading,
    fetchUserBills,
  };
};

export default useBillViewModel;