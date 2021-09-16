// to get patientId, Permission, provider name, practiceId, and external Id from redux state store
import React from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import { Form, Field} from 'react-final-form';

import Modal from '../widgets/Modal';
import Confirm from '../widgets/Confirm';
import {CardMedium} from '../widgets/Cards';

class MHAction extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            patientId: props.identity[0],
            permission : props.identity[1],
            provider : props.identity[2],
            practiceId: "Gateway",
            externalId: 2,
            dataState: "Stable",
            showModal: false,
            showDelete : false,
            newForm : true,
            record : null,
            rowData : [],
            content: []
        };
    };

    async componentDidMount() {

        var res = await axios.get("http://localhost:5010/mh_action/patient/" + this.state.patientId);
        this.setState({content: res.data});
    }

    async componentDidUpdate() {

        if (this.state.dataState !== "Stable") {
            var res = await axios.get("http://localhost:5010/mh_action/patient/" + this.state.patientId);
            this.setState({content: res.data, dataState:'Stable'});
        }
    }

     // Render content
     renderMHActionList() {

        var list = this.state.content;

        return list.map(mh_action =>  {

            const rowButton = () => {
                var permit = this.state.permission;
                if (permit === "View only") {
                    return null;
                } else { 
                    return (
                        <>
                        <button onClick={() => this.setState({showModal: true, newForm: false, record: mh_action._id, rowData:mh_action})} className='tableEdit'><i className="far fa-edit"></i></button>
                        <button onClick={() => this.setState({showDelete: true, record: mh_action._id})} className='tableDelete'><i className="fas fa-trash"></i></button>
                        </>
                    )
                }  
            }
            return (
                    <tr key={mh_action._id}>                    
                        <td> <Moment format='DD MMM YYYY'>{mh_action.date}</Moment></td>     
                        <td>{mh_action.issue}</td>
                        <td>{mh_action.goal}</td>
                        <td>{mh_action.intervention}</td>
                        <td>{mh_action.referral}</td>
   
                        <td>
                            {rowButton()}
                        </td>
                    </tr>
            )
        })
    }

    buttons() {
        var permit = this.state.permission;
        if (permit === "View only") {
            return null
        } else { 
            return  <button onClick={() => this.setState({showModal: true, newForm: true, record: null})} className='btnew'>Add</button>
        }  
    }

    render() {
        return (

                <CardMedium title='Action Plan' buttons={this.buttons()}>
                    <table>
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Issue</th>
                            <th>Goal</th>
                            <th>Intervention</th>   
                            <th>Referral</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody> 
                            {this.renderMHActionList()}
                        </tbody> 
                    </table>
                    {this.renderDeleteBox()}
                    {this.renderModalBox()}
                </CardMedium>
        )
    }

    //modal Box
    renderModalBox() {
    
        const rowData = this.state.rowData;
        
        const mh_actionForm = () => {
            const required = value =>(value ? undefined : 'Required');
         
            var content;
            if (this.state.newForm === false ) {
                content = rowData;
                content.date = content.date.slice(0,10);
            } else {
                content = null;
            }
            const currentVal = content;

            const handleSubmit = async (formValues) => {
            
                const form = formValues;
                form['patientId'] = this.state.patientId;
                form['provider'] = this.state.provider;  
                form['practiceId'] = this.state.practiceId;
                form['externalId'] = this.state.externalId;
            
                if (this.state.record === null) {
                  await axios.post('http://localhost:5010/mh_action/add', form)
                  .then((response) => {
                    console.log(response);
                  }, (error) => {
                    console.log(error);
                  });
                } else {
                  await axios.post('http://localhost:5010/mh_action/update/' + this.state.record, form)
                  .then((response) => {
                    console.log(response);
                  }, (error) => {
                    console.log(error);
                  });
                }
                this.setState({showModal :false, newForm : true,record : null, rowData: [], dataState:"New dataset"});
           }

            return (
                <Form 
                    onSubmit = {handleSubmit} 
                    initialValues = {currentVal}
                    render = {({ handleSubmit, pristine, form, values, submitting }) => {
                    return   (
                            <form onSubmit={handleSubmit}>
                                    <Field name="date" component='input' label="Date" validate={required}>
                                        {({input, meta}) => (
                                                <div className={meta.active ? 'active':''}>
                                                    <label>Date</label>
                                                    <input size='30' {...input} type='date' />
                                                    {meta.error && meta.touched && <span className={'err'}>{meta.error}</span>}
                                                </div>
                                        )} 
                                    </Field>  
                                    <Field name="issue" component='input' validate={required} placeholder='Enter issue'>
                                        {({input, meta, placeholder}) => (
                                            <div className={meta.active ? 'active':''}>
                                                <label>Issue</label>
                                                <input {...input} placeholder={placeholder} />
                                                {meta.error && meta.touched && <span className={'err'}>{meta.error}</span>}
                                            </div>
                                        )}
                                    </Field>
                                    <Field name="goal" component='input' validate={required} placeholder='Enter goal'>
                                        {({input, meta, placeholder}) => (
                                            <div className={meta.active ? 'active':''}>
                                                <label>Goal</label>
                                                <textarea cols="80" rows='3' {...input} placeholder={placeholder} />
                                                {meta.error && meta.touched && <span className={'err'}>{meta.error}</span>}
                                            </div>
                                        )}
                                    </Field>
                                    <Field name="intervention" component='input' validate={required} placeholder='Enter intervention'>
                                        {({input, meta, placeholder}) => (
                                            <div className={meta.active ? 'active':''}>
                                                <label>Intervention</label>
                                                <textarea cols="80" rows='3' {...input} placeholder={placeholder} />
                                                {meta.error && meta.touched && <span className={'err'}>{meta.error}</span>}
                                            </div>
                                        )}
                                    </Field>
                                    <Field name="referral" component='input' validate={required} placeholder='Enter referral'>
                                        {({input, meta, placeholder}) => (
                                            <div className={meta.active ? 'active':''}>
                                                <label>Referral</label>
                                                <textarea cols="80" rows='3' {...input} placeholder={placeholder} />
                                                {meta.error && meta.touched && <span className={'err'}>{meta.error}</span>}
                                            </div>
                                        )}
                                    </Field>
                                    <div className='modalButton'>
                                        <button type='submit' disabled={submitting || pristine} className='btnew'>Submit</button>
                                        <button type='button' onClick={form.reset} disabled={submitting || pristine } className='btdel'>Reset</button>
                                        <button onClick={() => this.setState({showModal: false, record: null})} className='btdel'>Cancel</button>
                                    </div>
                                  
                            </form>
                        )
                    }}
                />
            )
        }   
        //  <pre>{JSON.stringify(values, 0, 2)}</pre>
        return (
            <Modal 
                height='460px'
                width='300px'
                open={this.state.showModal} 
                title='Action Plan'
                data={this.state.record}
                content={mh_actionForm()}
                onDismiss={() => this.setState({showModal: false, record: null})}
            />
        )
    }

    renderDeleteBox() {

        const handleDelete = async () => {
            await axios.delete("http://localhost:5010/mh_action/" + this.state.record);
            this.setState({showDelete:false, record:null, dataState:"New dataset"})
        }

        const deleteButtons = () => {
            return (
            <div>
                <button onClick={() => this.setState({showDelete: false})} className='btdel'>Cancel</button>
                <button onClick={handleDelete} className='btsave'>Ok</button>
            </div>
            )
        }

        return (
            <Confirm
            height='150px'
            width='300px'
            open={this.state.showDelete} 
            data={this.state.record}
            content="Delete this Action Plan ?"
            title='Delete Action Plan'
            actions = {deleteButtons()}
            onDismiss={() => this.setState({showDelete : false, record:null})}
        />
        )

    }

}


export default MHAction;