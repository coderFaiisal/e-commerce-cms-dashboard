/* eslint-disable no-unused-vars */
export enum plans {
  Basic = 'basic',
  Pro = 'pro',
  Enterprise = 'enterprise',
}

export type TSubscription = {
  _id: string;
  plan: plans;
  startTime: Date;
  endTime: Date;
  isActive: boolean;
  isPaid: boolean;
  userId: string;
};
