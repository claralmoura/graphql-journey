const { perfis, proximoId } = require('../../data/db')

function indicePefil(filtro) {
    if(!filtro) return -1
    const { id, nome } = filtro
    if(id) {
        return perfis
            .findIndex(p => p.id === id)
    } else if(nome) {
        return perfis
            .findIndex(p => p.nome === nome)
    }
    return -1
}

module.exports = {
    novoPerfil(_, { dados }) {
        const nomeExistente = perfis
            .some(p => p.nome === dados.nome)

        if(nomeExistente) {
            throw new Error('Perfil já cadastrado')
        }

        const novo = {
            id: proximoId(),
            ...dados,
        }

        perfis.push(novo)
        return novo
    },

    excluirPerfil(_, { filtro }) {
        const i = indicePefil(filtro)

        if(i < 0) return null

        const excluidos = 
            perfis.splice(i, 1)
        return excluidos ? 
            excluidos[0] : null
    },

    alterarPerfil(_, { dados, filtro }) {
        const i = indicePefil(filtro)
        
        if(i < 0) return null

        perfis[i].nome = dados.nome

        return perfis[i]
    }
}