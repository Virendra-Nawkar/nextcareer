import React from 'react';
import { Badge } from './ui/badge';

const LatestJobCards = () => {
  return (
    <div className="p-4 border rounded-md shadow-xl border-gray-100">
      <div>
        <h1 className="text-xl font-semibold">Company Name</h1>
        <p>India</p>
      </div>
      <div className="mt-2">
        <h1 className="text-lg font-medium">Job Title</h1>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
      </div>
      <div className="mt-2 flex gap-2 flex-wrap items-center">
        <Badge className="text-blue-700 font-bold" variant="ghost">12 Positions</Badge>
        <Badge className="text-[#F38002] font-bold" variant="ghost">Part Time</Badge>
        <Badge className="text-[#7209B7] font-bold" variant="ghost">24LPA</Badge>
      </div> 
    </div>
  );
};

export default LatestJobCards;
