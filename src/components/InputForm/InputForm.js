import React from "react";
import './inputform.css';

export const InputForm = (props) => {

    const { name, classForm, valueDef, textSpan, textLabel, minLength = 2, maxLength = 40, ...rest } = props;

    return (
        <>
            <label htmlFor={name} className={`${classForm}-label`}>{textLabel}</label>
            <input
                className={`${classForm}-input`}
                id={`popup__${name}`}
                type={name}
                placeholder="&nbsp;"
                defaultValue={valueDef}
                minLength={minLength}
                maxLength={maxLength}
                {...rest}
            />
            <span className={`${classForm}-input_error ${classForm}-input_error_active`} id={name}>{textSpan}</span>
        </>
    );
}