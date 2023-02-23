import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useAuthContext } from "../../shared/contexts";
import * as yup from "yup";

interface ILoginProps {
  children: React.ReactNode;
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(5),
});

export const Login: React.FC<ILoginProps> = ({ children }) => {
  const { isAuthenticated, login } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setSenha] = useState("");
  const [emailErro, setEmailErro] = useState("");
  const [senhaErro, setSenhaErro] = useState("");

  const entrar = () => {
    schema
      .validate({ email, password }, { abortEarly: false })
      .then((dadosvalidados) => {
        login(dadosvalidados.email, dadosvalidados.password);
      })
      .then(() => {
        setIsLoading(false);
      })

      .catch((err: yup.ValidationError) => {
        setIsLoading(false);
        err.inner.forEach((erro) => {
          if (erro.path === "password") {
            setSenhaErro(erro.message);
          } else if (erro.path === "email") {
            setEmailErro(erro.message);
          }
        });
      });
  };

  if (isAuthenticated) return <>{children}</>;
  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center">
      <Card>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={2} width={250}>
            <Typography variant="h6" align="center">
              {" "}
              Indentifique{" "}
            </Typography>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              disabled={isLoading}
              error={!!emailErro}
              helperText={emailErro}
              onKeyDown={() => setEmailErro("")}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              label="password"
              type="password"
              value={password}
              disabled={isLoading}
              error={!!senhaErro}
              helperText={senhaErro}
              onKeyDown={() => setSenhaErro("")}
              onChange={(e) => setSenha(e.target.value)}
            />
          </Box>
        </CardContent>
        <CardActions>
          <Box width="100%" display="flex" justifyContent="center">
            <Button
              variant="contained"
              disabled={isLoading}
              onClick={entrar}
              endIcon={
                isLoading ? (
                  <CircularProgress
                    variant="indeterminate"
                    color="inherit"
                    size={20}
                  />
                ) : undefined
              }>
              Entar
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};
/*
 import { useState } from "react";
 import {
   Box,
   Button,
   Card,
   CardActions,
   CardContent,
   CircularProgress,
   TextField,
   Typography,
 } from "@mui/material";
 import * as yup from "yup";

 import { useAuthContext } from "../../contexts";

 const loginSchema = yup.object().shape({
   email: yup.string().email().required(),
   password: yup.string().required().min(5),
 });

 interface ILoginProps {
   children: React.ReactNode;
 }
 export const Login: React.FC<ILoginProps> = ({ children }) => {
   const { isAuthenticated, login } = useAuthContext();

   const [isLoading, setIsLoading] = useState(false);

   const [passwordError, setPasswordError] = useState("");
   const [emailError, setEmailError] = useState("");
   const [password, setPassword] = useState("");
   const [email, setEmail] = useState("");

   const handleSubmit = () => {
     setIsLoading(true);

     loginSchema
       .validate({ email, password }, { abortEarly: false })
       .then((dadosValidados) => {
         login(dadosValidados.email, dadosValidados.password).then(() => {
           setIsLoading(false);
         });
       })
       .catch((errors: yup.ValidationError) => {
         setIsLoading(false);

         errors.inner.forEach((error) => {
           if (error.path === "email") {
             setEmailError(error.message);
           } else if (error.path === "password") {
             setPasswordError(error.message);
           }
         });
       });
   };

   if (isAuthenticated) return <>{children}</>;

   return (
     <Box
       width="100vw"
       height="100vh"
       display="flex"
       alignItems="center"
       justifyContent="center"
       <Card>>
         <CardContent>
           <Box display="flex" flexDirection="column" gap={2} width={250}>
             <Typography variant="h6" align="center">
               Identifique-se
             </Typography>

             <TextField
               fullWidth
               type="email"
               label="Email"
               value={email}
               disabled={isLoading}
               error={!!emailError}
               helperText={emailError}
               onKeyDown={() => setEmailError("")}
               onChange={(e) => setEmail(e.target.value)}
             />

             <TextField
               fullWidth
               label="password"
               type="password"
               value={password}
               disabled={isLoading}
               error={!!passwordError}
               helperText={passwordError}
               onKeyDown={() => setPasswordError("")}
               onChange={(e) => setPassword(e.target.value)}
             />
           </Box>
         </CardContent>
         <CardActions>
           <Box width="100%" display="flex" justifyContent="center">
             <Button
               variant="contained"
               disabled={isLoading}
               onClick={handleSubmit}
               endIcon={
                 isLoading ? (
                   <CircularProgress
                     variant="indeterminate"
                     color="inherit"
                     size={20}
                   />
                 ) : undefined
               }>
               Entrar
             </Button>
           </Box>
         </CardActions>
       </Card>
     </Box>
   );
 };

 */
