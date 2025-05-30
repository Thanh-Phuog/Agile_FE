'use client';
import React, { useEffect } from 'react';
import { Divider } from 'antd';
import BillsTable from '../components/BillsTable';
import useBillManagementViewModel from '../viewModel/billManagement';

const BillManagement: React.FC = () => {
  const {
    bills,
    currentPage,
    pageSize,
    total,
    handleStatusChange,
    handlePageChange,
    fetchBills
  } = useBillManagementViewModel();

  useEffect(() => {
    // Fetch bills when the component mounts
    fetchBills(currentPage, pageSize);
  }
  , []);

  console.log('bills', bills);
  
  return (
    <div className="p-4 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Quản lý đơn hàng</h1>
      </div>
      <Divider />
      <BillsTable
        bills={bills}
        handleStatusChange={handleStatusChange}
        currentPage={currentPage}
        pageSize={pageSize}
        total={total}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default BillManagement;