import NavBar from "../components/NavBar.js"
import QueryManager from "../components/QueryManager.js"

const QueryingPage = () => {
    let categories = ["System Fundamental", "Computer Organization", "Networks", "Computational Thinking", "OOP"];
    return(
        <div>
            <NavBar />
            <QueryManager categories={categories}/>
        </div>
    );
}

export default QueryingPage;