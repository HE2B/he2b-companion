import { Card, ProgressCircle, Space } from "antd-mobile";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { mockMarks } from "../sample/sample-marks";

const styles = {
	small: { fontSize: "12px" },
	middle: { fontSize: "14px", fontWeight: "bold" },
	large: { fontSize: "16px", fontWeight: "bold" },
};

export default function Marks() {
	const { t } = useTranslation();

	const getPercentageColor = useCallback((percentage: number) => {
		if(percentage < 50) return 'var(--adm-color-danger)';
		if(percentage < 75) return 'var(--adm-color-warning)';
		return 'var(--adm-color-success)';
	}, []);

	return (
		<Space
			direction="vertical"
			block>

			<h1>{t("marks")}</h1>

			<Space
				direction="vertical"
				block
				style={{ '--gap': '16px' }}>

				{mockMarks
					.map(mark => ({ ...mark, percent: Math.round(((mark.score * 100) / mark.over)) }))
					.map(({ course, over, score, percent }) => (
						<Card
							key={course}
							title={course}>

							<Space align="center">
								<ProgressCircle
									percent={percent}
									style={{
										'--size': '60px',
										'--fill-color': getPercentageColor(percent),
									}}
								>
									<span style={styles.middle}>{score}/{over}</span>
								</ProgressCircle>

								<div style={{ marginLeft: '16px' }}>
									<b>{course}</b>
									<div style={{ fontSize: '14px' }}>{percent}%</div>
								</div>
							</Space>

						</Card>
					))}
			</Space>
		</Space>
	);
}
