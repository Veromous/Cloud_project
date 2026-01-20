'use client';

import { useEffect } from 'react';
import { Amplify } from 'aws-amplify';

export default function AmplifyProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        Amplify.configure({
            Auth: {
                Cognito: {
                    userPoolId: 'us-east-1_Szm4d7hfV',
                    userPoolClientId: '2m9nmtvv6cv7eoismg31fjihp9',
                },
            },
        }, { ssr: true });
    }, []);

    return <>{children}</>;
}
