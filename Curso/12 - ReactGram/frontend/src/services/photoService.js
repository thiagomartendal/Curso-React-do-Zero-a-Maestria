import { api, requestConfig } from '../utils/config'

// Publicar foto do usuário
const publishPhoto = async (data, token) => {
    const config = requestConfig('POST', data, token, true)

    try {
        const res = await fetch(api + '/photos', config)
            .then((res) => res.json())
            .catch((err) => err)
        
        return res
    } catch (error) {
        console.log(error)
    }
}

// Retornar fotos do usuário
const getUserPhotos = async (id, token) => {
    const config = requestConfig('GET', null, token)

    try {
        const res = fetch(api + '/photos/user/' + id, config)
            .then((res) => res.json())
            .catch((err) => err)
        
            return res
    } catch (error) {
        console.log(error)
    }
}

// Escluir uma Foto
const deletePhoto = async (id, token) => {
    const config = requestConfig('DELETE', null, token)

    try {
        const res = await fetch(api + '/photos/' + id, config)
            .then((res) => res.json())
            .catch((err) => err)
        
            return res
    } catch (error) {
        console.log(error)
    }
}

// Atualizar uma foto
const updatePhoto = async (data, id, token) => {
    const config = requestConfig('PUT', data, token)

    try {
        const res = await fetch(api + '/photos/' + id, config)
            .then((res) => res.json())
            .catch((err) => err)

        return res
    } catch (error) {
        console.log(error)
    }
}

// Retorna a foto pelo id
const getPhoto = async (id, token) => {
    const config = requestConfig('GET', null, token)

    try {
        const res = await fetch(api + '/photos/' + id, config)
            .then((res) => res.json())
            .catch((err) => err)

        return res
    } catch (error) {
        console.log(error)
    }
}

// Curtida em uma foto
const like = async (id, token) => {
    const config = requestConfig('PUT', null, token)

    try {
        const res = await fetch(api + '/photos/like/' + id, config)
            .then((res) => res.json())
            .catch((err) => err)
        
        return res
    } catch (error) {
        console.log(error)
    }
}

// Comentário em uma foto
const comment = async (data, id, token) => {
    const config = requestConfig('PUT', data, token)

    try {
        const res = await fetch(api + '/photos/comment/' + id, config)
            .then((res) => res.json())
            .catch((err) => err)
        
        return res
    } catch (error) {
        console.log(error)
    }
}

// Retorna todas as fotos
const getPhotos = async (token) => {
    const config = requestConfig('GET', null, token)

    try {
        const res = await fetch(api + '/photos', config)
            .then((res) => res.json())
            .catch((err) => err)
        
            return res
    } catch (error) {
        console.log(error)
    }
}

// Buscar foto por título
const searchPhotos = async (query, token) => {
    const config = requestConfig('GET', null, token)

    try {
        const res = await fetch(api + '/photos/search?q=' + query, config)
            .then((res) => res.json())
            .catch((err) => err)

        return res
    } catch (error) {
        console.log(error)
    }
}

const photoService = {
    publishPhoto,
    getUserPhotos,
    deletePhoto,
    updatePhoto,
    getPhoto,
    like,
    comment,
    getPhotos,
    searchPhotos
}

export default photoService