// Primeiro desafio: criar uma query que retorna um new Date() em String

const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
    type Query {
        ola: String
        horaAtual: String
    }
`

const resolvers = {
    Query:{
        ola() {
            return 'Retornando String'
        },
        horaAtual() {
            return String(new Date())
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