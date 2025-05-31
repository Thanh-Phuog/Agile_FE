export interface UserRequest {
    name?: string;
    email?: string;
    password?: string;
    phone?: string;
    role?: 'user' | 'admin';
    address?: string;
}

export interface UserUpdateRequest {
    name?: string;
    phone?: string;
    email?: string;
    address?: string;
    role?: 'user' | 'admin';
    status?: 'active' | 'inactive';
}

export interface UserResponse {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
    phone?: string;
    address?: string;
    status: 'active' | 'inactive';
    createdAt: string;
    updatedAt: string;
}