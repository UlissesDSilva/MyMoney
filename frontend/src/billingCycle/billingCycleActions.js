import axios from 'axios'
import { values } from 'lodash'
import { toastr } from 'react-redux-toastr'
// 'initialize' ActionCreate disponibilizado pelo 'redux-form'
import { reset as resetForm, initialize } from 'redux-form'
import { showTabas, selectTab } from '../common/tab/tabActions'

const BASE_URL = 'http://localhost:3003/api'

const INITIAL_VALUES = {credits: [{}], debts: [{}]}

export function getList() {
    const request = axios.get(`${BASE_URL}/billingCycles`)

    return {
        type: 'BILLING_CYCLES_FETCHED',
        payload: request
    }
}

export function init(){
    return[
        selectTab('tabList'),
        showTabas('tabList', 'tabCreate'),
        getList(),
        initialize('billingCycleForm', INITIAL_VALUES)
    ]
}

function submit(values, method) {
    // "middleware - redux-thunk" controla os despachos de "actions" assim ele retorna uma function
    return dispatch => {
        // Essa estratégia permite usar qualquer método, pois caso o post seja chamado o id não estará presente e a url ainda continua correta
        const id = values._id ? values._id : ''
        axios[method](`${BASE_URL}/billingCycles/${id}`, values)
            .then(resp => {
                toastr.success('Sucesso', 'Operação realizada com sucesso!')
                // "middleware - reduxMulti" permite passar um array para o método dispatch, ele que faz a leitura
                dispatch(init())
            })
            .catch(e => {
                 e.response.data.errors.forEach(error => toastr.error('Erro', error.error))
            })
    }
}

export function create(values) {
    return submit(values, 'post')
}

export function update(values) {
    return submit(values, 'put')
}

export function remove(values) {
    return submit(values, 'delete')
}

export function showUpdate(billingCycle) {
    return [ 
        selectTab('tabUpdate'),
        showTabas('tabUpdate'),
        initialize('billingCycleForm', billingCycle)
    ]
}
// Refatorar para usar apenas uma funão de showTabs
export function showDelete(billingCycle) {
    return [
        selectTab('tabDelete'),
        showTabas('tabDelete'),
        initialize('billingCycleForm', billingCycle)
    ]
}