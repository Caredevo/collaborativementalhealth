
// to get patientId, Permission, provider name, practiceId, and external Id from redux state store

import React, { Component } from 'react';
import axios from 'axios';
import { Form, Field} from 'react-final-form';
import { CardFormSmall } from '../widgets/Cards';

const PORT = "http://localhost:3131/api/mentalhealth/formulate";


class MHFormulate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            patientId: props.identity[0],
            permission : props.identity[1],
            provider : props.identity[2],
            config : props.identity[3],
            practiceId: "Gateway",
            externalId: 2,
            dataState: "Stable",
            current_entry : null,
            content: [],
            editing: true,
            editBtn: false
        };

    };

    async componentDidMount() {
        var res = await axios.get(`${PORT}/patient/${this.state.patientId}`, this.state.config);
        if (res.data) {
            this.setState({content: res.data});
        } 
    }

    async componentDidUpdate() {
      
        if (this.state.dataState !== "Stable") {
            var res = await axios.get(`${PORT}/patient/${this.state.patientId}`, this.state.config);
            this.setState({content: res.data, dataState:"Stable"});  
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

    MHFormulateForm() { 
        var all_contents = this.state.content;
        var content;
        if (all_contents === undefined || all_contents.length === 0) {
            var d = new Date();
            var date = d.toISOString().slice(0,10);
            content = [];
            content.date = date;
        } else {
            var last_entry = all_contents[(all_contents.length)-1];
            content = last_entry;
            content.date = content.date.slice(0,10);

        }

        const handleSubmit = async (formValues) => {
            const form = formValues;
            form['patientId'] = this.state.patientId;
            form['provider'] = this.state.provider;  
            form['practiceId'] = this.state.practiceId;
            form['externalId'] = this.state.externalId;
        
            await axios.post(`${PORT}/add`, form, this.state.config)
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
                            <div className='header'>Formulation</div>
                            <div className='form-2-columns' disabled>
                                <div>
                                <Field name="date" component='input' label="Date" >
                                    {({input, meta}) => (
                                            <div className={meta.active ? 'active':''}>
                                                <label>Date</label>
                                                <input size='30' disabled={this.state.editing}  {...input} type='date' />
                                                {meta.error && meta.touched && <span className={'err'}>{meta.error}</span>}
                                            </div>
                                    )} 
                                </Field>
                                <p></p>
                                <Field name='predisposing' component='input' placeholder='eg. childhood abuse, substnace misuse'>
                                    {({input, meta, placeholder}) => (
                                        <div className={meta.active ? 'active':''}>
                                            <label>Predisposing Factors</label>
                                            <textarea cols="80" rows='6'  disabled={this.state.editing} {...input} placeholder={placeholder} />
                                            {meta.error && meta.touched && <span className={'err'}>{meta.error}</span>}
                                        </div>
                                    )} 
                                </Field>
                                <Field name='precipitating' component='input' placeholder='eg. recent marriage breakdown, job loss, etc. '>
                                    {({input, meta, placeholder}) => (
                                        <div className={meta.active ? 'active':''}>
                                            <label>Precipitating Factors</label>
                                            <textarea cols="80" rows='6'  disabled={this.state.editing} {...input} placeholder={placeholder} />
                                            {meta.error && meta.touched && <span className={'err'}>{meta.error}</span>}
                                        </div>
                                    )} 
                                </Field>
                                </div>
                                <div>
                                <br></br>
                                <br></br>
                                <br></br>
                                <p></p>
                           
                                <Field name='perpetuating' component='input' placeholder='eg. chronic pain, homeless, etc. '>
                                    {({input, meta, placeholder}) => (
                                        <div className={meta.active ? 'active':''}>
                                            <label>Perpetuating Factors</label>
                                            <textarea cols="80" rows='6'  disabled={this.state.editing} {...input} placeholder={placeholder} />
                                            {meta.error && meta.touched && <span className={'err'}>{meta.error}</span>}
                                        </div>
                                    )} 
                                </Field>
                                <Field name='protective' component='input' placeholder='eg. children, supportive parents, etc. '>
                                    {({input, meta, placeholder}) => (
                                        <div className={meta.active ? 'active':''}>
                                            <label>Protective Factors</label>
                                            <textarea cols="80" rows='6' disabled={this.state.editing} {...input} placeholder={placeholder} />
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
            <CardFormSmall content={this.MHFormulateForm()}>
            </CardFormSmall>
        )
    }
}

export default MHFormulate;