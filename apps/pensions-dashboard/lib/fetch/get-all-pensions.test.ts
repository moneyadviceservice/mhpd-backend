import {
  mockIncompletePensions,
  mockPensionsData,
  mockUnconfirmedPensions,
} from '../mocks';
import { getAllPensions } from '../fetch/get-all-pensions';
import { getPensionData, UserSession } from '../fetch/get-pensions-data';

jest.mock('./get-pensions-data');

let result;
const mockUserSession: UserSession = {
  userSessionId: 'test-session-id',
  authorizationCode: 'test-auth-code',
}; // Declare mockUserSession variable

describe('getUnconfirmedPensions', () => {
  beforeAll(() => {
    (getPensionData as jest.Mock).mockResolvedValue(mockPensionsData);
  });

  it('should return unconfirmed pensions if matchType is POSS', async () => {
    // Arrange
    (getPensionData as jest.Mock).mockResolvedValue({
      ...mockPensionsData,
      pensionPolicies: [
        {
          pensionArrangements: [
            {
              ...mockPensionsData.pensionPolicies[0].pensionArrangements[0],
              matchType: 'POSS',
            },
          ],
        },
      ],
    });

    // Act
    result = await getAllPensions(mockUserSession);

    // Act
    expect(result.unconfirmedPensions).toEqual(mockUnconfirmedPensions);
  });

  it('should return an empty array if the matchType is not POSS', async () => {
    // Arrange
    (getPensionData as jest.Mock).mockResolvedValue({
      ...mockPensionsData,
      pensionPolicies: [
        {
          pensionArrangements: [
            {
              ...mockPensionsData.pensionPolicies[0].pensionArrangements[0],
              matchType: '',
            },
          ],
        },
      ],
    });

    // Act
    result = await getAllPensions(mockUserSession);

    // Act
    expect(result.unconfirmedPensions).toEqual([]);
  });
});

describe('getConfirmedPensions', () => {
  it('should return confirmed pensions', async () => {
    const userSession: UserSession = {
      userSessionId: '',
      authorizationCode: '',
    };
    const mockData = {
      pensionPolicies: [
        {
          pensionArrangements: [
            {
              matchType: 'DEFN',
              benefitIllustrations: [
                {
                  illustrationComponents: [
                    {
                      unavailableReason: null,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };

    (getPensionData as jest.Mock).mockResolvedValue(mockData);

    const result = await getAllPensions(userSession);

    expect(result.confirmedPensions).toEqual(
      mockData.pensionPolicies[0].pensionArrangements,
    );
  });
});

describe('getIncompletePensions', () => {
  beforeAll(() => {
    (getPensionData as jest.Mock).mockResolvedValue(mockPensionsData);
  });

  it('should return incomplete pensions if excluded reason is DBC', async () => {
    // Act
    result = await getAllPensions(mockUserSession);

    // Assert
    expect(result.incompletePensions).toEqual(mockIncompletePensions);
  });
  it('should return an empty array if the matchType is not DEFN', async () => {
    // Arrange
    (getPensionData as jest.Mock).mockResolvedValue({
      ...mockPensionsData,
      pensionPolicies: [
        {
          pensionArrangements: [
            {
              ...mockPensionsData.pensionPolicies[0].pensionArrangements[0],
              matchType: '',
            },
          ],
        },
      ],
    });

    // Act
    result = await getAllPensions(mockUserSession);

    // Assert
    expect(result.incompletePensions).toEqual([]);
  });

  it('should return an empty array if the unavailableReason is not DBC, DCC, NEW or DCHA', async () => {
    // Arrange
    (getPensionData as jest.Mock).mockResolvedValue({
      ...mockPensionsData,
      pensionPolicies: [
        {
          pensionArrangements: [
            {
              ...mockPensionsData.pensionPolicies[0].pensionArrangements[0],
              benefitIllustrations: [
                {
                  illustrationComponents: [
                    {
                      ...mockPensionsData.pensionPolicies[0]
                        .pensionArrangements[0].benefitIllustrations[0]
                        .illustrationComponents[0],
                      unavailableReason: 'ANO',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });

    // Act
    result = await getAllPensions(mockUserSession);

    // Assert
    expect(result.incompletePensions).toEqual([]);
  });

  it('should return an empty array if the benefitIllustrations is not defined', async () => {
    // Arrange
    (getPensionData as jest.Mock).mockResolvedValue({
      ...mockPensionsData,
      pensionPolicies: [
        {
          pensionArrangements: [
            {
              ...mockPensionsData.pensionPolicies[0].pensionArrangements[0],
              benefitIllustrations: undefined,
            },
          ],
        },
      ],
    });

    // Act
    result = await getAllPensions(mockUserSession);

    // Assert
    expect(result.incompletePensions).toEqual([]);
  });
});
