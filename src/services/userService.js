import Api from "./Api";

export default {
    signup(data){
        return Api().post('signup', data)
    },
    signin(data){
        return Api().post('signin', data)
    },
    verifyEmail(data){
        return Api().post('verifiemail', data)
    },
}