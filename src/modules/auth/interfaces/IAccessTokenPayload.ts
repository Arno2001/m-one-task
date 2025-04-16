import type { TokenTypeEnum } from '../../../constants/token-type.enum';

export interface IAccessTokenPayload {
  userId: string;
  type: TokenTypeEnum;
}
