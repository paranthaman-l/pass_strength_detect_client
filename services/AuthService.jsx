import axios from "axios";

import { authApi } from '@/apis/axios'

class AuthService {
    login(login) {
        return authApi.post("/login",login);
    }
    sendOTPtoEmail(signup) {
        return authApi.post("/sendOTP/email", { email: signup.email });
    }
    signUp(signUp) {
        return authApi.post("/signup",signUp);
    }

    checkPasswordStrength(password){
        return axios.post("http://44.210.122.128:1612/predict",{user_password:password});
    }
}

export default new AuthService();