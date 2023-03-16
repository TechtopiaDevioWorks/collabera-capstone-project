import { Moment } from 'moment';
import { MinUser } from './user';

export interface NewTraining {
  name: string;
  description: string;
  start: string;
  end: string;
  min_hours: number;
}

export interface MinTraining {
  id: number;
  title: string;
  description: string;
  startDate: Moment;
  endDate: Moment;
  duration: number;
  status:Status;
  noapplicants?: number;
}

export interface Training extends MinTraining {
  applicants: TrainingApplicant[];
}

export interface TrainingApplicant {
  user: MinUser;
  status: Status;
}

export interface Status {
  id: number;
  name: string;
}

export interface TrainingFilter {
  minDate?: Moment | null;
  maxDate?: Moment | null;
  applicants?: true | null;
  [key: string]: any;
}

export interface TrainingRegistrationMax {
  id: number;
  status: Status;
  training: MinTraining;
  user: MinUser;
  registration_date: Moment;
}

export interface TrainingRegistrationMin {
  id: number;
  status_id: number;
  training_id: number;
  user_id: number;
  registration_date: Moment;
}