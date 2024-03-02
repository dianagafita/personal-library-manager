import { Link } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  return (
    <section className="home-page">
      <div className="home-page-title-container">
        <h1>Create your own virtual library</h1>
        <Link to="/addNewBook">Add new books {" >"}</Link>
      </div>
    </section>
  );
}
