const usuarios = [{
    id: 1,
    nome: 'Maria Silva',
    email: 'mariasilva@email.com',
    idade: 69,
    perfil_id: 1
}, {
    id: 2,
    nome: 'Antonio Medeiros',
    email: 'amedeiros@email.com',
    idade: 20,
    perfil_id: 2
}, {
    id: 3,
    nome: 'João Silva',
    email: 'jsilva@email.com',
    idade: 42,
    perfil_id: 1
}]

const perfis = [{
    id: 1,
    nome: 'Comum'
}, {
    id: 2,
    nome: 'Administrador'
}]

module.exports = { usuarios, perfis }