import React, { Component } from 'react'

// 'reduxForm': essa função decora o componente para fazer ligação com o estado que está sendo gerenciado pelo 'redux-form'
// 'Field': tag usada para controlar os campos do formulário
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { init } from './billingCycleActions'

import LabelAndInput from '../common/form/LabelAndInput'



class BillingCycleForm extends Component {

    render() {

        // 'handleSubmit': processar o formulário de forma correta
        const { handleSubmit } = this.props
        console.log(this.props);

        return(
            <form role='form' onSubmit={handleSubmit}>
                <div className="box-body">
                    <Field name='name' component={LabelAndInput} 
                        label='Nome'
                        cols='12, 4'
                        placeholder='Informe o nome'
                    />
                    <Field name='month' component={LabelAndInput}
                        label='Mês'
                        type='number'
                        cols='12, 4'
                        placeholder='Informe o mês'
                    />
                    <Field name='year' component={LabelAndInput}
                        label='Ano'
                        type='number'
                        cols='12, 4'
                        placeholder='Informe o ano'
                    />
                </div>
                <div className="box-footer">
                    <button type='submit' className="btn btn-primary">Submit</button>
                    <button type='button' onClick={this.props.init} className="btn btn-default">Cancel</button>
                </div>                
            </form>
        )
    }
}


// a propriedade 'destroyOnUnmount' controla a manutenção dos dados do formulário quando o mesmo for destruido
BillingCycleForm = reduxForm({form: 'billingCycleForm', destroyOnUnmount: false})(BillingCycleForm)

const mapDispatchToProps = dispatch => bindActionCreators({init}, dispatch)

export default connect(null, mapDispatchToProps)(BillingCycleForm)