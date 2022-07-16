import { Link } from "react-router-dom"

const LinkPage = () => {
    return (
        <section>
            <h1>Links</h1>
            <br />
            <h2>Public</h2>
            <Link to="/signin">Sign In</Link><br/>
            <Link to="/">Sign Up</Link><br />
            <br />
            <h2>Private</h2>
            <Link to="/home">Home Page</Link><br/>
            <Link to="/editor">Editors Page</Link><br />
            <Link to="/admin">Admin Page</Link>
        </section>
    )
}

export default LinkPage