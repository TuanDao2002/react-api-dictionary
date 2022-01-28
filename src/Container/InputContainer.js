import React from 'react';
import { Form } from '../Presentational/Form';

export function InputContainer(props) {
    const {input, onChange, onSubmit} = props;

    // check if the input contains only characters or spaces
    const valid = /^[A-Za-z\s]*$/.test(input);

    return <Form valid={valid} onChange={onChange} onSubmit={onSubmit}/>
}
