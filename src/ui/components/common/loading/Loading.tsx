import { Box, Loader, LoadingOverlay, Text } from '@mantine/core';

export type LoadingProps = {
  message?: string;
  visible: true;
};

export const Loading = ({ message, visible }: LoadingProps) => {
  return (
    <Box
      pos="fixed"
      style={{
        minHeight: '100vh',
        top: 0,
        left: 0,
        width: '100vw',
      }}
    >
      <LoadingOverlay
        visible={visible}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
        loaderProps={{
          children: (
            <>
              <Loader />
              {message ? <Text>{message}</Text> : null}
            </>
          ),
        }}
      />
    </Box>
  );
};
