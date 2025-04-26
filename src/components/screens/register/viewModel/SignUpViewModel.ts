import { AuthenRepo } from "@/api/features/authenticate/AuthenRepo";
import { RegisterRequestModel } from "@/api/features/authenticate/model/RegisterModel";
import { useAuth } from "@/context/auth/useAuth";
import { message } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignUpViewModel = (repo: AuthenRepo) => {
    const {onSignUp} = useAuth();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleSignUp = async (data: RegisterRequestModel) => {
        try {
            console.log("data", data);

            setIsLoading(true);
            const response = await repo.register({
                name: data.name,
                email: data.email,
                phone: data.phone,
                address: data.address,
                password: data.password,
            });

            if (response && !response.error) {
                message.success("Đăng ký thành công!");
                onSignUp(response);
            } else {
                if(response.error.code === 400) {
                    message.error("Email đã tồn tại!");
                }
                if(response.error.code === 500) {
                    message.error("Đã xảy ra lỗi trong quá trình đăng ký!");
                }
                message.error("Đăng ký thất bại!");
            }
            return response;
        } catch (error) {
            console.error("Error during sign up:", error);
            message.error("Đã xảy ra lỗi trong quá trình đăng ký!");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        handleSignUp,
    };
};

export default SignUpViewModel;
