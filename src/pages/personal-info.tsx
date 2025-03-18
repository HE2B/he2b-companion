import { Card, Button, Space } from "antd-mobile";
import { useAppStore } from "../store";
import { useTranslation } from "react-i18next"; 
import { useNavigate } from "react-router-dom"; 
import { TbUserFilled, TbMail, TbIdBadge2 } from "react-icons/tb"; 

export default function PersonalInfo() {
	const { user } = useAppStore();
	const { t } = useTranslation(); 
	const navigate = useNavigate(); 

	const firstName = user?.displayName?.split(" ")[0] || "";
	const lastName = user?.displayName?.split(" ")[1] || "";
	const email = user?.email || "";

	const matricule = email.endsWith("@etu.he2b.be") ? email.split("@")[0] : "";
	const profm = email.endsWith("@he2b.be") ? email.split("@")[0] : "";

	const goToProfile = () => {
		navigate("/profile");
	};

	return (
		<Card style={styles.card}>
			<h1 style={styles.title}>{t("pinfo")}</h1>
			<Space direction="vertical" style={styles.container}>
				<div style={styles.info}>
					<TbUserFilled style={styles.icon} />
					<strong>Prénom :</strong> {firstName}
				</div>

				<div style={styles.info}>
					<TbUserFilled style={styles.icon} />
					<strong>Nom :</strong> {lastName}
				</div>

				<div style={styles.info}>
					<TbMail style={styles.icon} />
					<strong>Email :</strong> {email}
				</div>

				{email.endsWith("@etu.he2b.be") && (
					<div style={styles.info}>
						<TbIdBadge2 style={styles.icon} />
						<strong>Matricule :</strong> {matricule}
					</div>
				)}

				{email.endsWith("@he2b.be") && (
					<div style={styles.info}>
						<TbIdBadge2 style={styles.icon} />
						<strong>Nom de prof :</strong> {profm}
					</div>
				)}

				<Button block color="primary" onClick={goToProfile} style={styles.button}>
					{t("back")}
				</Button>
			</Space>
		</Card>
	);
}

const styles = {
	card: {
		maxWidth: 400,
		margin: "auto",
		marginTop: 20,
		padding: 20,
		backgroundColor: 'transparent',
		borderRadius: 10,
	},
	title: {
		color: "#fff",
		textAlign: "center" as "center",
	},
	container: {
		display: "flex",
		flexDirection: "column" as "column",
		width: "100%",
		gap: 12,
	},
	info: {
		display: "flex",
		alignItems: "center",
		gap: 10,
		fontSize: "1em",
		color: "#444",
		backgroundColor: "#fff",
		padding: 12,
		borderRadius: 8,
		boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
	},
	icon: {
		color: "#007bff",
		fontSize: "1.5em",
	},
	button: {
		marginTop: 15,
		width: "100%",
		fontSize: 16,
	},
};
