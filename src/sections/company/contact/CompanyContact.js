"use client";
// MODULES //
import { useRef, useState } from "react";

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //
import { useForm } from "react-hook-form";

// UTILS //

// STYLES //
import styles from "@/styles/sections/company/contact/CompanyContact.module.scss";

// IMAGES //

// DATA //

/** radio list Component */
const options = [
	"Oxford",
	"Athens",
	"Austin, TX",
	"Berlin",
	"Gurugram, India",
	"Madrid",
	"Melbourne",
	"New York",
	"Oakland, CA",
	"Paris",
	"Rome",
	"Sao Paulo",
	"Singapore",
	"Stockholm",
	"Sydney",
	"Tokyo",
];

/** CompanyContact Component */
export default function CompanyContact() {
	// const [selected, setSelected] = useState("Renewables Summit, London");

	const formRef = useRef();
	//const [thankYouMessage, setthankYouMessage] = useState(false);
	const {
		register,
		handleSubmit,
		watch,
		//reset,
		formState: { errors },
	} = useForm({ mode: "onChange" });
	const selected = watch("event"); // Watch the value of the radio

	/** Function to handle submit */
	const onSubmit = async (data) => {
		// Write form submission codes here
		// const result = await sendContactData(JSON.stringify({ data: data }));
		// if (result.data) {
		// 	reset();
		// 	setthankYouMessage(true);
		// 	setTimeout(() => {
		// 		setthankYouMessage(false);
		// 	}, 5000);
		// }
		// console.log(result);
	};
	return (
		<div className={styles.ContactMain}>
			<form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
				<div className={`${styles.formRow} f_w_j`}>
					<div className={styles.formGroup}>
						<label className={styles.label} htmlFor="name">
							First Name*
						</label>
						<input
							className={styles.input}
							type="text"
							id="name"
							name="name"
							{...register("name", { required: true })}
						/>
						{errors.name && errors.name.type == "required" && (
							<label className="error">This field is required</label>
						)}
					</div>
					<div className={styles.formGroup}>
						<label className={styles.label} htmlFor="lastname">
							Last Name*
						</label>
						<input
							className={styles.input}
							type="text"
							id="lastname"
							name="lastname"
							{...register("lastname", { required: true })}
						/>
						{errors.lastname && errors.lastname.type == "required" && (
							<label className="error">This field is required</label>
						)}
					</div>
				</div>
				<div className={`${styles.formRow} f_w_j`}>
					<div className={styles.formGroup}>
						<label className={styles.label} htmlFor="company">
							Company*
						</label>
						<input
							className={styles.input}
							type="text"
							id="company"
							name="company"
							{...register("company", { required: true })}
						/>
						{errors.company && errors.company.type == "required" && (
							<label className="error">This field is required</label>
						)}
					</div>
					<div className={styles.formGroup}>
						<label className={styles.label} htmlFor="jobtitle">
							Job Title*
						</label>
						<input
							className={styles.input}
							type="text"
							id="jobtitle"
							name="jobtitle"
							{...register("jobtitle", { required: true })}
						/>
						{errors.jobtitle && errors.jobtitle.type == "required" && (
							<label className="error">This field is required</label>
						)}
					</div>
				</div>
				<div className={`${styles.formRow} f_w_j`}>
					<div className={styles.formGroup}>
						<label className={styles.label} htmlFor="email">
							Email*
						</label>
						<input
							className={styles.input}
							type="email"
							id="email"
							name="email"
							{...register("email", {
								required: true,
								pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
							})}
						/>
						{errors.email && errors.email.type == "required" && (
							<label className="error">This field is required</label>
						)}
						{errors.email && errors.email.type == "pattern" && (
							<label className="error">Enter valid email</label>
						)}
					</div>
					<div className={styles.formGroup}>
						<label className={styles.label} htmlFor="phone">
							Phone*
						</label>
						<input
							className={styles.input}
							type="number"
							id="phone"
							name="phone"
							{...register("phone", {
								required: { value: true, message: "This field is required" },
								maxLength: {
									value: 10,
									message: "Phone number should not exceed 10 digits",
								},
								minLength: {
									value: 10,
									message: "Phone number should be 10 digits",
								},
							})}
							onKeyDown={(e) => {
								// Prevent the "E" key (keyCode 69) from being pressed
								if (e.keyCode === 69) {
									e.preventDefault();
								}
							}}
						/>
						{errors.phone && <label className="error">{errors.phone.message}</label>}
					</div>
				</div>

				<div className={`${styles.formRow} f_w_j`}>
					<div className={`${styles.radioBox}`}>
						<p className={styles.label}>Event*</p>
						<div className={`${styles.radioGroup} ${styles.fullWidthBox}`}>
							{options.map((option) => (
								<label key={option} className={styles.radioOption}>
									<input
										type="radio"
										value={option}
										{...register("event", { required: "Please select an event" })}
									/>
									<span>{option}</span>
								</label>
							))}
						</div>
						{errors.event && <label className="error">{errors.event.message}</label>}
					</div>
				</div>

				<div className={`${styles.formRow} f_w_j`}>
					<div className={`${styles.formGroup} ${styles.fullWidthBox}`}>
						<label className={styles.label} htmlFor="message">
							Message*
						</label>
						<textarea
							className={styles.textarea}
							id="message"
							name="message"
							rows={5}
							{...register("message", {
								required: true,
							})}
						/>
						{errors.message && errors.message.type == "required" && (
							<label className="error">This field is required</label>
						)}
					</div>
				</div>

				<div className={`${styles.btnBox}`}>
					<Button color="red" variant="filled" shape="rounded">
						Submit
					</Button>
				</div>
				{/* {thankYouMessage && (
					<h2 className="text_md font_primary color_primary pt_20">Thank You</h2>
				)} */}
			</form>
		</div>
	);
}
