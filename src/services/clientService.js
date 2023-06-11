import Api from "./Api";

export default {
    create(data){
        return Api().post('client', data)
    },
    update(data, contact) {
        return Api().put(`client/${contact}`, data)
    },
    getAll(){
        return Api().get('client')
    },
    delete(id){
        return Api().delete(`client/${id}`)
    },
}