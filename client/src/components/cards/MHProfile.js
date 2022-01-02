

// to get patientId, Permission, provider name, practiceId, and external Id from redux state store

import React, { Component } from 'react';
import axios from 'axios';
import { Form, Field} from 'react-final-form';
import { CardFormHorizontalThird } from '../widgets/Cards';

class MHProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            patientId: props.identity[0],
            permission : props.identity[1],
            provider : props.identity[2],
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
        var res = await axios.get("http://mh_profile-srv:5030/mh_profile/patient/" + this.state.patientId);
        if (res.data) {
            this.setState({content: res.data});
        } 
    }

    async componentDidUpdate() {
      
        if (this.state.dataState !== "Stable") {
            var res = await axios.get("http://mh_profile-srv:5030/mh_profile/patient/" + this.state.patientId);
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

    MHProfileForm() { 
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
        
            await axios.post('http://mh_profile-srv:5030/mh_profile/add', form)
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

        const required = value =>(value ? undefined : 'Required');

        return (
            <Form
                onSubmit = {handleSubmit}
                initialValues = {content}
                render = {({handleSubmit, pristine, form, values, submitting}) => {
                    return (
                        <form onSubmit={handleSubmit} >
                            <div className='header'>Mental Health Profile</div>

                            <div className='form-4-columns'>
                                <div>
                                    <Field name="date" component='input' label="Date" validate={required}>
                                        {({input, meta}) => (
                                                <div className={meta.active ? 'active':''}>
                                                    <label>Date</label>
                                                    <input size='30' {...input} type='date' />
                                                    {meta.error && meta.touched && <span className={'err'}>{meta.error}</span>}
                                                </div>
                                        )} 
                                    </Field>
                                    <p></p>
                                    <Field name='mentalhx' component='input'  placeholder=''>
                                        {({input, meta, placeholder}) => (
                                            <div className={meta.active ? 'active':''}>
                                                <label>Mental Health History</label>
                                                <textarea cols="50" rows='7' disabled={this.state.editing} {...input} placeholder={placeholder} />
                                                {meta.error && meta.touched && <span className={'err'}>{meta.error}</span>}
                                            </div>
                                        )} 
                                    </Field>
                                    <p></p>
                                    <Field name='personality' component='input'  placeholder=''>
                                        {({input, meta, placeholder}) => (
                                            <div className={meta.active ? 'active':''}>
                                                <label>Premorbid Personality</label>
                                                <textarea cols="50" rows='4' disabled={this.state.editing}  {...input} placeholder={placeholder} />
                                                {meta.error && meta.touched && <span className={'err'}>{meta.error}</span>}
                                            </div>
                                        )} 
                                    </Field>
                                
                                    </div>
                                    <div>
                                    <Field name='familyhx' component='input' placeholder=''>
                                        {({input, meta, placeholder}) => (
                                            <div className={meta.active ? 'active':''}>
                                                <label>Family History of Mental Health</label>
                                                <textarea cols="50" rows='4' disabled={this.state.editing}  {...input} placeholder={placeholder} />
                                                {meta.error && meta.touched && <span className={'err'}>{meta.error}</span>}
                                            </div>
                                        )} 
                                    </Field>
                                    <p></p>
                                    <Field name='socialhx' component='input' placeholder=''>
                                        {({input, meta, placeholder}) => (
                                            <div className={meta.active ? 'active':''}>
                                                <label>Social History</label>
                                                <textarea cols="50" rows='4' disabled={this.state.editing}  {...input} placeholder={placeholder} />
                                                {meta.error && meta.touched && <span className={'err'}>{meta.error}</span>}
                                            </div>
                                        )} 
                                    </Field>
                                    <p></p>
                                    <Field name='develophx' component='input' placeholder=''>
                                        {({input, meta, placeholder}) => (
                                            <div className={meta.active ? 'active':''}>
                                                <label>Developmental History</label>
                                                <textarea cols="50" rows='4' disabled={this.state.editing} {...input} placeholder={placeholder} />
                                                {meta.error && meta.touched && <span className={'err'}>{meta.error}</span>}
                                            </div>
                                        )} 
                                    </Field>
                              
                                    </div>
                                    <div>
                                    <Field name='domestic' component='input' placeholder=''>
                                        {({input, meta, placeholder}) => (
                                            <div className={meta.active ? 'active':''}>
                                                <label>Domestic</label>
                                                <textarea cols="50" rows='4' disabled={this.state.editing} {...input} placeholder={placeholder} />
                                                {meta.error && meta.touched && <span className={'err'}>{meta.error}</span>}
                                            </div>
                                        )} 
                                    </Field>
                                    <p></p>
                                    <Field name='substance' component='input' placeholder=''>
                                        {({input, meta, placeholder}) => (
                                            <div className={meta.active ? 'active':''}>
                                                <label>Substance and Alcohol History</label>
                                                <textarea cols="50" rows='4' disabled={this.state.editing} {...input} placeholder={placeholder} />
                                                {meta.error && meta.touched && <span className={'err'}>{meta.error}</span>}
                                            </div>
                                        )} 
                                    </Field>
                                    <p></p>
                                    <Field name='treatmenthx' component='input'  placeholder=''>
                                        {({input, meta, placeholder}) => (
                                            <div className={meta.active ? 'active':''}>
                                                <label>Treatment History</label>
                                                <textarea cols="50" rows='4' disabled={this.state.editing} {...input} placeholder={placeholder} />
                                                {meta.error && meta.touched && <span className={'err'}>{meta.error}</span>}
                                            </div>
                                        )} 
                                    </Field>
                                    </div>
                                    <div>
                                    <Field name='housing' component='input' placeholder=''>
                                        {({input, meta, placeholder}) => (
                                            <div className={meta.active ? 'active':''}>
                                                <label>Current and Past Housing</label>
                                                <textarea cols="50" rows='4' disabled={this.state.editing} {...input} placeholder={placeholder} />
                                                {meta.error && meta.touched && <span className={'err'}>{meta.error}</span>}
                                            </div>
                                        )} 
                                    </Field>
                                    <p></p>
                                    <Field name='finance' component='input' placeholder=''>
                                        {({input, meta, placeholder}) => (
                                            <div className={meta.active ? 'active':''}>
                                                <label>Current and Past Financial Condition</label>
                                                <textarea cols="50" rows='4' disabled={this.state.editing} {...input} placeholder={placeholder} />
                                                {meta.error && meta.touched && <span className={'err'}>{meta.error}</span>}
                                            </div>
                                        )} 
                                    </Field>
                                    <p></p>
                                    <Field name='employment' component='input' placeholder=''>
                                        {({input, meta, placeholder}) => (
                                            <div className={meta.active ? 'active':''}>
                                                <label>Current and Past Employment History</label>
                                                <textarea cols="50" rows='4' disabled={this.state.editing} {...input} placeholder={placeholder} />
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
            <CardFormHorizontalThird content={this.MHProfileForm()}>
            </CardFormHorizontalThird>
        )
    }
}


export default MHProfile;