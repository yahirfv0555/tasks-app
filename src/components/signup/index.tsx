import Auth from "@/core/middleware/auth";
import { Execution, LoginExecution, SignupSession, UserDto } from "@/models";
import UsersService from "@/services/users/users-service";
import Button from "@/shared/components/button";
import Input from "@/shared/components/input";
import { useState } from "react";

const userService: UsersService = new UsersService();
const auth: Auth = new Auth();

const Signup: React.FC = () => {

    const [isCodeSent, setIsCodeSent] = useState<boolean>(false);

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [code, setCode] = useState<string>('');

    const submit = async() => {

        const user: UserDto = {
            name,
            email
        }

        const signupSession: SignupSession = {
            password,
            code,
            user
        };

        const execution: LoginExecution = await userService.signup(signupSession);

        if (execution.successful === true && execution.jwt !== undefined && execution.user !== undefined) {
            auth.setJwt(execution.jwt);
            auth.setUser(execution.user);

            window.location.href = '/';
        } else {

        }
    }

    return (
        <div className="w-[100%] h-screen flex flex-col justify-center items-center">
            {isCodeSent === false &&
                <div className="h-[40%] w-[45%] flex flex-col justify-between px-20">
                    <div className="mb-10">
                        <Input
                            setValue={setName}
                            value={name}
                            type="text"
                            label="Nombre"
                        />
                        <Input
                            setValue={setEmail}
                            value={email}
                            type="text"
                            label="Correo Electrónico"
                        />
                        <Input
                            setValue={setPassword}
                            value={password}
                            type="password"
                            label="Contraseña"
                        />
                        
                    </div>
                    <Button
                        label="Enviar código"
                        onClick={() => {setIsCodeSent(!isCodeSent)}}
                    />
                </div>
            }
            {isCodeSent === true &&
                <div className="h-[40%] w-[45%] flex flex-col justify-between px-20">
                    <div className="mb-10">
                        <Input
                            setValue={setCode}
                            value={code}
                            type="text"
                            label="Código"
                        />
                    </div>
                    <Button
                        label="Enviar"
                        onClick={submit}
                    />
                </div>
            }
        </div>
    );
}

export default Signup;