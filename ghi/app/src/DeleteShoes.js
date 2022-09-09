import React from "react";

class DeleteShoes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shoes: [],
    };

    this.handleShoeChange = this.handleShoeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleShoeChange(event) {
    const value = event.target.value;
    this.setState({ name: value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = { ...this.state };
    delete data.shoes;

    const shoeUrl = `http://localhost:8080${data.name}`;
    const fetchConfig = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(shoeUrl, fetchConfig);
    if (response.ok) {
      const cleared = {
        shoe: "",
      };
      this.setState(cleared);
    }
  }

  async componentDidMount() {
    const url = "http://localhost:8080/api/shoes/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      this.setState({ shoes: data.shoes });
    }
  }

  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Delete Shoe</h1>
            <form onSubmit={this.handleSubmit} id="delete-shoe-form">
              <div className="mb-3">
                <select
                  value={this.state.shoe}
                  onChange={this.handleShoeChange}
                  required
                  name="bin"
                  id="bin"
                  className="form-select"
                >
                  <option value="">Choose a Shoe</option>
                  {this.state.shoes.map((shoe) => {
                    return (
                      <option value={shoe.href} key={shoe.id}>
                        {shoe.manufacturer} {shoe.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <button className="btn btn-primary">Delete</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default DeleteShoes;
