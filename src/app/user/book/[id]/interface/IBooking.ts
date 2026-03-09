export interface ITicketOverviewProps {
  booking: {
    package_name?: string;
    arrival_date: string;
    departure_date: string;
    adult_count: number;
    child_count: number;
    infant_count: number;
    total_amount: number;
    currency: string;
    adult_price?: number;
    child_price?: number;
    infant_price?: number;
  };
}
