import axios from 'axios'
import { toastr } from 'react-redux-toastr'
// 'initialize' ActionCreate disponibilizado pelo 'redux-form'
import { reset as resetForm, initialize } from 'redux-form'
import { showTabas, selectTab } from '../common/tab/tabActions'

const BASE_URL = 'http://localhost:3003/api'

const INITIAL_VALUES = {}

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

export function create(values) {
    // "middleware - redux-thunk" controla os despachos de "actions" assim ele retorna uma function
    return dispatch => {
        axios.post(`${BASE_URL}/billingCycles`, values)
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

export function showUpdate(billingCycle) {
    return [ 
        selectTab('tabUpdate'),
        showTabas('tabUpdate'),
        initialize('billingCycleForm', billingCycle)
    ]
}
