import { feedBackApi } from "@/apis/axios";

class FeedBackService {
    postFeedBack(feedback) {
        return feedBackApi.post(``,feedback);
    }    
}

export default new FeedBackService();