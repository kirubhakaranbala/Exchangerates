import React, { Component } from 'react';
 import fx from 'money';
import Tables from './table';
import Table from 'react-bootstrap/Table'

class Stock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currencySet:[],
            currencyInv:[],          
            currency:["GBP","USD","JPY","CHF","CAD","AUD","NZD","RUB","ZAR","MXN","INR","SGD"]           
          }
    }

  
      fetchingDatachart(cur) {
       var self=this;    
       let demo = () => {
       var ratess=fx;
       
       let CurConv= this.state.currency.map((item,i) =>{
           
           return (              
            this.state.currency.map(item2=>{         
            let rate = ratess(1).from(item).to(item2);
            var rates=rate.toFixed(4);
            
            return rates;
            })
            )
        });

        let CurConvInv= this.state.currency.map((item,i) =>{
        
          return ( 
              this.state.currency.map(item2=>{
              let rate = ratess(1).from(item2).to(item);
              let rates=rate.toFixed(4);

              return rates;
               })
               )
          });

           
          this.setState({currencySet:CurConv,currencyInv:CurConvInv});
          
        }
         
           
          
          
      fetch('https://api.exchangeratesapi.io/latest')
        .then((resp) => resp.json())
        .then((data) =>
        { fx.rates = data.rates
        console.log(fx.rates)
        })
        .then(demo )

      }
      
      componentDidMount() {
        this.fetchingDatachart();
      }

       

      render() { 
        var count=0;
       let rate = this.state.currencySet.map((item,i)=>{
        let str = this.state.currency[i];
        let res = str.substring(0, 2);
        let url=`https://www.countryflags.io/${res}/shiny/32.png`;
       
         return (
         <tr key={i}>
           <td className="b`"><img src={url} />1 {this.state.currency[i]} =<br></br><p className="Inverse">Inverse</p></td>
           <Tables item={item} item2={this.state.currencyInv[i]}/>
        </tr>
        );     
         
         
        });

        let th=this.state.currency.map(item=>{
            let res = item.substring(0, 2);
            let url=`https://www.countryflags.io/${res}/shiny/32.png`;
            return <th><img src={url} /> {item}</th>;
       
          });

        return ( 
          
                <table border="0" cellpadding="0" cellspacing="0" id="chart">
                  <thead>
                    <tr>
                    <th></th>
                    {th}
                    </tr>
                    </thead>
                    <tbody>
                     {rate}          
                    </tbody>  
                 </table>
             
         );
    }
}
 
export default Stock;