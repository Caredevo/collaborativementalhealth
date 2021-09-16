import React from "react";
import { Line } from "react-chartjs-2";


export const Graph4Data = props => {

    const data = canvas => {
        const ctx = canvas.getContext("2d");
        const gradient = ctx.createLinearGradient(0, 0, 50, 0);
        return {
          backgroundColor: gradient,
          labels: props.date,
          datasets: [{
                label: props.legend[0],
                backgroundColor: 'rgba(51, 105, 177, 0.486)',
                fill : false,
                borderColor: 'rgba(51, 105, 177, 0.486)',
                data: props.data1,
                },{
                label: props.legend[1],
                backgroundColor: 'rgba(48, 160, 117, 0.486)',
                fill : false,
                borderColor: 'rgba(48, 160, 117, 0.486)',
                data: props.data2,
                },{
                label: props.legend[2],
                backgroundColor: 'rgba(255, 165, 0, 0.486)',
                fill : false,
                borderColor: 'rgba(255, 165, 0, 0.486)',
                data: props.data3,
                },{
                label: props.legend[3],
                backgroundColor: 'rgba(153, 29, 29, 0.5)',
                fill : false,
                borderColor: 'rgba(153, 29, 29, 1.0)',
                data: props.data4,
                }],
        };
    };

    return (
    <div style={{height:"10vh", width:"18vw"}}>
        <Line data={data} />
    </div>
    )
      
}


export const Graph3Data = props => {

    const data = canvas => {
        const ctx = canvas.getContext("2d");
        const gradient = ctx.createLinearGradient(0, 0, 50, 0);
        return {
          backgroundColor: gradient,
          labels: props.date,
          datasets: [{
                label: props.legend[0],
                backgroundColor: 'rgba(51, 105, 177, 0.486)',
                fill : false,
                borderColor: 'rgba(51, 105, 177, 0.486)',
                data: props.data1,
                },{
                label: props.legend[1],
                backgroundColor: 'rgba(48, 160, 117, 0.486)',
                fill : false,
                borderColor: 'rgba(48, 160, 117, 0.486)',
                data: props.data2,
                },{
                label: props.legend[2],
                backgroundColor: 'rgba(153, 29, 29, 0.5)',
                fill : false,
                borderColor: 'rgba(153, 29, 29, 1.0)',
                data: props.data3,
                }],
        };
    };

    return (
    <div style={{height:"10vh", width:"18vw"}}>
        <Line data={data} />
    </div>
    )
      
}

export const Graph2Data = props => {

    const data = canvas => {
        const ctx = canvas.getContext("2d");
        const gradient = ctx.createLinearGradient(0, 0, 50, 0);
        return {
          backgroundColor: gradient,
          labels: props.date,
          datasets: [{
                label: props.legend[0],
                backgroundColor: 'rgba(51, 105, 177, 0.486)',
                fill : false,
                borderColor: 'rgba(51, 105, 177, 0.486)',
                data: props.data1,
                },{
                label: props.legend[1],
                backgroundColor: 'rgba(153, 29, 29, 0.5)',
                fill : false,
                borderColor: 'rgba(153, 29, 29, 1.0)',
                data: props.data2,
                }],
        };
    };

    return (
    <div style={{position:'relative', marginRight:'-80px',height:"10vh", width:"18vw"}}>
        <Line data={data} />
    </div>
    )    
}



export const Graph1Data = props => {

    const data = canvas => {
        const ctx = canvas.getContext("2d");
        const gradient = ctx.createLinearGradient(0, 0, 50, 0);
        return {
          backgroundColor: gradient,
          labels: props.date,
          datasets: [{
                label: props.legend,
                backgroundColor: 'rgba(51, 105, 177, 0.486)',
                fill : false,
                borderColor: 'rgba(51, 105, 177, 0.486)',
                data: props.data1
                }]
        };
    };

    return (
    <div style={{position:'relative', marginRight:'-80px',height:"10vh", width:"18vw"}}>
        <Line data={data} />
    </div>
    )    
}
