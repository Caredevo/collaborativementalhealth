import React, { Component } from 'react';
import axios from 'axios';
import { Form, Field} from 'react-final-form';
import { Card } from '../widgets/Cards';
import {encryption, decryption, randomKey} from '../../Security';
var cipherKey = randomKey();


// const PORT = "https://api.caredevo.com/api/mentalhealth/safety";


class MHSubjective extends Component {


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
            {/* <div className='smallcard' style={{width:'500px', height:'400px', textAlign:'left'}}>
                12 January 2022
                <table>
                    <tr style={{textAlign:'left', verticalAlign:'center', height:'30px'}}>
                        <td style={{width:'100px'}}>te</td>
                        <td>
                        <div class="slidecontainer">
                            <input type="range" min="1" max="100" value="50" className="slider" id="myRange" />
                            <p>Value: <span id="demo"></span></p>
                            </div>
                        </td>
                    </tr>
                </table>
            </div> */}

            </>
        )
    }

    render() {
        return (
            <Card title='Symptoms Log'>
                <div className='panelListed' style={{width:'90%', backgroundColor:'#e1e8f0', color:'black', padding:'20px'}}>
                    <b></b><i>Monday, 12 July 2022</i><b></b><p></p>
                    <div style={{marginLeft:'20px'}}>
                    Mood  : depressed<br></br>
                    Nightmare : present<br></br>
                    Sleep : disturbed<br></br>
                    Suicidal thoughts : None<br></br>
                    Harmful behaviour : None<br></br>
                    Perceptual disturbances: None<br></br>
                    </div>
                </div><p></p>
                <div className='panelListed' style={{width:'90%', backgroundColor:'#fcacb7', color:'black', padding:'20px'}}>
                    <b></b><i>Wednesday, 11 June 2022</i><b></b><p></p>
                    <div style={{marginLeft:'20px'}}>
                    Mood  : depressed<br></br>
                    Nightmare : present<br></br>
                    Sleep : disturbed<br></br>
                    Suicidal thoughts : Present<br></br>
                    Harmful behaviour : None<br></br>
                    Perceptual disturbances: None<br></br>
                    </div>
                </div><p></p>
                <div className='panelListed' style={{width:'90%', backgroundColor:'#e1e8f0', color:'black', padding:'20px'}}>
                    <b></b><i>Sunday, 23 May 2022</i><b></b><p></p>
                    <div style={{marginLeft:'20px'}}>
                    Mood  : depressed<br></br>
                    Nightmare : present<br></br>
                    Sleep : disturbed<br></br>
                    Suicidal thoughts : None<br></br>
                    Harmful behaviour : None<br></br>
                    Perceptual disturbances: None<br></br>
                    </div>
                </div><p></p>
            </Card>
        )
    }

}

export default MHSubjective;