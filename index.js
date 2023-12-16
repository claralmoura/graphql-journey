const { ApolloServer, gql } = require('apollo-server')

const usuarios = [{
    id: 1,
    nome: 'Maria Silva',
    email: 'mariasilva@email.com',
    idade: 69
}, {
    id: 2,
    nome: 'Antonio Medeiros',
    email: 'amedeiros@email.com',
    idade: 20
}, {
    id: 3,
    nome: 'João Silva',
    email: 'jsilva@email.com',
    idade: 42
}]

const perfis = [{
    id: 1,
    nome: 'Comum'
}, {
    id: 2,
    nome: 'Administrador'
}]

const typeDefs = gql`
    scalar Date

    type Usuario {
        id: ID!
        nome: String!
        email: String!
        idade: Int
        salario: Float
        vip: Boolean
    }

    type Perfil {
        id: ID!
        nome: String!
    }

    type Produto {
        nome: String!
        preco: Float!
        desconto: Float
        precoComDesconto: Float
    }

    type Query {
        ola: String!
        horaAtual: Date!
        usuarioLogado: Usuario
        produtoEmDestaque: Produto
        numerosMegaSena: [Int!]!
        usuarios: [Usuario]
        usuario(id: ID): Usuario
        perfis: [Perfil]
        perfil(id: ID): Perfil
    }
`

const resolvers = {
    Usuario: {
        salario(usuario) {
            return usuario.salario_real
        }
    },

    Produto: {
        precoComDesconto(produto) {
            if(produto.desconto !== null)
                return produto.preco - produto.preco * (produto.desconto/100)
            else return null
        }
    },

    Query: {
        ola() {
            return 'Retornando String'
        },
        horaAtual() {
            return new Date
        },
        usuarioLogado() {
            return {
                id: 1,
                nome: 'Clara',
                email: 'clara@email.com',
                idade: 20,
                salario_real: 1234.56,
                vip: true
            }
        },
        produtoEmDestaque() {
            return {
                nome: 'Liquidificador',
                preco: 100.00,
                desconto: 20.00,
            }
        },
        numerosMegaSena() {
            // return [4, 8, 13, 27, 33, 54]
            const crescente = (a, b) => a - b
            return Array(6).fill(0)
                    .map(n => parseInt(Math.random() * 60 + 1))
                    .sort(crescente)
        },
        usuarios() {
            return usuarios
        },
        usuario(_, args) {
            const sels = usuarios
                .filter(u => u.id == args.id)
            return sels ? sels[0] : null
        },
        perfis() {
            return perfis
        },
        perfil(_, { id }) {
            const sels = perfis
                .filter(u => u.id == id)
            return sels ? sels[0] : null
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen().then(({ url }) => {
    console.log(`Executando em ${url}`)
})