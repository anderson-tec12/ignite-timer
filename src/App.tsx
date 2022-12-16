import { GlobalStyles } from "./styles/globals";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";

import { Router } from "./Routes/Router";
import { CycleContextProvider } from "./contexts/cycles";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CycleContextProvider>
        <Router />
      </CycleContextProvider>
      <GlobalStyles />
    </ThemeProvider>
  );
}
