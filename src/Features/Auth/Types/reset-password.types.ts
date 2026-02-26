export interface ForgotPasswordRequest {
  email: string;
}

export interface VerifyResetCodeRequest {
  email: string;
  resetCode: string;
}

export interface ResetPasswordRequest {
  email: string;
  newPassword: string;
}

export type ResetStep = 'email' | 'code' | 'new-password' | 'success';

export interface ResetState {
  step: ResetStep;
  email: string;
  resetCode?: string;
  message?: string;
  error?: string;
}