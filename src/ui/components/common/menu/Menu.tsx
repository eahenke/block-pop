import { Button } from '@mantine/core';
import './menu.css';

type MenuItemProps = {
  title: string;
  icon?: React.ReactNode;
  onClick: () => void;
  size?: 'sm' | 'md' | 'lg' | 'xl';
};

const MenuItem = ({ title, icon, onClick, size = 'xl' }: MenuItemProps) => {
  return (
    <Button
      className="menu-item"
      leftSection={icon ? icon : null}
      variant="text"
      onClick={onClick}
      size={size}
    >
      {title}
    </Button>
  );
};

type MenuProps = {
  items: MenuItemProps[];
};

export const Menu = ({ items }: MenuProps) => {
  return (
    <ul className="menu-list">
      {items.map(itemProps => (
        <li key={itemProps.title}>
          <MenuItem {...itemProps} />
        </li>
      ))}
    </ul>
  );
};
