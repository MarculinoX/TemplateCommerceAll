import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productService } from '../../services/productService';

const ProdutoDetails = () => {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const data = await productService.getProdutoById(id);
        setProduto(data);
      } catch (error) {
        console.error('Error fetching produto:', error);
      }
    };
    fetchProduto();
  }, [id]);

  if (!produto) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{produto.name}</h1>
        <div>
          <Link
            to={`/produtos/${produto.id}/edit`}
            className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          >
            Editar
          </Link>
          <button
            onClick={() => productService.deleteProduto(produto.id)}
            className="bg-red-500 text-white active:bg-red-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          >
            Excluir
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={produto.imageUrl}
            alt={produto.name}
            className="w-full h-auto rounded-lg"
          />
        </div>
        <div>
          <p className="text-gray-600">{produto.description}</p>
          <p className="text-blueGray-800 font-bold text-2xl">
            R$ {produto.price.toFixed(2)}
          </p>
          <p className="text-gray-600">Código: {produto.id}</p>
          <p className="text-gray-600">
            Categoria: {produto.category.name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProdutoDetails;