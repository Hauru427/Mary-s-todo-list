// Cardインターフェースの定義
export interface Card {
  id: number;
  title: string;
  memo?: string; // memoはnull許容なのでオプションとして定義
  list_id: number;
  due_date?: string; // due_dateはnull許容なのでオプションとして定義
  position?: number; // positionはnull許容なのでオプションとして定義
  user_id: number;
}

// Listインターフェースの定義
export interface List {
  id: number;
  title: string;
  user_id: number;
}