import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

function ViewPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDocs(collection(db, "posts"));
      const found = data.docs.find(doc => doc.data().slug === slug);
      setPost(found?.data());
    };
    fetchData();
  }, [slug]);

  if (!post) return <p>Loading...</p>;

  return (
    <div style={styles.container}>

      {/* Top Right */}
      <div style={styles.topBar}>
        <button style={styles.copyBtn} onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          alert("Link copied!");
        }}>
          Share 🔗
        </button>
      </div>

      <div style={styles.card}>
        <h1>{post.name}</h1>
        <h3>{post.achievement}</h3>
        <p style={styles.content}>{post.content}</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: "#f5f7fa",
    minHeight: "100vh",
    padding: "30px"
  },
  topBar: {
    display: "flex",
    justifyContent: "flex-end"
  },
  copyBtn: {
    background: "#667eea",
    color: "white",
    border: "none",
    padding: "8px 15px",
    borderRadius: "6px",
    cursor: "pointer"
  },
  card: {
    maxWidth: "700px",
    margin: "40px auto",
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
  },
  content: {
    marginTop: "15px",
    lineHeight: "1.6"
  }
};

export default ViewPost;