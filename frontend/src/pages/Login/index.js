import React, { useState, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { i18n } from "../../translate/i18n";

import { AuthContext } from "../../context/Auth/AuthContext";
import logo from "../../assets/logo_login.png";
import WhatsAppIcon from "@material-ui/icons/WhatsApp"; // Ícone do WhatsApp
const randomImageURL = "https://source.unsplash.com/random/?tech";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
    background: `url(${randomImageURL}) center/cover no-repeat`,
    //background: "linear-gradient(to top, rgb(14 14 14) 0%, rgb(44 201 146) 100%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  paper: {
    //backgroundColor: "rgba(255, 255, 255, 0.8)", // Fundo semi-transparente
    backgroundColor: theme.palette.background.paper,
    borderRadius: "35px",
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "6px solid transparent", // Adiciona uma borda transparente
    boxShadow: "0 0 180px rgba(0, 0, 255, 0.5)", // Adiciona um efeito de sombra azul
    animation: "neonBorder 60s linear infinite", // Aplica a animação neonBorder
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  logo: {
    marginBottom: theme.spacing(2),
  },
  whatsappButton: {
    margin: theme.spacing(0, 0, 2)
  },
}));

const Login = () => {
  const classes = useStyles();

  const [user, setUser] = useState({ email: "", password: "" });

  const { handleLogin } = useContext(AuthContext);

  const handleChangeInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  	const openInNewTab = url => {
		window.open(url, '_blank', 'noopener,noreferrer');
	  };

  const handlSubmit = (e) => {
    e.preventDefault();
    handleLogin(user);
  };

  return (
    <div className={classes.container}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <div>
          {/* <img src={logo} alt="Logo da Empresa" className={classes.logo} /> */}
          <img style={{ margin: "0 auto", height: '100%', width: '100%',alignSelf: 'center' }} src={logo} alt="Whats" />
          </div>
          <Typography component="h1" variant="h6">
            {i18n.t("login.titulo")}
          </Typography>
          <form className={classes.form} noValidate onSubmit={handlSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label={i18n.t("login.form.email")}
              name="email"
              value={user.email}
              onChange={handleChangeInput}
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label={i18n.t("login.form.password")}
              type="password"
              id="password"
              value={user.password}
              onChange={handleChangeInput}
              autoComplete="current-password"
            />
            <Grid container justify="flex-end">
              <Grid item>
                <Link
                  href="#"
                  variant="body2"
                  component={RouterLink}
                  to="/forgetpsw"
                >
                  {i18n.t("login.buttons.forgetpsw")}
                </Link>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {i18n.t("login.buttons.submit")}
            </Button>
              <Button
           //type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.whatsappButton}
            onClick={() => openInNewTab("https://wa.me/5585998214849")}
          >
            {i18n.t("login.buttons.whatsapp")}
          </Button>
					<br/>
            <Grid container>
              <Grid item>
                <Link
                  href="#"
                  variant="body2"
                  component={RouterLink}
                  to="/signup"
                >
                  {i18n.t("login.buttons.register")}
                </Link>
              </Grid>
            </Grid>
            
          </form>
        </div>
      </Container>
    </div>
  );
};

export default Login;
