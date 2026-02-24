import { Box, Group, Text } from '@mantine/core';

const FaceBlock = ({
  className,
  mouth,
}: {
  className: string;
  mouth: string;
}) => {
  return (
    <Box
      className={className}
      w={100}
      h={100}
      style={{ transform: 'rotate(90deg)' }}
    >
      <Group justify="center" align="center" h="100%">
        <Text c={'black'} size="64px" mb="xs">
          :
        </Text>
        <Text c={'black'} size="32px">
          {mouth}
        </Text>
      </Group>
    </Box>
  );
};

export const ErrorScreen = () => {
  return (
    <Group justify="center" align="center" h={'100vh'}>
      <Box>
        <Group justify="center" align="center" h="100%">
          <FaceBlock className="tile-2" mouth="/" />
          <FaceBlock className="tile-1" mouth="(" />
          <FaceBlock className="tile-3" mouth="o" />
          <FaceBlock className="tile-4" mouth="|" />
          <FaceBlock className="tile-5" mouth="ᗡ" />
        </Group>
        <Text mt="xl">That's an error. Refresh to try again.</Text>
      </Box>
    </Group>
  );
};
