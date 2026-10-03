import { PRICE } from './constants';
const base = [['MLA','Budhana'],['Pradhan','Budhana'],['Pradhan','Charthawal'],['MLA','Khatauli'],['Pradhan','Khatauli'],['Pradhan','Purkazi'],['MLA','Shahpur'],['Pradhan','Shahpur']];
// Survives hot reload in dev
export const db = (globalThis.__pmp ||= {
  affiliates: {},
  seats: base.map((s, i) => ({ id: i, t: s[0], a: s[1], by: i % 3 === 1 ? 'other' : null, cand: null, paid: false, day: null })),
});
export const price = PRICE;
