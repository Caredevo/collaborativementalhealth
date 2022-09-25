import React, { Component } from 'react';
import Modal from './Modal';

export class Card extends Component {

    render() {

        return (
            <div className='smallcard'>
                <div className='header'>{this.props.title}</div>
                <div className='insidecard'>{this.props.children}</div>
            </div>
        )
    }
}

export class CardFeatureA extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            modaltitle : this.props.modaltitle,
            modalcontent : this.props.modalcontent
        };
    };

    onDisplay() {
        return (
            <Modal
                height='200px'
                width='300px'
                open={this.state.showModal}
                title={this.state.modaltitle}
                content="coming soon ..."
                onDismiss={() => this.setState({showModal: false})}
            />
        )
    }


    render() {
        return <div className='plaincard' style={{borderRadius:'0px', overflow:'hidden'}}>
                <div>
                <div style={{fontSize:'46px', fontStyle:'bold'}}><center>{this.props.title}</center></div>
                <div style={{fontSize:'20px', marginTop:'16px', color:'darkcyan'}}><center>{this.props.subtitle}</center></div>
                </div>
                <div style={{fontSize:'16px', marginTop:'80px', color:'darkgrey', display:'grid', gridTemplateColumns:'450px auto'}}>
                    <div >
                        <img style={{ width:'400px'}} src={this.props.imagelink} alt="Feature"></img>
                    </div>
                    <div style={{fontSize:'16px', lineHeight:'1.3',textAlign:'left', marginTop:'30px', color:'darkgrey'}}>
                        {this.props.children}
                        <p></p>
                        <button className="btdel" onClick={() => this.setState({showModal: true})} style={{width:'100px'}}>Learn more</button>
                    </div>
            
                </div>
                {this.onDisplay()}
            </div>  
    }
}

export class CardFeatureB extends Component {
    render() {
        return <div className='plaincard' style={{borderRadius:'0px', backgroundColor:'#3c3c3c'}}>
                <div>
                    <div style={{fontSize:'46px', fontStyle:'bold', color:'white'}}><center>{this.props.title}</center></div>
                    <div style={{fontSize:'20px', marginTop:'16px', color:'#ce0000'}}><center>{this.props.subtitle}</center></div>
                </div>
                <div style={{fontSize:'16px', marginTop:'80px', marginBottom:'30px', color:'white', display:'grid', gridTemplateColumns:'450px auto'}}>
                
                    <div>
                        <img style={{ width:'360px'}} src={this.props.imagelink} alt="Feature"></img>
                    </div>
                    <div style={{fontSize:'16px', lineHeight:'1.3',textAlign:'left', marginTop:'30px', color:'lightgrey'}}>
                        {this.props.children}
                        <p></p>
                        <button className="btdel" style={{width:'100px'}}>Learn more</button>
                    </div>
                </div>
            </div>  
    }
}

export class CardFeatureC extends Component {
    render() {
        return <div className='plaincard' style={{borderRadius:'0px', backgroundColor:'rgb(11, 64, 98)'}}>
                <div>
                <div style={{fontSize:'46px', fontStyle:'bold', color:'white'}}><center>{this.props.title}</center></div>
                <div style={{fontSize:'20px', marginTop:'16px', color:'rgb(11, 191, 228)'}}><center>{this.props.subtitle}</center></div>
                </div>
                <div style={{fontSize:'16px', marginTop:'80px', color:'white', display:'grid', gridTemplateColumns:'450px auto'}}>
                    <div>
                        <img style={{ width:'400px'}} src={this.props.imagelink} alt="Feature"></img>
                    </div>
                    <div style={{fontSize:'16px', lineHeight:'1.3', textAlign:'left', marginTop:'30px', color:'lightgrey'}}>
                        {this.props.children}
                        <p></p>
                        <button className="btdel" style={{width:'100px'}}>Learn more</button>
                    </div>
                </div>
            </div>  
    }
}


export class CardImage extends Component {
    render() {
        return <div className='imagecard'>{this.props.children}</div>  
    }
}

export class CardPlain extends Component {
    render() {
        return <div className='plaincard'>{this.props.content}</div>  
    }
}

