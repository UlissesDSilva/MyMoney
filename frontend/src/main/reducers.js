import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import {reducer as toastrReducer} from 'react-redux-toastr'

import DasboardReducer from '../dashboard/dashboardReducer'
import TabReducer from '../common/tab/TabReducer'
import BillingCycleReducer from '../billingCycle/billingCycleReducer'

const rootReducer = combineReducers({
    dashboard: DasboardReducer,
    tab: TabReducer,
    billingCycle: BillingCycleReducer,
    form: formReducer,
    toastr: toastrReducer

})

export default rootReducer