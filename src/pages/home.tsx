import { useTranslation } from "react-i18next";
import { useAppStore } from "../store";

export default function Home() {
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
