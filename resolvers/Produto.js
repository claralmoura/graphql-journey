module.exports = {
    precoComDesconto(produto) {
        if(produto.desconto !== null)
            return produto.preco - produto.preco * (produto.desconto/100)
        else return null
    }
}