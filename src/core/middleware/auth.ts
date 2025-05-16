import { UserDto } from "@/models";
import { HttpHeaders } from "@/models/general";

class Auth {

    scoredJwt: string | null = null;

    constructor() {
        if (typeof window !== "undefined") {
            this.scoredJwt = localStorage.getItem('userJwt');
        }
    }

    public assignScoredJwt(headers: HttpHeaders): void {
        if (this.scoredJwt !== null) {
            headers['Authentication'] = `Bearer ${this.scoredJwt}`;
        }
    }

    public isAuthenticated(): boolean {
        return this.scoredJwt !== null;
    }

    public getJwt(): string | undefined {
        return this.scoredJwt !== null ? this.scoredJwt : undefined;
    }

    public setJwt(token: string): void {
        localStorage.setItem('userJwt', token);
    }

    public setUser(user: UserDto): void {
        const serializedUser: string = JSON.stringify(user);
        localStorage.setItem('user', serializedUser);
    }

    public getUser(): UserDto | undefined {
        const serializedUser: string | null = localStorage.getItem('user');

        if (serializedUser === null) return undefined;

        return JSON.parse(serializedUser);;
    }

    public clearSession(): void {
        localStorage.removeItem('userJwt');
        localStorage.removeItem('user');
    }

}

export default Auth;