import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

if (!Array.prototype.getEvenAndSort) {
    Object.defineProperty(Array.prototype, 'getEvenAndSort', {
        value: function() {
          let newArray = [];
          for (let i=0; i<this.length; i++) {
            if (i%2 ==0) {
              newArray.push(this[i]);
            }
          }
          newArray.sort(function(a, b) { return a - b > 0; })
          console.log(newArray);
        }
    });
}

export default class SurveyView extends Component{
    constructor(props) {
        super(props);
        this.state = {has_offer: null, offer_url: "", message_hash: {currency:"",max:"0",min:"0"}};
    }
    handleResponse(result) {
       const {has_offer, offer_url, message_hash} = result;
       this.setState({has_offer: has_offer,
                      offer_url: offer_url,
                      message_hash: message_hash
                    });
    }
    componentDidMount() {
      [12,3,2,1,7,6].getEvenAndSort();
      var buttons = $('button');
      for( var i = 0; i < buttons.length; ++i ) {
        buttons.eq(i).click(
        	// ONLY EDIT THE CODE BELOW THIS LINE
        	function(i) {
          	$('ul').append('<li>' + i + '</li>')
        	}.bind(this, i)
        	// ONLY EDIT THE CODE ABOVE THIS LINE
        );
      }
    }
    changeUserIdentifier(e) {
        this.setState({has_offer: null, offer_url: "", message_hash: {currency:"",max:"0",min:"0"}});
    }
    doSurvey() {
        let api = "https://www.tapresearch.com/supply_api/surveys/offer";
        let user_identifier = $("#user_identifier").val();
        if (user_identifier == '') {
            alert("Please enter User Identifier!");
            return;
        }
        if (user_identifier.length > 32) {
            alert("User Identifier 'CAN NOT' exceed 32 characters!");
            return;
        }
        let data = {
            device_identifier: "",
            user_identifier: user_identifier,
            api_token: "9a7fb35fb5e0daa7dadfaccd41bb7ad1"
        };
        let _self = this;
        $.ajax({
            type: 'POST',
            dataType: 'jsonp',
            data: data,
            url: api,
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR)
            },
            success: function (result) {
                _self.handleResponse(result);
            }
        });
    }
    render(){
        return(
            <div className="container">
            <button>A</button>
            <button>B</button>
            <button>C</button>
            <ul></ul>
            {/*<div className="row justify-content-center">
                <div className="col-sm-4 col-md-4 align-items-center">
                    <div className="input-group" style={{marginBottom: "20px"}}>
                        <input type="text" id="user_identifier" className="form-control" placeholder="user identifier..." onChange={this.changeUserIdentifier.bind(this)}/>
                        <span className="input-group-btn">
                            <button className="btn btn-default" type="button" onClick={this.doSurvey.bind(this)}>Go!</button>
                        </span>
                    </div>
                    {
                        this.state.has_offer === null ? null :
                        (
                            <div className="container">
                            {this.state.has_offer ?
                            <div>
                                <div className="row justify-content-between" style={{marginBottom: "20px"}}>
                                    <button className="btn">
                                        Currency <span className="badge badge-primary">{this.state.message_hash.currency}</span>
                                    </button>
                                    <button className="btn">
                                        Min <span className="badge badge-primary">{this.state.message_hash.min}</span>
                                    </button>
                                    <button className="btn">
                                        Max <span className="badge badge-primary">{this.state.message_hash.max}</span>
                                    </button>
                                </div>
                                <a href={this.state.offer_url} className="btn btn-success active" target="_blank" role="button" aria-pressed="true">Take Survey</a>
                            </div>
                                :
                            <div className="alert alert-danger">
                                No Survey available!
                            </div>
                            }
                            </div>
                        )
                    }
                </div>
            </div>*/}
            </div>
        )
    }
}
