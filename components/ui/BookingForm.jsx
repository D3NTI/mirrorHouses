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

const PRICE_PER_NIGHT = 330;
const KUPEL_PRICE = 150;

function getDaysBetween(from, to) {
  if (!from || !to) return 1;
  const diff = Math.abs(new Date(to) - new Date(from));
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return days || 1;
}

export default function BookingForm() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    house: '',
    kupel: false,
    agree: false,
  });
  const [range, setRange] = useState({ from: undefined, to: undefined });
  const [submitted, setSubmitted] = useState(false);
  const [bookedDates, setBookedDates] = useState([]);
  const successRef = useRef(null);

  const nights = getDaysBetween(range?.from, range?.to);
  const totalPrice = PRICE_PER_NIGHT * nights + (form.kupel ? KUPEL_PRICE : 0);

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
          kupel: form.kupel,
          totalPrice,
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
        <p>Мы свяжемся с вами в ближайшее время для подтверждения брони.</p>
        <div className={styles.successPrice}>
          <span>Итого к оплате:</span>
          <strong>{totalPrice} BYN</strong>
        </div>
        {form.kupel && (
          <p className={styles.successNote}>
            Включая купель: +{KUPEL_PRICE} BYN
          </p>
        )}
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

      <div className={styles.extras}>
        <p className={styles.label}>Дополнительно</p>
        <div className={styles.extraItem}>
          <input
            type="checkbox"
            name="kupel"
            id="kupel"
            checked={form.kupel}
            onChange={handleChange}
            className={styles.checkbox}
          />
          <label htmlFor="kupel" className={styles.extraLabel}>
            Купель <span className={styles.extraPrice}>+{KUPEL_PRICE} BYN</span>
          </label>
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
            {' · '}
            {nights} {nights === 1 ? 'ночь' : nights < 5 ? 'ночи' : 'ночей'}
          </p>
        )}
      </div>

      {range?.from && (
        <div className={styles.priceBlock}>
          <div className={styles.priceRow}>
            <span>
              {PRICE_PER_NIGHT} BYN × {nights}{' '}
              {nights === 1 ? 'ночь' : nights < 5 ? 'ночи' : 'ночей'}
            </span>
            <span>{PRICE_PER_NIGHT * nights} BYN</span>
          </div>
          {form.kupel && (
            <div className={styles.priceRow}>
              <span>Купель</span>
              <span>+{KUPEL_PRICE} BYN</span>
            </div>
          )}
          <div className={styles.priceTotal}>
            <span>Итого</span>
            <strong>{totalPrice} BYN</strong>
          </div>
        </div>
      )}

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
