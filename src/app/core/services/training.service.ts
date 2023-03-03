import { Injectable } from '@angular/core';
import {
  MinTraining,
  Training,
  TrainingFilter,
} from '@core/interfaces/training';
import * as moment from 'moment';
import { Moment } from 'moment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  dummyTrainingList: Training[] = [
    {
      id: 0,
      title: 'Introduction to JavaScript',
      description: 'Learn the basics of JavaScript programming language.',
      startDate: moment('2023-05-01T10:00:00Z'),
      endDate: moment('2023-05-05T15:30:00Z'),
      duration: 30,
      applicants: [],
    },
    {
      id: 1,
      title: 'Advanced React Techniques',
      description: 'Learn advanced techniques for building React applications.',
      startDate: moment('2023-06-01T09:00:00Z'),
      endDate: moment('2023-06-03T12:00:00Z'),
      duration: 15,
      applicants: [],
    },
    {
      id: 2,
      title: 'Machine Learning Fundamentals',
      description:
        'Learn the basics of machine learning and how to apply it to real-world problems.',
      startDate: moment('2023-07-01T13:00:00Z'),
      endDate: moment('2023-07-07T16:30:00Z'),
      duration: 35,
      applicants: [],
    },
    {
      id: 3,
      title: 'Python for Data Science',
      description: 'Learn how to use Python to analyze and visualize data.',
      startDate: moment('2023-08-01T09:00:00Z'),
      endDate: moment('2023-08-05T12:30:00Z'),
      duration: 25,
      applicants: [],
    },
    {
      id: 4,
      title: 'Web Development with Node.js',
      description:
        'Learn how to build web applications using Node.js and related technologies.',
      startDate: moment('2023-09-01T11:00:00Z'),
      endDate: moment('2023-09-03T14:00:00Z'),
      duration: 12,
      applicants: [],
    },
    {
      id: 5,
      title: 'Introduction to Cloud Computing',
      description:
        'Learn the basics of cloud computing and how to use cloud services like AWS and Azure.',
      startDate: moment('2023-10-01T13:00:00Z'),
      endDate: moment('2023-10-07T16:30:00Z'),
      duration: 35,
      applicants: [],
    },
    {
      id: 6,
      title: 'Android App Development',
      description:
        'Learn how to develop Android apps using Java and Android Studio.',
      startDate: moment('2023-11-01T10:00:00Z'),
      endDate: moment('2023-11-05T15:30:00Z'),
      duration: 30,
      applicants: [],
    },
    {
      id: 7,
      title: 'Agile Project Management',
      description:
        'Learn the basics of agile project management and how to use agile methodologies like Scrum and Kanban.',
      startDate: moment('2022-12-01T09:00:00Z'),
      endDate: moment('2022-12-03T12:00:00Z'),
      duration: 15,
      applicants: [],
    },
    {
      id: 8,
      title: 'Data Structures and Algorithms',
      description:
        'Learn about fundamental data structures and algorithms used in computer science.',
      startDate: moment('2023-01-01T09:00:00Z'),
      endDate: moment('2023-01-05T12:30:00Z'),
      duration: 25,
      applicants: [],
    },
    {
      id: 9,
      title: 'GraphQL for Modern Web Development',
      description: 'Learn how to use GraphQL to build modern, scalable APIs.',
      startDate: moment('2023-02-01T11:00:00Z'),
      endDate: moment('2023-02-03T14:00:00Z'),
      duration: 12,
      applicants: [],
    },
    {
      id: 10,
      title: 'Deep Learning with TensorFlow',
      description:
        'Learn how to use TensorFlow to build deep learning models for image classification and natural language processing.',
      startDate: moment('2023-03-01T13:00:00Z'),
      endDate: moment('2023-03-07T16:30:00Z'),
      duration: 35,
      applicants: [],
    },
    {
      id: 11,
      title: 'DevOps Fundamentals',
      description:
        'Learn the basics of DevOps and how to implement continuous integration and deployment pipelines.',
      startDate: moment('2023-04-01T10:00:00Z'),
      endDate: moment('2023-04-05T15:30:00Z'),
      duration: 30,
      applicants: [],
    },
    {
      id: 12,
      title: 'Building Scalable Microservices',
      description:
        'Learn how to design and build microservices-based applications that can scale to meet high demand.',
      startDate: moment('2023-05-01T09:00:00Z'),
      endDate: moment('2023-05-03T12:00:00Z'),
      duration: 15,
      applicants: [],
    },
  ];

  private latestTrainingFilteredList: Training[] | MinTraining[] = [];
  private latestTrainingFilter: string | null = null;

  constructor(private _user: UserService) {
    const currentMoment = moment.utc();
    this.dummyTrainingList.sort((a, b) => {
      if (
        a.endDate.isAfter(currentMoment) &&
        b.endDate.isAfter(currentMoment)
      ) {
        if (a.startDate.isAfter(b.startDate)) {
          return 1;
        } else {
          return -1;
        }
      } else if (a.endDate.isAfter(currentMoment)) {
        return -1;
      } else if (b.endDate.isAfter(currentMoment)) {
        return 1;
      } else {
        if (a.startDate.isAfter(b.startDate)) {
          return 1;
        } else {
          return -1;
        }
      }
    });
  }

  async getTrainingList(
    minDate: Moment | null = null,
    maxDate: Moment | null = null,
    applicants: true | null = null,
    results: number = 10,
    page: number = 0
  ): Promise<MinTraining[] | Training[]> {
    const filter: TrainingFilter = {};
    const userRole = await this._user.getUserRole();
    const userRoleId = userRole ? userRole.id : null;
    if (minDate) filter.minDate = minDate;
    if (maxDate) filter.maxDate = maxDate;
    if (applicants) filter.applicants = applicants;
    if (
      this.latestTrainingFilter === JSON.stringify(filter) &&
      this.latestTrainingFilteredList &&
      this.latestTrainingFilteredList.length > 0
    ) {
    } else {
      const filteredList = this.dummyTrainingList.filter((training) => {
        return Object.keys(filter).every((key) => {
          if (filter[key] === null) return true;
          if (key === 'minDate') {
            return training.startDate.isAfter(filter.minDate);
          } else if (key === 'maxDate') {
            return training.endDate.isBefore(filter.maxDate);
          } else if (key === 'applicants') {
            return training?.applicants?.length > 0;
          } else return true;
        });
      });
      if (userRoleId === 1) {
        this.latestTrainingFilteredList = filteredList.map((e) => {
          const eNew: MinTraining = e;
          return eNew;
        });
      } else {
        this.latestTrainingFilteredList = filteredList;
      }
      this.latestTrainingFilter = JSON.stringify(filter);
    }
    const start = page * results;
    const end = start + results;
    return this.latestTrainingFilteredList.slice(start, end);
  }

  async getTrainingListLength(
    minDate: Moment | null = null,
    maxDate: Moment | null = null,
    applicants: true | null = null
  ): Promise<number> {
    const filter: TrainingFilter = {};
    const userRole = await this._user.getUserRole();
    const userRoleId = userRole ? userRole.id : null;
    if (minDate) filter.minDate = minDate;
    if (maxDate) filter.maxDate = maxDate;
    if (applicants) filter.applicants = applicants;
    if (
      this.latestTrainingFilter === JSON.stringify(filter) &&
      this.latestTrainingFilteredList &&
      this.latestTrainingFilteredList.length > 0
    ) {
    } else {
      const filteredList = this.dummyTrainingList.filter((training) => {
        return Object.keys(filter).every((key) => {
          if (filter[key] === null) return true;
          if (key === 'minDate') {
            return training.startDate.isAfter(filter.minDate);
          } else if (key === 'maxDate') {
            return training.endDate.isBefore(filter.maxDate);
          } else if (key === 'applicants') {
            return training?.applicants?.length > 0;
          } else return true;
        });
      });
      if (userRoleId === 1) {
        this.latestTrainingFilteredList = filteredList.map((e) => {
          const eNew: MinTraining = e;
          return eNew;
        });
      } else {
        this.latestTrainingFilteredList = filteredList;
      }
      this.latestTrainingFilter = JSON.stringify(filter);
    }
    return this.latestTrainingFilteredList.length;
  }
}
