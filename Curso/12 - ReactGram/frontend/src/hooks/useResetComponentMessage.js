// Redux
import { resetMessage } from '../slices/photoSlice'

export const useResetComponentMessage = (dispatch) => {
    return () => {
        // Esconde a mensagem depois de 2 segundos
        setTimeout(() => {
            dispatch(resetMessage())
        }, 2000)
    }
}