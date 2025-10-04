declare namespace AuthType {
    export interface User {
        user: UserInfo;
        access_token: string;
        token_type: string;
        isPassword: boolean;
    }

    export interface UserInfo {
        id: number;
        email: string;
        name: string;
        image_url: string;
        role: string;
    }
}
