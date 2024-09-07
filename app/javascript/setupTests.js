const fetchMock = require('jest-fetch-mock');
fetchMock.enableMocks();

// 全てのテストで共通のデフォルトレスポンス
beforeEach(() => {
  fetchMock.resetMocks();
  fetchMock.mockResponse(JSON.stringify({ count: 0 })); // デフォルトのフェッチレスポンス
});
