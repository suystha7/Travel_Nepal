export interface ITestimonialsRecord {
  id: string;
  name: string;
  message: string;
  image?: string;
  rating: number;
  created_at: string;
  updated_at: string;
  comment: string;
}
export type TestimonialsResponse = ITestimonialsRecord[];
