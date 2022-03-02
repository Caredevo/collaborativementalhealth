

import React, { Component } from 'react';
import axios from 'axios';
import { Form, Field} from 'react-final-form';
import { CardForm } from '../widgets/Cards';
import {encryption, decryption, randomKey} from '../../Security';
var cipherKey = randomKey();



// const PORT = "http://localhost:3131/api/mentalhealth/safety";
const PORT = "http://localhost:5070/mh_safety"


class MHSafety extends Component {

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
        var params = {
            id : this.state.patientId,
            key : cipherKey
        }; 
        var res = await axios.get(`${PORT}/patient`, { params }, this.state.config);
        if (res.data) {
            var decryptedRespond = decryption(res.data, cipherKey);
            this.setState({content: decryptedRespond}); 
        } 
    }

    async componentDidUpdate(prevProps) {
        if (this.state.dataState !== "Stable") {
            var params = {
                id : this.state.patientId,
                key : cipherKey
            }; 
            var res = await axios.get(`${PORT}/patient`, { params }, this.state.config);
            if (res.data) {
                var decryptedRespond = decryption(res.data, cipherKey);
                this.setState({content: decryptedRespond, dataState:"Stable"}); 
            } 
        }   
    }


    formButton() {
        var permit = this.state.permission;
        if (permit === "View only") {
            return "inaction";
        } else { 
            return "action";
        }  
    }
    
    MHSafetyForm() { 
        var all_contents = this.state.content;
        var content;
        if(all_contents) {
            content = all_contents[0];
            if(content) {
                content.date = content.date.slice(0,10);
            }
        } else {
            var d = new Date();
            var date = d.toISOString().slice(0,10);
            content = [];
            content.date = date;
        }

        const handleSubmit = async (formValues) => {
            const form = formValues;
            form['patientId'] = this.state.patientId;
            form['provider'] = this.state.provider;  
            form['practiceId'] = this.state.practiceId;
            form['externalId'] = this.state.externalId;

            const encryptedData = encryption(form, cipherKey);

            await axios.post(`${PORT}/add`, encryptedData, this.state.config)
                .then((response) => {
                  console.log(response);
                }, (error) => {
                  console.log(error);
                });
            this.setState({dataState:"New dataset", editing:true, editBtn:false});
        }   

        const handleClick = () => {
            this.setState({editing:false, editBtn:true})
        }

        return (
            <Form
                onSubmit = {handleSubmit}
                initialValues = {content}
                render = {({handleSubmit, pristine, form, values, submitting}) => {
                    return (
                        <form onSubmit={handleSubmit}>
                            <div className='header'>Safety Plan</div>

                            <div className='form-2-columns'>
                                <div>
                                <Field name="date" component='input' label="Date">
                                    {({input, meta}) => (
                                            <div className={meta.active ? 'active':''}>
                                                <label>Date</label>
                                                <input size='30' {...input} type='date' />
                                                {meta.error && meta.touched && <span className={'err'}>{meta.error}</span>}
                                            </div>
                                    )} 
                                </Field>
                                <Field name='reason' component='input' placeholder=''>
                                    {({input, meta, placeholder}) => (
                                        <div className={meta.active ? 'active':''}>
                                            <label>My Reason to Live</label>
                                            <textarea cols="80" rows='3' {...input} disabled={this.state.editing} placeholder={placeholder} />
                                            {meta.error && meta.touched && <span className={'err'}>{meta.error}</span>}
                                        </div>
                                    )} 
                                </Field>
                                <p></p>
                                <Field name='cando' component='input' placeholder=''>
                                    {({input, meta, placeholder}) => (
                                        <div className={meta.active ? 'active':''}>
                                            <label>What can I do to keep me safe</label>
                                            <textarea cols="80" rows='3' {...input} disabled={this.state.editing} placeholder={placeholder} />
                                            {meta.error && meta.touched && <span className={'err'}>{meta.error}</span>}
                                        </div>
                                    )} 
                                </Field>
                                <p></p>
                                <Field name='help' component='input' placeholder=''>
                                    {({input, meta, placeholder}) => (
                                        <div className={meta.active ? 'active':''}>
                                            <label>Where to seek help</label>
                                            <textarea cols="80" rows='3' {...input} disabled={this.state.editing} placeholder={placeholder} />
                                            {meta.error && meta.touched && <span className={'err'}>{meta.error}</span>}
                                        </div>
                                    )} 
                                </Field>
                                </div>
                                <div>
                                <br></br>
                                <br></br>
                                <br></br>
                                <Field name='call' component='input' placeholder=''>
                                    {({input, meta, placeholder}) => (
                                        <div className={meta.active ? 'active':''}>
                                            <label>People I can call</label>
                                            <textarea cols="80" rows='3' disabled={this.state.editing} {...input} placeholder={placeholder} />
                                            {meta.error && meta.touched && <span className={'err'}>{meta.error}</span>}
                                        </div>
                                    )} 
                                </Field>
                                <p></p>
                                <Field name='talk' component='input' placeholder=''>
                                    {({input, meta, placeholder}) => (
                                        <div className={meta.active ? 'active':''}>
                                            <label>People I can talk to</label>
                                            <textarea cols="80" rows='3' disabled={this.state.editing} {...input} placeholder={placeholder} />
                                            {meta.error && meta.touched && <span className={'err'}>{meta.error}</span>}
                                        </div>
                                    )} 
                                </Field>
                                <p></p>
                                <Field name='professional' component='input' placeholder=''>
                                    {({input, meta, placeholder}) => (
                                        <div className={meta.active ? 'active':''}>
                                            <label>Professional Help I can contact</label>
                                            <textarea cols="80" rows='3' disabled={this.state.editing} {...input} placeholder={placeholder} />
                                            {meta.error && meta.touched && <span className={'err'}>{meta.error}</span>}
                                        </div>
                                    )} 
                                </Field>
                                </div>
                            </div>

                            <div className={this.formButton()}>
                                <button type='submit' disabled={this.state.editing} className='btnew'>Submit</button>
                                <button type='button' onClick={handleClick} disabled={this.state.editBtn} className='btedit'>Edit</button>
                                <button type='button' onClick={() => this.setState({showModal: false, record: null, editing:true, editBtn: false})} className='btdel'>Cancel</button>
                            </div>
                        </form>
                    )
                }}
            />
        )
    }

    render() {
        return (
            <CardForm content={this.MHSafetyForm()}>
            </CardForm>
        )
    }
}

export default MHSafety;