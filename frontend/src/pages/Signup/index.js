import React, { useState, useEffect } from "react";
import qs from "query-string";

import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik, Form, Field } from "formik";
import usePlans from "../../hooks/usePlans";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import {
FormControl,
InputLabel,
MenuItem,
Select,
InputAdornment,
IconButton,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";

import { i18n } from "../../translate/i18n";

import { openApi } from "../../services/api";
import toastError from "../../errors/toastError";
import moment from "moment";
import logo from "../../assets/logo_login.png";

const useStyles = makeStyles((theme) => ({
root: {
	width: "100vw",
	height: "100vh",
	background: "url(https://source.unsplash.com/random/?tech) center/cover no-repeat",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	textAlign: "center",
	marginTop: "12.5px",
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
avatar: {
	margin: theme.spacing(1),
	backgroundColor: theme.palette.secondary.main,
},
form: {
	width: "100%",
	marginTop: theme.spacing(3),
},
submit: {
	margin: theme.spacing(3, 0, 2),
},
whatsappButton: {
	margin: theme.spacing(3, 0, 2),
},
}));

const handleNewUserMessage = (newMessage) => {
window.open(
	`https://api.whatsapp.com/send?phone=558598214849&text=${encodeURIComponent(
	newMessage
	)}`,
	"_blank"
);
};

const UserSchema = Yup.object().shape({
name: Yup.string().min(2, "Muito curto!").max(50, "Muito longo!").required("Obrigatório"),
password: Yup.string().min(5, "Muito curto!").max(50, "Muito longo!"),
email: Yup.string().email("E-mail inválido").required("Obrigatório"),
});

const SignUp = () => {
const classes = useStyles();
const history = useHistory();
let companyId = null;

const params = qs.parse(window.location.search);
if (params.companyId !== undefined) {
	companyId = params.companyId;
}

const initialState = { name: "", email: "", password: "", planId: "", phone: "" };
const [user, setUser] = useState(initialState);
const [isCodeEnabled, setIsCodeEnabled] = useState(false);
const [validationCode, setValidationCode] = useState("");
const [showPassword, setShowPassword] = useState(false);

const dueDate = moment().add(1, "day").format();



const handleSignUp = async (values) => {
	if (validationCode !== "654464649903283647382") {
		toast.error("Código de validação inválido. Não foi possível registrar.");
		return;
	  }

	Object.assign(values, { recurrence: "MENSAL" });
	Object.assign(values, { dueDate: dueDate });
	Object.assign(values, { status: "t" });
	Object.assign(values, { campaignsEnabled: true });


	try {
	await openApi.post("/companies/cadastro", values);
	toast.success(i18n.t("signup.toasts.success"));
	history.push("/login");
	} catch (err) {
	console.log(err);
	toastError(err);
	}
};

const [plans, setPlans] = useState([]);
const { list: listPlans } = usePlans();

useEffect(() => {
	async function fetchData() {
	const list = await listPlans();
	setPlans(list);
	}
	fetchData();
}, []);

const handleWhatsAppClick = () => {
	const message = `*Nome:* ${user.name}\n*E-mail:* ${user.email}\n*WhatsApp:* ${user.phone}\n*Plano:* ${user.planId}`;
	handleNewUserMessage(message);
	setIsCodeEnabled(true);
};

const togglePasswordVisibility = () => {
	setShowPassword(!showPassword);
};
const handleInputChange = (e) => {
	const { name, value } = e.target;
	setUser((prevState) => ({
	...prevState,
	[name]: value,
	}));
};



return (
	<div className={classes.root}>
	<Container component="main" maxWidth="xs">
		<CssBaseline />
		<div className={classes.paper}>
		<div>
			<img style={{ margin: "0 auto", height: "80px", width: "100%" }} src={logo} alt="Whats" />
		</div>
		<Typography component="h1" variant="h5">
			{i18n.t("signup.title")}
		</Typography>
		<Formik
			initialValues={user}
			enableReinitialize={true}
			validationSchema={UserSchema}
			onSubmit={(values, actions) => {
			setTimeout(() => {
				handleSignUp(values);
				actions.setSubmitting(false);
			}, 400);
			}}
		>
			{({ touched, errors, isSubmitting }) => (
			<Form className={classes.form}>
				<Grid container spacing={2}>
				<Grid item xs={12}>
					<Field
					as={TextField}
					autoComplete="name"
					name="name"
					error={touched.name && Boolean(errors.name)}
					helperText={touched.name && errors.name}
					variant="outlined"
					fullWidth
					id="name"
					label={i18n.t("signup.form.empresa")}
					onChange={handleInputChange}
					/>
				</Grid>
				<Grid item xs={12}>
					<Field
					as={TextField}
					variant="outlined"
					fullWidth
					id="email"
					label={i18n.t("signup.form.email")}
					name="email"
					error={touched.email && Boolean(errors.email)}
					helperText={touched.email && errors.email}
					autoComplete="email"
					required
					onChange={handleInputChange}
					/>
				</Grid>
				<Grid item xs={12}>
					<Field
					as={TextField}
					variant="outlined"
					fullWidth
					id="phone"
					label={i18n.t("signup.form.fone")}
					name="phone"
					error={touched.email && Boolean(errors.email)}
					helperText={touched.email && errors.email}
					autoComplete="telefone"
					required
					onChange={handleInputChange}
					/>
				</Grid>
				<Grid item xs={12}>
					<Field
					as={TextField}
					variant="outlined"
					fullWidth
					name="password"
					error={touched.password && Boolean(errors.password)}
					helperText={touched.password && errors.password}
					label={i18n.t("signup.form.password")}
					type={showPassword ? "text" : "password"}
					id="password"
					autoComplete="current-password"
					required
					InputProps={{
						endAdornment: (
						<InputAdornment position="end">
							<IconButton
							aria-label="Toggle password visibility"
							onClick={togglePasswordVisibility}
							>
							{showPassword ? <Visibility /> : <VisibilityOff />}
							</IconButton>
						</InputAdornment>
						),
					}}
					/>
				</Grid>
				<Grid item xs={12}>
					<InputLabel htmlFor="plan-selection">Plano</InputLabel>
					<Field
					as={Select}
					variant="outlined"
					fullWidth
					id="plan-selection"
					label="Plan"
					name="planId"
					required
					onChange={handleInputChange}
					>
					{plans.map((plan, key) => (
						<MenuItem key={key} value={plan.id}>
						{plan.name} - S/: {plan.value}
						</MenuItem>
					))}
					</Field>
				</Grid>
				{isCodeEnabled && (
					<Grid item xs={12}>
					<Field
						as={TextField}
						variant="outlined"
						fullWidth
						name="validationCode"
						label="Código de Validação"
						id="validationCode"
						autoComplete="validation-code"
						required
						value={validationCode}
						onChange={(e) => setValidationCode(e.target.value)}
					/>
					{validationCode === "PRÊMIO" ? (
					<Typography variant="body1">Código válido</Typography>
					) : (
					<Typography variant="body1">Código inválido</Typography>
					)}
					</Grid>
				)}
				</Grid>
				<Button
				type="button"
				fullWidth
				variant="contained"
				color="primary"
				className={classes.whatsappButton}
				startIcon={<WhatsAppIcon />}
				onClick={handleWhatsAppClick}
				>
				Solicitar Código
				</Button>
				<Button
				type="submit"
				fullWidth
				variant="contained"
				color="primary"
				className={classes.submit}
				>
				{i18n.t("signup.buttons.submit")}
				</Button>
				<Grid container justify="flex-end">
				<Grid item>
					<Link
					href="#"
					variant="body2"
					component={RouterLink}
					to="/login"
					>
					{i18n.t("signup.buttons.login")}
					</Link>
				</Grid>
				</Grid>
			</Form>
			)}
		</Formik>
		</div>
		<Box mt={5}></Box>
	</Container>
	</div>
);
};

export default SignUp;