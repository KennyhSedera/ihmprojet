import Api from '@/services/Api'

export default {
    create(data){
        return Api().post('produit', data)
    },
    addEntree(data){
        return Api().post('addentree', data)
    },
    addSortie(data){
        return Api().post('addsortie', data)
    },
    getAll () {
        return Api().get('produit')
    },
    getEntree () {
        return Api().get('entree')
    },
    getSortie () {
        return Api().get('sortie')
    },
    update (data, id) {
        return Api().put(`produit/${id}`, data)
    },
    delete (id){
        return Api().delete(`produit/${id}`)
    },
    deleteentree (id){
        return Api().delete(`entree/${id}`)
    },
    deletesortie (id){
        return Api().delete(`sortie/${id}`)
    },
    topproduit(){
        return Api().get('topproduit')
    },
}