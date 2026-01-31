import {
  ActionIcon,
  Modal as MantineModal,
  type TransitionOverride,
} from '@mantine/core';
import type { Ref } from 'react';
import { MdArrowBack } from 'react-icons/md';

const noop = () => {};

export const Modal = ({
  opened,
  onClose,
  title,
  onBack,
  children,
  ref,
  transitionProps,
}: {
  title: string;
  opened: boolean;
  onClose?: () => void;
  onBack?: () => void;
  children: React.ReactNode;
  ref?: Ref<HTMLDivElement>;
  transitionProps?: TransitionOverride;
}) => {
  return (
    <MantineModal.Root
      opened={opened}
      onClose={onClose || noop}
      fullScreen={true}
      transitionProps={transitionProps}
    >
      <MantineModal.Overlay />
      <MantineModal.Content ref={ref} pos="relative">
        <MantineModal.Header>
          {onBack ? (
            <ActionIcon color="text" variant="transparent" onClick={onBack}>
              <MdArrowBack size={24} />
            </ActionIcon>
          ) : null}
          <MantineModal.Title
            styles={{
              title: {
                textAlign: 'center',
                fontWeight: 'bold',
                width: '100%',
              },
            }}
          >
            {title}
          </MantineModal.Title>
          {onClose ? <MantineModal.CloseButton /> : null}
        </MantineModal.Header>
        <MantineModal.Body>{children}</MantineModal.Body>
      </MantineModal.Content>
    </MantineModal.Root>
  );
};
