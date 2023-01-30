import { Avatar, Box, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useTheme } from "@mui/material";
import React from "react";

interface Ichildren {
  children: React.ReactNode;
}

export const MenuLateral: React.FC<Ichildren> = ({ children }) => {
  const theme = useTheme();
  return (
    <>
      <Drawer variant="permanent">
        <Box
          width={theme.spacing(18)}
          height="100%"
          display="flex"
          flexDirection="column">
          <Box
            width="100%"
            height={theme.spacing(20)}
            display="flex"
            alignItems="center"
            justifyContent="center">
            <Avatar
              sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
              alt="Imagem"
              src="https://www.adobe.com/br/express/feature/image/media_1bb4d071398492506a1b76b3b6f9d69a5e96d7ffc.png?width=750&format=png&optimize=medium"
            />
          </Box>
          <Divider />
          <Box flex={1}>
            <List component="nav">
              <ListItemButton>
                <ListItemIcon>
                  <Icon>
                    home
                  </Icon>
                </ListItemIcon>
                <ListItemText primary="Menu inicial" />
              </ListItemButton>
            </List>
          </Box>
        </Box>
      </Drawer>
      <Box height="100vh" marginLeft={theme.spacing(28)}>
        {children}
      </Box>
    </> //o (<> fragmente e para aceitar do lado o menu lateral, se não colocar não tem como aceitar)
  );
}; // o primeiro box e parta a fastar a home o segundo e para deixar dentro o que quiser

// <Drawer open = {true} variant="persistent" > //3 opem e para abrir na lateral, variant e para ser flexivel aberto ou fechado
// <Box height='100vh' marginLeft={theme.spacing(28)} > //3 1 = 4px e por isso que usa theme.spacing(28) e igual a 112 px para a direita etão os itens da home fica distate da barra lateral
