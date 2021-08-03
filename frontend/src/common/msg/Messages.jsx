import React from 'react'

// Para exibir mensagens no sistemas
import ReduxToastr from 'react-redux-toastr'
import 'modules/react-redux-toastr/lib/css/react-redux-toastr.css'

export default (props) => {
    return(
        // Configurações de como as mensagens serão exibidas
        <ReduxToastr
            timeOut={4000}
            newestOnTop={false}
            preventDuplicates={true}
            position='top-right'
            transitionIn='fadeIn'
            transitionOut='fadeOut'
            progressBar
        />
    )
}