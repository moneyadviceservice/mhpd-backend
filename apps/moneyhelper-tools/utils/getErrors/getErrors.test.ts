import { getErrors } from './getErrors';
import { DataPath } from 'types';

jest.mock('@maps-digital/shared/hooks', () => ({
  useTranslation: () => ({ z: jest.fn() }),
}));

jest.mock('data/form-content/errors', () => ({
  midLifeMotErrorMessages: jest.fn(),
  creditRejectionErrorMessages: jest.fn(),
  creditOptionsErrorMessages: jest.fn(),
}));

import {
  midLifeMotErrorMessages,
  creditRejectionErrorMessages,
  creditOptionsErrorMessages,
} from 'data/form-content/errors';

describe('getErrors', () => {
  it('should return midLifeMotErrorMessages when path is DataPath.MidLifeMot', () => {
    const z = jest.fn();
    getErrors(z, DataPath.MidLifeMot);
    expect(midLifeMotErrorMessages).toHaveBeenCalledWith(z);
  });

  it('should return creditRejectionErrorMessages when path is DataPath.CreditRejection', () => {
    const z = jest.fn();
    getErrors(z, DataPath.CreditRejection);
    expect(creditRejectionErrorMessages).toHaveBeenCalledWith(z);
  });

  it('should return creditOptionsErrorMessages when path is DataPath.CreditOptions', () => {
    const z = jest.fn();
    getErrors(z, DataPath.CreditOptions);
    expect(creditOptionsErrorMessages).toHaveBeenCalledWith(z);
  });

  it('should return an empty array for unknown paths', () => {
    const z = jest.fn();
    const errors = getErrors(z, 'UnknownPath' as DataPath);
    expect(errors).toEqual([]);
  });
});
