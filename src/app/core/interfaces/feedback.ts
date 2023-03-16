import { MinTraining, TrainingRegistrationMin } from "./training";
import { MinUser } from "./user";

export interface Feedback {
    id: number;
    feedbackType: FeedbackType;
    fromUser: MinUser;
    toUser?: MinUser;
    toTraining?: MinTraining;
    toTrainingRegistration?: TrainingRegistrationMin;
    message: string;
}

export interface FeedbackType {
    id: number;
    name: string;
}