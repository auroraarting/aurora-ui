// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";
import AccordianCommon from "@/components/AccordianCommon";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/careers/CareerFaq.module.scss";

// IMAGES //

// DATA //

/** CareerFaq Section */
export default function CareerFaq() {
	return (
		<div className={`${styles.accordian_main}`}>
			<AccordianCommon
				fontStyle={"text_reg"}
				fontWeight={"f_w_s_b"}
				fontFamily={"font_primary"}
				fontColor={"color_light_gray"}
				items={[
					{
						title:
							"What is the typical recruitment process for applicants at Aurora Energy Research?",
						children: (
							<div className={`${styles.content_wrap}`}>
								<p className="text_reg color_dark_gray">
									Our recruitment process typically begins with an initial application
									review, followed by interviews to assess your technical ability and
									your overall competency. Depending on the role, candidates may also be
									asked to complete assessments or case studies.
								</p>
							</div>
						),
					},
					{
						title:
							"What is the typical recruitment process for applicants at Aurora Energy Research?",
						children: (
							<div className={`${styles.content_wrap}`}>
								<p className="text_reg color_dark_gray">
									Our recruitment process typically begins with an initial application
									review, followed by interviews to assess your technical ability and
									your overall competency. Depending on the role, candidates may also be
									asked to complete assessments or case studies.
								</p>
							</div>
						),
					},
					{
						title:
							"I have received a request for an interview or an offer from Aurora, but I am unsure if this person is an employee or affiliate of Aurora. How can I confirm?",
						children: (
							<div className={`${styles.content_wrap}`}>
								<p className="text_reg color_dark_gray">
									Our recruitment process typically begins with an initial application
									review, followed by interviews to assess your technical ability and
									your overall competency. Depending on the role, candidates may also be
									asked to complete assessments or case studies.
								</p>
							</div>
						),
					},
					{
						title: "How do I prepare for my interview?",
						children: (
							<div className={`${styles.content_wrap}`}>
								<p className="text_reg color_dark_gray">
									Our recruitment process typically begins with an initial application
									review, followed by interviews to assess your technical ability and
									your overall competency. Depending on the role, candidates may also be
									asked to complete assessments or case studies.
								</p>
							</div>
						),
					},
				]}
			/>
		</div>
	);
}
