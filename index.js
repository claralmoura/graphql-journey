const { ApolloServer, gql } = require('apollo-server')

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