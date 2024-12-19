import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../../services/productService';

const ProdutosList = () => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const data = await productService.getAllProdutos();
        setProdutos(data);
      } catch (error) {
        console.error('Error fetching produtos:', error);
      }
    };
    fetchProdutos();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Produtos</h1>
        <Link
          to="/produtos/novo"
          className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        >
          Novo Produto
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {produtos.map((produto) => (
          <div
            key={produto.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={produto.imageUrl}
              alt={produto.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold">{produto.name}</h3>
              <p className="text-gray-600">{produto.description}</p>
              <p className="text-blueGray-800 font-bold">
                R$ {produto.price.toFixed(2)}
              </p>
              <div className="mt-4 flex justify-end">
                <Link
                  to={`/produtos/${produto.id}`}
                  className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                >
                  Ver Detalhes
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProdutosList;