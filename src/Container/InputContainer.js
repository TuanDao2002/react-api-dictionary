import React, { useEffect, useState } from 'react';
import { Form } from '../Presentational/Form';

export function InputContainer(props) {
    const {onSubmit} = props;

    const [input, setInput] = useState("");
    const [valid, setValid] = useState(true);

    const handleChange = (event) => {
        const input = event.target.value;
        setInput(input);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(input);
    }

    useEffect(() => {
        // check if the input contains only characters or spaces
        setValid(/^[A-Za-z\s]*$/.test(input));
    }, [input])

    return <Form valid={valid} onSubmit={handleSubmit} onChange={handleChange}/>
}
