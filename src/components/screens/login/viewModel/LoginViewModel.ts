import { AuthenRepo } from "@/api/features/authenticate/AuthenRepo";
import { LoginRequestModel } from "@/api/features/authenticate/model/LoginModel";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/context/auth/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import { ApiPath } from "@/api/ApiPath";

interface LoginObserver {
  onLoginStateChanged: (isLoading: boolean, error?: string) => void;
  onLoginSuccess: (data: any) => void;
}

const LoginViewModel = (repo: AuthenRepo) => {
  const { onLogin } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false); 
  const [observers] = useState<LoginObserver[]>([]);

  const addObserver = (observer: LoginObserver) => observers.push(observer);
  const removeObserver = (observer: LoginObserver) => {
    const index = observers.indexOf(observer);
    if (index !== -1) observers.splice(index, 1);
  };

  const notifyLoading = (isLoading: boolean, error?: string) =>
    observers.forEach((observer) => observer.onLoginStateChanged(isLoading, error));
  const notifySuccess = (data: any) =>
    observers.forEach((observer) => observer.onLoginSuccess(data));

  const code = useMemo(() => searchParams.get("code"), [searchParams]);
  const error = useMemo(() => searchParams.get("error"), [searchParams]);

  const login = async (data: LoginRequestModel) => {
    try {
      setLoading(true);
      notifyLoading(true);
      const res = await repo.login(data);
  
      if (res && !res.error) {
        notifyLoading(false);
        notifySuccess(res);
        onLogin(res);
      } else {
        notifyLoading(false, "Sai tài khoản hoặc mật khẩu!");
      }
    } catch (error: any) { 
      notifyLoading(false, "Lỗi đăng nhập, vui lòng thử lại sau!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      notifyLoading(false,"Lỗi đăng nhập, vui lòng thử lại sau!");
    }
  }, [error]);

  return { login, loading, addObserver, removeObserver };
};

export default LoginViewModel;