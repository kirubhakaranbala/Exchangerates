import React from 'react';
 
const Tables = (props) => {
    console.log(props);
    let data=props.item.map((itemdata,i)=>{
        return ( <td>{itemdata}<br>
        </br>
        <span className="Inverse">{props.item2[i]}</span>
        </td>);
    })
   return (
     data
     
  )
};

export default Tables;