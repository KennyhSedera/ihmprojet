import Api from "./Api";

export default {
    create(data) {
        return Api().post('commande', data)
    },
    getAll(){
        return Api().get('commande')
    },
    payment(id){
        return Api().put(`payer/${id}`)
    },
    delete(id){
        return Api().delete(`commande/${id}`)
    },
}