import { PensionsOverviewModel } from '../types';
import { getAllPensions } from './get-all-pensions';
import { UserSession } from './get-pensions-data';

export const getPensionsOverview = async (userSession: UserSession) => {
  const { confirmedPensions, incompletePensions, unconfirmedPensions } =
    await getAllPensions(userSession);

  const totalPensions =
    confirmedPensions.length +
    incompletePensions.length +
    unconfirmedPensions.length;

  return {
    totalPensions,
    confirmedPensions,
    incompletePensions,
    unconfirmedPensions,
  } as PensionsOverviewModel;
};
