import React, { useEffect, useState } from 'react';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
  {
    filterType: 'Location',
    array: ['Delhi', 'Bangalore', 'Nagpur', 'Pune', 'Hyderabad', 'Mumbai', 'Chennai'],
  },
  {
    filterType: 'Industry',
    array: ['Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'UI / UX Designer', 'Data Science','Software Engineer'],
  },
  {
    filterType: 'Salary',
    array: ['0-40k', '40-80k', '80-150k', '150k-300k'],
  },
];

const FilterCard = () => {
  const dispatch = useDispatch();
  const [selectedValue, setselectedValue] = useState("")
  const changeHandler = (value) => {
    setselectedValue(value);
  }

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue])

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-900 dark:border-gray-700 transition-colors duration-300 max-w-sm w-full">
      <h1 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100 select-none">
        Filter Jobs
      </h1>
      <hr className="mb-6 border-gray-300 dark:border-gray-600" />

      {filterData.map((section, i) => (
        <div key={i} className="mb-6 last:mb-0">
          <h2 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-200">
            {section.filterType}
          </h2>
          <RadioGroup value={selectedValue} onValueChange={changeHandler}>
            {section.array.map((item, j) => (
              <div
                key={j}
                className="flex items-center space-x-3 mb-2 last:mb-0 cursor-pointer"
              >
                <RadioGroupItem
                  id={`${section.filterType}-${item}`}
                  value={item}
                  className="ring-offset-white dark:ring-offset-gray-900 focus:ring-2 focus:ring-blue-500"
                />
                <Label
                  htmlFor={`${section.filterType}-${item}`}
                  className="text-gray-700 dark:text-gray-300 select-none"
                >
                  {item}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      ))}
    </div>
  );
};

export default FilterCard;
