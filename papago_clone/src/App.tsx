import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeftRight } from 'lucide-react';
import papagoLogo from './assets/papagoLogo.png';

type Tab = "translator" | "image" | "document" | "login";

const App: React.FC = () => {
  const [showNotice, setShowNotice] = useState(true);
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="min-h-screen bg-[#1e1f21] text-white">
      {/* 헤더 및 Notice는 모든 페이지에서 표시 */}
      <Header />
      {showNotice && <NoticeBar onClose={() => setShowNotice(false)} />}
      
      {/* 로그인 페이지가 아닐 때만 탭 네비게이션 표시 */}
      {currentPath !== '/login' && <TabNavigation currentPath={currentPath} />}
      
      {/* 라우트에 따른 콘텐츠 렌더링 */}
      <Routes>
        <Route path="/" element={<TranslatorSection />} />
        <Route path="/image" element={<ImageTranslationSection />} />
        <Route path="/document" element={<DocumentTranslationSection />} />
        <Route path="/login" element={<LoginSection />} />
      </Routes>
      
      <Footer />
    </div>
  );
};

// -------------------------
// Header 컴포넌트
// -------------------------
interface HeaderProps {
  // 필요 시 외부 링크 핸들러 등을 추가
}

const Header: React.FC<HeaderProps> = () => {
  const navigate = useNavigate();
  
  return (
    <header className="bg-[#1e1f21] border-b border-[#2a2b2d]">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center">
            <img src={papagoLogo} alt="papago+ logo" className="h-8 w-auto object-contain" />
          </Link>
          <nav className="hidden md:flex space-x-6">
            <button className="text-gray-400 hover:text-white">
              파파고 플러스 소개
            </button>
            <button className="text-gray-400 hover:text-white">
              플러스 이용권
            </button>
            <button className="text-gray-400 hover:text-white">
              PC 웹 다운로드
            </button>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate('/login')} className="text-gray-400 hover:text-white">
            로그인
          </button>
          <a
            href="https://papago-plus.com/pricing"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#2b52ff] text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            무료로 시작하기
          </a>
        </div>
      </div>
    </header>
  );
};

// -------------------------
// Notice Bar 컴포넌트
// -------------------------
interface NoticeBarProps {
  onClose: () => void;
}

const NoticeBar: React.FC<NoticeBarProps> = ({ onClose }) => (
  <div className="bg-[#2a2b2d] py-2 px-4 flex items-center justify-between">
    <div className="flex items-center text-[#3b82f6]">
      <span className="mr-2">Notice</span>
      <span className="text-gray-300">출시 이벤트, 신규 가입자만 한달 무료 혜택</span>
      <span className="ml-2">〉</span>
    </div>
    <button className="text-gray-400" onClick={onClose}>×</button>
  </div>
);

// -------------------------
// Tab Navigation 컴포넌트
// -------------------------
interface TabNavigationProps {
  currentPath: string;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ currentPath }) => {
  const navigate = useNavigate();
  
  return (
    <div className="max-w-7xl mx-auto px-4 flex justify-center">
      <div className="bg-[#2a2b2d] mt-4 rounded-lg p-2 inline-flex space-x-1">
        <button
          onClick={() => navigate('/')}
          className={`px-4 py-2 rounded-md ${currentPath === '/' ? 'bg-[#1e1f21] text-white' : 'text-gray-400'}`}
        >
          텍스트
        </button>
        <button
          onClick={() => navigate('/image')}
          className={`px-4 py-2 rounded-md ${currentPath === '/image' ? 'bg-[#1e1f21] text-white' : 'text-gray-400'}`}
        >
          이미지
        </button>
        <button
          onClick={() => navigate('/document')}
          className={`px-4 py-2 rounded-md ${currentPath === '/document' ? 'bg-[#1e1f21] text-white' : 'text-gray-400'}`}
        >
          문서
        </button>
        <button
          onClick={() => window.location.href = "https://papago-plus.com/about?target=download"}
          className="px-4 py-2 rounded-md text-gray-400"
        >
          웹사이트
        </button>
      </div>
    </div>
  );
};

