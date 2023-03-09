import React, { Component } from 'react';
class Support2 extends Component {
render(){
    return(
        <div id="content">
        <button onClick={this.props.regCustomer}>Register Customer</button><button onClick={this.props.regCreator}>Register Creator</button>
        <h1>Request Comission</h1>
        <form onSubmit={(event)=>{
            event.preventDefault()
            const addr=this.addressFul.value
            const Rate=window.web3.utils.toWei(this.rateR.value.toString(),'Ether')
            const hrs=this.timeR.value
            this.props.reqComm(Rate,hrs,addr)}}>
            <div className='form-group mr-sm-2'>
                <input id="productName" type="text" ref={(input)=>{this.addressFul=input}} className='form-control' placeholder='Address' required />
            </div>
            <div className='form-group mr-sm-2'>
                <input id="productPrice" type="text" ref={(input)=>{this.rateR=input}}  className='form-control' placeholder='Rate' required />
            </div>
            <div className='form-group mr-sm-2'>
                <input id="productPrice" type="text" ref={(input)=>{this.timeR=input}}  className='form-control' placeholder='Hours' required />
            </div>
            <button type='submit' className='btn btn-primary'>Request Comission</button>
            </form>
            <p>&nbsp;</p>
            <h2>Active Comissions</h2>
            <table className='table'>
            <thead>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Rate</th>
                        <th scope='col'>Hrs</th>
                        <th scope='col'>Requestor</th>
                        <th scope='col'>Fulfillor</th>
                        <th scope='col'>Request Status</th>
                        <th scope='col'>Payment Status</th>
                        <th scope='col'>Completion Status</th>
                    </tr>
                    </thead>
                    <tbody id='commissionList'>
                    {this.props.commissions.map((commission,key)=>{
                       return(
                           <tr key={key}>
                               <th scope="row">{commission.id.toString()}</th>
                               <td>{window.web3.utils.fromWei(commission.rate.toString(), 'Ether')}</td>
                               <td>{commission.timeHour}</td>
                               <td>{commission.requestor}</td>
                               <td>{commission.fulfiller}</td>
                               <td>{commission.requestStatus==0?<p>Pending</p>:<p>Approved</p>}</td>
                               <td>{commission.requestStatus==1?[commission.paymentStatus==0?<button name={commission.id} value={commission.rate*commission.timeHour} onClick={(event) => {
                            this.props.payComm(event.target.name, event.target.value)
                          }}>Pay</button>:<p>Paid</p>]:<p>Wait</p>}</td>
                               <td>{commission.completionStatus==0?<p>Incomplete</p>:<p>Complete</p>}</td>
                           </tr>
                       )
                   })}
                    </tbody>
              
            </table>
     
           
        
        </div>
    );
}
}
export default Support2;