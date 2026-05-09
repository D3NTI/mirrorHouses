import { useState, useEffect, useRef } from 'react';
import { DayPicker } from 'react-day-picker';
import { ru } from 'date-fns/locale';
import 'react-day-picker/dist/style.css';
import styles from './BookingForm.module.css';

const houses = [
  { id: '1', name: 'Берёзовый' },
  { id: '2', name: 'Еловый' },
  { id: '3', name: 'Барнхауз' },
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
  const [bookedDates, setBookedDates] = useState([]);
  const successRef = useRef(null);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const res = await fetch(
          `/api/availability${form.house ? `?house=${form.house}` : ''}`,
        );
        const data = await res.json();

        if (data.success) {
          const dates = [];
          data.bookings.forEach((booking) => {
            const from = new Date(booking.dateFrom);
            const to = new Date(booking.dateTo);
            const current = new Date(from);
            while (current <= to) {
              dates.push(new Date(current));
              current.setDate(current.getDate() + 1);
            }
          });
          setBookedDates(dates);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAvailability();
  }, [form.house]);

  useEffect(() => {
    if (submitted && successRef.current) {
      successRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [submitted]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.phone ||
      !form.email ||
      !form.house ||
      !range?.from ||
      !form.agree
    ) {
      alert('Заполните все поля и выберите даты');
      return;
    }

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          house: form.house,
          dateFrom: range.from,
          dateTo: range.to || range.from,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
      } else {
        alert('Ошибка при отправке. Попробуйте ещё раз.');
      }
    } catch (error) {
      console.error(error);
      alert('Ошибка соединения. Попробуйте ещё раз.');
    }
  };

  if (submitted) {
    return (
      <div className={styles.success} ref={successRef}>
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
          disabled={[{ before: new Date() }, ...bookedDates]}
          modifiers={{ booked: bookedDates }}
          modifiersClassNames={{ booked: styles.booked }}
          showOutsideDays
          locale={ru}
        />
        {range?.from && (
          <p className={styles.selectedDates}>
            {range.from.toLocaleDateString('ru-RU')}
            {range?.to && ` — ${range.to.toLocaleDateString('ru-RU')}`}
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
