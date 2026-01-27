import api from "./axiosInstance"

export async function login(loginData: {
    email: string;
    password: string;
}) {
    
    const  {data} = await api.post("/auth/login", loginData)
    return data
}