import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useState, useEffect } from 'react';

type Product = {
  id: number,
  id_encargado: number,
  nombre: string
}

const getProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/products/all")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);
  return products;
};

type DropdownProductButtonProps = {
  id_dev: string;
  nombre: string;
  onIdDevChange: (id_dev: number, nombre: string) => void;
};
const DropdownProductButton: React.FC<DropdownProductButtonProps> = ({
  id_dev,
  nombre,
  onIdDevChange,
}) => {
  const [selectedOption, setSelectedOption] = useState<string|null>(null);
  const handleDropdownItemClick = (product: Product) => {
    setSelectedOption(product.nombre);
    onIdDevChange(product.id, product.nombre);
  };
  const products = getProducts();
  return (
    <DropdownButton
      size="lg"
      id="dropdown-button-dark"
      variant="secondary" 
      title={selectedOption ? selectedOption: "Producto"}
      >
      {products.map((value: Product) => (
        <Dropdown.Item href={"#" + value.nombre} onClick={() => handleDropdownItemClick(value)}>
          {value.nombre}
        </Dropdown.Item>
      ))}

    </DropdownButton>
  );
};

export default DropdownProductButton;