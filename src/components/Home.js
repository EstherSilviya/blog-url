import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDocs(collection(db, "posts"));
      setPosts(data.docs.map(doc => doc.data()));
    };
    fetchData();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🎓 Student Achievements</h1>

      <div style={styles.grid}>
        {posts.map((post, index) => (
          <div key={index} style={styles.card}>
            <h3>{post.name}</h3>
            <p>{post.achievement}</p>
            <Link to={`/student/${post.slug}`} style={styles.btn}>View</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    background: "#f5f7fa",
    minHeight: "100vh"
  },
  heading: {
    textAlign: "center",
    marginBottom: "30px"
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px"
  },
  card: {
    width: "260px",
    padding: "20px",
    borderRadius: "12px",
    background: "#fff",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    textAlign: "center"
  },
  btn: {
    display: "inline-block",
    marginTop: "10px",
    padding: "8px 15px",
    background: "#667eea",
    color: "white",
    borderRadius: "6px",
    textDecoration: "none"
  }
};

export default Home;