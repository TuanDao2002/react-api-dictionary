import React, { useEffect, useState } from 'react';
import { Form } from '../Presentational/Form';

export function InputContainer(props) {
    const [valid, setValid] = useState(true);
    useEffect(() => {
        setValid(/^[A-Za-z\s]*$/.test(props.input));
    }, [props.input])

    return <Form valid={valid} onChange={props.onChange} onSubmit={props.onSubmit}/>
}
