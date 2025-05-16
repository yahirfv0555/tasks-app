import Login from "@/components/login";
import UnprotectedPage from "@/routing/unprotected-page";

const LoginPage: React.FC = () => {
    return (
        <UnprotectedPage>
            <Login/>
        </UnprotectedPage>
    );
}

export default LoginPage;