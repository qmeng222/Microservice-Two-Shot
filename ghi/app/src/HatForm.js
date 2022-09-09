import React from 'react';

class HatForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            style: '',
            fabric: '',
            color: '',
            pictureUrl: '',
            location:'',
            locations: []
        }

        this.handleStyleChange = this.handleStyleChange.bind(this);
        this.handleFabricChange = this.handleFabricChange.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handlePictureChange = this.handlePictureChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleStyleChange(event) {
        const value = event.target.value;
        this.setState({style:value})
    }

    handleFabricChange(event) {
        const value = event.target.value;
        this.setState({fabric:value})
    }

    handleColorChange(event) {
        const value = event.target.value;
        this.setState({color:value})
    }

    handlePictureChange(event) {
        const value = event.target.value;
        this.setState({pictureUrl:value})
    }

    handleLocationChange(event) {
        const value = event.target.value;
        this.setState({location:value})
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        data.picture_url = data.pictureUrl;
        delete data.pictureUrl;
        delete data.locations;

        const hatUrl = 'http://localhost:8090/api/hats/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(hatUrl, fetchConfig);
        if (response.ok) {
            // const newHat = await response.json();
            // console.log(newHat);

            const cleared = {
                style: '',
                fabric: '',
                color: '',
                pictureUrl: '',
                location: ''
            };
            this.setState(cleared);
        }
    }

    async componentDidMount() {
        const url = 'http://localhost:8100/api/locations/'
        const response = await fetch(url)

        if (response.ok) {
            const data = await response.json()
            this.setState({locations: data.locations})
        }
    }

    render() {
        return (
            <div className="row">
            <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h1>Create a new Hat</h1>
                <form onSubmit={this.handleSubmit} id="create-hat-form">
                <div className="form-floating mb-3">
                    <input onChange={this.handleStyleChange} value={this.state.style} placeholder="Style" required type="text" name="style" id="style" className="form-control"/>
                    <label htmlFor="style">Style</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={this.handleFabricChange} value={this.state.fabric} placeholder="Fabric" required type="text" name="fabric" id="fabric" className="form-control"/>
                    <label htmlFor="fabric">Fabric</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={this.handleColorChange} value={this.state.color} placeholder="Color" required type="text" name="color" id="color" className="form-control"/>
                    <label htmlFor="color">Color</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={this.handlePictureChange} value={this.state.pictureUrl} placeholder="Picture" required type="text" name="picture" id="picture" className="form-control"/>
                    <label htmlFor="picture">Picture</label>
                </div>
                <div className="mb-3">
                    <select onChange={this.handleLocationChange} value={this.state.location} name="location" required id="location" className="form-select">
                        <option value="">Choose a Location</option>
                        {this.state.locations.map(location =>{
                            return (
                                <option key={location.href} value={location.href}>{location.closet_name}</option>
                            );
                        })}
                    </select>
                </div>
                    <button className="btn btn-primary">Create</button>
                </form>
            </div>
            </div>
            </div>
        )
    }

}
export default HatForm