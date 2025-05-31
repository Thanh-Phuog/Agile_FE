import { UserResponse, UserRequest, UserUpdateRequest } from "@/api/features/user/model/UserModel";
import { userRepo } from "@/api/features/user/UserRepo";
import { FormInstance, message } from "antd";
import { useState, useEffect } from "react";

const useUserManagementViewModel = (form: FormInstance) => {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<UserResponse | null>(null);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalUsers, setTotalUsers] = useState(0);

  const fetchUsers = async (page = 1, limit = pageSize) => {
    setLoadingUsers(true);
    try {
      const response = await userRepo.getUsers({ page, limit });
      setUsers(response.data || []);
      setCurrentPage(page);
      setTotalUsers(response.paging?.total || 0);
    } catch (error) {
      message.error("Không thể tải danh sách người dùng!");
      console.error("Error fetching users:", error);
    } finally {
      setLoadingUsers(false);
    }
  };

  const handlePageChange = (page: number, newPageSize: number) => {
    if (page > 0) {
      if (newPageSize !== pageSize) {
        setPageSize(newPageSize);
      }
      fetchUsers(page, newPageSize);
    }
  };

  const showAddUserModal = () => {
    setEditingUser(null);
    form.resetFields(); // reset form trắng khi thêm user mới
    setIsUserModalVisible(true);
  };

  const showEditUserModal = async (user: UserResponse) => {
    try {
      const response = await userRepo.getUsers({ email: user.email, page: 1, limit: 1 });
      if (response.data && response.data.length > 0) {
        setEditingUser(response.data[0]);
        form.setFieldsValue({
          name: response.data[0].name,
          email: response.data[0].email,
          role: response.data[0].role,
          phone: response.data[0].phone,
          address: response.data[0].address,
          status: response.data[0].status,
        });
        setIsUserModalVisible(true);
      }
    } catch (error) {
      message.error("Không thể tải chi tiết người dùng.");
      console.error("Error fetching user details:", error);
    }
  };

  const handleUserModalClose = () => {
    setIsUserModalVisible(false);
    setEditingUser(null);
    form.resetFields();
  };

const handleAddOrUpdateUser = async (values: Partial<UserRequest & UserUpdateRequest>) => {
  try {
    let response;
    if (editingUser) {
      // Update user
      const updateData: UserUpdateRequest = {
        name: values.name,
        email: values.email,
        role: values.role,
        phone: values.phone,
        address: values.address,
        status: values.status,
      };
      response = await userRepo.updateUser(editingUser.id, updateData);
    } else {
      // Create new user
      const createData: UserRequest = {
        name: values.name,
        email: values.email,
        role: values.role,
        phone: values.phone,
        address: values.address,
        password: values.password,
      };
      response = await userRepo.createUser(createData);
    }
    

    // ✅ Kiểm tra response thành công hay không
    if (!response.error) {
      message.success(editingUser ? "Cập nhật người dùng thành công!" : "Thêm người dùng mới thành công!");
      fetchUsers(currentPage, pageSize);
      handleUserModalClose();
    } else {
      message.error(response?.message || "Thao tác thất bại!");
      message.error(editingUser ? "Cập nhật người dùng thất bại!" : "Thêm người dùng mới thất bại!");
    }
  } catch (error: any) {
    message.error(error?.response?.data?.message || "Lỗi máy chủ!");
    console.error("Error adding/updating user:", error);
  }
};


  useEffect(() => {
    fetchUsers(currentPage, pageSize);
  }, []);

  return {
    users,
    isUserModalVisible,
    editingUser,
    loadingUsers,
    currentPage,
    pageSize,
    totalUsers,
    fetchUsers,
    handlePageChange,
    showAddUserModal,
    showEditUserModal,
    handleUserModalClose,
    handleAddOrUpdateUser,
  };
};

export default useUserManagementViewModel;
