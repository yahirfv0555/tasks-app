import Auth from "@/core/middleware/auth";
import { LoginExecution, LoginSession } from "@/models";
import { useMessageProvider } from "@/providers/message/message-provider";
import UsersService from "@/services/users/users-service";
import Button from "@/shared/components/button";
import Input from "@/shared/components/input";
import Link from "next/link";
import { useState } from "react";

const userService: UsersService = new UsersService();
const auth: Auth = new Auth();

const Login: React.FC = () => {

    const { setMessage } = useMessageProvider();
 
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleEmail = (value: string) => {
        setEmail(value);
    }

    const handlePassword = (value: string) => {
        setPassword(value);
    }

    const login = async() => {
        const loginSession: LoginSession = {
            email,
            password
        };

      
        const execution: LoginExecution = await userService.login(loginSession);

        if (execution.successful === true && execution.jwt !== undefined && execution.user !== undefined) {
            auth.setJwt(execution.jwt);
            auth.setUser(execution.user);

            setMessage({
                type: 'success',
                message: execution.message,
            });

            window.location.href = '/';
        } else {
            setMessage({
                type: 'error',
                message: execution.message,
            });
        }
    }

    return (
        <div className="w-[100%] h-screen flex flex-col justify-center items-center">
            <div className="h-[40%] w-[45%] flex flex-col justify-between px-20">
                <div className="mb-10">
                    <Input
                        setValue={handleEmail}
                        type="text"
                        label="Correo Electrónico"
                        className="bg-white"
                    />
                    <Input
                        setValue={handlePassword}
                        type="password"
                        label="Contraseña"
                        className="bg-white"
                    />
                </div>
                <Button
                    label="Iniciar Sesión"
                    onClick={login}
                    type="submit"
                    className="border-2 border-black font-bold bg-[var(--secondary)]"
                />
                <div className="relative ml-auto mr-0">
                    <Link href={'/signup'} className="text-sm cursor-pointer">
                        ¿No tienes cuenta? Crea una aquí
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;