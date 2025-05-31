import { useState, useEffect } from 'react';
import { BillRepo } from '@/api/features/bill/BillRepo';
import { Bill, BillStatus } from '@/api/features/bill/model/BillModel';
import { message } from 'antd';

const useBillManagementViewModel = () => {
  const [bills, setBills] = useState<Bill[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const billRepo = new BillRepo();

  const fetchBills = async (page = 1, limit = pageSize) => {
    setLoading(true);
    try {
      const response = await billRepo.getAll({ page, limit });
      setBills(response.data || []);
      setCurrentPage(page);
      // setTotal(response.data.total || 0);
    } catch (error) {
      message.error('Không thể tải danh sách đơn hàng!');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number, newPageSize: number) => {
    if (page > 0) {
      if (newPageSize !== pageSize) {
        setPageSize(newPageSize);
      }
      fetchBills(page, newPageSize);
    }
  };

  const handleStatusChange = async (id: string, status: BillStatus) => {
    try {
      await billRepo.updateStatus(id, { status });
      message.success('Cập nhật trạng thái đơn hàng thành công!');
      fetchBills(currentPage, pageSize);
    } catch (error) {
      message.error('Không thể cập nhật trạng thái đơn hàng!');
    }
  };

  return {
    bills,
    currentPage,
    pageSize,
    total,
    loading,
    handleStatusChange,
    handlePageChange,
    fetchBills,
  };
};

export default useBillManagementViewModel;