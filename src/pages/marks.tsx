import { Button, Space, ProgressCircle, Card } from "antd-mobile";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

const styles = {
	small: { fontSize: "12px" },
	middle: { fontSize: "14px", fontWeight: "bold" },
	large: { fontSize: "16px", fontWeight: "bold" },
};

const mockMarks = [
	{ course: "Mathématiques", score: 10, over: 20 },
	{ course: "Physique", score: 12, over: 20 },
	{ course: "Chimie", score: 5, over: 20 },
	{ course: "Biologie", score: 6, over: 20 },
	{ course: "Développement", score: 18, over: 20 },
	{ course: "Anglais", score: 15, over: 20 },
	{ course: "Espagnol", score: 14, over: 20 },
	{ course: "Histoire", score: 8, over: 20 },
	{ course: "Géographie", score: 9, over: 20 },
	{ course: "Philosophie", score: 7, over: 20 },
	{ course: "Informatique", score: 16, over: 20 },
	{ course: "Arts Plastiques", score: 11, over: 20 },
];

export default function Marks() {
	const { t } = useTranslation();
	const navigate = useNavigate();

	return (
		<Space direction="vertical" block>
			<h1>{t("marks")}</h1>

			<Space direction="vertical" block style={{ '--gap': '16px' }}>
				{mockMarks.map((mark, index) => {
					const percent = Math.round((mark.score / mark.over) * 100);
					let fillColor = 'var(--adm-color-success)';
					if (percent < 50) fillColor = 'var(--adm-color-danger)';
					else if (percent < 75) fillColor = 'var(--adm-color-warning)';

					return (
						<Card key={index} title={mark.course}>
							<Space align="center">
								<ProgressCircle
									percent={percent}
									style={{
										'--size': '60px',
										'--fill-color': fillColor,
									}}
								>
									<span style={styles.middle}>
										{mark.score}/{mark.over}
									</span>
								</ProgressCircle>
								<div style={{ marginLeft: '16px' }}>
									<div style={{ fontWeight: 'bold' }}>{mark.course}</div>
									<div style={{ fontSize: '14px' }}>{percent}%</div>
								</div>
							</Space>
						</Card>
					);
				})}
			</Space>
		</Space>
	);
}
