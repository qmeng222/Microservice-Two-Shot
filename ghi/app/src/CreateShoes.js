import React from "react";

class CreateShoes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      manufacturer: "",
      name: "",
      color: "",
      picture_url: "",
      bin: "",
      bins: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleManufacturerChange = this.handleManufacturerChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handlePictureUrlChange = this.handlePictureUrlChange.bind(this);
    this.handleBinChange = this.handleBinChange.bind(this);
  }
  async handleSubmit(event) {
    event.preventDefault();
    const data = { ...this.state };
    delete data.bins;

    const shoeUrl = "http://localhost:8080/api/shoes/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(shoeUrl, fetchConfig);
    if (response.ok) {
      const newShoe = await response.json();
      console.log(newShoe);

      const cleared = {
        manufacturer: "",
        name: "",
        color: "",
        picture_url: "",
        bin: "",
      };
      this.setState(cleared);
    }
  }
  handleManufacturerChange(event) {
    const value = event.target.value;
    this.setState({ manufacturer: value });
  }
  handleNameChange(event) {
    const value = event.target.value;
    this.setState({ name: value });
  }
  handleColorChange(event) {
    const value = event.target.value;
    this.setState({ color: value });
  }
  handlePictureUrlChange(event) {
    const value = event.target.value;
    this.setState({ picture_url: value });
  }
  handleBinChange(event) {
    const value = event.target.value;
    this.setState({ bin: value });
  }

  async componentDidMount() {
    const url = "http://localhost:8100/api/bins/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      this.setState({ bins: data.bins });
    }
  }

  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add a New Shoe</h1>
            <form onSubmit={this.handleSubmit} id="new-shoe-form">
              <div className="form-floating mb-3">
                <input
                  value={this.state.manufacturer}
                  onChange={this.handleManufacturerChange}
                  placeholder="Manufacturer"
                  required
                  type="text"
                  name="manufacturer"
                  id="manufacturer"
                  className="form-control"
                />
                <label htmlFor="manufacturer">Manufacturer</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  value={this.state.name}
                  onChange={this.handleNameChange}
                  placeholder="Model Name"
                  required
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                />
                <label htmlFor="name">Model Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  value={this.state.color}
                  onChange={this.handleColorChange}
                  placeholder="Color"
                  required
                  type="text"
                  name="color"
                  id="color"
                  className="form-control"
                />
                <label htmlFor="color">Color</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  value={this.state.picture_url}
                  onChange={this.handlePictureUrlChange}
                  placeholder="Picture Url"
                  required
                  type="text"
                  name="picture_url"
                  id="picture_url"
                  className="form-control"
                />
                <label htmlFor="picture_url">Picture Url</label>
              </div>
              <div className="mb-3">
                <select
                  value={this.state.bin}
                  onChange={this.handleBinChange}
                  required
                  name="bin"
                  id="bin"
                  className="form-select"
                >
                  <option value="">Choose a Bin</option>
                  {this.state.bins.map((bin) => {
                    return (
                      <option value={bin.href} key={bin.id}>
                        {bin.bin_number}
                      </option>
                    );
                  })}
                </select>
              </div>
              <button className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateShoes;
