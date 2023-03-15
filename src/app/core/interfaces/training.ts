import { Moment } from 'moment';
import { MinUser } from './user';

export interface MinTraining {
  id: number;
  title: string;
  description: string;
  startDate: Moment;
  endDate: Moment;
  duration: number;
  status:Status;
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