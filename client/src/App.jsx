import ThreadList from "./components/ThreadList.jsx";
import CreateThreadForm from "./components/CreateThreadForm.jsx";

export default function App() {
  return (
    <div className="wrap">
      <h1>Threadbase</h1>
      <p className="muted">Search &amp; sort — wire the UI to the query.</p>

      {/* 🔹 New thread form */}
      <CreateThreadForm />

      {/* 🔹 Thread list */}
      <ThreadList />
    </div>
  );
}
