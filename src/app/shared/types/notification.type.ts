export type Notification = {
  id?: string;
  content: string;
  idUser: string;
  type: string;
  read: boolean;
  accepted: boolean;
  creationTime: string;
};
