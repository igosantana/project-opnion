import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { LoginMain, LoginContainer } from "./styled";
import Button from "../../components/Button/index";
import { useContext } from "react";
import { UserContext } from "../../Providers/users";
import HeaderHome from "../../components/HeaderHome";
import MenuNav from "../../components/MenuNav";
import { useHistory } from "react-router-dom";

const Login = () => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Insira um e-mail válido")
      .email("Insira um e-mail válido"),
    password: yup
      .string()
      .required("Insira sua senha")
      .min(6, "Insira uma senha de no mínimo 6 dígitos"),
  });
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { userCurrentLogin } = useContext(UserContext);

  const onSubmit = (data) => {
    userCurrentLogin(data, history);
  };

  return (
    <>
      <HeaderHome />
      <MenuNav hiddenSearch hiddenMyAccount />
      <LoginMain>
        <LoginContainer>
          <h2>Entrar na sua conta</h2>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <TextField
                className="register-input"
                size="small"
                label="E-mail"
                placeholder="Digite seu nome"
                {...register("email")}
              />
              <p>{errors.email?.message}</p>
              <TextField
                size="small"
                className="register-input"
                label="Senha"
                placeholder="Digite sua senha"
                {...register("password")}
                type="password"
              />
              <p>{errors.password?.message}</p>
            </div>
            <div className="login-div-warning">
              <h3>Não tem uma conta?</h3>
              <Link className="Link" to="/register">
                <h3 className="login-h3-border">Crie uma conta</h3>
              </Link>
            </div>
            <Button type="submit">Login</Button>
          </Box>
        </LoginContainer>
      </LoginMain>
    </>
  );
};

export default Login;
