import React, { Component } from 'react';

class EmployeeCard extends Component {
    render() {
        return (
            <div className="card">
                <img 
                    src={this.props.employee.avatarurl} 
                    alt="Avatar" 
                    width="240px" 
                />
                <div className="container">
                    <p>{this.props.employee.name}</p>
                    <p>Employee ID: {this.props.employee.id}</p>
                    <p>{this.props.employee.title}</p>
                </div>
            </div>
        );
    }
}

export default EmployeeCard;