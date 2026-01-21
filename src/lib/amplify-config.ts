'use client';

import { Amplify } from 'aws-amplify';

// Amplify configuration
const amplifyConfig = {
    Auth: {
        Cognito: {
            userPoolId: 'us-east-1_Szm4d7hfV',
            userPoolClientId: '2m9nmtvv6cv7eoismg31fjihp9',
        },
    },
};

// Configure Amplify
if (typeof window !== 'undefined') {
    Amplify.configure(amplifyConfig, { ssr: true });
}

export default amplifyConfig;
