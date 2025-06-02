import React from 'react';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

const filterData = [
    {
        filterType: 'Location',
        array: ['Delhi', 'Bangalore', 'Nagpur', 'Pune', 'Hyderabad', 'Mumbai', 'Chennai'],
    },
    {
        filterType: 'Industry',
        array: ['Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'UI / UX Designer'],
    },
    {
        filterType: 'Salary',
        array: ['0-40k', '40-80k', '80-150k', '150k-300k'],
    },
];

const FilterCard = () => {
    return (
        <div className="p-4 bg-white border rounded-md shadow-sm">
            <h1 className="text-lg font-semibold mb-2">Filter Jobs</h1>
            <hr className="mb-4" />
            {filterData.map((section, i) => (
                <div key={i} className="mb-4">
                    <h2 className="font-bold text-lg  text-gray-900 mb-2">{section.filterType}</h2>
                    <RadioGroup>
                        {section.array.map((item, j) => (
                            <div className="flex items-center space-x-2 mb-1" key={j}>
                                <RadioGroupItem id={`${section.filterType}-${item}`} value={item} />
                                <Label htmlFor={`${section.filterType}-${item}`}>{item}</Label>
                            </div>
                        ))} 
                    </RadioGroup>
                </div>
            ))}
        </div>
    );
};

export default FilterCard;
