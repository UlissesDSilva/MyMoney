import React, { Component } from 'react'

import Content from '../common/template/Content'
import ContentHeader from '../common/template/ContentHeader'

class Dashboard extends Component{
    render(){
        return(
            <div>
                <ContentHeader title='Dashboard' small='Versão 1.0'/>
                <Content>
                    Dashboard
                </Content>
            </div>
        )
    }
}

export default Dashboard