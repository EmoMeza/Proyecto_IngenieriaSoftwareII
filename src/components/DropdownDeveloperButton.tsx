import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

type DropdownDeveloperButtonProps = {
  id_dev: string;
  onIdDevChange: (newIdDev: string) => void;
};

const DropdownDeveloperButton: React.FC<DropdownDeveloperButtonProps> = ({
  id_dev,
  onIdDevChange,
}) => {
  const handleDropdownItemClick = (newIdDev: string) => {
    onIdDevChange(newIdDev);
  };

  return (
    <DropdownButton size="lg" id="dropdown-button-dark" variant= "secondary"title="Desarrollador">
      <Dropdown.Item href={"#id_developer="+id_dev} onClick={() => handleDropdownItemClick('1')}>
        {id_dev} - Action
      </Dropdown.Item>
      <Dropdown.Item href={"#id_developer="+id_dev} onClick={() => handleDropdownItemClick('2')}>
        {id_dev} - Another action
      </Dropdown.Item>
      <Dropdown.Item href={"#id_developer="+id_dev} onClick={() => handleDropdownItemClick('3')}>
        {id_dev} - Something else
      </Dropdown.Item>
      <Dropdown.Item href={"#id_developer="+id_dev} onClick={() => handleDropdownItemClick('4')}>
        {id_dev} - Something else
      </Dropdown.Item>
      <Dropdown.Item href={"#id_developer="+id_dev} onClick={() => handleDropdownItemClick('5')}>
        {id_dev} - Something else
      </Dropdown.Item>
    </DropdownButton>
  );
};

export default DropdownDeveloperButton;