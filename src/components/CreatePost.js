import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

function generateSlug(name) {
  return name.toLowerCase().trim().replace(/ /g, "-").replace(/[^\w-]+/g, "");
}

async function createUniqueSlug(name) {
  const data = await getDocs(collection(db, "posts"));

  let baseSlug = generateSlug(name);
  let slug = baseSlug;
  let count = 1;

  const existingSlugs = data.docs.map(doc => doc.data().slug);

  while (existingSlugs.includes(slug)) {
    slug = `${baseSlug}-${count}`;
    count++;
  }

  return slug;
}

function CreatePost() {
  const [name, setName] = useState("");
  const [achievement, setAchievement] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    const slug = await createUniqueSlug(name);

    await addDoc(collection(db, "posts"), {
      name,
      achievement,
      content,
      slug,
      createdAt: new Date()
    });

    const url = `${window.location.origin}/student/${slug}`;
    navigator.clipboard.writeText(url);
    alert("Post Created & Link Copied!");
  };

  return (
    <div style={styles.bg}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Blog</h2>

        <input style={styles.input} placeholder="Student Name" onChange={(e) => setName(e.target.value)} />
        <input style={styles.input} placeholder="Achievement" onChange={(e) => setAchievement(e.target.value)} />
        <textarea style={styles.textarea} placeholder="Write Blog..." onChange={(e) => setContent(e.target.value)} />

        <button style={styles.button} onClick={handleSubmit}>Publish</button>
      </div>
    </div>
  );
}

const styles = {
  bg: {
    height: "100vh",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    width: "420px",
    background: "#fff",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
  },
  title: {
    textAlign: "center",
    marginBottom: "20px"
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd"
  },
  textarea: {
    width: "100%",
    padding: "12px",
    height: "120px",
    borderRadius: "8px",
    border: "1px solid #ddd"
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#667eea",
    color: "white",
    border: "none",
    borderRadius: "8px",
    marginTop: "15px",
    cursor: "pointer",
    fontWeight: "bold"
  }
};

export default CreatePost;