// -------------------------
// Translator Section
// -------------------------
const TranslatorSection: React.FC = () => {
  const [glossaryOn, setGlossaryOn] = useState(false);
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-[#2a2b2d] rounded-lg p-8">
        {/* 언어 선택 컨트롤 영역 */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <select
              className="bg-transparent text-white text-lg font-semibold focus:outline-none"
              aria-label="왼쪽 언어 선택"
            >
              {["언어감지", "한국어", "영어", "일본어", "중국어(간체)", "중국어(번체)", "스페인어", "프랑스어", "러시아어", "베트남어", "태국어", "인도네시아어"].map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div>
            <ArrowLeftRight className="h-5 w-5 text-gray-400" />
          </div>
          <div className="flex items-center space-x-4">
            <select
              className="bg-transparent text-white text-lg font-semibold focus:outline-none"
              aria-label="오른쪽 언어 선택"
            >
              {["영어", "한국어", "일본어", "중국어(간체)", "중국어(번체)", "스페인어", "프랑스어", "러시아어", "베트남어", "태국어", "인도네시아어"].map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <div className="flex items-center">
              <span className="text-gray-400">용어집</span>
              <div
                onClick={() => setGlossaryOn(!glossaryOn)}
                className={`ml-2 w-10 h-6 rounded-full relative cursor-pointer ${
                  glossaryOn ? "bg-blue-600" : "bg-gray-700"
                }`}
                aria-pressed={glossaryOn}
                aria-label="용어집 토글"
              >
                <div
                  className={`w-4 h-4 rounded-full absolute top-1 bg-white transition-all duration-200 ${
                    glossaryOn ? "left-1" : "right-1"
                  }`}
                ></div>
              </div>
            </div>
          </div>
        </div>
        {/* 텍스트 입력 및 번역 영역 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg p-4 h-96 border border-[#3a3b3d]">
            <textarea
              className="w-full h-full bg-transparent text-white resize-none focus:outline-none"
              placeholder="번역할 내용을 입력하세요"
            ></textarea>
          </div>
          <div className="rounded-lg p-4 h-96 border border-[#3a3b3d]">
            <textarea
              className="w-full h-full bg-transparent text-white resize-none focus:outline-none"
              placeholder="번역된 결과가 여기에 표시됩니다"
              readOnly
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

// -------------------------
// Image Translation Section
// -------------------------
const ImageTranslationSection: React.FC = () => {
  const [glossaryOn, setGlossaryOn] = useState(false);
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-[#2a2b2d] rounded-lg p-8">
        {/* 상단 컨트롤 영역 */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <select
              className="bg-transparent text-white text-lg font-semibold focus:outline-none"
              aria-label="왼쪽 언어 선택"
            >
              {["언어감지", "한국어", "영어", "일본어", "중국어(간체)", "중국어(번체)", "스페인어", "프랑스어", "러시아어", "베트남어", "태국어", "인도네시아어"].map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div>
            <ArrowLeftRight className="h-5 w-5 text-gray-400" />
          </div>
          <div className="flex items-center space-x-4">
            <select
              className="bg-transparent text-white text-lg font-semibold focus:outline-none"
              aria-label="오른쪽 언어 선택"
            >
              {["영어", "한국어", "일본어", "중국어(간체)", "중국어(번체)", "스페인어", "프랑스어", "러시아어", "베트남어", "태국어", "인도네시아어"].map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <div className="flex items-center">
              <span className="text-gray-400">용어집</span>
              <div
                onClick={() => setGlossaryOn(!glossaryOn)}
                className={`ml-2 w-10 h-6 rounded-full relative cursor-pointer ${
                  glossaryOn ? "bg-blue-600" : "bg-gray-700"
                }`}
                aria-pressed={glossaryOn}
                aria-label="용어집 토글"
              >
                <div
                  className={`w-4 h-4 rounded-full absolute top-1 bg-white transition-all duration-200 ${
                    glossaryOn ? "left-1" : "right-1"
                  }`}
                ></div>
              </div>
            </div>
          </div>
        </div>
        {/* 이미지 업로드 및 번역 영역 */}
        <div className="flex flex-col items-center justify-center h-96">
          <p className="text-gray-400 mb-4">번역할 이미지를 드래그하여 넣어보세요.</p>
          <div className="flex gap-2">
            <button className="bg-[#2b2c2e] text-gray-400 px-6 py-2 rounded hover:bg-[#3a3b3d]">
              캡처하여 번역하기
            </button>
            <button className="bg-[#2b52ff] text-white px-6 py-2 rounded hover:bg-blue-700">
              이미지 불러오기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// -------------------------
// Document Translation Section
// -------------------------
const DocumentTranslationSection: React.FC = () => {
  const [glossaryOn, setGlossaryOn] = useState(false);
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-[#2a2b2d] rounded-lg p-8">
        {/* 상단 컨트롤 영역 */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <select
              className="bg-transparent text-white text-lg font-semibold focus:outline-none"
              aria-label="왼쪽 언어 선택"
            >
              {["한국어", "영어", "일본어", "중국어(간체)", "중국어(번체)", "스페인어", "프랑스어", "러시아어", "베트남어", "태국어", "인도네시아어"].map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div>
            <ArrowLeftRight className="h-5 w-5 text-gray-400" />
          </div>
          <div className="flex items-center space-x-4">
            <select
              className="bg-transparent text-white text-lg font-semibold focus:outline-none"
              aria-label="오른쪽 언어 선택"
            >
              {["영어", "한국어", "일본어", "중국어(간체)", "중국어(번체)", "스페인어", "프랑스어", "러시아어", "베트남어", "태국어", "인도네시아어"].map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <div className="flex items-center">
              <span className="text-gray-400">용어집</span>
              <div
                onClick={() => setGlossaryOn(!glossaryOn)}
                className={`ml-2 w-10 h-6 rounded-full relative cursor-pointer ${
                  glossaryOn ? "bg-blue-600" : "bg-gray-700"
                }`}
                aria-pressed={glossaryOn}
                aria-label="용어집 토글"
              >
                <div
                  className={`w-4 h-4 rounded-full absolute top-1 bg-white transition-all duration-200 ${
                    glossaryOn ? "left-1" : "right-1"
                  }`}
                ></div>
              </div>
            </div>
          </div>
        </div>
        {/* 문서 업로드 및 번역 영역 */}
        <div className="flex flex-col items-center justify-center h-96">
          <p className="text-gray-400 mb-4">번역할 문서를 드래그하여 넣어보세요.</p>
          <button className="bg-[#2b52ff] text-white px-6 py-2 rounded hover:bg-blue-700">
            문서 불러오기
          </button>
        </div>
      </div>
    </div>
  );
};

// -------------------------
// Login Section
// -------------------------
const LoginSection: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <img src={papagoLogo} alt="papago+ logo" className="h-12 w-auto object-contain mb-8" />
      <div className="w-full max-w-sm px-4">
        <div className="border border-gray-300 rounded-md p-6 shadow-sm">
          <input
            type="email"
            placeholder="Email@example.com"
            className="w-full p-2 mb-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="비밀번호"
            className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            className="w-full bg-gray-400 hover:bg-gray-500 text-white py-2 rounded-md font-semibold mb-4"
          >
            로그인
          </button>
          <div className="flex items-center justify-center text-sm text-gray-500 space-x-3">
            <a href="#" className="underline hover:text-blue-600">
              이용 방법 안내/고객센터
            </a>
            <span className="text-gray-300">|</span>
            <a href="#" className="underline hover:text-blue-600">
              이메일 찾기
            </a>
            <span className="text-gray-300">|</span>
            <a href="#" className="underline hover:text-blue-600">
              비밀번호 찾기
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// -------------------------
// Footer 컴포넌트
// -------------------------
const Footer: React.FC = () => (
  <footer className="bg-[#1e1f21] text-gray-400 text-sm py-8">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-wrap gap-4 mb-4">
        <a href="#" className="hover:text-white">
          개인정보처리방침
        </a>
        <a href="#" className="hover:text-white">
          이용약관
        </a>
        <a href="#" className="hover:text-white">
          공지사항
        </a>
        <a href="#" className="hover:text-white">
          고객센터
        </a>
        <a href="#" className="hover:text-white">
          제휴/제호
        </a>
        <a href="#" className="hover:text-white">
          기업형 상품 문의
        </a>
        <a href="#" className="hover:text-white">
          공식 블로그
        </a>
      </div>
      <div className="space-y-2">
        <p>
          사업자등록번호: 129-86-31394 | 통신판매업 신고번호: 2009-경기성남-0510 | 상호:
          네이버클라우드(주) | 대표이사: 김유원
        </p>
        <p>주소: 경기도 성남시 분당구 불정로 6 그린팩토리, 17-26층</p>
        <p>
          이 콘텐츠의 저작권은 저작권자 또는 제공처에 있으며, 이를 무단 사용하는 경우
          저작권법 등에 따라 법적 책임을 질 수 있습니다.
        </p>
        <p>© NAVER Cloud corp.</p>
      </div>
    </div>
  </footer>
);

export default App;
