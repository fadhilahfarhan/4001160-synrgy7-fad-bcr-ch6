export interface Cars {
  id: number;
  name: string;
  price: number;
  picture: string;
  category: string;
  availability: boolean;
  start_date: string;
  end_date: string;
  created_by: string;
  updated_by: string;
  created_at: Date | string;
  updated_at: Date | string;
}
