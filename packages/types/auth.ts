export interface Auth {
  telegramId?: number;
  languageCode?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
}

export interface AuthResponse {
  success: boolean;
  user: {
    id: string;
    username: string;
    telegramId?: number;
  };
  isNewUser: boolean;
  message: string;
}
