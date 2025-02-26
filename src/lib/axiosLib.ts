import axios from "axios";

const url = process.env.NEXT_PUBLIC_RECIPE_URL as string

export const instance = axios.create({
    baseURL: url,
    // timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});