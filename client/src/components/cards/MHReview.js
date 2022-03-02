// to get patientId, Permission, provider name, practiceId, and external Id from redux state store

import React from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import { Form, Field} from 'react-final-form';
import Modal from '../widgets/Modal';
import Confirm from '../widgets/Confirm';
import {CardLarge} from '../widgets/Cards';
import {encryption, decryption, randomKey} from '../../Security';
var cipherKey = randomKey();



// const PORT = "http://localhost:3131/api/mentalhealth/review";
const PORT = "http://localhost:5050/mh_review"


class MHReview extends React.Component {

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
                showModal: false,
                showDelete : false,
                newForm : true,
                record : null,
                rowData : [],
                content: []
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


    // Render content
    renderMHReviewList() {

        var list = this.state.content;

        return list.map(mh_review =>  {

            const rowButton = () => {
                var permit = this.state.permission;
                if (permit === "View only") {
                    return null;
                } else { 
                    return (
                        <>
                        <button onClick={() => this.setState({showModal: true, newForm: false, record: mh_review._id, rowData: mh_review})} className='tableEdit'><i className="far fa-edit"></i></button>
                        <button onClick={() => this.setState({showDelete: true, record: mh_review._id})} className='tableDelete'><i className="fas fa-trash"></i></button>
                        </>
                    )
                }  
            }
            return (
                    <tr key={mh_review._id}>                 
                        <td> <Moment format='DD MMM YYYY'>{mh_review.date}</Moment></td>      
                        <td>{mh_review.review}</td>
                        <td>{mh_review.mse}</td>
                        <td>{mh_review.risk}</td>
                        <td>{mh_review.assessment}</td>
                        <td>{mh_review.tools}</td>
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

                <CardLarge title='Reviews' buttons={this.buttons()}>
                    <table>
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Review</th>
                            <th>Mental State Examination</th>
                            <th>Risk</th>   
                            <th>Assessment</th>
                            <th>Tools</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody> 
                            {this.renderMHReviewList()}
                        </tbody> 
                    </table>
                    {this.renderModalBox()}
                    {this.renderDeleteBox()}
           
                </CardLarge>
        )
    }

    //Update or New Form Pop Up
    renderModalBox() {
        const rowData = this.state.rowData;

        const mh_reviewForm = () => {
            const required = value =>(value ? undefined : 'Required');
         
            var content;
            if (this.state.newForm === false ) {
                content = rowData
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
                    var encryptedData = encryption(form, cipherKey);
                    await axios.post(`${PORT}/add`, encryptedData, this.state.config)
                    .then((response) => {
                      console.log(response);
                    }, (error) => {
                      console.log(error);
                    });
                } else {
                    encryptedData = encryption(form, cipherKey);
                    await axios.post(`${PORT}/update`, encryptedData, this.state.config)
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
                                <Field name='review' component='input' validate={required} placeholder='Review Notes'>
                                    {({input, meta, placeholder}) => (
                                        <div className={meta.active ? 'active':''}>
                                            <label>Review Notes</label>
                                            <textarea cols="80" rows='4' {...input} placeholder={placeholder} />
                                            {meta.error && meta.touched && <span className={'err'}>{meta.error}</span>}
                                        </div>
                                    )} 
                                </Field>
                                <Field name='mse' component='input' validate={required} placeholder='Mental state examination'>
                                    {({input, meta, placeholder}) => (
                                        <div className={meta.active ? 'active':''}>
                                            <label>Mental State Examination</label>
                                            <textarea cols="80" rows='4' {...input} placeholder={placeholder} />
                                            {meta.error && meta.touched && <span className={'err'}>{meta.error}</span>}
                                        </div>
                                    )} 
                                </Field>
                                <Field name='assessment' component='input' validate={required} placeholder='Assessment'>
                                    {({input, meta, placeholder}) => (
                                        <div className={meta.active ? 'active':''}>
                                            <label>Assessment</label>
                                            <textarea cols="80" rows='4' {...input} placeholder={placeholder} />
                                            {meta.error && meta.touched && <span className={'err'}>{meta.error}</span>}
                                        </div>
                                    )} 
                                </Field>
                                <Field name='tools' component='input' validate={required} placeholder='Tools used, eg. DASS21 or K10'>
                                    {({input, meta, placeholder}) => (
                                        <div className={meta.active ? 'active':''}>
                                            <label>Tools</label>
                                            <textarea cols="80" rows='2' {...input} placeholder={placeholder} />
                                            {meta.error && meta.touched && <span className={'err'}>{meta.error}</span>}
                                        </div>
                                    )} 
                                </Field>
                                <Field name='risk' component='input' validate={required} placeholder='Notes on suicidality, harm to self/others'>
                                    {({input, meta, placeholder}) => (
                                        <div className={meta.active ? 'active':''}>
                                            <label>Risk</label>
                                            <textarea cols="80" rows='4' {...input} placeholder={placeholder} />
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

// main render

        return (
            <Modal 
                height='700px'
                width='600px'
                open={this.state.showModal} 
                title='Reviews'
                data={this.state.record}
                content={mh_reviewForm()}
                onDismiss={() => this.setState({showModal: false, record: null})}
            />
        )
    }

    //Delete confirmation pop up
    renderDeleteBox() {

        const handleDelete = async () => {
            var params = {
                id : this.state.record,
                key : cipherKey
            }; 
            await axios.delete(`${PORT}`, { params }, this.state.config);
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
            height='100px'
            width='300px'
            open={this.state.showDelete} 
            data={this.state.record}
            content="Delete this Reviews ?"
            title='Delete Reviews'
            actions = {deleteButtons()}
            onDismiss={() => this.setState({showDelete : false, record:null})}
        />
        )

    }

}


export default MHReview;
