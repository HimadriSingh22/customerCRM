import React from 'react';
import {Link} from 'react-router-dom';
import './customer.css';

export function CustomerList(props){

  const handleClick=(customer)=>{
    props.handleClick(customer);
  }
  
    return(<>
                <div
                className=""
              style={{
                border: "1px solid lightgrey",
                borderRadius: "3px",
                marginRight: "20px",
                marginBottom: "20px",
              }}
            >
              <div class="" style={{ padding: "0 30px" }}>
                <div
                  class="uk-margin-top uk-flex thh"
                  style={{ marginBottom: "25px" }}
                >
                  <div
                    class="uk-width-1-4 uk-text-left"
                    style={{ color: "black", marginBottom: "5px" }}
                  >
                    Customer Name
                  </div>
                  <div
                    class="uk-width-1-4 uk-text-left"
                    style={{ color: "black", marginBottom: "5px" }}
                  >
                   Address
                  </div>
                  <div
                    class="uk-width-1-4 uk-text-left"
                    style={{ color: "black", marginBottom: "5px" }}
                  >
                    Join date
                  </div>
                  <div
                    class="uk-width-1-4 uk-text-left"
                    style={{ color: "black", marginBottom: "5px" }}
                  >
                    Reminders
                  </div>
                </div>
                {props.customerList.map((customer) => (
                 <div class="contracts-list">
                    <div class="uk-margin-top uk-flex">
                      <Link
                        to={`/customer/${customer._id}`}
                        
                        className="uk-width-1-4"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <div class="uk-padding-remove" onClick={()=>handleClick(customer)}>
                          <div class="cust">{customer.name}</div>
                          <div>{customer.email}</div>
                          <div>{customer.phone}</div>
                        </div>
                      </Link>
                      <div class="uk-width-1-4 uk-padding-remove">
                        <div class="mb-small">
                          {customer.address}
                        </div>
                        
                      </div>
                      <div class="uk-width-1-4 uk-padding-remove">
                        <div class="mb-small">
                        <span class="text-bold">GST Number: </span>
                          <span>{customer.gst}</span>
                        </div>
                        <div class="mb-small">
                          <span class="text-bold">Next Auto Mail: </span>
                          <span>{customer.nextDate||22/12/2020}</span>
                        </div>
                        
                      </div>
                      <div class="uk-width-1-4 uk-padding-remove">
                      <span class="text-bold">Total Mail Sent: </span>
                          <span>{customer.totalMailSent||20}</span>
                      </div>
                      <span className="uk-text-muted uk-align-right">added by:{customer.addedBy}</span>
                    </div>
                    <hr />
                  </div>
                ))}
              </div>
            </div>
          
    </>);
}