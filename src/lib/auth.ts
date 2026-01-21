import { signIn, signUp, signOut, getCurrentUser, fetchAuthSession } from 'aws-amplify/auth';

export interface SignUpParams {
    email: string;
    password: string;
}

export interface SignInParams {
    email: string;
    password: string;
}

export const authService = {
    /**
     * Sign up a new user
     */
    async register({ email, password }: SignUpParams) {
        try {
            const { isSignUpComplete, userId, nextStep } = await signUp({
                username: email,
                password,
                options: {
                    userAttributes: {
                        email,
                    },
                    autoSignIn: true,
                },
            });

            return {
                success: true,
                isSignUpComplete,
                userId,
                nextStep,
            };
        } catch (error: any) {
            console.error('Sign up error:', error);
            return {
                success: false,
                error: error.message || 'Registration failed',
            };
        }
    },

    /**
     * Sign in an existing user
     */
    async login({ email, password }: SignInParams) {
        try {
            const { isSignedIn, nextStep } = await signIn({
                username: email,
                password,
            });

            return {
                success: true,
                isSignedIn,
                nextStep,
            };
        } catch (error: any) {
            console.error('Sign in error:', error);
            return {
                success: false,
                error: error.message || 'Login failed',
            };
        }
    },

    /**
     * Sign out the current user
     */
    async logout() {
        try {
            await signOut();
            return { success: true };
        } catch (error: any) {
            console.error('Sign out error:', error);
            return {
                success: false,
                error: error.message || 'Logout failed',
            };
        }
    },

    /**
     * Get the current authenticated user
     */
    async getCurrentUser() {
        try {
            const { fetchUserAttributes } = await import('aws-amplify/auth');
            const user = await getCurrentUser();
            const attributes = await fetchUserAttributes();

            return {
                success: true,
                user,
                email: attributes.email,
                name: attributes.name,
                attributes,
            };
        } catch (error: any) {
            return {
                success: false,
                error: error.message || 'Not authenticated',
            };
        }
    },

    /**
     * Get the current auth session (tokens)
     */
    async getSession() {
        try {
            const session = await fetchAuthSession();
            return {
                success: true,
                session,
                tokens: session.tokens,
            };
        } catch (error: any) {
            return {
                success: false,
                error: error.message || 'No active session',
            };
        }
    },
};