export class CardWarning extends Component {
    render() {
        var color = "warningcard_"+this.props.color;
        var iconpic = "fas fa-8x fa-"+ this.props.icon;

        return (
        <div className={color} >
            <div>{this.props.content}</div>
            <div style={{position:'relative', left:'300px', top:'-40px', color:'white', opacity:'0.1'}}><i className={iconpic}></i></div>
        </div>
        )  
    }
}

export class CardPlainManual extends Component {
    render() {
        return (
            <div className='plaincard'>
                <div>{this.props.title}</div>
                <div className='insidecard'>{this.props.children}</div>
                <div>{this.props.buttons}</div>
            </div>
        )
    }
}


export class CardForm extends Component {
    render() {
        return <div className='mediumcard'>{this.props.content}</div>  
    }
}

export class CardFormSmall extends Component {
    render() {
        return <div className='smallcard'>{this.props.content}</div>  
    }
}

export class CardFormVertical extends Component {
    render() {
        return <div className='halfverticalcard'>{this.props.content}</div>  
    }
}

export class CardFormHorizontal extends Component {
    render() {
        return <div className='halfhorizontalcard'>{this.props.content}</div>  
    }
}

export class CardFormHorizontalThird extends Component {
    render() {
        return <div className='thirdhorizontalcard'>{this.props.content}</div>  
    }
}

export class CardFormHorizontalExtend extends Component {
    render() {
        return <div className='halfhorizontalcardextend'>{this.props.content}</div>  
    }
}

export class CardSmall extends Component {

    formButton() {
        if (this.props.buttons === null) {
            return "inaction";
        } else { 
            return "action";
        }  
    }

    render() {

        return (
            <div className='smallcard'>
                <div className='header'>{this.props.title}</div>
                <div className='insidecard'>{this.props.children}</div>
                <div className={this.formButton()}>{this.props.buttons}</div>
            </div>
        )
    }
}

export class CardMedium extends Component {

    formButton() {
        if (this.props.buttons === null) {
            return "inaction";
        } else { 
            return "action";
        }  
    }

    render() {
        return (
            <div className='mediumcard'>
                <div className='header'>{this.props.title}</div>
                <div className='insidecard'>{this.props.children}</div>
                <div className={this.formButton()}>{this.props.buttons}</div>
            </div>
        )
    }
}

export class CardVertical extends Component {

    formButton() {
        if (this.props.buttons === null) {
            return "inaction";
        } else { 
            return "action";
        }  
    }

    render() {
        return (
            <div className='verticalcard'>
                <div className='header'>{this.props.title}</div>
                <div className='insidecard'>{this.props.children}</div>
                <div className={this.formButton()}>{this.props.buttons}</div>
            </div>
        )
    }
}

export class CardLarge extends Component {

    formButton() {
        if (this.props.buttons === null) {
            return "inaction";
        } else { 
            return "action";
        }  
    }
    render() {
        return (
            <div className='thirdhorizontalcard'>
                <div className='header'>{this.props.title}</div>
                <div className='insidecard'>{this.props.children}</div>
                <div className={this.formButton()}>{this.props.buttons}</div>
            </div>
        )
    }
}


export class CardStep extends Component {

    formButton() {
        if (this.props.buttons === null) {
            return "inaction";
        } else { 
            return "action";
        }  
    }
    render() {
        return (
            <div className='thirdhorizontalcard' style={{height:'700px', width:'900px'}}>
                <div className='header'>{this.props.title}</div>
                <div className='insidecard'>{this.props.children}</div>
                <div style={{marginLeft:'50%'}}>{this.props.buttons}</div>
            </div>
        )
    }
}

export class CardFull extends Component {
    render() {
        return (
            <div className='fullhorizontalcard' >
                <div className='header'>{this.props.title}</div>
                <div className='insidecard' style={{display:'grid', gridTemplateColumns:'auto auto auto auto'}}>{this.props.children}</div>
            </div>
        )
    }
}

export class CardHalfVertical extends Component {

    formButton() {
        if (this.props.buttons === null) {
            return "inaction";
        } else { 
            return "action";
        }  
    }

    render() {
        return (
            <div className='halfverticalcard'>
                <div className='header'>{this.props.title}</div>
                <div className='insidecard'>{this.props.children}</div>
                <div className={this.formButton()}>{this.props.buttons}</div>
            </div>
        )
    }
}
