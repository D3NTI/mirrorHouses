import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { ru } from 'date-fns/locale';
import 'react-day-picker/dist/style.css';
import styles from './BookingForm.module.css';

const bookedDates = [
  new Date(2025, 4, 1),
  new Date(2025, 4, 2),
  new Date(2025, 4, 3),
  new Date(2025, 4, 10),
  new Date(2025, 4, 11),
  new Date(2025, 4, 20),
  new Date(2025, 4, 21),
  new Date(2025, 4, 22),
];

const houses = [
  { id: 1, name: 'Берёзовый' },
  { id: 2, name: 'Еловый' },
  { id: 3, name: 'Барнхауз' },
];

export default function BookingForm() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    house: '',
    agree: false,
  });
  const [range, setRange] = useState({ from: undefined, to: undefined });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !form.name ||
      !form.phone ||
      !form.email ||
      !form.house ||
      !range.from ||
      !form.agree
    ) {
      alert('Заполните все поля и выберите даты');
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={styles.success}>
        <h3>Заявка отправлена!</h3>
        <p>Мы свяжемся с вами в ближайшее время.</p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.fields}>
        <div className={styles.field}>
          <label className={styles.label}>Имя</label>
          <input
            className={styles.input}
            type="text"
            name="name"
            placeholder="Ваше имя"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Телефон</label>
          <input
            className={styles.input}
            type="tel"
            name="phone"
            placeholder="+375 XX XXX XX XX"
            value={form.phone}
            onChange={handleChange}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Email</label>
          <input
            className={styles.input}
            type="email"
            name="email"
            placeholder="email@example.com"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Домик</label>
          <select
            className={styles.input}
            name="house"
            value={form.house}
            onChange={handleChange}
          >
            <option value="">Выберите домик</option>
            {houses.map((h) => (
              <option key={h.id} value={h.id}>
                {h.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.calendarWrap}>
        <label className={styles.label}>Выберите даты</label>
        <DayPicker
          mode="range"
          selected={range}
          onSelect={setRange}
          disabled={bookedDates}
          modifiers={{ booked: bookedDates }}
          modifiersClassNames={{ booked: styles.booked }}
          showOutsideDays
          locale={ru}
        />
        {range.from && (
          <p className={styles.selectedDates}>
            {range.from.toLocaleDateString('ru-RU')}
            {range.to && ` — ${range.to.toLocaleDateString('ru-RU')}`}
          </p>
        )}
      </div>

      <div className={styles.agreeRow}>
        <input
          type="checkbox"
          name="agree"
          id="agree"
          checked={form.agree}
          onChange={handleChange}
          className={styles.checkbox}
        />
        <label htmlFor="agree" className={styles.agreeLabel}>
          Я согласен с{' '}
          <a href="/rules" className={styles.agreeLink}>
            правилами проживания
          </a>
        </label>
      </div>

      <button type="submit" className={styles.btn}>
        Отправить заявку
      </button>
    </form>
  );
}
