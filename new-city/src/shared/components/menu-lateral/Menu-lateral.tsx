import { Avatar, Box, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import { useAuthContext, useDrawerContext, useThemeContext } from "../../contexts";

interface Ichildren {
  children: React.ReactNode;
}
interface IListeLinkProps{
   label:string, // texto na opção de menu
   icons:string, // icons
   to: string,// navegação
   onClick: (() => void) | undefined;
}
const ListItemLink : React.FC <IListeLinkProps> = ({ icons, label, onClick, to }) => {
 
   const  navigate = useNavigate(); 

   const path = useResolvedPath(to)// deixa configuração rara as rotas usando em baixo
   const match = useMatch({path: path.pathname, end: false});// verifica se a rota esta selecionada ou não
  

  const handleClick = () => {
    navigate(to);
    onClick?.(); // para saber se e undefined ou void
  }

  return (
    <ListItemButton selected={!!match} onClick={handleClick} >
      <ListItemIcon>
        <Icon>{icons}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
}

export const MenuLateral: React.FC<Ichildren> = ({ children }) => {
  const theme = useTheme();
  
  const smDown = useMediaQuery(theme.breakpoints.down('sm')) // down tela menor
 
  const { isdrawerOpen, toggleDrawerOpen, drawerOptions} = useDrawerContext();

  const {toggleTheme} = useThemeContext();
  const {logout} = useAuthContext();

  return (
    <>
      <Drawer
        open={isdrawerOpen}
        variant={smDown ? "temporary" : "permanent"}
        onClose={toggleDrawerOpen}>
        <Box
          width={theme.spacing(28)} // largura barra
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
          <Box
            flex={1} // ocupa todo o espaço  da barra
          >
            <List component="nav">
              {drawerOptions.map((drawerOptions) => (
                <ListItemLink
                  key={drawerOptions.path}
                  icons={drawerOptions.icons}
                  label={drawerOptions.label}
                  to={drawerOptions.path}
                  onClick={smDown ? toggleDrawerOpen : undefined} // quando clica em pagina inicial elelescond o draw ou vice versa
                />
              ))}
            </List>
          </Box>
          <Box>
            <List component="nav">
              <ListItemButton onClick={toggleTheme}>
                <ListItemIcon>
                  <Icon>bedtime</Icon>
                </ListItemIcon>
                <ListItemText primary="Alternar tema" />
              </ListItemButton>
            </List>
            <List component="nav">
              <ListItemButton onClick={logout}>
                <ListItemIcon>
                  <Icon>logout</Icon>
                </ListItemIcon>
                <ListItemText primary="Sair" />
              </ListItemButton>
            </List>
          </Box>
        </Box>
      </Drawer>
      <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </> //o (<> fragmente e para aceitar do lado o menu lateral, se não colocar não tem como aceitar)
  );
}; 











// o primeiro box e parta a fastar a home o segundo e para deixar dentro o que quiser

// <Drawer open = {true} variant="persistent" > //3 open e para abrir na lateral, variant e para ser flexivel aberto ou fechado
// <Box height='100vh' marginLeft={theme.spacing(28)} > //3 1 = 4px e por isso que usa theme.spacing(28) e igual a 112 px para a direita etão os itens da home fica distate da barra lateral
/*
  <Box flex={1}>
            <List component="nav">
              <ListItemButton>
                <ListItemIcon>
                  <Icon>
                    home // 3 toda essa estilização de de um componete do mui que o menu lateral, 
                  </Icon>
                </ListItemIcon>
                <ListItemText primary="Menu inicial" />
              </ListItemButton>
            </List>
          </Box>
*/  
 // 1e uma lista e uma lista = https://mui.com/material-ui/react-list/ no menu select
/*
  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <List component="nav" aria-label="main mailbox folders">// 1 começa aqui
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItemButton> //3 termina aqui
        <ListItemButton
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItemButton>
      </List>
      <Divider />
      <List component="nav" aria-label="secondary mailbox folder">
        <ListItemButton
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}>
          <ListItemText primary="Trash" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3)}>
          <ListItemText primary="Spam" />
        </ListItemButton>
      </List>
    </Box>
  );
}
*/