import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getList, showUpdate } from  './billingCycleActions'

class BillingCyclesList extends Component {

    componentWillMount() {
        this.props.getList()
    }
    
    showRows(){
        const list = this.props.list || []
        return list.map(elm => (
            <tr key={elm._id}>
                <td>{elm.name}</td>
                <td>{elm.month}</td>
                <td>{elm.year}</td>
                <td>
                    <button className='btn btn-warning' onClick={() => this.props.showUpdate(elm)}>
                        <i className='fa fa-pencil'></i>
                    </button>
                </td>
            </tr>
        ))
        
    }

    render() {
        return(
            <div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Mês</th>
                            <th>Ano</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.showRows()}
                    </tbody>
                </table>
            </div>
        )
    }
}


const mapStateToProps = state => ({list: state.billingCycle.list})

const mapDispatchToProps = dispatch => bindActionCreators({getList, showUpdate}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(BillingCyclesList)
