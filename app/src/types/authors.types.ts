export interface Author {
  ID: string;
  name: string;
  avatar?: string | null;
  avatarID?: string | null;
  createdAt?: string;
}

export interface AuthorPayload {
  name: string;
  avatar?: string | null;
  avatarID?: string | null;
}

export interface UpdateAuthorPayload {
  id: string;
  data: Partial<AuthorPayload>;
}

export interface ReplaceAuthorPayload {
  id: string;
  data: AuthorPayload;
}