import {
  desenharProdutoCarrinhoSimples,
  lerLocalStorage,
  apagarDoLocalStorage,
  salvarLocalStorage,
} from "./src/utilidades";

function desenharProdutosCheckout() {
  const idsProdutoCarrinhoComQuantidade = lerLocalStorage("carrinho") ?? {};
  for (const idProduto in idsProdutoCarrinhoComQuantidade) {
    desenharProdutoCarrinhoSimples(
      idProduto,
      "container-produtos-checkout",
      idsProdutoCarrinhoComQuantidade[idProduto]
    );
  }
}

function finalizarCompra(evento) {
  evento.preventDefault();
  const idsProdutoCarrinhoComQuantidade = lerLocalStorage("carrinho") ?? {};
  if (Object.keys(idsProdutoCarrinhoComQuantidade).length === 0) {
    return;
  }

  const dataAtual = new Date();
  const pedidoFeito = {
    dataPedido: dataAtual,
    pedido: idsProdutoCarrinhoComQuantidade,
  };
  const historicoDePedidos = lerLocalStorage("historico") ?? [];
  const historicoDePedidosAtualizado = [pedidoFeito, ...historicoDePedidos];

  salvarLocalStorage("historico", historicoDePedidosAtualizado);
  apagarDoLocalStorage("carrinho");

  window.location.href = "./pedidos.html";
}

function atualizarPrecoCheckout(){
  const preco = localStorage.getItem('preco-total');

  document.getElementById('preco-total').innerText = `Total $${preco}`;
}

atualizarPrecoCheckout();

desenharProdutosCheckout();

document.addEventListener("submit", (evt) => finalizarCompra(evt));