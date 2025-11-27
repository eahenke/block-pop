import { Button, Text } from '@mantine/core';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';

type SortButtonProps = {
  asc: boolean;
  selected: boolean;
  onClick: () => void;
  children: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};

export const SortButton = ({
  children,
  asc,
  selected,
  onClick,
  size,
}: SortButtonProps) => {
  return (
    <Button
      variant="text"
      size={size}
      onClick={onClick}
      rightSection={
        selected ? (
          asc ? (
            <MdArrowDropUp size={24} />
          ) : (
            <MdArrowDropDown size={24} />
          )
        ) : null
      }
    >
      {selected ? (
        <Text td="underline">{children}</Text>
      ) : (
        <Text>{children}</Text>
      )}
    </Button>
  );
};
