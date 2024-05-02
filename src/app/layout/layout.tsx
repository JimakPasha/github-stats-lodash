import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import { Header } from "../../widgets";

export const Layout = () => {
  return (
    <>
      <Header />
      <Container>
        <main>
          <Outlet />
        </main>
      </Container>
    </>
  );
};
