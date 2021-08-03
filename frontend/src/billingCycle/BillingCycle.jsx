import React, { Component } from 'react'
import { connect } from  'react-redux'
import { bindActionCreators } from 'redux'

import ContentHeader from '../common/template/ContentHeader'
import Content from '../common/template/Content'
import Tabs from '../common/tab/Tabs'
import TabsHeader from '../common/tab/TabsHeader'
import TabsContent from '../common/tab/TabsContent'
import TabHeader from '../common/tab/TabHeader'
import TabContent from '../common/tab/TabContent'
import { selectTab, showTabas } from '../common/tab/tabActions'
import { create } from './billingCycleActions'

import List from './BillingCycleList'
import Form from './BillingCycleForm'
 

class BillingCycle extends Component {
    
    componentWillMount() {
        this.props.selectTab('tabList')
        this.props.showTabas('tabList', 'tabCreate')
    }

    render() {
        return(
            <div>
                <ContentHeader title='Ciclo de Pagamento' small='Cadastro'/>
                <Content>
                    <Tabs>
                        <TabsHeader>
                            <TabHeader label='Listar' icon='bars' target='tabList'/>
                            <TabHeader label='Incluir' icon='plus' target='tabCreate'/>
                            <TabHeader label='ALterar' icon='pencil' target='tabUpdate'/>
                            <TabHeader label='Excluir' icon='trash-o' target='tabDelete'/>
                        </TabsHeader>
                        <TabsContent>
                            <TabContent id='tabList'> 
                                <List/>
                            </TabContent>
                            <TabContent id='tabCreate'>
                                <Form onSubmit={this.props.create}/>
                            </TabContent>
                            <TabContent id='tabUpdate'> 
                                <Form />
                            </TabContent>
                            <TabContent id='tabDelete'> <h1>Excluir</h1> </TabContent>
                        </TabsContent>
                    </Tabs>
                </Content>
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => bindActionCreators({selectTab, showTabas, create}, dispatch)

export default connect(null, mapDispatchToProps)(BillingCycle)