import Cookies from 'cookies';
import { getUserSessionFromCookies } from './getUserSessionFromCookies';
import { UserSession } from '../fetch/get-pensions-data';

describe('getUserSessionFromCookies', () => {
  let cookies: jest.Mocked<Cookies>;

  beforeEach(() => {
    cookies = {
      get: jest.fn(),
    } as unknown as jest.Mocked<Cookies>;
  });

  test('should return a UserSession object with values from cookies', () => {
    cookies.get.mockImplementation((name: string) => {
      const values: { [key: string]: string } = {
        userSessionId: '12345',
        authorizationCode: 'authCode',
      };
      return values[name];
    });

    const result = getUserSessionFromCookies(cookies);
    expect(result).toEqual({
      userSessionId: '12345',
      authorizationCode: 'authCode',
    } as UserSession);
  });

  test('should return a UserSession object with empty strings if cookies are not set', () => {
    cookies.get.mockReturnValue(undefined);

    const result = getUserSessionFromCookies(cookies);
    expect(result).toEqual({
      userSessionId: '',
      authorizationCode: '',
    } as UserSession);
  });

  test('should return a UserSession object with some values from cookies and some empty strings', () => {
    cookies.get.mockImplementation((name: string) => {
      const values: { [key: string]: string | undefined } = {
        userSessionId: '12345',
        authorizationCode: undefined,
      };
      return values[name];
    });

    const result = getUserSessionFromCookies(cookies);
    expect(result).toEqual({
      userSessionId: '12345',
      authorizationCode: '',
    } as UserSession);
  });
});
