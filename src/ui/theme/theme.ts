import { Button, createTheme } from '@mantine/core';
import buttonClasses from './css/button.module.css';

export const theme = createTheme({
  fontFamily: 'Open Sans',
  components: {
    Button: Button.extend({
      classNames: buttonClasses,
    }),
  },
});
