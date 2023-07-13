import {axios} from "@/lib/axios";


export type RegisterCredentialsDTO = {
    email: string;
    password: string;
};

export const registerWithEmailAndPassword = (data: RegisterCredentialsDTO): Promise<any> => {
        return axios.post('/user/create', data).catch(error => console.error(error))

    }
;
