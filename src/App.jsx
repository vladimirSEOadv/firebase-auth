import "./App.css";
import { AuthProvider } from "./auth";

function App() {
  return (
    <>
      <div>
        <AuthProvider></AuthProvider>
      </div>
    </>
  );
}

export default App;
