import React, {Component} from "react";
import EmployeeCard from "./employeecard";

class EmployeeFinder extends Component {

    state = {
        employees: [],
        id: 0,
        userError: "",
        errorVis: "hidden",
        visible: "hidden"
    }

    input = 0

    findHandle = () => {
        fetch(`/employees/id?id=${this.state.id}`)
            .then((response) => response.json())
            .then(data => {
                this.setState({employees: data});
            });
    }

    changing = (input) => {
        this.setState({id: input.target.value})
    }

    deleteUser = () => {
        fetch(`/delete/${this.state.employees[0].id}`, {
            method: "DELETE"
        })
        .then((response) => response.text())
        .then(data => {
            this.setState({userError: data, visible: "hidden", errorVis: ""})
        })
    }

    componentDidUpdate(prevProbs, prevState) {
        if (prevState.employees !== this.state.employees) {
            if (this.state.employees.length === 0) {
                this.setState({userError: "Employee not found! Please enter a valid ID.", visible: "hidden", errorVis: ""})
            }
            else {
                this.setState({userError: "", visible: "", errorVis: "hidden"})
            }
        }
    }

    render() {
        return (
            <div className="findDiv">
                <div className="searchbox">
                    <input type="text" placeholder="Enter a employee ID" onChange={this.changing}/>
                    <button onClick={this.findHandle}>Find Employee</button>
                </div>
                <div class="middleLine"></div>
                <div className="searchResult">
                    <div hidden={this.state.visible}>
                        {this.state.employees.map(employee => <EmployeeCard key={employee.id} employee={employee}/>)}
                    </div>
                    <h2 className="findMessage" hidden={this.state.errorVis}>{this.state.userError}</h2>
                    <button className="deleteButton" type="button" onClick={this.deleteUser} hidden={this.state.visible}>Delete</button>
                </div>
            </div>
        )
    }
}

export default EmployeeFinder;