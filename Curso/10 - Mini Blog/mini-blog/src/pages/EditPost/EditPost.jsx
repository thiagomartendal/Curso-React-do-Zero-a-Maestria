import styles from './EditPost.module.css'

import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import { useUpdateDocument } from '../../hooks/useUpdateDocument'
import { useFetchDocument } from '../../hooks/useFetchDocument'

const EditPost = () => {
  const {id} = useParams()
  const {document: post} = useFetchDocument('posts', id)

  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState('')

  useEffect(() => {
    if (post) {
      setTitle(post.title)
      setBody(post.body)
      setImage(post.image)
      const textTags = post.tags.join(', ')
      setTags(textTags)
    }
  }, [post])

  const {user} = useAuthValue()
  const {updateDocument, response} = useUpdateDocument('posts')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormError('')

    // Validação da url da imagem
    try {
      new URL(image)
    } catch(error) {
      setFormError('A imagem precisa ser uma URL.')
    }

    // Criar o array de tags
    const tagsArray = tags.split(',').map((tag) => tag.trim().toLowerCase())

    // Checar todos os valores
    if (!title || !image || !body || !tags)
      setFormError('Por favor, preencha todos os campos.')

    if (formError) return

    const data = {
      title: title,
      image: image,
      body: body,
      tags: tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    }

    updateDocument(id, data)

    // Redireciona para Home
    navigate('/dashboard')
    
  }

  return (
    <div className={styles.edit_post}>
      {post && (
        <>
          <h2>Editando o Post: {post.title}</h2>
          <p>Altere os dados do post como desejar</p>
          <form onSubmit={handleSubmit}>
            <label>
              <span>Título:</span>
              <input type="text" name="title" value={title} placeholder="Pense em um bom título..." onChange={(e) => setTitle(e.target.value)} required />
            </label>
            <label>
              <span>URL da Imagem:</span>
              <input type="text" name="image" value={image} placeholder="Insira uma imagem que represente o seu post" onChange={(e) => setImage(e.target.value)} required />
            </label>
            <p className={styles.preview_title}>Imagem atual</p>
            <img className={styles.image_preview} src={post.image} alt={post.title} />
            <label>
              <span>Contúdo:</span>
              <textarea name="body" value={body} placeholder="Insira o conteúdo do post" onChange={(e) => setBody(e.target.value)} required></textarea>
            </label>
            <label>
              <span>Tags:</span>
              <input type="text" name="tags" value={tags} placeholder="Insira as tags separadas por vírgula" onChange={(e) => setTags(e.target.value)} required />
            </label>
            {!response.loading && <button className="btn">Editar</button>}
            {response.loading && <button className="btn" disabled>Aguarde...</button>}
            {response.error && <p className="error">{response.error}</p>}
            {formError && <p className="error">{formError}</p>}
          </form>
        </>
      )}
    </div>
  )
}

export default EditPost