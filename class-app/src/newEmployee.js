import React, {Component} from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

class NewEmployee extends Component {

    state = {
        newEmployee: {id: 0, name: "", title: "", avatarurl: ""},
        newEntree: true,
        open: false,
        modalText: "",
        modalTitle: "",
        displayValue: ""
    }

    handleClickOpen = () => {
        this.setState({open: true});
    };
    
    handleClose = () => {
        this.setState({open: false});
    };

    changingId = (input) => {
        this.setState({newEmployee: {id: input.target.value, name: this.state.newEmployee.name, title: this.state.newEmployee.title, avatarurl: this.state.newEmployee.avatarurl}, displayValue: input.target.value})

    }

    changingName = (input) => {
        this.setState({newEmployee: {id: this.state.newEmployee.id, name: input.target.value, title: this.state.newEmployee.title, avatarurl: this.state.newEmployee.avatarurl}})
    }

    changingTitle = (input) => {
        this.setState({newEmployee: {id: this.state.newEmployee.id, name: this.state.newEmployee.name, title: input.target.value, avatarurl: this.state.newEmployee.avatarurl}})
    }

    changingAvatar = (input) => {
        this.setState({newEmployee: {id: this.state.newEmployee.id, name: this.state.newEmployee.name, title: this.state.newEmployee.title, avatarurl: input.target.value}})
    }

    findEmployee = () => {
        fetch(`/employees/id?id=${this.state.newEmployee.id}`)
            .then((response) => response.json())
            .then(data => {
                if (data.length !== 0) {
                    this.setState({newEmployee: { id: this.state.newEmployee.id, name: data[0].name, title: data[0].title, avatarurl: data[0].avatarurl }, modalTitle: "Employee found!", modalText: "Employee found successfully and loaded to the form!"});
                    this.setState({newEntree: false});
                    this.handleClickOpen();
                }else{
                    this.setState({newEmployee: { id: this.state.newEmployee.id, name: "", title: "", avatarurl: "" }, modalTitle: "Employee not found!", modalText: "Employee not found, fill the form if you wish to add a new employee!"});
                    this.setState({newEntree: true});
                    this.handleClickOpen();
            }
            });
    }

    generateAvatar = () => {
        if (!(isNaN(this.state.newEmployee.id)) && this.state.newEmployee.id > 0) {
            this.setState({newEmployee: {id: this.state.newEmployee.id, name: this.state.newEmployee.name, title: this.state.newEmployee.title, avatarurl: `https://api.dicebear.com/6.x/notionists/svg?seed=${this.state.newEmployee.id}`}})
        }else{
            this.setState({modalText: "You must enter an ID before generating a Avatar.", modalTitle: "Denied!"});
            this.handleClickOpen();
        }
    }

    save = () => {
        if(!(isNaN(this.state.newEmployee.id)) && 
        this.state.newEmployee.id > 0 && 
        this.state.newEmployee.name !== "" && 
        this.state.newEmployee.name.length < 25 &&
        this.state.newEmployee.title !== "" &&
        this.state.newEmployee.title.length < 25 &&
        this.state.newEmployee.avatarurl !== "") {
            if (this.state.newEntree) {
                fetch("/add", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.state.newEmployee)
                })
                this.setState({modalText: "Employee added successfully!", modalTitle: "Success!"});
            }else{
                fetch(`/update/${this.state.newEmployee.id}/${this.state.newEmployee.name}/${this.state.newEmployee.title}/${encodeURIComponent(this.state.newEmployee.avatarurl)}`, {
                    method: "PUT"
                })
                this.setState({modalText: "Employee updated successfully!", modalTitle: "Success!"});
            }
            this.setState({newEmployee: {id: 0, name: "", title: "", avatarurl: ""}, displayValue: ""});
        }else{
            this.setState({modalText: "Your employee form is either missing or contains invalid information!", modalTitle: "Failed!"});
        }
        this.handleClickOpen();
    }

    render() {
        return (
            <div className="addEdit">
                <div className="searchbox2">
                    <input type="text" placeholder="Enter employee ID" onChange={this.changingId} value={this.state.displayValue}/>
                    <button type="button" onClick={this.findEmployee}>Find Employee</button>
                </div>
                <div class="middleLine2"></div>
                <div className="employeeForm">
                    <table>
                        <tr>
                            <td><label>Name:</label></td>
                            <td><input type="text" placeholder="Name" onChange={this.changingName} value={this.state.newEmployee.name}/></td>
                        </tr>
                        <tr>
                            <td><label>Title:</label></td>
                            <td><input type="text" placeholder="Title" onChange={this.changingTitle} value={this.state.newEmployee.title}/></td>
                        </tr>
                        <tr>
                            <td><label>Avatar URL:</label></td>
                            <td><input type="text" placeholder="Avatar URL" onChange={this.changingAvatar} value={this.state.newEmployee.avatarurl}/></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <Button onClick={this.generateAvatar}>Generate Randon Avatar</Button>
                            </td>
                        </tr>
                    </table>
                    <button className="saveButton" type="button" onClick={this.save}>Save</button>
                </div>
                <div>
                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                        {this.state.modalTitle}
                        </DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {this.state.modalText}
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={this.handleClose}>Close</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        )
    }
}

export default NewEmployee;