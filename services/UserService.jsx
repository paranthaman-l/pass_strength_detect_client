import { userApi } from "@/apis/axios";

class UserService {
    getUser(uid) {
        return userApi.get(`/getUser?uid=${uid}`);
    }    

    getFeedbacks(uid){
        return userApi.get(`/feedbacks?uid=${uid}`);
    }
}

export default new UserService();