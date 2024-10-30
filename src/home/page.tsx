import { BlogContainer } from "../components/BlogContainer";
import "../styles/home.css";

export default function home() {
  
    return(
      <div>
        <div className="bg-blue-500 text-white p-5 text-center">
      Blogs Data
    </div>
        <BlogContainer />
      </div>
    )
  }