// types/currency.ts

export type CardVariant = "green" | "orange" | "teal" | "purple";

export interface SparkPoint {
  value: number;
}

export interface CurrencyCardData {
  id: number;
  variant: CardVariant;
  flagEmoji: string; // e.g. "🇺🇸"
  currencyName: string; // e.g. "US Dollar"
  symbol: string; // e.g. "$"
  amount: number;
  changePercent: number; // e.g. 0.12 (positive) or -0.08 (negative)
  sparkline: SparkPoint[];
}

export type MethodTab = "Exchange" | "Deposit";

export type PaymentMethodOption =
  | "Paypal - USD"
  | "Bank Transfer - USD"
  | "Credit Card - USD"
  | "Paypal - EUR"
  | "Bank Transfer - EUR";

export interface AddCurrencyFormState {
  method: MethodTab;
  paymentMethod: PaymentMethodOption;
  amount: string;

  fromCurrency: string;
  toCurrency: string;
  fromAmount: string;
  toAmount: string;
}

export interface TransactionInfo {
  depositLimit: string;
  transactionFeePercent: number;
  total: number;
}
