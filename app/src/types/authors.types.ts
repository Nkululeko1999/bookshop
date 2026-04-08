export interface AuthorBook {
  ID: string;
  title: string;
  genre?: {
    ID: string;
    name: string;
  } | null;
}

export interface Author {
  ID: string;
  name: string;
  avatar?: string | null;
  avatarID?: string | null;
  createdAt?: string;
  updatedAt?: string;
  books?: AuthorBook[];
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