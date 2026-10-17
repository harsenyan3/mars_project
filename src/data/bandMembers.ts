import { BandMember } from '../types';
import hayk from '../assets/images/band/hayk.png';
import will from '../assets/images/band/will.jpg';
import chuck from '../assets/images/band/chuck.jpeg';
import mombay from '../assets/images/band/mombay.jpeg';
import jack from '../assets/images/band/jack.jpeg';
import dom from '../assets/images/band/dom.png';

export const bandMembers: BandMember[] = [
  { name: 'Hayk Arsenyan', role: 'Lead Singer', image: hayk },
  { name: 'Will Silverio', role: 'Guitarist', image: will },
  { name: 'Charlie Suazo', role: 'Guitarist', image: chuck },
  { name: 'Patrick Mombay', role: 'Bass', image: mombay },
  { name: 'Jack Rogers', role: 'Drummer', image: jack },
  { name: 'Dom Peric', role: 'Drummer', image: dom },
];
