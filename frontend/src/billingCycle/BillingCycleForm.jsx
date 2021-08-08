import React, { Component } from 'react'

// 'reduxForm': essa função decora o componente para fazer ligação com o estado que está sendo gerenciado pelo 'redux-form'
// 'Field': tag usada para controlar os campos do formulário
// 'formValueSelector' responsável por pegar um valor dentro do formulário
import { reduxForm, Field, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { init } from './billingCycleActions'

import LabelAndInput from '../common/form/LabelAndInput'
import ItemList from './ItemList'
import Summary from './Summary'



class BillingCycleForm extends Component {

    calcSummary() {
        const sum = (t, v) => t + v
        return {
            sumOfCredits: this.props.credits.map(credit => +credit.value || 0).reduce(sum),
            sumOfDebts: this.props.debts.map(debt => +debt.value || 0).reduce(sum)
        }
    }

    render() {

        // 'handleSubmit': processar o formulário de forma correta
        const { handleSubmit, readOnly, credits, debts } = this.props
        const { sumOfCredits, sumOfDebts } = this.calcSummary()
        return(
            <form role='form' onSubmit={handleSubmit}>
                <div className="box-body">
                    <Field name='name' component={LabelAndInput} 
                        label='Nome'
                        cols='12, 4'
                        readOnly={readOnly}
                        placeholder='Informe o nome'
                    />
                    <Field name='month' component={LabelAndInput}
                        label='Mês'
                        type='number'
                        cols='12, 4'
                        readOnly={readOnly}
                        placeholder='Informe o mês'
                    />
                    <Field name='year' component={LabelAndInput}
                        label='Ano'
                        type='number'
                        cols='12, 4'
                        readOnly={readOnly}
                        placeholder='Informe o ano'
                    />
                    <Summary credit={sumOfCredits} debt={sumOfDebts}/>
                    <ItemList cols='12 6' readOnly={readOnly} list={credits} field='credits' title='Créditos'/>
                    <ItemList cols='12 6' readOnly={readOnly} list={debts} field='debts' title='Débitos' showStatus={true}/>
                </div>
                <div className="box-footer">
                    <button type='submit' className={`btn btn-${this.props.submitClass}`}>
                        {this.props.submitLabel}
                    </button>
                    <button type='button' onClick={this.props.init} className="btn btn-default">Cancel</button>
                </div>                
            </form>
        )
    }
}


// a propriedade 'destroyOnUnmount' controla a manutenção dos dados do formulário quando o mesmo for destruido
BillingCycleForm = reduxForm({form: 'billingCycleForm', destroyOnUnmount: false})(BillingCycleForm)

const selector = formValueSelector('billingCycleForm')

// Mapeamento feito para ppegar o atributo do formulário, controlado pelo 'reduxForm'
// selecto recebe ('o state', 'nome do atributo que está no formulário')
const mapStateToProps = state => ({
    credits: selector(state, 'credits'),
    debts: selector(state, 'debts')
})

const mapDispatchToProps = dispatch => bindActionCreators({init}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(BillingCycleForm)