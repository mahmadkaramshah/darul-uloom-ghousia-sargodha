export interface CurrencyConfig {
  code: string;
  symbol: string;
  name: string;
  flag: string;
  rateToPkr: number; // 1 Unit of Foreign Currency = X PKR
  suggestedAmounts: number[];
  categorySuggested: {
    edu: number[];
    food: number[];
    welfare: number[];
    mosque: number[];
    general: number[];
  };
}

export const SUPPORTED_CURRENCIES: Record<string, CurrencyConfig> = {
  PKR: {
    code: 'PKR',
    symbol: 'Rs',
    name: 'Pakistani Rupee',
    flag: '🇵🇰',
    rateToPkr: 1,
    suggestedAmounts: [3000, 6000, 12000, 25000, 50000, 100000],
    categorySuggested: {
      edu: [3000, 6000, 12000, 36000],
      food: [2500, 5000, 9500, 25000],
      welfare: [5000, 10000, 25000, 50000],
      mosque: [10000, 25000, 50000, 100000],
      general: [2000, 5000, 10000, 20000],
    }
  },
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    flag: '🇺🇸',
    rateToPkr: 278.5,
    suggestedAmounts: [25, 50, 100, 250, 500, 1000],
    categorySuggested: {
      edu: [25, 50, 100, 250],
      food: [20, 40, 80, 200],
      welfare: [50, 100, 200, 500],
      mosque: [100, 250, 500, 1000],
      general: [25, 50, 100, 250],
    }
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound',
    flag: '🇬🇧',
    rateToPkr: 362.0,
    suggestedAmounts: [20, 50, 100, 200, 500, 1000],
    categorySuggested: {
      edu: [20, 40, 80, 200],
      food: [15, 30, 60, 150],
      welfare: [35, 75, 150, 400],
      mosque: [75, 200, 400, 800],
      general: [20, 50, 100, 200],
    }
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    flag: '🇪🇺',
    rateToPkr: 302.5,
    suggestedAmounts: [25, 50, 100, 250, 500, 1000],
    categorySuggested: {
      edu: [25, 50, 100, 250],
      food: [20, 40, 80, 200],
      welfare: [45, 90, 180, 450],
      mosque: [90, 220, 450, 900],
      general: [25, 50, 100, 250],
    }
  },
  SAR: {
    code: 'SAR',
    symbol: 'SAR',
    name: 'Saudi Riyal',
    flag: '🇸🇦',
    rateToPkr: 74.2,
    suggestedAmounts: [100, 250, 500, 1000, 2500, 5000],
    categorySuggested: {
      edu: [100, 200, 500, 1000],
      food: [80, 150, 300, 800],
      welfare: [150, 350, 700, 1500],
      mosque: [300, 750, 1500, 3000],
      general: [100, 250, 500, 1000],
    }
  },
  AED: {
    code: 'AED',
    symbol: 'AED',
    name: 'UAE Dirham',
    flag: '🇦🇪',
    rateToPkr: 75.8,
    suggestedAmounts: [100, 250, 500, 1000, 2500, 5000],
    categorySuggested: {
      edu: [100, 200, 500, 1000],
      food: [80, 150, 300, 800],
      welfare: [150, 350, 700, 1500],
      mosque: [300, 750, 1500, 3000],
      general: [100, 250, 500, 1000],
    }
  },
  CAD: {
    code: 'CAD',
    symbol: 'C$',
    name: 'Canadian Dollar',
    flag: '🇨🇦',
    rateToPkr: 205.0,
    suggestedAmounts: [35, 75, 150, 350, 700, 1500],
    categorySuggested: {
      edu: [35, 75, 150, 350],
      food: [30, 60, 120, 300],
      welfare: [60, 130, 260, 650],
      mosque: [130, 320, 650, 1300],
      general: [35, 75, 150, 350],
    }
  },
  AUD: {
    code: 'AUD',
    symbol: 'A$',
    name: 'Australian Dollar',
    flag: '🇦🇺',
    rateToPkr: 182.0,
    suggestedAmounts: [40, 80, 160, 400, 800, 1600],
    categorySuggested: {
      edu: [40, 80, 160, 400],
      food: [35, 70, 140, 350],
      welfare: [70, 150, 300, 750],
      mosque: [150, 380, 750, 1500],
      general: [40, 80, 160, 400],
    }
  }
};

export const convertToPkr = (amount: number, currencyCode: string): number => {
  const currency = SUPPORTED_CURRENCIES[currencyCode] || SUPPORTED_CURRENCIES.PKR;
  return Math.round(amount * currency.rateToPkr);
};

export const convertFromPkr = (amountPkr: number, targetCurrencyCode: string): number => {
  const currency = SUPPORTED_CURRENCIES[targetCurrencyCode] || SUPPORTED_CURRENCIES.PKR;
  if (currency.rateToPkr === 0) return amountPkr;
  const val = amountPkr / currency.rateToPkr;
  return val < 100 ? Math.round(val * 10) / 10 : Math.round(val);
};

export const formatCurrency = (amount: number, currencyCode: string): string => {
  const currency = SUPPORTED_CURRENCIES[currencyCode] || SUPPORTED_CURRENCIES.PKR;
  return `${currency.symbol} ${amount.toLocaleString()}`;
};
