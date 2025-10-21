import { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, MessageSquare, Calendar, CreditCard, ChevronDown, DollarSign, FileCheck, Banknote, ClipboardList, Download, X } from 'lucide-react';
import arhiImg from '../images/arhi.png';
import bncLogo from '../images/Banco_Nacional_de_Credito.png'

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

interface ChatbotPageProps {
  onClose: () => void;
}

export default function ChatbotPage({ onClose }: ChatbotPageProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hola Juan, soy ARHI, tu asistente virtual del BNC. ¿En qué puedo ayudarte hoy?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistories, _setChatHistories] = useState<ChatHistory[]>([
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

  const USER_NAME = 'Juan Pérez';
  const USER_ID = '12345678';
  const WEBHOOK_URL = 'YOUR_N8N_WEBHOOK_URL_HERE';

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
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: USER_ID,
          userName: USER_NAME,
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
        content: data.reply || data.response || 'Lo siento, no pude procesar tu solicitud.',
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

  const handleQuickAccess = (action: string) => {
    const messages: { [key: string]: string } = {
      'vacaciones': 'Quiero solicitar vacaciones',
      'adelanto': 'Necesito solicitar un adelanto de prestaciones',
      'constancia': 'Requiero una constancia de trabajo',
      'prestamo': 'Quiero solicitar un préstamo personal',
      'permiso-reposo': 'Necesito solicitar un permiso y/o reposo',
      'ari': 'Quiero descargar mi AR-I',
      'arc': 'Quiero descargar mi ARC',
      'recibos': 'Quiero consultar mis recibos de pago'
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
    const history = chatHistories.find(h => h.id === chatId);
    if (history) {
      setCurrentChatId(chatId);
      setMessages(history.messages.length > 0 ? history.messages : [
        {
          id: Date.now().toString(),
          type: 'bot',
          content: `Cargando conversación: ${history.title}`,
          timestamp: new Date()
        }
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-orange-50">
      <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 shadow-2xl border-b-4 border-orange-500 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <img
                  src={bncLogo}
                  alt="BNC Logo"
                  className="w-12 h-12 object-cover rounded"
                />
              <div>
                <h1 className="text-3xl font-black text-white tracking-tight">BNC</h1>
                <p className="text-orange-300 text-sm font-bold">Asistente Virtual</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-3 hover:bg-blue-800 rounded-lg p-2 transition-all group"
              >
                <p className="text-white font-bold text-lg">{USER_NAME}</p>
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg ring-2 ring-orange-300 group-hover:ring-4 transition-all">
                  <User className="w-6 h-6 text-white" />
                </div>
                <ChevronDown className={`w-5 h-5 text-white transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isUserMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border-2 border-orange-200 overflow-hidden z-50">
                  <div className="bg-gradient-to-r from-blue-900 to-blue-800 p-5">
                    <div className="flex items-center space-x-3">
                      <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                        <User className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-bold text-lg">{USER_NAME}</p>
                        <p className="text-orange-300 text-sm">ID: {USER_ID}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <button
                      onClick={onClose}
                      className="w-full flex items-center justify-center px-4 py-3 text-gray-700 hover:bg-orange-50 rounded-lg transition-all"
                    >
                      <span className="font-medium">Volver a intranet</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-6">
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
                    <Calendar className="w-5 h-5 text-orange-500 group-hover:text-orange-600 flex-shrink-0" />
                    <span className="font-medium text-sm text-left">Solicitud de Vacaciones</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleQuickAccess('adelanto')}
                    className="w-full flex items-center space-x-3 p-3 text-gray-700 hover:bg-purple-50 rounded-xl cursor-pointer transition-all hover:scale-105 hover:shadow-md group"
                  >
                    <DollarSign className="w-5 h-5 text-purple-600 group-hover:text-purple-700 flex-shrink-0" />
                    <span className="font-medium text-sm text-left">Solicitud de Adelanto de Prestaciones</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleQuickAccess('constancia')}
                    className="w-full flex items-center space-x-3 p-3 text-gray-700 hover:bg-green-50 rounded-xl cursor-pointer transition-all hover:scale-105 hover:shadow-md group"
                  >
                    <FileCheck className="w-5 h-5 text-green-600 group-hover:text-green-700 flex-shrink-0" />
                    <span className="font-medium text-sm text-left">Constancia de Trabajo</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleQuickAccess('prestamo')}
                    className="w-full flex items-center space-x-3 p-3 text-gray-700 hover:bg-blue-50 rounded-xl cursor-pointer transition-all hover:scale-105 hover:shadow-md group"
                  >
                    <Banknote className="w-5 h-5 text-blue-600 group-hover:text-blue-700 flex-shrink-0" />
                    <span className="font-medium text-sm text-left">Solicitud de Préstamos Personales</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleQuickAccess('permiso-reposo')}
                    className="w-full flex items-center space-x-3 p-3 text-gray-700 hover:bg-yellow-50 rounded-xl cursor-pointer transition-all hover:scale-105 hover:shadow-md group"
                  >
                    <ClipboardList className="w-5 h-5 text-yellow-600 group-hover:text-yellow-700 flex-shrink-0" />
                    <span className="font-medium text-sm text-left">Solicitud Permiso y/o Reposo</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleQuickAccess('ari')}
                    className="w-full flex items-center space-x-3 p-3 text-gray-700 hover:bg-cyan-50 rounded-xl cursor-pointer transition-all hover:scale-105 hover:shadow-md group"
                  >
                    <Download className="w-5 h-5 text-cyan-600 group-hover:text-cyan-700 flex-shrink-0" />
                    <span className="font-medium text-sm text-left">Descargar AR-I</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleQuickAccess('arc')}
                    className="w-full flex items-center space-x-3 p-3 text-gray-700 hover:bg-teal-50 rounded-xl cursor-pointer transition-all hover:scale-105 hover:shadow-md group"
                  >
                    <Download className="w-5 h-5 text-teal-600 group-hover:text-teal-700 flex-shrink-0" />
                    <span className="font-medium text-sm text-left">Descargar ARC</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleQuickAccess('recibos')}
                    className="w-full flex items-center space-x-3 p-3 text-gray-700 hover:bg-orange-50 rounded-xl cursor-pointer transition-all hover:scale-105 hover:shadow-md group"
                  >
                    <CreditCard className="w-5 h-5 text-orange-600 group-hover:text-orange-700 flex-shrink-0" />
                    <span className="font-medium text-sm text-left">Recibos de Pago</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-gray-200 hover:border-orange-300 transition-all">
              <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 px-6 py-5 border-b-2 border-orange-500">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={arhiImg}
                      alt="Asistente ARHI"
                      className="w-12 h-12   object-contain drop-shadow-2xl"
                    />
                    <div>
                      <h2 className="text-xl font-bold text-white">ARHI</h2>
                      <p className="text-orange-300 text-sm font-medium flex items-center">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                        En línea
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-white hover:bg-blue-800 p-2 rounded-lg transition-all"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="h-[500px] overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-slate-50 to-blue-50">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start space-x-3 ${
                      message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}
                  >
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
                      message.type === 'user'
                        ? 'bg-gradient-to-br from-orange-500 to-orange-600 ring-2 ring-orange-300'
                        : 'bg-gradient-to-br from-blue-600 to-blue-700 ring-2 ring-blue-300'
                    }`}>
                      {message.type === 'user' ? (
                        <User className="w-5 h-5 text-white" />
                      ) : (
                        <Bot className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div className={`flex-1 ${message.type === 'user' ? 'flex justify-end' : ''}`}>
                      <div className={`inline-block max-w-[80%] px-5 py-3 rounded-2xl shadow-md ${
                        message.type === 'user'
                          ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-tr-none'
                          : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'
                      }`}>
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        <span className={`text-xs mt-2 block ${
                          message.type === 'user' ? 'text-orange-100' : 'text-gray-500'
                        }`}>
                          {message.timestamp.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg ring-2 ring-blue-300">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-white px-5 py-3 rounded-2xl rounded-tl-none shadow-md border border-gray-200">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="border-t-2 border-gray-200 p-4 bg-white">
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Escribe tu mensaje aquí..."
                    className="flex-1 px-5 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-orange-500 transition-all shadow-sm text-gray-700 placeholder-gray-400"
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

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 border-r-4 border-blue-900 hover:shadow-2xl transition-shadow">
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
        </div>
      </main>

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
