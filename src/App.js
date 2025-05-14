import './App.css';
import Header from "./Header.js"
import Footer from './Footer';
import MessageList from './Messages';

function App() {
  return (
    <div className="App">
      <Header />
      <MessageList />
      <Footer />
    </div>
  );
}

export default App;
