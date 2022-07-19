import React, { Component } from 'react';
import axios from 'axios';
import { Form, Field} from 'react-final-form';
import { Card} from '../widgets/Cards';
import {encryption, decryption, randomKey} from '../../Security';
var cipherKey = randomKey();


// const PORT = "https://api.caredevo.com/api/mentalhealth/safety";


class MHAnalysis extends Component {


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
            <Card title='Analysis/Recommendation'>
                <div className='panelListed' style={{width:'90%', backgroundColor:'#32a89d'}}>Mental health has not been stable for 22 weeks.</div><p></p>
                <div className='panelListed' style={{width:'90%', backgroundColor:'#32a89d'}}>Patient has been on 2 SSRI and 1 TCA for total of 32 weeks</div><p></p>
                <div className='panelListed' style={{width:'90%', backgroundColor:'#32a89d'}}>Consider Augmentation therapy with quetiapine or mirtazipine for Depression</div><p></p>
                <div className='panelListed' style={{width:'90%', backgroundColor:'#32a89d'}}>Consider Prazosing for nightmare symptoms</div><p></p>
                <div className='panelListed' style={{width:'90%', backgroundColor:'#32a89d'}}>Consider EMDR for PTSD</div><p></p>
                <div className='panelListed' style={{width:'90%', backgroundColor:'#32a89d'}}>Consider referral for formal psychoeducation analysis for learning difficulties.</div>
            </Card>
        )
    }

}

export default MHAnalysis;