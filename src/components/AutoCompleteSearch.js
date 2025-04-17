import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AutoCompleteSearch = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!query) return setSuggestions([]);
      try {
        const response = await axios.get(`https://dcash.shamil-bkp.com/voucher/customers.php?q=${query}`);
        console.error('response', response);
     
        setSuggestions(response.data);
      } catch (error) {
        console.error('خطأ في جلب البيانات:', error);
      }
    };

    const delayDebounce = setTimeout(fetchSuggestions, 300); // انتظار قبل الإرسال
    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleSelect = (item) => {
    setQuery(item.name);
    setSuggestions([]);
    onSelect(item);
  };

  return (
    <div className="position-relative">
      <input
        type="text"
        className="form-control"
        placeholder="ابحث عن اسم عميل..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        dir="rtl"
      />
      {suggestions && suggestions.length > 0 && (
        <ul className="list-group position-absolute w-100 z-3" style={{ maxHeight: '200px', overflowY: 'auto' }}>
          {Array.isArray(suggestions)  && suggestions.map((item) => (
            <li
              key={item.id}
              className="list-group-item list-group-item-action"
              onClick={() => handleSelect(item)}
              style={{ cursor: 'pointer' }}
              dir="rtl"
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoCompleteSearch;



/*import React, { useState } from 'react';
//import './AutoCompleteSearch.css'; // لتنسيق مخصص إذا أردت

const AutoCompleteSearch = ({ data, onSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    const filtered = data.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(value ? filtered : []);
  };

  const handleSelect = (item) => {
    setQuery(item);
    setSuggestions([]);
    onSelect(item);
  };

  return (
    <div className="position-relative">
      <input
        type="text"
        className="form-control"
        placeholder="ابحث عن اسم..."
        value={query}
        onChange={handleChange}
        dir="rtl"
      />
      {suggestions.length > 0 && (
        <ul className="list-group position-absolute w-100 z-3" style={{ maxHeight: '200px', overflowY: 'auto' }}>
          {suggestions.map((item, index) => (
            <li
              key={index}
              className="list-group-item list-group-item-action"
              onClick={() => handleSelect(item)}
              style={{ cursor: 'pointer' }}
              dir="rtl"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoCompleteSearch;
*/