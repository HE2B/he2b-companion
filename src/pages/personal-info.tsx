import { Button, Form, Input, Space } from "antd-mobile";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../store";

export default function PersonalInfo() {
	const { isStudent, isTeacher, getFirstName, getLastName, getEmail, getStudentMatricule, getTeacherMatricule } = useAppStore();
	const { t } = useTranslation();
	const navigate = useNavigate();

	return (
		<>
			<Space
				direction="vertical"
				block>

				<h1>{t("personal_info")}</h1>

				<Form
					layout="horizontal">
					<Form.Item label={t("first_name")}>
						<Input value={getFirstName()} readOnly />
					</Form.Item>

					<Form.Item label={t("last_name")}>
						<Input value={getLastName()} readOnly />
					</Form.Item>

					<Form.Item label={t("email")}>
						<Input value={getEmail()} readOnly />
					</Form.Item>

					{isStudent() && (
						<Form.Item label={t("matricule")}>
							<Input value={getStudentMatricule()} readOnly />
						</Form.Item>
					)}

					{isTeacher() && (
						<Form.Item label={t("teacher_matricule")}>
							<Input value={getTeacherMatricule()} readOnly />
						</Form.Item>
					)}
				</Form>

				<br />
				<br />

				<Button
					block
					color="primary"
					onClick={() => navigate("/profile")}>
					{t("back")}
				</Button>

			</Space>
		</>
	);
}
