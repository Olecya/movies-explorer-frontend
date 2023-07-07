import React, { useCallback, useEffect, useState } from "react";



export const useFormWithValidation = (value, nameInput) => {
	const inputEmailValidations = { isEmail: true };
	const inputPasswordValidations = { minLength: 2 };
	const inputNameValidations = { isName: true };
	let validations = {};

	validations = nameInput === "email" && inputEmailValidations;
	validations = nameInput === "password" && inputPasswordValidations;
	validations = nameInput === "name" && inputNameValidations;

	const [isValid, setIsvalid] = useState(false);
	const [isMailError, setIsMailError] = useState(false);
	const [minLengthError, setMinLenghtError] = useState(false);
	const [isNameError, setIsNameError] = useState(false);
	const [messageError, setMessage] = useState('');

	const validationEmail = (v) => {
		const walidationPattern = /https?:\/\/(www)?[a-z0-9\-._~:/?#[\]@!$&'()*+,;=]*/i;
		return walidationPattern.test(v);
	}

	const validationName = (v) => {
		const walidationPatternWord = /(^[a-zёа-я]{2,}$)/i;
		const val = walidationPatternWord.test(v)

		console.log(val, '!!!!!!!!!!!!!!');
		return val;
	}

	const generalValidation = () => {
		let m = '';
		if (isMailError) m = "Неверная запись E-mail";
		if (minLengthError) m = "Минимальное количесво 2 символа";
		if (isNameError) m = "Введите имя без пробелов, не менее 2 символов";
		return m;
	}

	useEffect(() => {
		for (const validation in validations) {
			switch (validation) {
				case 'isEmail':
					console.log('isEmail')
					validationEmail(value) ? setIsMailError(false) : setIsMailError(true);
					setIsvalid(isMailError);
					setMessage(generalValidation(isMailError))
					break;
				case 'minLength':
					value.lenght < validations[validation] ? setMinLenghtError(false) : setMinLenghtError(true);
					setIsvalid(minLengthError);
					setMessage(generalValidation(minLengthError))
					break;
				case 'isName':
					// console.log(';;;;;;;;;;;;;;')
					validationName(value) ? setIsNameError(false) : setIsNameError(true);
					// setIsvalid(isNameError);
					console.log(isValid, isNameError)
					setMessage(generalValidation(isNameError))
					break;
			}
		}
	}, [value, nameInput])

	return { messageError, isNameError };
}