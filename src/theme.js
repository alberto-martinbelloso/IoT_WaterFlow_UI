// src/ui/theme/index.js

import { createMuiTheme } from '@material-ui/core/styles';

const palette = {
    primary: { main: '#455458' },
    secondary: { main: '#00BCD4' }
};
const themeName = "River Bed Robin's Egg Blue Mouse";

export default createMuiTheme({ palette, themeName });
