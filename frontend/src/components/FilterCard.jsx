// FilterCard.jsx
import React, { useState } from 'react';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

const filterData = [
  {
    filterType: 'Location',
    array: ['Delhi', 'Bangalore', 'Nagpur', 'Pune', 'Hyderabad', 'Mumbai', 'Chennai'],
  },
  {
    filterType: 'Industry',
    array: ['Frontend', 'Backend', 'Full Stack', 'UI/UX', 'Data Science', 'Software Engineer'],
  },
  {
    filterType: 'Salary Range',
    array: ['0-40k', '40-80k', '80-150k', '150k-300k'],
  },
];

const FilterCard = ({ onClose }) => {
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState('');

  const changeHandler = (value) => {
    setSelectedValue(value);
    dispatch(setSearchedQuery(value));
  };

  const clearFilters = () => {
    setSelectedValue('');
    dispatch(setSearchedQuery(''));
    if (onClose) onClose();
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm transition-colors duration-300">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
          Filter Jobs
        </h1>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={clearFilters}
          className="text-[#638C2D] hover:bg-[#638C2D]/10"
        >
          Clear all
        </Button>
      </div>

      <div className="space-y-8">
        {filterData.map((section, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="space-y-4"
          >
            <h2 className="font-medium text-gray-800 dark:text-gray-200">
              {section.filterType}
            </h2>
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
              <div className="space-y-3">
                {section.array.map((item, j) => (
                  <div
                    key={j}
                    className="flex items-center space-x-3 cursor-pointer"
                  >
                    <RadioGroupItem
                      id={`${section.filterType}-${item}`}
                      value={item}
                      className="h-5 w-5 border-2 text-[#638C2D] border-gray-300 dark:border-gray-600"
                    />
                    <Label
                      htmlFor={`${section.filterType}-${item}`}
                      className="text-gray-700 dark:text-gray-300 cursor-pointer"
                    >
                      {item}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FilterCard;