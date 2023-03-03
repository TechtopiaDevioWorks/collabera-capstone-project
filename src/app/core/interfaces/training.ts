import { Moment } from "moment";
import { MinUser } from "./user";

export interface MinTraining {
    title: string;
    description: string;
    startDate: Moment;
    endDate: Moment;
    duration: number;
}

export interface Training extends MinTraining {
    applicants: TrainingApplicant[];
}

export interface TrainingApplicant {
    user: MinUser;
    state: 'applied'|'approved'|'rejected'|'canceled'|'cancel-pending';
}

export interface TrainingFilter {
    minDate?: Moment|null;
    maxDate?: Moment|null;
    applicants?: true|null;
    [key: string]: any;
}