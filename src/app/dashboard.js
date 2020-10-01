import React,{Component} from 'react';
import AppBar from './AppBar';
import  {CustomerList}  from './CustomerList';
import {Fab} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CustomerModal from './CustomerModal';
import {connect} from 'react-redux';
import {addCustomer,getCustomerList} from './service';
import {setCustomerList,setCustomerDetails} from '../actions/customerActions';
import store from '../store';
import UIkit from 'uikit';

 class Dashboard extends Component{
    constructor(){
        super();
        this.state={
           customerList:[{
               name:"Himadri Singh",
               address:"B-1502,Prateek Laurel,Sector-120,Noida",
               email:"abc@gmail.com",
               status:"active",
               addedBy:"abc xyz",
               nextDate:"22/10/2020",
               totalMailSent:"40",
               id:"CUS1234",
               gstNumber:"ABC123EXC",


           },{name:"Himadri Singh",
               address:"B-1502,Prateek Laurel,Sector-120,Noida",
               email:"abc@gmail.com",
               status:"active",
               addedBy:"abc xyz",
               nextDate:"22/10/2020",
               totalMailSent:"40",
               id:"CUS1234",
               gstNumber:"ABC123EXC",}],
           addNewCustomer:false
        }
    }
    addNewCustomer=()=>{
        this.setState({addNewCustomer:true});
    }

    componentDidMount(){
       getCustomerList().then(res=>{
           if(res){
               console.log("customer list:",res);
           this.setState({customerList:res.data.customerList});
           store.dispatch(setCustomerList(res.data.customerList));
        }
       }).catch(err=>{
           UIkit.notification("Something went wrong!");
       })
    }

    //callback from customer modal when clicked on add button
    addCustomer=(customer)=>{
      console.log("customer Details::::::",customer);

      //method for api calling to add new customer
      addCustomer(customer).then(res=>{
          console.log("customer added::",res);
          if(res.data.operation==true){
              this.setState({addNewCustomer:false});
              UIkit.notification("Customer Sucessfuly Added!");
              
          }

          else{
            UIkit.notification("Something Went Wrong!");
          }
      })
    }

    handleClose=()=>{
        this.setState({addNewCustomer:false});
    }
    
    handleCustomerClick=(customer)=>{
      store.dispatch(setCustomerDetails(customer));
    }
    render(){
        return(
            <>
        <AppBar loggedIn={this.props.loggedIn} heading="Welcome To Customer CRM Tool!"/>
        <div className="uk-flex uk-width-1-1 uk-container-small">
        
        <div className="uk-grid uk-width-3-4 uk-margin uk-align-left">
        <h4 className="uk-text-bold uk-text-muted uk-margin" >Your Customers</h4>
         <CustomerList customerList={this.state.customerList} handleClick={this.handleCustomerClick.bind(this)}/>
         <Fab color="primary" aria-label="add" onClick={this.addNewCustomer}>
        <AddIcon />
        </Fab>
        </div>
        <div className="uk-width-1-4">
        <div class="uk-card uk-card-default uk-card-body uk-width-1-1@m uk-margin-top">
    <h3 class="uk-card-title">Total Customers</h3>
        <p>{this.props?.customerList?.length}</p>
</div>

        </div>
        </div>
        {this.state.addNewCustomer&&<CustomerModal open={this.state.addNewCustomer} handleClose={this.handleClose.bind(this)} addCustomer={this.addCustomer}/>}
        </>)
        
    }
}

const mapStateToProps=(state)=>{

    console.log("state dashboard:::",state);
    return {
        loggedIn:state.auth.isAuthenticated,
        user:state.auth.user,
        customerList:state.customerList
    }
}
export default connect(mapStateToProps)(Dashboard);