export interface PaymentGateway {
  id: number;
  name?: string; // optional because some items don't have a name
  img: string;
}
