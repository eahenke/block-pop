import { ActionIcon, Modal as MantineModal } from '@mantine/core';
import { MdArrowBack } from 'react-icons/md';

export const Modal = ({
  opened,
  onClose,
  title,
  onBack,
  children,
}: {
  title: string;
  opened: boolean;
  onClose: () => void;
  onBack?: () => void;
  children: React.ReactNode;
}) => {
  return (
    <MantineModal.Root opened={opened} onClose={onClose} fullScreen={true}>
      <MantineModal.Overlay />
      <MantineModal.Content>
        <MantineModal.Header>
          {onBack ? (
            <ActionIcon variant="transparent" onClick={onBack}>
              <MdArrowBack size={24} color="black" />
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
          <MantineModal.CloseButton />
        </MantineModal.Header>
        <MantineModal.Body>{children}</MantineModal.Body>
      </MantineModal.Content>
    </MantineModal.Root>
  );
};
