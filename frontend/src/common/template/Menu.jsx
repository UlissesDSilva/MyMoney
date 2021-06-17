import React from 'react'

import MenuItem from './MenuItem'
import MenuTree from './MenuTree'

export default (props) => {

    return(
        <ul className='sidebar-menu'>
            <MenuItem path='#/' label='Dashboard' icon='dashboard'/>
            <MenuTree label='Cadastro' icon='edit'>
                <MenuItem path='#billingCycles' label='Ciclos de pagamentos' icon='usd'/>
            </MenuTree>
        </ul>
    )
}