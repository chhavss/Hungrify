import { User, users } from '../../data/users';

export interface LoginResponse {
  success: boolean;
  user?: User;
  token?: string;
  error?: string;
}

export const authApi = {
  login: async (email: string, passwordHash: string): Promise<LoginResponse> => {
    // Simulate API network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const matchedUser = users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.passwordHash === passwordHash
    );
    
    if (matchedUser) {
      return {
        success: true,
        user: matchedUser,
        token: `mock-token-${matchedUser.id}-${Date.now()}`
      };
    }
    
    return {
      success: false,
      error: 'Invalid email or password'
    };
  },
  
  getDemoAccounts: async (): Promise<User[]> => {
    return users;
  }
};
