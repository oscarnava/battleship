import Ship from '../src/js/ship';

it('should have a length and a position', () => {
  const ship = new Ship({ length: 2, pos: [0, 0] });

  expect(ship.length).toBe(2);
  expect(ship.x).toBe(0);
  expect(ship.y).toBe(0);
});

it('should know when has been gotHit', () => {
  const horzShip = new Ship({ length: 2, pos: [0, 0] });

  expect(horzShip.gotHit(0, 0)).toBe(true);
  expect(horzShip.gotHit(1, 0)).toBe(true);
  expect(horzShip.gotHit(2, 0)).toBe(false);

  const vertShip = new Ship({ length: 5, pos: [3, 4], vertical: true });
  expect(vertShip.gotHit(3, 3)).toBe(false);
  expect(vertShip.gotHit(3, 4)).toBe(true);
  expect(vertShip.gotHit(3, 5)).toBe(true);
  expect(vertShip.gotHit(3, 6)).toBe(true);
  expect(vertShip.gotHit(3, 7)).toBe(true);
  expect(vertShip.gotHit(3, 8)).toBe(true);
  expect(vertShip.gotHit(3, 9)).toBe(false);
});

it('should ignore repeated hits on the same place', () => {
  const horzShip = new Ship({ length: 2, pos: [0, 0] });

  horzShip.setDamage(0, 0);
  expect(horzShip.hits.length).toBe(1);

  horzShip.setDamage(0, 0);
  expect(horzShip.hits.length).toBe(1);

  horzShip.setDamage(0, 0);
  expect(horzShip.hits.length).toBe(1);

  horzShip.setDamage(1, 0);
  expect(horzShip.hits.length).toBe(2);
});

it('should know when it was sunk', () => {
  const horzShip = new Ship({ length: 2, pos: [0, 0] });
  expect(horzShip.isSunk).toBe(false);
  expect(horzShip.damage).toBe(0);

  horzShip.setDamage(0, 0);
  expect(horzShip.isSunk).toBe(false);
  expect(horzShip.damage).toBe(1);

  horzShip.setDamage(0, 0);
  expect(horzShip.isSunk).toBe(false);
  expect(horzShip.damage).toBe(1);

  horzShip.setDamage(0, 0);
  expect(horzShip.isSunk).toBe(false);
  expect(horzShip.damage).toBe(1);

  horzShip.setDamage(1, 0);
  expect(horzShip.isSunk).toBe(true);
  expect(horzShip.damage).toBe(2);

  const vertShip = new Ship({ length: 5, pos: [3, 4], vertical: true });
  expect(vertShip.isSunk).toBe(false);
  expect(vertShip.damage).toBe(0);

  vertShip.setDamage(3, 4);
  expect(vertShip.isSunk).toBe(false);
  expect(vertShip.damage).toBe(1);

  vertShip.setDamage(3, 4);
  expect(vertShip.isSunk).toBe(false);
  expect(vertShip.damage).toBe(1);

  vertShip.setDamage(3, 4);
  expect(vertShip.isSunk).toBe(false);
  expect(vertShip.damage).toBe(1);

  vertShip.setDamage(3, 5);
  expect(vertShip.isSunk).toBe(false);
  expect(vertShip.damage).toBe(2);

  vertShip.setDamage(3, 6);
  expect(vertShip.isSunk).toBe(false);
  expect(vertShip.damage).toBe(3);

  vertShip.setDamage(3, 7);
  expect(vertShip.isSunk).toBe(false);
  expect(vertShip.damage).toBe(4);

  vertShip.setDamage(3, 8);
  expect(vertShip.isSunk).toBe(true);
  expect(vertShip.damage).toBe(5);
});

it('should return the coordinates of a ship', () => {
  const horzShip = new Ship({ length: 2, pos: [0, 0] });
  expect(horzShip.coordinates).toEqual([[0, 0], [1, 0]]);

  const vertShip = new Ship({ length: 5, pos: [5, 5], vertical: true });
  expect(vertShip.coordinates).toEqual([[5, 5], [5, 6], [5, 7], [5, 8], [5, 9]]);
});
