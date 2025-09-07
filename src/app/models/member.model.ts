export interface Member {
  id: number;
  user_id: string;
  first_name: string;
  last_name: string;
  mobile_no: string;
  email: string;
  aadhar_no: string;
  pan_no: string;
  password: string;
  occupasion: string;
  DoB: Date;
  image: string;
  role: number;
  gender: string;
  address: string;
  join_date: Date | null;
  approve_date: Date | null;
  account_status: 'approved' | 'rejected' | 'pending' | string;
  [key: string]: any; // fallback for any other properties
}