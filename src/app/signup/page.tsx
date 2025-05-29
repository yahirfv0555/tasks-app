"use client";

import Signup from "@/components/signup";
import PublicPage from "@/routing/public-page";

const SignupPage: React.FC = () => {
    return (
        <PublicPage>
            <Signup/>
        </PublicPage>
    );
}

export default SignupPage;