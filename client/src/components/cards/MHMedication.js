import React, { Component } from 'react';
import axios from 'axios';
import { Form, Field} from 'react-final-form';
import { Card} from '../widgets/Cards';
import {encryption, decryption, randomKey} from '../../Security';
var cipherKey = randomKey();


// const PORT = "https://api.caredevo.com/api/mentalhealth/safety";


class MHMedication extends Component {


    constructor(props) {
        super(props);
        this.state = {
            patientId: props.identity[0],
            permission : props.identity[1],
            provider : props.identity[2],
            practiceId: props.identity[3],
            externalId: props.identity[4], 
            config : props.identity[5],
            dataState: "Stable",
            current_entry : null,
            content: [],
            editing: true,
            editBtn: false
        };
    };

    async componentDidMount() {
        // var params = {
        //     id : this.state.patientId,
        //     key : cipherKey
        // }; 
        // var res = await axios.get(`${PORT}/patient`, { params }, this.state.config);
        // if (res.data) {
        //     var decryptedRespond = decryption(res.data, cipherKey);
        //     this.setState({content: decryptedRespond}); 
        // } 
    }

    MHSubjective() {
        return (
            <>
            Testing

            </>
        )
    }

    render() {
        return (
            <Card title='Medication'>
                <b>Current Medication(s)</b><p></p>
                <table className='paneltable'>
                    <tr>
                        <th>Date Started</th>
                        <th>Medication</th>
                        <th>Brand</th>
                        <th>Dose</th>
                        <th>Frequency</th>
                        <th>Provider</th>
                        <th>Date Stopped</th>
                    </tr>
                    <tr>
                        <td>2/2/2022</td>
                        <td>Fluoxetine</td>
                        <td>Prozac</td>
                        <td>20mg</td>
                        <td>OD</td>
                        <td>Dr Findacure</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>2/4/2021</td>
                        <td>Diazepam</td>
                        <td>Valium</td>
                        <td>5mg</td>
                        <td>PRN</td>
                        <td>Dr Peter</td>
                        <td></td>
                    </tr>
                </table>
                <p></p>
                <p></p>
                <p></p>
                <b>Previous Medication(s)</b><p></p>
                <table className='lmtable'>
                    <tr style={{backgroundColor:'grey'}}>
                        <th>Date Started</th>
                        <th>Medication</th>
                        <th>Brand</th>
                        <th>Dose</th>
                        <th>Frequency</th>
                        <th>Provider</th>
                        <th>Date Stopped</th>
                    </tr>
                    <tr>
                        <td>2/4/2021</td>
                        <td>Sertraline</td>
                        <td>Cymbalta</td>
                        <td>100mg</td>
                        <td>OD</td>
                        <td>Dr Peter</td>
                        <td>2/9/2021</td>
                    </tr>
                </table>
            </Card>
        )
    }

}

export default MHMedication;