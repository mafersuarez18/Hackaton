import { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, LogOut, MessageSquare, Calendar, FileText, CreditCard, Clock, ChevronDown, Mail, Briefcase, Building2 } from 'lucide-react';
import logoBNC from './images/Banco_Nacional_de_Credito.png';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface ChatHistory {
  id: string;
  title: string;
  date: Date;
  messages: Message[];
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hola Juan, soy tu asistente virtual del BNC. ¿En qué puedo ayudarte hoy?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistories, setChatHistories] = useState<ChatHistory[]>([
    {
      id: '1',
      title: 'Consulta de vacaciones',
      date: new Date(Date.now() - 86400000 * 2),
      messages: []
    },
    {
      id: '2',
      title: 'Solicitud de permiso',
      date: new Date(Date.now() - 86400000 * 5),
      messages: []
    },
    {
      id: '3',
      title: 'Certificado laboral',
      date: new Date(Date.now() - 86400000 * 10),
      messages: []
    }
  ]);
  const [currentChatId, setCurrentChatId] = useState<string>('current');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const WEBHOOK_URL = 'YOUR_N8N_WEBHOOK_URL_HERE'; // Configurar aquí la URL del Webhook de N8N
  const USER_ID = '12345678'; // ID del empleado hardcodeado
  const USER_NAME = 'Juan Pérez';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputMessage;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Envío del mensaje al Webhook de N8N
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: USER_ID,
          message: textToSend
        })
      });

      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }

      const data = await response.json();

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: data.reply || 'Lo siento, no pude procesar tu solicitud.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error al enviar mensaje:', error);

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: 'Lo siento, hubo un error al procesar tu solicitud. Por favor, intenta nuevamente.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleQuickAccess = (action: string) => {
    const messages: { [key: string]: string } = {
      'vacaciones': 'Quiero solicitar vacaciones',
      'permisos': 'Necesito solicitar un permiso',
      'certificados': 'Requiero un certificado laboral',
      'nomina': 'Deseo consultar mis desprendibles de nómina'
    };
    sendMessage(messages[action]);
  };

  const startNewChat = () => {
    setCurrentChatId('current');
    setMessages([
      {
        id: Date.now().toString(),
        type: 'bot',
        content: 'Hola Juan, soy tu asistente virtual del BNC. ¿En qué puedo ayudarte hoy?',
        timestamp: new Date()
      }
    ]);
  };

  const loadChatHistory = (chatId: string) => {
    const chat = chatHistories.find(c => c.id === chatId);
    if (chat) {
      setCurrentChatId(chatId);
      setMessages(chat.messages.length > 0 ? chat.messages : [
        {
          id: '1',
          type: 'bot',
          content: 'Conversación anterior cargada.',
          timestamp: chat.date
        }
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-orange-50 to-slate-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 shadow-2xl border-b-4 border-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Contenedor de la imagen (reemplaza a 'BNC') */}
              <div className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform overflow-hidden">
                <img 
                  src={logoBNC} 
                  alt="Logo Banco Nacional de Crédito" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-wide">Banco Nacional de Crédito</h1>
                <p className="text-orange-300 text-sm font-medium">Portal del Colaborador</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 relative">
              <div className="text-right">
                <p className="text-white font-semibold">{USER_NAME}</p>
                <p className="text-orange-300 text-sm font-medium">ID: {USER_ID}</p>
              </div>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 hover:bg-blue-800 rounded-lg p-2 transition-all group"
              >
                <div className="w-11 h-11 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg ring-2 ring-white ring-opacity-50 group-hover:ring-orange-300 transition-all">
                  <User className="w-6 h-6 text-white" />
                </div>
                <ChevronDown className={`w-4 h-4 text-white transition-transform ${
                  isUserMenuOpen ? 'rotate-180' : ''
                }`} />
              </button>

              {/* Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border-2 border-gray-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-5 duration-200">
                  {/* Header del Dropdown */}
                  <div className="bg-gradient-to-r from-blue-900 to-blue-800 p-5">
                    <div className="flex items-center space-x-3">
                      <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                        <User className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-bold text-lg">{USER_NAME}</p>
                        <p className="text-orange-300 text-sm">ID: {USER_ID}</p>
                      </div>
                    </div>
                  </div>

                  {/* Información del Usuario */}
                  <div className="p-5 space-y-4">
                    <div className="flex items-start space-x-3 group">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 transition-colors">
                        <Building2 className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Departamento</p>
                        <p className="text-gray-800 font-semibold">Tecnología</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 group">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-orange-200 transition-colors">
                        <Briefcase className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Cargo</p>
                        <p className="text-gray-800 font-semibold">Analista</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 group">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 transition-colors">
                        <Mail className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Email</p>
                        <p className="text-gray-800 font-semibold text-sm">juan.perez@bnc.co</p>
                      </div>
                    </div>
                  </div>

                  {/* Botón Cerrar Sesión */}
                  <div className="border-t border-gray-200 p-3">
                    <button className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl py-3 transition-all shadow-md hover:shadow-lg group">
                      <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      <span className="font-semibold">Cerrar Sesión</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Panel */}
          <div className="lg:col-span-1 space-y-6">
            {/* Accesos Rápidos */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-orange-500 hover:shadow-2xl transition-shadow">
              <h2 className="text-lg font-bold text-gray-800 mb-5 flex items-center">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                  <MessageSquare className="w-5 h-5 text-orange-600" />
                </div>
                Accesos Rápidos
              </h2>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => handleQuickAccess('vacaciones')}
                    className="w-full flex items-center space-x-3 p-3 text-gray-700 hover:bg-orange-50 rounded-xl cursor-pointer transition-all hover:scale-105 hover:shadow-md group"
                  >
                    <Calendar className="w-5 h-5 text-orange-500 group-hover:text-orange-600" />
                    <span className="font-medium">Solicitud de Vacaciones</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleQuickAccess('permisos')}
                    className="w-full flex items-center space-x-3 p-3 text-gray-700 hover:bg-blue-50 rounded-xl cursor-pointer transition-all hover:scale-105 hover:shadow-md group"
                  >
                    <Clock className="w-5 h-5 text-blue-600 group-hover:text-blue-700" />
                    <span className="font-medium">Mis Permisos</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleQuickAccess('certificados')}
                    className="w-full flex items-center space-x-3 p-3 text-gray-700 hover:bg-blue-50 rounded-xl cursor-pointer transition-all hover:scale-105 hover:shadow-md group"
                  >
                    <FileText className="w-5 h-5 text-blue-600 group-hover:text-blue-700" />
                    <span className="font-medium">Certificados Laborales</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleQuickAccess('nomina')}
                    className="w-full flex items-center space-x-3 p-3 text-gray-700 hover:bg-blue-50 rounded-xl cursor-pointer transition-all hover:scale-105 hover:shadow-md group"
                  >
                    <CreditCard className="w-5 h-5 text-blue-600 group-hover:text-blue-700" />
                    <span className="font-medium">Desprendibles de Nómina</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Historial de Conversaciones */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-blue-900 hover:shadow-2xl transition-shadow">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-gray-800 flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                  </div>
                  Historial
                </h2>
                <button
                  onClick={startNewChat}
                  className="text-xs bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-lg transition-colors font-medium"
                >
                  Nuevo
                </button>
              </div>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {chatHistories.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => loadChatHistory(chat.id)}
                    className={`w-full text-left p-3 rounded-xl transition-all hover:shadow-md ${
                      currentChatId === chat.id
                        ? 'bg-blue-100 border-2 border-blue-600'
                        : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    <p className="font-medium text-sm text-gray-800 truncate">{chat.title}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {chat.date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Widget */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-gray-200 hover:border-orange-300 transition-all">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 px-6 py-5 border-b-2 border-orange-500">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg ring-2 ring-orange-300 animate-pulse">
                    <Bot className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Asistente Virtual BNC</h2>
                    <p className="text-orange-300 text-sm font-medium flex items-center">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                      En línea
                    </p>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="h-[500px] overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-slate-50 to-blue-50">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start space-x-3 ${
                      message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-md ${
                        message.type === 'user'
                          ? 'bg-gradient-to-br from-orange-500 to-orange-600'
                          : 'bg-gradient-to-br from-blue-900 to-blue-800'
                      }`}
                    >
                      {message.type === 'user' ? (
                        <User className="w-5 h-5 text-white" />
                      ) : (
                        <Bot className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-lg ${
                        message.type === 'user'
                          ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-tr-none'
                          : 'bg-white text-gray-800 rounded-tl-none border-2 border-gray-100'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.type === 'user' ? 'text-orange-100' : 'text-gray-400'
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString('es-ES', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-900 to-blue-800 rounded-full flex items-center justify-center shadow-md">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-lg border-2 border-gray-100">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <div className="border-t-2 border-gray-200 p-4 bg-gradient-to-r from-slate-50 to-blue-50">
                <div className="flex items-end space-x-3">
                  <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Escribe tu mensaje aquí..."
                    className="flex-1 resize-none border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all shadow-md"
                    rows={2}
                    disabled={isLoading}
                  />
                  <button
                    onClick={() => sendMessage()}
                    disabled={!inputMessage.trim() || isLoading}
                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white rounded-xl px-6 py-3 flex items-center justify-center space-x-2 transition-all shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    <Send className="w-5 h-5" />
                    <span className="font-bold">Enviar</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-900 to-blue-800 border-t-4 border-orange-500 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-white text-sm font-medium">
            © 2025 Banco Nacional de Crédito - Uso exclusivo interno
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
