export interface IReportedReview {
  review: string;
  rating: number;
  id: string;
  user_id: string;
  username: string;
  date: string;
  alcohol_id: string;
  report_count: number;
  reporters: string[];
}
