import axios from "axios";
import { storageService } from "./storage.service";
import { useRouter } from "next/router";
export const AuthService = {
    doLogin,
    doRegister
}

async function doLogin(email, password) {
    let errors = {}
    let isLogin = false
    axios.defaults.withCredentials = true;
    await axios.get(process.env.API_URL + '/sanctum/csrf-cookie')
        .then(async resp => {
            await axios.post(process.env.API_URL + '/api/auth/login', {
                email: email,
                password: password,
            })
            .then(async response => {
                // console.log(response)
                storageService.add("user", JSON.stringify(response.data.data))
                isLogin = true
            })
            .catch(function (error) {
                errors = error.response.data.data
                isLogin = false
            })
        })
        .catch(function (error) {
            // console.log(error)
            errors = error
            isLogin = false
        })

        return {
            errors,
            isLogin
        }
}

async function doRegister(name, email, password = "04e6868da20e215574a272021b35151c0d88fcb4d0ab", password_verification = "04e6868da20e215574a272021b35151c0d88fcb4d0ab", google_id = null, isSession = false) {
    let errors = {}
    let status = false
    var role_id = storageService.get("userType")
    axios.defaults.withCredentials = true;
    await axios.get(process.env.API_URL + '/sanctum/csrf-cookie')
        .then(async resp => {
            await axios.post(process.env.API_URL + '/api/auth/register', {
                // name: session.user.name,
                // email: session.user.email,
                // password: "04e6868da20e215574a272021b35151c0d88fcb4d0ab",
                // password_verification: "04e6868da20e215574a272021b35151c0d88fcb4d0ab",
                // role_id: role_id
                name: name,
                email: email,
                password: isSession ? "04e6868da20e215574a272021b35151c0d88fcb4d0ab" : password,
                password_verification: isSession ? "04e6868da20e215574a272021b35151c0d88fcb4d0ab" : password,
                role_id: role_id
            })
                .then(async response => {
                    // console.log(response)
                    // Cookie.set("token", response.data.data.token);
                    // localStorage.setItem('user', JSON.stringify(response.data.data))
                    storageService.add("user", JSON.stringify(response.data.data))
                    status = true;
                    // if (router.query.returnUrl) {
                    //     router.push(router.query.returnUrl);
                    // } else {
                    //     router.push('/dashboard');
                    // }

                })
                .catch(function (error) {
                    // console.log(error.response.data.data)
                    // setAxiosErrors(error.response.data.data)
                    errors = error.response.data.data;
                    status = false;
                })
        })
        .catch(function (error) {
            // console.log(error)
            errors = error.response.data.data;
            status = false;
        })
    return {
        status,
        errors
    }
}