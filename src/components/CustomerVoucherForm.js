import React, { useState } from "react";
import { FaPrint, FaEdit, FaTrash } from "react-icons/fa";
import "./Voucher.css";
import AutoCompleteSearch from './AutoCompleteSearch';
const CustomerVoucherForm = () => {
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    method: "نقد",
    accountName: "",
    amount: "",
    currency: "ريال يمني",
    note: "",
    fund: "",
  });

  const [previewVoucher, setPreviewVoucher] = useState(null);
  const handlePrint = (voucher) => {
    setPreviewVoucher(voucher);
  };
  
  /*
    date: 
    method: 'نقد',
    amount: 400000,
    currency: 'ريال يمني',
    accountName: '',
    accountNumber: '',
    referenceNumber: '',
    fund: 'صندوق خدمة العملاء 5',
    note: '',
    handler: 'إبراهيم محمد مهوب عبدالله',
  });

*/
  const [vouchers, setVouchers] = useState([]);
  const [counter, setCounter] = useState(1);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newVoucher = { ...form, number: counter };
    setVouchers([...vouchers, newVoucher]);
    setCounter(counter + 1);
    setForm({
      date: new Date().toISOString().slice(0, 10),
      method: "نقد",
      accountName: "",
      amount: "",
      currency: "ريال يمني",
      note: "",
      fund: 'صندوق خدمة العملاء 5',
    });
  };

  /*const handlePrint = (voucher) => {
    alert(`طباعة السند رقم ${voucher.number}`);
  };*/

  const handleEdit = (voucher) => {
    setForm({ ...voucher });
    alert(`تم تحميل السند رقم ${voucher.number} للتعديل`);
  };

  const handleDelete = (number) => {
    if (window.confirm("هل تريد حذف هذا السند؟")) {
      setVouchers(vouchers.filter((v) => v.number !== number));
    }
  };

  const handleSelect = (name) => {
    //alert(`تم اختيار: ${name}`);
    setForm({ ...form, ['accountName']: name.name });
  };
  return (
    <div className="container my-4">
      <div className="card shadow-lg rounded-4 border-0">

      <div className="card-header bg-primary text-white text-center rounded-top-4">
  <h4 className="fw-bold">سند صرف العملاء</h4>
</div>
     {/*    <div className="card-header bg-primary text-white text-center rounded-top-4">
          <h4>سند صرف العملاء</h4>
        </div>*/}
        <div className="card-body">

        <div className="container mt-4" dir="rtl">
      <h4 className="mb-3">🔍 البحث عن عميل</h4>
      <AutoCompleteSearch  onSelect={handleSelect} />
    </div>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label">التاريخ:</label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-4">
                <label className="form-label d-block">طريقة الصرف:</label>
                <div className="btn-group" role="group">
                  <input
                    type="radio"
                    className="btn-check"
                    name="method"
                    id="cash"
                    value="نقد"
                    checked={form.method === "نقد"}
                    onChange={handleChange}
                  />
                  <label className="btn btn-outline-primary" htmlFor="cash">
                    نقد
                  </label>

                  <input
                    type="radio"
                    className="btn-check"
                    name="method"
                    id="transfer"
                    value="تحويل"
                    checked={form.method === "تحويل"}
                    onChange={handleChange}
                  />
                  <label className="btn btn-outline-primary" htmlFor="transfer">
                    تحويل
                  </label>
                </div>
              </div>
              <div className="col-md-4">
                <label className="form-label">اسم الحساب:</label>
                <input required
                  type="text"
                  name="accountName"
                  value={form.accountName}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">المبلغ:</label>
                <input required
                  type="number"
                  name="amount"
                  value={form.amount}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">العملة:</label>
                <select
                  name="currency"
                  value={form.currency}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option>ريال يمني</option>
                  <option>ريال سعودي</option>
                  <option>دولار</option>
                  <option>يورو</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">الصندوق:</label>
             
                <select
                  name="fund"
                  value={form.fund}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option>
                    الصندوق الرئيسي
                  </option>
                  <option>صندوق خدمة العملاء</option>
                  <option>صندوق خدمة العملاء 5</option>
                </select>
             
              </div>
              <div className="col-12">
                <label className="form-label">ملاحظات:</label>
                <textarea
                  name="note"
                  value={form.note}
                  onChange={handleChange}
                  className="form-control"
                  rows="2"
                />
              </div>
              <div className="col-12 text-end">
                <button type="submit" className="btn btn-success">
                  إضافة
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* جدول السجلات */}
      {vouchers.length > 0 && (
        <div className="card shadow-sm mt-4">
          <div className="card-header bg-light">
            <h5 className="mb-0">سجلات السندات</h5>
          </div>
          <div className="card-body p-0">
            <table className="table table-striped table-hover mb-0 text-center">
              <thead className="table-primary">
                <tr>
                  <th>#</th>
                  <th>التاريخ</th>
                  <th>الطريقة</th>
                  <th>الحساب</th>
                  <th>المبلغ</th>
                  <th>العملة</th>
                  <th>الصندوق</th>
                  <th>ملاحظات</th>
                  <th>إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {vouchers.map((v) => (
                  <tr key={v.number}>
                    <td>{v.number}</td>
                    <td>{v.date}</td>
                    <td>{v.method}</td>
                    <td>{v.accountName}</td>
                    <td>{v.amount}</td>
                    <td>{v.currency}</td>
                    <td>{v.fund}</td>
                    <td>{v.note}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-light me-1"
                        onClick={() => handlePrint(v)}
                      >
                        <FaPrint />
                      </button>
                      <button
                        className="btn btn-sm btn-warning me-1"
                        onClick={() => handleEdit(v)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(v.number)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}



{previewVoucher && (
  <div
    className="modal fade show d-block"
    tabIndex="-1"
    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    role="dialog"
  >
    <div className="modal-dialog modal-lg" role="document">
      <div className="modal-content shadow">
        <div className="modal-header bg-primary text-white">
          <h5 className="modal-title">معاينة سند الصرف #{previewVoucher.number}</h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            onClick={() => setPreviewVoucher(null)}
          ></button>
        </div>
        <div className="modal-body">
          <p><strong>التاريخ:</strong> {previewVoucher.date}</p>
          <p><strong>طريقة الصرف:</strong> {previewVoucher.method}</p>
          <p><strong>اسم الحساب:</strong> {previewVoucher.accountName}</p>
          <p><strong>المبلغ:</strong> {previewVoucher.amount} {previewVoucher.currency}</p>
          <p><strong>الصندوق:</strong> {previewVoucher.fund}</p>
          <p><strong>ملاحظات:</strong> {previewVoucher.note}</p>
        </div>
        <div className="modal-footer">
          <button
            className="btn btn-secondary"
            onClick={() => setPreviewVoucher(null)}
          >
            إغلاق
          </button>
          <button
            className="btn btn-success"
            onClick={() => {
              const originalTitle = document.title;
              document.title = `سند صرف رقم ${previewVoucher.number}`;
              window.print();
              document.title = originalTitle;
            }}
          >
            طباعة السند
          </button>
        </div>
      </div>
    </div>
  </div>

)}

      
</div>
  );
};

export default CustomerVoucherForm;


