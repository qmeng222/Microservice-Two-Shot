function ListShoes(props) {
  if (props.shoes === undefined) {
    return null;
  }

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Manufacturer</th>
          <th>Model Name</th>
          <th>Color</th>
          <th>Picture</th>
          <th>Bin Number</th>
        </tr>
      </thead>
      <tbody>
        {props.shoes.map((shoes) => {
          return (
            <tr key={shoes.id}>
              <td>{shoes.manufacturer}</td>
              <td>{shoes.name}</td>
              <td>{shoes.color}</td>
              <td>{shoes.picture_url}</td>
              <td>{shoes.bin_number}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default ListShoes;
