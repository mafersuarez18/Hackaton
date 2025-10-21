import { useState } from 'react';
import Login from './components/Login';
import Intranet from './components/Intranet';
import ChatbotPage from './components/ChatbotPage';

type Page = 'login' | 'intranet' | 'chatbot';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');

  const handleLogin = () => {
    setCurrentPage('intranet');
  };

  const handleOpenChatbot = () => {
    setCurrentPage('chatbot');
  };

  const handleCloseChatbot = () => {
    setCurrentPage('intranet');
  };

  return (
    <>
      {currentPage === 'login' && <Login onLogin={handleLogin} />}
      {currentPage === 'intranet' && <Intranet onOpenChatbot={handleOpenChatbot} />}
      {currentPage === 'chatbot' && <ChatbotPage onClose={handleCloseChatbot} />}
    </>
  );
}

export default App;
