import { useEffect, useState } from "react";

export const useInput = (initialValue, validations) => {
    const [value, setValue] = useState(initialValue);
    const valid = useFormWithValidation(value, validations);
    const onChange = (e) => {
        setValue(e.target.value)
    }

    return { value, onChange, ...valid }
}

export const useFormWithValidation = (value, validations) => {
    const [minLength, setMinLength] = useState(true);
    const [maxLength, setMaxLength] = useState(true);
    const [isNameError, setNameError] = useState(true);
    const [isMailError, setIsMailError] = useState(false);
    const [messageError, setMessageError] = useState('');

    useEffect(() => {
        for (const validation in validations) {
            switch (validation) {
                case 'isEmail':
                    const walidationPattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                    if (walidationPattern.test(value)) {
                        setIsMailError(false)
                    } else {
                        setIsMailError(true)
                    };
                    setMessageError('Неверная запись E-mail')
                    break;
                case 'minLength':
                    if (String(value).length >= validations[validation]) {
                        setMinLength(false);

                    } else {
                        setMinLength(true);
                    }
                    setMessageError(`Минимальное количесво символов: ${validations[validation]}`)
                    break;
                case 'isName':
                    const walidationPatternWord = /(^[a-zёа-я]{2,}$)/i;
                    walidationPatternWord.test(value) ? setNameError(false) : setNameError(true);
                    // console.log(isValid, isNameError)
                    setMessageError("Введите имя без пробелов, не менее 2 символов")
                    break;
            }
        }

    }, [value])

    return { minLength, isNameError, isMailError, maxLength, messageError }
}