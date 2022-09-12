function HatsList(props) {

    async function deleteHat(hatId) {
        const deleteUrl = `http://localhost:8090/api/hats/${hatId}/`;
        const fetchConfig = {
            method: "DELETE"
        }
        const deleteResponse = await fetch(deleteUrl, fetchConfig);
        if (deleteResponse.ok) {
            window.location.reload();
        }
    }

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
                            <td><img src={ hat.picture_url } width= '100' height= '100'></img></td>
                            <td>{ hat.location }</td>
                            <td><button onClick={() => deleteHat(hat.id)}>Delete</button></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default HatsList