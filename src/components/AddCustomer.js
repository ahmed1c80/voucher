import React, { useState, useRef } from 'react';
import axios from 'axios';

const AddCustomer = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    idImage: null,
  });

  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'idImage') {
      const file = files[0];
      setForm({ ...form, idImage: file });

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('phone', form.phone);
    formData.append('address', form.address);
    if (form.idImage) formData.append('idImage', form.idImage);

    try {
      const response = await axios.post('https://dcash.shamil-bkp.com/voucher/customers.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // لتحديد نوع البيانات
        },
      });

      console.log('تم حفظ العميل بنجاح:', response);
    } catch (error) {
      console.error('حدث خطأ أثناء حفظ العميل:', error);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="container mt-5" dir="rtl">
      <h3 className="mb-4 text-center">إضافة عميل جديد</h3>
      <form onSubmit={handleSubmit} className="border rounded p-4 shadow-sm bg-light">
        
        <div className="mb-3">
          <label className="form-label">الاسم الكامل</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="أدخل الاسم الكامل"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">رقم الهاتف</label>
          <input
            type="tel"
            className="form-control"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            placeholder="مثال: 05xxxxxxxx"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">العنوان</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
            placeholder="أدخل العنوان الكامل"
          />
        </div>

        <div className="mb-3 text-center">
          <label className="form-label d-block">صورة البطاقة الشخصية</label>

          {preview ? (
            <img
              src={preview}
              alt="معاينة البطاقة"
              className="rounded mb-2"
              style={{ width: '150px', height: '150px', objectFit: 'cover', cursor: 'pointer' }}
              onClick={handleImageClick}
            />
          ) : (
            <div
              className="border rounded d-flex align-items-center justify-content-center"
              style={{ width: '150px', height: '150px', cursor: 'pointer', backgroundColor: '#f0f0f0' }}
              onClick={handleImageClick}
            >
              اختر صورة
            </div>
          )}

          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            name="idImage"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          حفظ العميل
        </button>
      </form>
    </div>
  );
};

export default AddCustomer;
