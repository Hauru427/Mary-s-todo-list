import React, { useState } from "react";
import { Item, Category } from "./types";

// 初期アイテムモックリストの定義
const initialItems = [
  { id: 1, title: 'アイテム1', content: 'アイテム1', category: 'NoStatus', assignee: '未割り当て', position: 10, category_id: 1},
  { id: 2, title: 'アイテム2', content: 'アイテム2', category: 'NoStatus', assignee: '未割り当て', position: 20, category_id: 1 },
  { id: 3, title: 'アイテム3', content: 'アイテム3', category: 'NoStatus', assignee: 'らんてくん', position: 30, category_id: 1 },
  { id: 4, title: 'アイテム4', content: 'アイテム4', category: 'NoStatus', assignee: '未割り当て', position: 40, category_id: 1 },
  { id: 5, title: 'アイテム5', content: 'アイテム5', category: 'NoStatus', assignee: 'らんくん', position: 50, category_id: 1 },
  { id: 6, title: 'アイテム6', content: 'アイテム6', category: 'NoStatus', assignee: '未割り当て', position: 60, category_id: 1 },
  { id: 7, title: 'アイテム7', content: 'アイテム7', category: 'NoStatus', assignee: '未割り当て', position: 70, category_id: 1 },
  { id: 8, title: 'アイテム8', content: 'アイテム8', category: 'NoStatus', assignee: '未割り当て', position: 80, category_id: 1 },
  { id: 9, title: 'アイテム9', content: 'アイテム9', category: 'InProgress', assignee: '未割り当て', position: 10, category_id: 3 },
  { id: 10, title: 'アイテム10', content: 'アイテム10', category: 'Done', assignee: '未割り当て', position: 10, category_id: 4 }
];

// 初期カテゴリーモックリストの定義
const initialCategories = [
  { id: 1, name: 'NoStatus'},
  { id: 2, name: 'Backlog'},
  { id: 3, name: 'InProgress'},
  { id: 4, name: 'Done'}
];
export default function Todos() {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [categories, setCategories] = useState<Category[]>(initialCategories);

  const filterdItems = (categoryId: number) => {
    return items
      .filter(
        (item) =>
          item.category_id === categoryId
      ).sort((a, b) => a.position - b.position)
  }

  return (
    <div className="my-4 d-flex overflow-auto" style={{ maxHeight: '90%' }}>
      {categories.map((category) => (
        <div key={category.id} className="ms-4 d-flex flex-column border rounded" style={{ maxHeight: '100%', backgroundColor: '#d1d5db' }}>
          <div className="sticky-top p-2">
            <h5 className="m-0">{category.name}</h5>
          </div>
          <div className="min-vh-100" style={{ width: '350px' }}>
            {filterdItems(category.id).map((item) => (
              <div key={item.id} className="m-2">
                <div className="border rounded bg-white hover:bg-light" style={{ minHeight: '80px' }}>
                  <div className="d-flex flex-column p-2">
                    <div className="text-sm">{item.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
  }