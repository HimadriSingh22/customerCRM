import React, { Component } from 'react'
import {connect} from 'react-redux';
import {sendEmailToCustomer} from './service';
import EmailModal from './EmailModal';
import UIkit from 'uikit'
;class CustomerDetails extends Component {
    constructor(){
        super();
        this.state={
            openEmailModal:false
        }
    }
    openEmailModal=()=>{
        this.setState({openEmailModal:true})
    }

    sendEmail=(emailDetails)=>{
    sendEmailToCustomer(emailDetails).then(res=>{
        console.log("email response::",res);
        if(res.data.message=="Email Sent!"){
            UIkit.notification("Email Successfully Sent!");
            this.setState({openEmailModal:false})
        }
        else{
            UIkit.notification("Something Went Wrong!");
        }
    })
    }
    render() {
        const customerDetails = this.props.customerDetails;
        return (
            <div className="uk-container">
            <div className="uk-width-1-1">
                <img src={require('../assets/crmImage.png')} height="100px" width="100px"/>
            </div>
             <div className="uk-panel ">
             <h4>{customerDetails.name}</h4>
            </div>
            <div className="uk-panel">
             <h5>{customerDetails.email}</h5>
            </div>
            <div className="uk-panel">
             <h5>{customerDetails.contact}</h5>
            </div>
           <div className="uk-panel">
           <h5>Total Email Sent:{customerDetails.totalEmailSent}</h5> 
           </div>
           <div className="uk-panel">
           <h5>See past communications:</h5> 
           {customerDetails.communication.length&&customerDetails.communication.map(item=>{
               return <div className="uk-card">
                      {/* <div className="uk-panel">Email sent by:{}</div> */}
                      <div className="uk-panel">Date:{item.date}</div>
                      <div className="uk-panel">Time:{item.time}</div>
                      <div className="uk-panel">Subject:{item.subject}</div>
                      <div className="uk-panel">Content:{item.content}</div>
                     </div>
           })}
           </div>
           <button onClick={this.openEmailModal}>Send Email</button>
         {this.state.openEmailModal&&<EmailModal open={this.state.openEmailModal}sendEmail={this.sendEmail.bind(this)} handleClose={()=>{this.setState({openEmailModal:false})}}/>} 
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        customerDetails:state.customer.customerDetails
    }
}
export default connect(mapStateToProps)(CustomerDetails);

