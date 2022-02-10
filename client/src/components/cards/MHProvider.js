
import React from 'react';
import axios from 'axios';
import { Form, Field} from 'react-final-form';
import Modal from '../widgets/Modal';
import Confirm from '../widgets/Confirm';
import {CardSmall} from '../widgets/Cards';

const PORT = "http://localhost:3131/api/mentalhealth/provider";


class MHProvider extends React.Component {

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
                showModal: false,
                showDelete : false,
                newForm : true,
                record : null,
                rowData : [],
                content: []
            };
        };


    //Initial Rendering
    async componentDidMount() {
        //this.props.fetchMHReviews('603cc70b091c763150cb5ffd')
        var res = await axios.get(`${PORT}/patient/${this.state.patientId}`, this.state.config);
        this.setState({content: res.data});
    }

    async componentDidUpdate() {
        if (this.state.dataState !== "Stable") {
            var res = await axios.get(`${PORT}/patient/${this.state.patientId}`, this.state.config);
            this.setState({content: res.data, dataState:'Stable'});
        }
       
    }
    
    // Render content

    renderMHProviderList() {

        var list = this.state.content;

        return list.map(mh_provider =>  {

            const rowButton = () => {
                var permit = this.state.permission;
                if (permit === "View only") {
                    return null;
                } else { 
                    return (
                        <>
                        <button onClick={() => this.setState({showModal: true, newForm: false, record: mh_provider._id, rowData: mh_provider})} className='tableEdit'><i className="far fa-edit"></i></button>
                        <button onClick={() => this.setState({showDelete: true, record: mh_provider._id})} className='tableDelete'><i className="fas fa-trash"></i></button>
                        </>
                    )
                }  
            }
 
            return (
                    <tr key={mh_provider._id}>
                        <td>{mh_provider.practitioner}</td>
                        <td>{mh_provider.role}</td>
                        <td>{mh_provider.contact}</td>
                        <td>
                           {rowButton()}
                        </td>
                    </tr>
            )
        })
    }

    buttons() {
        var permit = "Read and Write";
        if (permit === "View only") {
            return null
        } else { 
            return  <button onClick={() => this.setState({showModal: true, newForm: true, record: null})} className='btnew'>Add</button>
        }  
    }

    render() {
        return (

                <CardSmall title='Service Providers' buttons={this.buttons()}>
                    <table>
                        <thead>
                        <tr>
                            <th>Practitioner</th>
                            <th>Role</th>
                            <th>Contact</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody> 
                            {this.renderMHProviderList()}
                        </tbody> 
                    </table>
                    {this.renderModalBox()}
                    {this.renderDeleteBox()}
           
                </CardSmall>
        )
    }

    //Update or New Form Pop Up

    renderModalBox() {
        const rowData = this.state.rowData;
        const mh_providerForm = () => {
            const required = value =>(value ? undefined : 'Required');
         
            var content;
            if (this.state.newForm === false ) {
                content = rowData;
               
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
                    await axios.post(`${PORT}/add`, form, this.state.config)
                    .then((response) => {
                      console.log(response);
                    }, (error) => {
                      console.log(error);
                    });
                  } else {
                    await axios.post(`${PORT}update/${this.state.record}`, form, this.state.config)
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

                                    <Field name="practitioner" component='input' validate={required} placeholder=''>
                                        {({input, meta, placeholder}) => (
                                            <div className={meta.active ? 'active':''}>
                                                <label>Practitioner/Provider</label>
                                                <input {...input} placeholder={placeholder} />
                                                {meta.error && meta.touched && <span className={'err'}>{meta.error}</span>}
                                            </div>
                                        )}
                                    </Field>
                                    <p></p>
                                    <Field name="role" component='input' validate={required} placeholder=''>
                                        {({input, meta, placeholder}) => (
                                            <div className={meta.active ? 'active':''}>
                                                <label>Role</label>
                                                <input {...input} placeholder={placeholder} />
                                                {meta.error && meta.touched && <span className={'err'}>{meta.error}</span>}
                                            </div>
                                        )}
                                    </Field>
                                    <p></p>
                                    <Field name="contact" component='input' validate={required} placeholder=''>
                                        {({input, meta, placeholder}) => (
                                            <div className={meta.active ? 'active':''}>
                                                <label>Contact</label>
                                                <input {...input} placeholder={placeholder} />
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

// SECTION D
        return (
            <Modal 
                height='300px'
                width='300px'
                open={this.state.showModal} 
                title='Service Providers'
                data={this.state.record}
                content={mh_providerForm()}
                onDismiss={() => this.setState({showModal: false, record: null})}
            />
        )
    }

    //Delete confirmation pop up
    renderDeleteBox() {

        const handleDelete = async () => {
            await axios.delete(`${PORT}/${this.state.record}`);
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

//SECTION E
        return (
            <Confirm
            height='100px'
            width='300px'
            open={this.state.showDelete} 
            data={this.state.record}
            content="Delete this Service Providers ?"
            title='Delete Service Providers'
            actions = {deleteButtons()}
            onDismiss={() => this.setState({showDelete : false, record:null})}
        />
        )

    }

}

export default MHProvider;