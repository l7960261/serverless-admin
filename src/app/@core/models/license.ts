export class License {
  id?: string;
  authorizations?: string[];
  createdAt?: string;
  custom?: { name: string; };
  emails?: string[];
  expiredAt?: string;
  regular?: boolean;

  static authorizationsToBoolArray(value: string[]) {
    return AUTHORIZATIONS.map(item => value.indexOf(item.key) >= 0);
  }

  static authorizationsFromBoolArray(value: boolean[]) {
    return AUTHORIZATIONS
      .filter((item, idx) => value[idx])
      .map(item => item.key);
  }
}

export const AUTHORIZATIONS = [
  { key: 'batchFormat', text: '批次排版' },
  { key: 'printC2CPinCode', text: '貨單產生' },
  { key: 'detailShopee', text: '蝦皮明細'}
]