import React from 'react';
import { Form } from '../Presentational/Form';

export function InputContainer(props) {

    // check if the input contains only characters or spaces
    const valid = /^[A-Za-z\s]*$/.test(props.input);

    return <Form valid={valid} onChange={props.onChange} onSubmit={props.onSubmit}/>
}
