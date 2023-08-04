import * as notificationService from '../services/notificationSubscription';

export const updateSingleStateInServer = async (
  subscription_id: string,
  myState: boolean,
  myStateFunction: Function
) => {
  let myNewState;
  if (myState) {
    myNewState = 0;
  } else {
    myNewState = 1;
  }
  myStateFunction(!myState);
  try {
    const result = await notificationService.updateSubscription(
      parseInt(subscription_id),
      myNewState
    );
  } catch (error) {
    myStateFunction(myState);
  }
};
