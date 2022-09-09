function HatsList(props) {
    if (props.hats === undefined) {
        return null;
    }
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Style</th>
                    <th>Fabric</th>
                    <th>Color</th>
                    <th>Picture</th>
                    <th>Location</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {props.hats.map(hat => {
                    return (
                        <tr key={ hat.id }>
                            <td>{ hat.style }</td>
                            <td>{ hat.fabric }</td>
                            <td>{ hat.color }</td>
                            <td>{ hat.picture_url }</td>
                            <td>{ hat.location }</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default HatsList