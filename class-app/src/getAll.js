import React, {Component} from "react";
import EmployeeCard from "./employeecard";

class GetAll extends Component {

    state = {
        employees: [],
        employeeMemory: [],
        visible: 'negative',
        buttonText: 'Get All Employees',
        hide: "hideButton"
    }

    fetchAll = () => {
        fetch("/employees")
            .then((response) => response.json())
            .then(data => {
                data.sort((a, b) => a.id - b.id);
                this.setState({employees: data});
            });
    }

    getAll = () => {
        if (this.state.visible === 'negative' && this.state.employeeMemory.length === 0) {
            this.fetchAll();
            this.setState({employeeMemory: this.state.employees, visible: 'positive', buttonText: 'Hide All Employees', hide: "refreshButton"});
        } else if (this.state.visible === 'negative' && this.state.employeeMemory.length > 0) {
            this.setState({employees: this.state.employeeMemory, visible: 'positive', buttonText: 'Hide All Employees', hide: "refreshButton"});
        } else {
            this.setState({employees: [], visible: 'negative', buttonText: 'Get All Employees', hide: "hideButton"});
        }
    }

    refresh = () => {
        this.fetchAll();
        this.setState({employeeMemory: this.state.employees})
    }
    
    render() {
        return (
            <div className="employeeDirectory">
                <button className="getButton" type="button" onClick={this.getAll}>{this.state.buttonText}</button>
                <button className={this.state.hide} type="button" onClick={this.refresh}>Refresh List</button>
                <div className="cardGrid" style={this.state.style}>
                    {this.state.employees.map(employee => <EmployeeCard key={employee.id} employee={employee}/>)}
                </div>
            </div>
        )
    }
}

export default GetAll;