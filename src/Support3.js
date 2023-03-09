import React, { Component } from 'react';
class Support3 extends Component {
render(){
    return(
        <div id="content">
        <button onClick={this.props.regCustomer}>Register Customer</button><button onClick={this.props.regCreator}>Register Creator</button>

        <h2>Active Requests</h2>
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
                               <td>{commission.requestStatus==0?<button name={commission.id} onClick={(event) => {
                            this.props.respComm(event.target.name)
                          }}>Approve</button>:<p>Approved</p>}</td>
                               <td>{commission.paymentStatus==0?<p>Unpaid</p>:<p>Paid</p>}</td>
                               <td>{commission.completionStatus==0?<button name={commission.id} onClick={(event) => {
                            this.props.completeComm(event.target.name)
                          }}>Complete</button>:<p>Complete</p>}</td>
                           </tr>
                       )
                   })}
                    </tbody>
        </table>

     
           
        
        </div>
    );
}
}
export default Support3;