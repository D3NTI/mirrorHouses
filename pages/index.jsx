import Hero from '../components/sections/Hero';
import Houses from '../components/sections/Houses';
import Amenities from '../components/sections/Amenities';
import Gallery from '../components/sections/Gallery';
import Booking from '../components/sections/Booking';
import Map from '../components/sections/Map';

import Reviews from '../components/sections/Reviews';
export default function Home() {
  return (
    <>
      <Hero />
      <Houses />
      <Amenities />
      <Gallery />
      <Reviews />
      <Booking />
      <Map />
    </>
  );
}
