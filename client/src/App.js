import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import Stations from "scenes/stations";
import Customers from "scenes/customers";
import Reports from "scenes/reports";
import Overview from "scenes/overview"
import Breakdown from "scenes/breakdown";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />}/>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/stations" element={<Stations />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/breakdown" element={<Breakdown />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>);
}

export default App;
