// to get patientId, Permission, provider name, practiceId, and external Id from redux state store

import React from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import { Form, Field} from 'react-final-form';
import Modal from '../widgets/Modal';
import Confirm from '../widgets/Confirm';
import {CardStep} from '../widgets/Cards';
import {encryption, decryption, randomKey} from '../../Security';
var cipherKey = randomKey();

// const PORT = "http://localhost:5100/api/mentalhealth/review";
const PORT = "https://api.caredevo.com/api/mentalhealth/review";

class MHPlan extends React.Component {

    constructor(props) {
            super(props);
            this.state = {
                patientId: props.identity[0],
                permission : props.identity[1],
                provider : props.identity[2],
                practiceId: props.identity[3],
                externalId: props.identity[4], 
                config : props.identity[5],
                page : 0,
                maxpage: 2,
                cognitive : [
                    { status : false, label : "I think negative thoughts", value: "Automatic negative thoughts"},
                    { status : false, label : "I blame other people", value: "Nihilistic thought"},
                    { status: false, label :"I tend to think the worst can happen", value :"Catastrophizing"}
                ],
                behaviour : [
                    { status : false, label: "I smoke more", value:"Smoking more"},
                    { status : false, label: "I drink alcohol more", value: "Drinking alcohol more"},
                    { status : false, label: "I use substance more", value: "Substance misuse"},
                    { status : false, label: "I stay in room all the time", value : "Social isolation"},
                    { status : false, label: "I go shopping", value: "Shopping"},
                    { status : false, label: "I exercise more", value: "Exercise"},
                ],
                mood : [
                    { status : false, label: "I feel mostly depressed", value : "Depressive mood"},
                    { status : false, label: "My mood is up and down", value: "Mood instability"},
                    { status : false, label: "I feel flat", value: "Flat affect"},
                    { status : false, label: "I feel anxious", value: "Anxious mood"},
                ]
            };

            this.toggle = this.toggle.bind(this);
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

    // async componentDidUpdate(prevState) {
        // if (this.state.dataState !== "Stable") {
        //     var params = {
        //         id : this.state.patientId,
        //         key : cipherKey
        //     }; 
        //     var res = await axios.get(`${PORT}/patient`, { params }, this.state.config);
        //     if (res.data) {
        //         var decryptedRespond = decryption(res.data, cipherKey);
        //         this.setState({content: decryptedRespond, dataState:"Stable"}); 
        //     } 
        // }   
    // }

    toggle = (value, page) => {

        var currentVal;
        var dataset;
        var page = this.state.page;

        //toggling value
        if (value.status === false) {
            currentVal = true;
        } else if (value.status === true) {
            currentVal = false;
        }

        //select dataset
        switch (page) {
            case 0:
                dataset = this.state.cognitive;
                dataset.map(obj => {
                    if (obj.label === value.label) {
                        obj.status = currentVal;
                    }
                });
                this.setState({cognitive: dataset})
                break;
            case 1: 
                dataset = this.state.behaviour;
                dataset.map(obj => {
                    if (obj.label === value.label) {
                        obj.status = currentVal;
                    }
                });
                this.setState({behaviour: dataset});
                break;
            case 2: 
                dataset = this.state.mood;
                dataset.map(obj => {
                    if (obj.label === value.label) {
                        obj.status = currentVal;
                    }
                });
                this.setState({mood: dataset});
                break;
            }

            //from here the component need to update, especially the currentpage
    }

    currentPage() {

        var page = this.state.page;
        var maxpage = this.state.maxpage;
        var content, subtitle, explanation;

        //subtitle page
        switch (page) {
            case 0:
                content = this.state.cognitive;
                subtitle = "Cognitive";
                explanation = "Click any symptoms related with your thought when in distress";
                break;
            case 1: 
                content = this.state.behaviour;
                subtitle = "Behaviour";
                explanation = "Click any symptoms related with activities when in distress";
                break;
            case 2:
                content = this.state.mood;
                subtitle = "Mood";
                explanation = "Click which describe your state of mood";
                break;
        }

        const renderList = (content) => {
            var list = content;
            var statement = [];
            list.map(item => {
                if (item.status === true) {
                    statement.push(item.value)                 
                }
            })
            
            return statement.map(item => {
                return (
                    <li>{item}</li>
                )
            });
        }

        return ( 
            <div style={{display:'inline-flex', flexDirection:'row', padding:'10px'}}>
                <div style={{width:'1200px'}}>
                    <h2>{subtitle}</h2>{explanation}<br></br>
                    {this.symptoms(content, page)}
                    <p></p>
                    <div style={{bottom:'80px', position:'fixed'}}>Page {page+1} of {maxpage+1}</div>
                </div>
                <div style={{borderColor:'black'}}>
                  
                        <b>Symptoms :</b><p></p>
                        <i>Cognitive symptoms : </i>
                        <ul style={{backgroundColor:'transparent', marginLeft:'20px', boxShadow:'none'}}>{renderList(this.state.cognitive)}</ul>
                        <p></p>
                        <i>Behaviour symptoms :</i>  
                        <ul style={{backgroundColor:'transparent', marginLeft:'20px', boxShadow:'none'}}>{renderList(this.state.behaviour)}</ul>



                  
                </div>
            </div>
            )
    }

    symptoms = (content, page) => {

        return content.map(item =>  {

            var density;
            if (item.status === true) {
                density = 1.0;
            } else if (item.status === false) {
                density = 0.6;
            }

            return (
            <div style={{display:'inline-flex', flexDirection:'row', padding:'10px'}}>
            <button className="btTag" onClick={() => this.toggle(item, page)} style={{opacity: density, width:"240px", borderRadius: '20px', textAlign:'center', padding:'20px'}}>{item.label}</button>
            </div>
            )
        })
    }

    buttons() {
        var currentpage = this.state.page;
        var maxpage = this.state.maxpage;

        const nextpage = () => {
            if (currentpage !== maxpage) {
                currentpage = currentpage + 1;
                this.setState({page : currentpage});
            } 
        }

        const prevpage = () => {
            if (currentpage !== 0) {
                currentpage = currentpage -1;
                this.setState({page: currentpage});
            }
        }

        var showPrev;
        if (this.state.page === 0) {
            showPrev = "hidden";
        } else {
            showPrev = "visible";
        }

        var showNext;
        if (this.state.page === this.state.maxpage) {
            showNext = "hidden";
        } else {
            showNext = "visible"
        }

        return (
            <>
            <button onClick={prevpage} style={{visibility: showPrev, width:'100px', height:'30px', fontSize:'14px'}} className='btnew'>Previous</button>
            <button onClick={nextpage} style={{visibility: showNext, width:'100px', height:'30px', fontSize:'14px'}} className='btnew'>Next</button>
            </>
        )
    }

    render() {
        return (
            <CardStep title="Mental Health Care Plan" buttons={this.buttons()}>
                {this.currentPage()}
            </CardStep>      
        )
    }
}


export default MHPlan;


