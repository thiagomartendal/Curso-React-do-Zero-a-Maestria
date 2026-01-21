import './Photo.css'

import {uploads} from '../../utils/config'

// Componenetes
import Message from '../../components/Message'
import { Link } from 'react-router-dom'
import PhotoItem from '../../components/PhotoItem'

// Hooks
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage'

// Redux
import { getPhoto, like, comment } from '../../slices/photoSlice'
import LikeContainer from '../../components/LikeContainer'

const Photo = () => {
    const {id} = useParams()

    const dispatch = useDispatch()

    const resetMessage = useResetComponentMessage(dispatch)

    const {user} = useSelector((state) => state.auth)
    const {photo, loading, error, message} = useSelector((state) => state.photo)

    const [commentText, setComentText] = useState('')

    // Carregar dados da foto
    useEffect(() => {
        dispatch(getPhoto(id))
    }, [dispatch, id])

    // Curtir
    const handleLike = () => {
        dispatch(like(photo._id))

        resetMessage()
    }

    // Comentar
    const handleComment = (e) => {
        e.preventDefault()

        const commentData = {
            id: photo._id,
            comment: commentText
        }

        dispatch(comment(commentData))

        setComentText('')
        
        resetMessage()
    }

    if (loading)
        return <p>Carregando...</p>

    return (
        <div id="photo">
            <PhotoItem photo={photo} />
            <LikeContainer photo={photo} user={user} handleLike={handleLike} />
            <div className="message-container">
                {error && <Message msg={error} type="error" />}
                {message && <Message msg={message} type="success" />}
            </div>
            <div className="comments">
                {photo.comments && (
                    <>
                        <h3>Comentários: ({photo.comments.length})</h3>
                        <form onSubmit={handleComment}>
                            <input type="text" value={commentText || ""} placeholder="Insira o seu comentário..." onChange={(e) => setComentText(e.target.value)} />
                            <input type="submit" value="Enviar" />
                        </form>
                        {photo.comments.length === 0 && (
                            <p>Não há comentários...</p>
                        )}
                        {photo.comments.map((comment) => (
                            <div className="comment" key={comment.comment}>
                                <div className="author">
                                    {comment.userImage && (
                                        <img src={uploads + '/users/' + comment.userImage} alt={comment.userName} />
                                    )}
                                    <Link to={'/users/' + comment.userId}>
                                        <p>{comment.userName}</p>
                                    </Link>
                                </div>
                                <p>{comment.comment}</p>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    )
}

export default Photo