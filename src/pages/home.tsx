import { useTranslation } from "react-i18next";
import { useAppStore } from "../store";

export default function Home() {
<<<<<<< HEAD
    const { t } = useTranslation(); 
    const { user } = useAppStore();
    const firstName = user?.displayName?.split(' ')[0] || '';

    return (
        <>
            <h2 style={styles.titre}>
                {t("hello")} {firstName} ! 
                <span className="wave">👋</span>
            </h2>
        </>
    );
=======
	const { t } = useTranslation();
	const { user } = useAppStore();

	const firstName = user?.displayName?.split(" ")[0] || "";

	return (
		<>
			<h1>{t("home")}</h1>
			<h2>Bonjour {firstName} ! <span className="wave">👋</span></h2>
		</>
	);
>>>>>>> bf1c374d56570e602f4d612f9229d4ab23282bba
}

const styles = {
    titre: {
        textAlign: "center" as "center",
        justifyContent: "center" as "center",
    }
};

const waveStyle = `
    .wave {
        display: inline-block;
        animation: wave-animation 0.5s infinite;
    }

    @keyframes wave-animation {
        0% {
            transform: rotate(0deg);
        }
        50% {
            transform: rotate(15deg);
        }
        100% {
            transform: rotate(0deg);
        }
    }
`;

document.head.insertAdjacentHTML("beforeend", `<style>${waveStyle}</style>`);
