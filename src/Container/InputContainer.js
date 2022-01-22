import React from 'react';
import { Form } from '../Presentational/Form';

export function InputContainer(props) {
    return <Form onChange={props.onChange} onSubmit={props.onSubmit}/>
}
