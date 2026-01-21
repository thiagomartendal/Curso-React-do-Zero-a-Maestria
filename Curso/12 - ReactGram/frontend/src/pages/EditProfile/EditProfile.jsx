import './EditProfile.css'

import { uploads } from '../../utils/config'

// Hooks
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// Redux
import { profile, resetMessage, updateProfile } from '../../slices/userSlice'

// Componentes
import Message from '../../components/Message'

const EditProfile = () => {
    const dispatch = useDispatch()

    const {user, message, error, loading} = useSelector((state) => state.user)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [profileImage, setProfileImage] = useState('')
    const [bio, setBio] = useState('')
    const [previewImage, setPreviewImage] = useState('')

    // Carregar dados do usuário na variável user
    useEffect(() => {
        dispatch(profile())
    }, [dispatch])

    // Preenche o formulário com os dados do usuário
    useEffect(() => {
        if (user) {
            setName(user.name)
            setEmail(user.email)
            setBio(user.bio)
        }
    }, [user])

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Retornar os dados do usuário dos estados
        const userData = {
            name: name
        }

        if (profileImage)
            userData.profileImage = profileImage

        if (bio)
            userData.bio = bio

        if (password)
            userData.password = password

        // Construir objeto formData
        const formData = new FormData()

        const userFormData = Object.keys(userData).forEach((key) => formData.append(key, userData[key]))

        formData.append('user', userFormData)

        await dispatch(updateProfile(formData))

        // Esconde a mensagem de sucesso depois de 2 segundos
        setTimeout(() => {
            dispatch(resetMessage())
        }, 2000)
    }

    const handleFile = (e) => {
        // Preview da imagem
        const image = e.target.files[0]

        setPreviewImage(image)
        setProfileImage(image)
    }

    return (
        <div id="edit-profile">
            <h2>Edite seus dados</h2>
            <p className="subtitle">Adicione uma imagem de perfil e conte mais sobre você...</p>
            {(user.profileImage || previewImage) && (
                <img
                    src={
                        previewImage
                        ? URL.createObjectURL(previewImage)
                        : uploads + '/users/' + user.profileImage
                    }
                    alt={user.name}
                    className="profile-image"
                />
            )}
            <form onSubmit={handleSubmit}>
                <input type="text" value={name || ""} placeholder="Nome" onChange={(e) => setName(e.target.value)} />
                <input type="email" value={email || ""} placeholder="Email" disabled />
                <label>
                    <span>Imagem do Perfil:</span>
                    <input type="file" onChange={handleFile} />
                </label>
                <label>
                    <span>Bio:</span>
                    <input type="text" value={bio || ""} placeholder="Descrição do perfil" onChange={(e) => setBio(e.target.value)} />
                </label>
                <label>
                    <span>Quer alterar sua senha?</span>
                    <input type="password" value={password || ""} placeholder="Digite sua nova senha" onChange={(e) => setPassword(e.target.value)} />
                </label>
                {!loading && <input type="submit" value="Atualizar" />}
                {loading && <input type="submit" value="Aguarde..." disabled />}
                {error && <Message msg={error} type="error" />}
                {message && <Message msg={message} type="success" />}
            </form>
        </div>
    )
}

export default EditProfile