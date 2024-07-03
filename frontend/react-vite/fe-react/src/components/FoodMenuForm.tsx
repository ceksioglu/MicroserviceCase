import React, { useState } from 'react';
import axios from 'axios';
import Button from './Button';

const FoodMenuForm: React.FC = () => {
  const [date, setDate] = useState('');
  const [menuContent, setMenuContent] = useState('');
  const [campus, setCampus] = useState('');
  const [menu, setMenu] = useState('');
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      date,
      menuContent,
      campus,
      menu,
    };

    console.log('Submitting form data:', formData);

    try {
      const response = await axios.post('http://localhost:5123/api/message/send', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setResponseMessage(response.data.Status);
    } catch (error) {
      console.error('Error sending message', error);
      setResponseMessage('An error occurred while sending the message.');
    }
  };

  const handleReset = () => {
    setDate('');
    setMenuContent('');
    setCampus('');
    setMenu('');
    setResponseMessage(null);
  };

  const handleSetCurrentDate = () => {
    const currentDate = new Date().toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    });
    setDate(currentDate);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Yemek Listesi Düzenle / Gönder</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Tarih (DD-MM-YY)</label>
          <input
            type="text"
            id="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="DD-MM-YY"
            required
          />
          <Button type="button" onClick={handleSetCurrentDate} className="mt-2">Bugünün Tarihini Gir</Button>
        </div>
        <div>
          <label htmlFor="menuContent" className="block text-sm font-medium text-gray-700">Menü İçeriği</label>
          <textarea
            id="menuContent"
            name="menuContent"
            value={menuContent}
            onChange={(e) => setMenuContent(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Menü İçeriğini Giriniz"
            required
          />
        </div>
        <div>
          <label htmlFor="campus" className="block text-sm font-medium text-gray-700">Kampus</label>
          <select
            id="campus"
            name="campus"
            value={campus}
            onChange={(e) => setCampus(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="">Kampüs Seçiniz</option>
            <option value="istanbul">Istanbul</option>
            <option value="ankara">Ankara</option>
          </select>
        </div>
        <div>
          <label htmlFor="menu" className="block text-sm font-medium text-gray-700">Menü</label>
          <select
            id="menu"
            name="menu"
            value={menu}
            onChange={(e) => setMenu(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="">Menü Seçiniz</option>
            <option value="normal">Normal</option>
            <option value="light">Light</option>
            <option value="sandwich">Sandviç</option>
          </select>
        </div>
        <div className="flex space-x-4">
          <Button type="submit">Gönder</Button>
          <Button type="reset" onClick={handleReset}>Temizle</Button>
        </div>
        {responseMessage && <p className="mt-4 text-center text-red-500">{responseMessage}</p>}
      </form>
    </div>
  );
};

export default FoodMenuForm;
