import React, { useState } from 'react';
import { Plus, Trash2, RotateCcw, Users, CheckSquare, Square, Search } from 'lucide-react';

export default function AttendanceApp() {
  const [names, setNames] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [newName, setNewName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // 이름 추가
  const addName = () => {
    if (newName.trim() && !names.includes(newName.trim())) {
      const updatedNames = [...names, newName.trim()];
      setNames(updatedNames);
      setAttendance(prev => ({
        ...prev,
        [newName.trim()]: false
      }));
      setNewName('');
    }
  };

  // 이름 삭제
  const removeName = (nameToRemove) => {
    setNames(names.filter(name => name !== nameToRemove));
    const updatedAttendance = { ...attendance };
    delete updatedAttendance[nameToRemove];
    setAttendance(updatedAttendance);
  };

  // 출석 토글
  const toggleAttendance = (name) => {
    setAttendance(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  // 출석 초기화
  const resetAttendance = () => {
    const resetAttendance = {};
    names.forEach(name => {
      resetAttendance[name] = false;
    });
    setAttendance(resetAttendance);
  };

  // 전체 출석/미출석
  const toggleAll = (status) => {
    const newAttendance = {};
    names.forEach(name => {
      newAttendance[name] = status;
    });
    setAttendance(newAttendance);
  };

  // 검색 필터링
  const filteredNames = names.filter(name => 
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 통계 계산
  const presentCount = Object.values(attendance).filter(present => present).length;
  const totalCount = names.length;

  // Enter 키로 이름 추가
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addName();
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {/* 헤더 */}
      <div className="bg-blue-600 text-white p-4 sticky top-0 z-10">
        <h1 className="text-xl font-bold text-center">출석체크</h1>
        <div className="flex justify-center items-center mt-2 space-x-4">
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            <span className="text-sm">{presentCount}/{totalCount}</span>
          </div>
        </div>
      </div>

      {/* 이름 추가 섹션 */}
      <div className="p-4 border-b bg-gray-50">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="이름을 입력하세요"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addName}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 검색 및 컨트롤 버튼 */}
      {names.length > 0 && (
        <div className="p-4 space-y-3 border-b bg-gray-50">
          {/* 검색 */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="이름 검색..."
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* 컨트롤 버튼들 */}
          <div className="flex space-x-2">
            <button
              onClick={() => toggleAll(true)}
              className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
            >
              전체 출석
            </button>
            <button
              onClick={() => toggleAll(false)}
              className="flex-1 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
            >
              전체 미출석
            </button>
            <button
              onClick={resetAttendance}
              className="px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 출석 목록 */}
      <div className="flex-1 overflow-y-auto">
        {filteredNames.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            {names.length === 0 ? (
              <div>
                <Users className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p>이름을 추가해주세요</p>
              </div>
            ) : (
              <p>검색 결과가 없습니다</p>
            )}
          </div>
        ) : (
          <div className="p-4 space-y-2">
            {filteredNames.map((name, index) => (
              <div
                key={name}
                className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                  attendance[name]
                    ? 'bg-green-50 border-green-200'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center flex-1">
                  <button
                    onClick={() => toggleAttendance(name)}
                    className="mr-3"
                  >
                    {attendance[name] ? (
                      <CheckSquare className="w-6 h-6 text-green-600" />
                    ) : (
                      <Square className="w-6 h-6 text-gray-400" />
                    )}
                  </button>
                  <span
                    className={`font-medium ${
                      attendance[name] ? 'text-green-800' : 'text-gray-700'
                    }`}
                  >
                    {name}
                  </span>
                  {attendance[name] && (
                    <span className="ml-2 px-2 py-1 text-xs bg-green-600 text-white rounded-full">
                      출석
                    </span>
                  )}
                </div>
                <button
                  onClick={() => removeName(name)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 하단 통계 (이름이 있을 때만 표시) */}
      {names.length > 0 && (
        <div className="border-t bg-gray-50 p-4">
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-800">
              출석: {presentCount}명 / 전체: {totalCount}명
            </div>
            <div className="text-sm text-gray-600 mt-1">
              출석률: {totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 0}%
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
