import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, arrayInsert, arrayRemove } from 'redux-form'
import Grid from '../common/layout/Grid'
import Input from '../common/form/Input'
import If from '../common/operador/If'

class ItemList extends Component {


    add(indice, item = {}) {
        if(!this.props.readOnly){
            this.props.arrayInsert('billingCycleForm', this.props.field, indice, item)
        }
    }

    remover(indice) {
        if(!this.props.readOnly && this.props.list.length > 1)
            this.props.arrayRemove('billingCycleForm', this.props.field, indice)
    }

    renderRows() {
        const list = this.props.list || []
        return list.map((item, indice) => (
            <tr key={indice}>
                <td>
                    <Field name={`${this.props.field}[${indice}].name`} component={Input}
                        placeholder='Informe o nome'
                        readOnly={this.props.readOnly}
                    />
                </td>
                <td>
                    <Field name={`${this.props.field}[${indice}].value`} component={Input}
                        placeholder='Informe o valor'
                        readOnly={this.props.readOnly}
                    />
                </td>
                <If test={this.props.showStatus}>
                    <td>
                        <Field name={`${this.props.field}[${indice}].status`} component={Input}
                            placeholder='Status'
                            readOnly={this.props.readOnly}
                        />
                    </td>
                </If>
                <td>
                    <button type='button' className='btn btn-success' onClick={() => this.add(indice + 1)}>
                        <i className='fa fa-plus'></i>
                    </button>
                    <button type='button' className='btn btn-warning' onClick={() => this.add(indice + 1, item)}>
                        <i className='fa fa-clone'></i>
                    </button>
                    <button type='button' className='btn btn-danger' onClick={() => this.remover(indice)}>
                        <i className='fa fa-trash-o'></i>
                    </button>
                </td>
            </tr>
        ))
    }

    render() {
        return(
            <Grid cols={this.props.cols}>
                <fieldset>
                    <legend> {this.props.title} </legend>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Valor</th>
                                <If test={this.props.showStatus}>
                                    <th>Status</th>
                                </If>
                                <th className='table-actions'>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderRows()}
                        </tbody>
                    </table>
                </fieldset>
            </Grid>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ arrayInsert, arrayRemove }, dispatch)

export default connect(null, mapDispatchToProps)(ItemList)