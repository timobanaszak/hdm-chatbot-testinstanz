import './styles/App.scss';
import TestingUi from './components/TestingUi';

function App() {
  return (
    <div className="App">
      <header>
        <p>HdM Chatbot Testinstanz</p> 
        <p>Erstellt von: Bettina Artmann, Timo Banaszak, Markus Besser und Linus Dietrich</p>
      </header>
      <main>
        <TestingUi/>
      </main>
    </div>
  );
}

export default App;
