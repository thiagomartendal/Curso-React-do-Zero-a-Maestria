import styles from './CreatePost.module.css'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import { useInsertDocument } from '../../hooks/useInsertDocument'

const CreatePost = () => {
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState('')

  const {user} = useAuthValue()
  const {insertDocument, response} = useInsertDocument('posts')

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

    insertDocument({
      title: title,
      image: image,
      body: body,
      tags: tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    })

    // Redireciona para Home
    navigate('/')
    
  }

  return (
    <div className={styles.create_post}>
      <h2>Criar Post</h2>
      <p>Escreva sobre o que você quiser e compartilhe seu conhecimento!</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input type="text" name="title" value={title} placeholder="Pense em um bom título..." onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label>
          <span>URL da Imagem:</span>
          <input type="text" name="image" value={image} placeholder="Insira uma imagem que represente o seu post" onChange={(e) => setImage(e.target.value)} required />
        </label>
        <label>
          <span>Contúdo:</span>
          <textarea name="body" value={body} placeholder="Insira o conteúdo do post" onChange={(e) => setBody(e.target.value)} required></textarea>
        </label>
        <label>
          <span>Tags:</span>
          <input type="text" name="tags" value={tags} placeholder="Insira as tags separadas por vírgula" onChange={(e) => setTags(e.target.value)} required />
        </label>
        {!response.loading && <button className="btn">Cadastrar</button>}
        {response.loading && <button className="btn" disabled>Aguarde...</button>}
        {response.error && <p className="error">{response.error}</p>}
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default CreatePost