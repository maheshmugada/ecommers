'use client'
import React, { useState } from 'react';
import MenClothes from '../Products/MenClothes/page';
import WomenClothes from '../Products/Womenlothes/page';
import Kids from '../Products/Kids/page';
import Accessories from '../Products/Accessories/page';
import Electronics from '../Products/Electronics/page';
import Jewellery from '../Products/Jewellery/page';



const Tabs = () => {
  const [activeTab, setActiveTab] = useState('men');

  const tabs = [
    { id: 'Men', label: 'Men', component: <MenClothes />, group: 'group1' },
    { id: 'Women', label: 'Women', component: <WomenClothes />, group: 'group2' },
    { id: 'Kids', label: 'Kids', component: <Kids />, group: 'group3' },
    { id: 'Accessories', label: 'Accessories', component: <Accessories />, group: 'group4' },
    { id: 'Electronics', label: 'Electronics', component: <Electronics />, group: 'group5' },
    { id: 'Jewellery', label: 'Jewellery', component: <Jewellery />, group: 'group6' },
  ];




  const renderButtonGroup = (groupName: string, bgColor: string) => (
    <div className={`flex gap-4 p-4 mb-4 rounded ${bgColor}`}>
      {tabs
        .filter((tab) => tab.group === groupName)
        .map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className='font-semibold '
          >
            {tab.label}
          </button>
        ))}
    </div>
  );
  const activeComponent = tabs.find((tab) => tab.id === activeTab)?.component;
  return (
    <div className='mx-16 my-4'>
      <div className=" flex gap-6">
        {/* Group 1 with yellow background */}
        {renderButtonGroup('group1', 'bg-yellow-100')}
        {renderButtonGroup('group2', 'bg-red-100')}
        {renderButtonGroup('group3', 'bg-green-100')}
        {renderButtonGroup('group4', 'bg-blue-100')}
        {renderButtonGroup('group5', 'bg-orange-100')}
        {renderButtonGroup('group6', 'bg-indigo-100')}
        {/* Group 2 with blue background */}


        {/* Active tab content */}

      </div>
      <div className="">{activeComponent}</div>
    </div>

  );
};

export default Tabs;
