import React from 'react';
import { ResponseField } from '../Presentational/ResponseField';

export function ResponseContainer(props) {
    if (props.endpoint === '') return <ResponseField/>;

    // let isLoading = false;
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', props.endpoint);
    xhr.send();

    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            // let response = xhr.response;
            // console.log(response);
            return <ResponseField response={JSON.stringify(xhr.response)}/>
        } 
        // else {
        //     isLoading = true;
        //     return <ResponseField isLoading={isLoading}/>
        // }
    };

    return <ResponseField />;
}