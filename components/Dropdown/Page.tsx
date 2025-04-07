'use client'
import React from 'react'
const users = [
  { id: 1, name1: 'Alice' },
  { id: 2, name1: 'Bob' },
  { id: 3, name1: 'Charlie' },
];

const products = [
  { id: 1, name: 'Laptop', price: '$1000' },
  { id: 2, name: 'Phone', price: '$500' },
  { id: 3, name: 'Tablet', price: '$300' },
];
const useList1 = users.length > products.length;

const Page = (users:any) => {
  return (
    <div>
     {useList1 ? (
        <ul>
          {users.map((item1:any, index:any) => (
            <li key={index}>{item1.name1}</li>
          ))}
        </ul>
      ) : (
        <ul>
          {products.map((item:any, index:any) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Page