//Add json file, import it
//add state in constructor, add maxPage
//update select dataset
//update subtitle page

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


//importing template data
import cognitiveData from "../data/cognitive.json";
import moodData from "../data/mood.json";
import behaviourData from "../data/behaviour.json";
import physicalData from "../data/physical.json";
import sleepData from "../data/sleep.json";
import manicData from "../data/manic.json";
import eatingData from "../data/eating.json";
import traumaData from "../data/trauma.json";
import learningData from "../data/learning.json";
import autismData from "../data/autism.json";
import adhdData from "../data/adhd.json";
import pasthistoryData from "../data/pasthistory.json";
import pasttreatmentData from "../data/pasttreatment.json";
import currentmedData from "../data/currentmed.json";
import pastmedData from "../data/pastmed.json";
import familyhistoryData from "../data/familyhistory.json";
import substanceData from "../data/substance.json";
import employmentData from "../data/employment.json";
import financialData from "../data/financial.json";
import livingData from "../data/living.json";
import riskData from "../data/risk.json";
import childrenData from "../data/children.json";
import supportData from "../data/support.json";

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
                maxpage: 22,
                cognitive : cognitiveData,
                behaviour : behaviourData,
                mood : moodData,
                physical : physicalData,
                sleep: sleepData,
                manic: manicData,
                eating: eatingData,
                trauma: traumaData,
                learning: learningData,
                autism: autismData,
                adhd: adhdData,
                pasthistory : pasthistoryData,
                pasttreatment : pasttreatmentData,
                currentmed : currentmedData,
                pastmed : pastmedData,
                familyhistory : familyhistoryData,
                substance: substanceData,
                employment : employmentData,
                financial : financialData,
                living: livingData,
                risk: riskData,
                children : childrenData,
                support : supportData,
                team : [{role:'Psychologist', name:'',time:''}, {role:'', name:'',time:''},{role:'', name:'',time:''},{role:'', name:'',time:''}]
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
            case 3: 
                dataset = this.state.physical;
                dataset.map(obj => {
                    if (obj.label === value.label) {
                        obj.status = currentVal;
                    }
                });
                this.setState({physical: dataset});
                break;
            case 4: 
                dataset = this.state.sleep;
                dataset.map(obj => {
                    if (obj.label === value.label) {
                        obj.status = currentVal;
                    }
                });
                this.setState({sleep: dataset});
                break;
            case 5: 
                dataset = this.state.manic;
                dataset.map(obj => {
                    if (obj.label === value.label) {
                        obj.status = currentVal;
                    }
                });
                this.setState({manic: dataset});
                break;
            case 6: 
                dataset = this.state.eating;
                dataset.map(obj => {
                    if (obj.label === value.label) {
                        obj.status = currentVal;
                    }
                });
                this.setState({eating: dataset});
                break;
            case 7: 
                dataset = this.state.trauma;
                dataset.map(obj => {
                    if (obj.label === value.label) {
                        obj.status = currentVal;
                    }
                });
                this.setState({trauma: dataset});
                break;
            case 8: 
                dataset = this.state.learning;
                dataset.map(obj => {
                    if (obj.label === value.label) {
                        obj.status = currentVal;
                    }
                });
                this.setState({learning: dataset});
                break;
            case 9: 
                dataset = this.state.autism;
                dataset.map(obj => {
                    if (obj.label === value.label) {
                        obj.status = currentVal;
                    }
                });
                this.setState({autism: dataset});
                break;
            case 10: 
                dataset = this.state.adhd;
                dataset.map(obj => {
                    if (obj.label === value.label) {
                        obj.status = currentVal;
                    }
                });
                this.setState({adhd: dataset});
                break;
            case 11: 
                dataset = this.state.pasthistory;
                dataset.map(obj => {
                    if (obj.label === value.label) {
                        obj.status = currentVal;
                    }
                });
                this.setState({pasthistory: dataset});
                break;
            case 12: 
                dataset = this.state.pasttreatment;
                dataset.map(obj => {
                    if (obj.label === value.label) {
                        obj.status = currentVal;
                    }
                });
                this.setState({pasttreatment: dataset});
                break;
            case 13: 
                dataset = this.state.currentmed;
                dataset.map(obj => {
                    if (obj.label === value.label) {
                        obj.status = currentVal;
                    }
                });
                this.setState({currentmed: dataset});
                break;
            case 14: 
                dataset = this.state.pastmed;
                dataset.map(obj => {
                    if (obj.label === value.label) {
                        obj.status = currentVal;
                    }
                });
                this.setState({pastmed: dataset});
                break;
            case 15: 
                dataset = this.state.familyhistory;
                dataset.map(obj => {
                    if (obj.label === value.label) {
                        obj.status = currentVal;
                    }
                });
                this.setState({familyhistory: dataset});
                break;
            case 16: 
                dataset = this.state.substance;
                dataset.map(obj => {
                    if (obj.label === value.label) {
                        obj.status = currentVal;
                    }
                });
                this.setState({substance: dataset});
                break;
            case 17: 
                dataset = this.state.employment;
                dataset.map(obj => {
                    if (obj.label === value.label) {
                        obj.status = currentVal;
                    }
                });
                this.setState({employment: dataset});
                break;
            case 18: 
                dataset = this.state.financial;
                dataset.map(obj => {
                    if (obj.label === value.label) {
                        obj.status = currentVal;
                    }
                });
                this.setState({financial: dataset});
                break;
            case 19: 
                dataset = this.state.living;
                dataset.map(obj => {
                    if (obj.label === value.label) {
                        obj.status = currentVal;
                    }
                });
                this.setState({living: dataset});
                break;
            case 20: 
                dataset = this.state.risk;
                dataset.map(obj => {
                    if (obj.label === value.label) {
                        obj.status = currentVal;
                    }
                });
                this.setState({risk: dataset});
                break;
            case 21: 
                dataset = this.state.children;
                dataset.map(obj => {
                    if (obj.label === value.label) {
                        obj.status = currentVal;
                    }
                });
                this.setState({children: dataset});
                break;
            case 22: 
                dataset = this.state.support;
                dataset.map(obj => {
                    if (obj.label === value.label) {
                        obj.status = currentVal;
                    }
                });
                this.setState({support: dataset});
                break;
            }
    }

    currentPage() {

        var page = this.state.page;
        var maxpage = this.state.maxpage;
        var content, type, subtitle, explanation;

        //subtitle page
        switch (page) {
            case 0:
                content = this.state.cognitive;
                type = "capsule";
                subtitle = "Cognitive";
                explanation = "Click any symptoms related with your thought when in distress";
                break;
            case 1: 
                content = this.state.behaviour;
                type = "capsule";
                subtitle = "Behaviour";
                explanation = "Click any symptoms related with activities when in distress";
                break;
            case 2:
                content = this.state.mood;
                type = "capsule";
                subtitle = "Mood";
                explanation = "Click which describe your state of mood";
                break;
            case 3:
                content = this.state.physical;
                type = "capsule";
                subtitle = "Physical";
                explanation = "Click any physical symptoms developed during distress";
                break;
            case 4:
                content = this.state.sleep;
                type = "capsule";
                subtitle = "Sleep";
                explanation = "Click any physical symptoms related to sleep";
                break;
            case 5:
                content = this.state.manic;
                type = "capsule";
                subtitle = "Manic/Hypomanic Symptoms";
                explanation = "Click any symptoms below that you experience for at least 4 days, present most of the day, nearly every day during the episode";
                break;
            case 6:
                content = this.state.eating;
                type = "capsule";
                subtitle = "Trouble with eating";
                explanation = "Click any that relates with your eating habit";
                break;            
            case 7:
                content = this.state.trauma;
                type = "capsule";
                subtitle = "Trauma";
                explanation = "Click any symptoms related with trauma";
                break;
            case 8:
                content = this.state.learning;
                type = "capsule";
                subtitle = "Learning Difficulties";
                explanation = "Click any symptoms related with learning difficulties";
                break;
            case 9:
                content = this.state.autism;
                type = "capsule";
                subtitle = "Behaviour symptoms - 1";
                explanation = "Click any symptoms below that occured since at least 4 years old";
                break;
            case 10:
                content = this.state.adhd;
                type = "capsule";
                subtitle = "Behaviour symptoms - 2";
                explanation = "Click any symptoms below that occured between 6 months old to less than 12 years old, in 2 different settings, eg. home and school/work";
                break;
            case 11:
                content = this.state.pasthistory;
                type = "capsule";
                subtitle = "Past Mental Health History";
                explanation = "Click any diagnosis that you were diagnosed with";
                break;            
            case 12:
                content = this.state.pasttreatment;
                type = "capsule";
                subtitle = "Past Treatment History";
                explanation = "Click any treatment you have received in the past";
                break;
            case 13:
                content = this.state.currentmed;
                type = "capsule";
                subtitle = "Current Medication(s)";
                explanation = "Click any medication that you are currently on";
                break;
            case 14:
                content = this.state.pastmed;
                type = "capsule";
                subtitle = "Past medication(s)";
                explanation = "Click any medication you have tried in the past";
                break;
            case 15:
                content = this.state.familyhistory;
                type = "capsule";
                subtitle = "Family History of Mental Health";
                explanation = "Click any history of mental health in the family";
                break;
            case 16:
                content = this.state.substance;
                type = "capsule";
                subtitle = "Substance Use History";
                explanation = "Click any substance use below";
                break;            
            case 17:
                content = this.state.employment;
                type = "capsule";
                subtitle = "Employment History";
                explanation = "Click below that's related with your current/past employment";
                break;
            case 18:
                content = this.state.financial;
                type = "capsule";
                subtitle = "Financials";
                explanation = "Click below related your personal financial issue";
                break;
            case 19:
                content = this.state.living;
                type = "capsule";
                subtitle = "Living arrangement";
                explanation = "Click below related with your living arrangement";
                break;
            case 20:
                content = this.state.risk;
                type = "capsule";
                subtitle = "Risks";
                explanation = "Click below any symptoms related with risk";
                break;
            case 21:
                content = this.state.children;
                type = "capsule";
                subtitle = "Children";
                explanation = "Click below any children at home";
                break;
            case 22:
                content = this.state.support;
                type = "capsule";
                subtitle = "Support";
                explanation = "Click below related with your support";
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
            // <div style={{display:'inline-flex', flexDirection:'row', padding:'10px'}}>
                <div>
                    <h2>{subtitle}</h2>{explanation}<br></br>
                    {this.symptoms(content, page, type)}
                    <p></p>
                    <div style={{top:'-370px', marginRight: '20px', float:'right', position:'relative'}}>Page {page+1} of {maxpage+1}</div>
                </div>
            // </div>
            )
    }

    symptoms = (content, page, type) => {

        //if clickable capsule modes
        switch (type) {
            case "capsule":
                return content.map(item =>  {

                    var density;
                    if (item.status === true) {
                        density = 1.0;
                    } else if (item.status === false) {
                        density = 0.6;
                    }

                    return (
                    <div style={{display:'inline-flex', flexDirection:'row', padding:'10px'}}>
                    <button className="capsule" onClick={() => this.toggle(item, page)} style={{opacity: density}}>{item.label}</button>
                    </div>
                    )
                })
                break;
            case "form":

                const team = () => {
                    return content.map(item =>  {
                        var name = item.name;
                        var role = item.role;
                        return (
                            <tr>
                            <td><input type='text' value={name} /></td>
                            <td><input type='text' value={role} /></td>
                            </tr>
                        )
                    })
                }
               
                return (
                    <div>
                        <table className='lmtable'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {team()}
                        </tbody>

                        </table>
                    </div>
                )
                
               
        } 
       
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


